// app/api/messages/send/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'
import { sendTextMessage, sendTemplateMessage, sendMediaMessage } from '../../../lib/whatsapp-service'
import { v4 as uuid } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, to, message, templateName, language, languageCode, variables, url, caption, templateId } = body

    if (!to || !type) {
      return NextResponse.json({ success: false, error: 'Missing required fields: to, type' }, { status: 400 })
    }

    // Find or create contact
    let contact = await prisma.waContact.findUnique({
      where: { phone: to }
    })
    if (!contact) {
      contact = await prisma.waContact.create({
        data: { phone: to }
      })
    }

    const msgId = `msg_${uuid()}`
    const now = new Date()
    let result: any
    let templateRecord = null

    switch (type) {
      case 'text':
        if (!message) {
          return NextResponse.json({ success: false, error: 'message required' }, { status: 400 })
        }
        result = await sendTextMessage(to, message)
        break

      case 'template': {
        if (!templateName && !templateId) {
          return NextResponse.json({ success: false, error: 'templateId or templateName required' }, { status: 400 })
        }
        
        // Find template from database
        if (templateId) {
          templateRecord = await prisma.waTemplate.findUnique({
            where: { id: templateId }
          })
        } else if (templateName) {
          templateRecord = await prisma.waTemplate.findFirst({
            where: { name: templateName }
          })
        }
        
        if (!templateRecord) {
          return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 })
        }
        
        if (templateRecord.status !== 'APPROVED') {
          return NextResponse.json({ success: false, error: 'Template is not approved' }, { status: 400 })
        }
        
        const lang = language || languageCode || templateRecord.language
        result = await sendTemplateMessage(
          to,
          templateRecord.name,
          lang,
          variables || {},
          templateRecord.body,
          templateRecord.components as any[]
        )
        break
      }

      case 'image':
      case 'video':
      case 'document':
      case 'audio':
        if (!url) {
          return NextResponse.json({ success: false, error: 'url required for media' }, { status: 400 })
        }
        result = await sendMediaMessage(to, type, url, caption)
        break

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid type. Use: text, template, image, video, document, audio' 
        }, { status: 400 })
    }

    // Save message to database
    if (!result.success) {
      await prisma.waMessage.create({
        data: {
          id: msgId,
          to,
          type: type.toUpperCase(),
          body: message || caption || '',
          status: 'FAILED',
          direction: 'OUTBOUND',
          failedAt: now,
          errorMessage: result.error,
          errorCode: result.errorCode,
          templateId: templateRecord?.id,
          variablesUsed: variables,
          contactId: contact.id
        }
      })
      return NextResponse.json({ success: false, error: result.error, errorCode: result.errorCode }, { status: 400 })
    }

    await prisma.waMessage.create({
      data: {
        id: msgId,
        to,
        type: type.toUpperCase(),
        body: message || caption || '',
        status: 'SENT',
        direction: 'OUTBOUND',
        sentAt: now,
        wamid: result.messageId,
        templateId: templateRecord?.id,
        variablesUsed: variables,
        contactId: contact.id
      }
    })

    // Update contact if we have name
    if (contact && !contact.name && variables?.name) {
      await prisma.waContact.update({
        where: { id: contact.id },
        data: { name: variables.name }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: msgId,
        to,
        status: 'sent',
        whatsappMessageId: result.messageId,
        sentAt: now
      }
    })

  } catch (err: any) {
    console.error('Send message error:', err)
    return NextResponse.json({ success: false, error: err.message ?? 'Failed to send' }, { status: 500 })
  }
}