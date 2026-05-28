// app/api/messages/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'
import { sendTextMessage, sendTemplateMessage } from '../../lib/whatsapp-service'
import { v4 as uuid } from 'uuid'

function renderTemplate(body: string, vars: Record<string, string>): string {
  return body.replace(/\{\{([^}]+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`)
}

// GET /api/messages — list recent messages
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const to = searchParams.get('to')
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '50')
  const skip = (page - 1) * limit

  // Build where clause
  const where: any = {}
  if (type) where.type = type.toUpperCase()
  if (to) where.to = { contains: to }
  if (status) where.status = status.toUpperCase()

  // Get messages from database
  const [messages, total] = await Promise.all([
    prisma.waMessage.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            category: true,
            status: true
          }
        },
        contact: {
          select: {
            id: true,
            name: true,
            phone: true,
            isValid: true
          }
        },
        media: true
      }
    }),
    prisma.waMessage.count({ where })
  ])

  // Transform to match expected format
  const formattedMessages = messages.map(msg => ({
    id: msg.id,
    to: msg.to,
    body: msg.body,
    type: msg.type.toLowerCase(),
    status: msg.status.toLowerCase(),
    templateId: msg.templateId,
    variables: msg.variablesUsed,
    whatsappMessageId: msg.wamid,
    error: msg.errorMessage,
    errorCode: msg.errorCode,
    sentAt: msg.sentAt,
    createdAt: msg.createdAt,
    deliveredAt: msg.deliveredAt,
    readAt: msg.readAt,
    template: msg.template,
    contact: msg.contact,
    media: msg.media
  }))

  return NextResponse.json({
    success: true,
    data: formattedMessages,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit)
  })
}

// POST /api/messages — send a single message
// Body: { type: "simple", to: "+91...", body: "Hello" }
//    or { type: "template", to: "+91...", templateId: "tpl_1", variables: { name: "Raj" } }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, to } = body

    if (!type || !to) {
      return NextResponse.json({ 
        success: false, 
        error: 'type and to are required' 
      }, { status: 400 })
    }

    // Validate type
    if (!['simple', 'template', 'text'].includes(type)) {
      return NextResponse.json({ 
        success: false, 
        error: 'type must be simple or template' 
      }, { status: 400 })
    }

    const now = new Date()
    const id = `msg_${uuid()}`

    // Find or create contact
    let contact = await prisma.waContact.findUnique({
      where: { phone: to }
    })
    
    if (!contact) {
      contact = await prisma.waContact.create({
        data: { phone: to }
      })
    }

    // Handle simple/text message
    if (type === 'simple' || type === 'text') {
      if (!body.body) {
        return NextResponse.json({ 
          success: false, 
          error: 'body is required for simple messages' 
        }, { status: 400 })
      }

      try {
        // Send via WhatsApp API
        const result = await sendTextMessage(to, body.body)

        if (!result.success) {
          // Save failed message to database
          const failedMsg = await prisma.waMessage.create({
            data: {
              id,
              to,
              type: 'TEXT',
              body: body.body,
              status: 'FAILED',
              direction: 'OUTBOUND',
              failedAt: now,
              errorMessage: result.error,
              errorCode: result.errorCode,
              contactId: contact.id
            }
          })

          return NextResponse.json({ 
            success: false, 
            error: result.error,
            errorCode: result.errorCode,
            data: failedMsg
          }, { status: 400 })
        }

        // Save successful message to database
        const savedMsg = await prisma.waMessage.create({
          data: {
            id,
            to,
            type: 'TEXT',
            body: body.body,
            status: 'SENT',
            direction: 'OUTBOUND',
            sentAt: now,
            wamid: result.messageId,
            contactId: contact.id
          },
          include: {
            contact: true,
            template: true
          }
        })

        return NextResponse.json({ 
          success: true, 
          data: {
            id: savedMsg.id,
            to: savedMsg.to,
            body: savedMsg.body,
            type: 'simple',
            status: 'sent',
            whatsappMessageId: savedMsg.wamid,
            sentAt: savedMsg.sentAt,
            createdAt: savedMsg.createdAt
          }
        }, { status: 201 })

      } catch (err: any) {
        // Save error state
        await prisma.waMessage.create({
          data: {
            id,
            to,
            type: 'TEXT',
            body: body.body,
            status: 'FAILED',
            direction: 'OUTBOUND',
            failedAt: now,
            errorMessage: err.message,
            contactId: contact.id
          }
        })

        return NextResponse.json({ 
          success: false, 
          error: err.message || 'Failed to send message' 
        }, { status: 500 })
      }
    }

    // Handle template message
    if (type === 'template') {
      const { templateId, variables = {} } = body
      
      if (!templateId) {
        return NextResponse.json({ 
          success: false, 
          error: 'templateId is required for template messages' 
        }, { status: 400 })
      }

      // Get template from database
      const tpl = await prisma.waTemplate.findUnique({
        where: { id: templateId }
      })

      if (!tpl) {
        return NextResponse.json({ 
          success: false, 
          error: 'Template not found' 
        }, { status: 404 })
      }

      if (tpl.status !== 'APPROVED') {
        return NextResponse.json({ 
          success: false, 
          error: `Template is not approved (current status: ${tpl.status.toLowerCase()})` 
        }, { status: 400 })
      }

      const rendered = renderTemplate(tpl.body, variables)

      try {
        // Send via WhatsApp API
        const result = await sendTemplateMessage(
          to,
          tpl.name,
          tpl.language,
          variables,
          tpl.body,
          tpl.components as any[]
        )

        if (!result.success) {
          // Save failed message
          const failedMsg = await prisma.waMessage.create({
            data: {
              id,
              to,
              type: 'TEMPLATE',
              body: rendered,
              status: 'FAILED',
              direction: 'OUTBOUND',
              failedAt: now,
              errorMessage: result.error,
              errorCode: result.errorCode,
              templateId: tpl.id,
              variablesUsed: variables,
              contactId: contact.id
            }
          })

          return NextResponse.json({ 
            success: false, 
            error: result.error,
            errorCode: result.errorCode,
            data: failedMsg
          }, { status: 400 })
        }

        // Save successful message
        const savedMsg = await prisma.waMessage.create({
          data: {
            id,
            to,
            type: 'TEMPLATE',
            body: rendered,
            status: 'SENT',
            direction: 'OUTBOUND',
            sentAt: now,
            wamid: result.messageId,
            templateId: tpl.id,
            variablesUsed: variables,
            contactId: contact.id
          },
          include: {
            contact: true,
            template: true
          }
        })

        // Update contact name if provided in variables
        if (variables.name && !contact.name) {
          await prisma.waContact.update({
            where: { id: contact.id },
            data: { name: variables.name }
          })
        }

        return NextResponse.json({ 
          success: true, 
          data: {
            id: savedMsg.id,
            to: savedMsg.to,
            body: savedMsg.body,
            templateId: savedMsg.templateId,
            variables: savedMsg.variablesUsed,
            type: 'template',
            status: 'sent',
            whatsappMessageId: savedMsg.wamid,
            sentAt: savedMsg.sentAt,
            createdAt: savedMsg.createdAt
          }
        }, { status: 201 })

      } catch (err: any) {
        // Save error state
        await prisma.waMessage.create({
          data: {
            id,
            to,
            type: 'TEMPLATE',
            body: rendered,
            status: 'FAILED',
            direction: 'OUTBOUND',
            failedAt: now,
            errorMessage: err.message,
            templateId: tpl.id,
            variablesUsed: variables,
            contactId: contact.id
          }
        })

        return NextResponse.json({ 
          success: false, 
          error: err.message || 'Failed to send template message' 
        }, { status: 500 })
      }
    }

    return NextResponse.json({ 
      success: false, 
      error: 'type must be simple or template' 
    }, { status: 400 })

  } catch (err: any) {
    console.error('POST /api/messages error:', err)
    return NextResponse.json({ 
      success: false, 
      error: err.message || 'Invalid JSON or server error' 
    }, { status: 400 })
  }
}