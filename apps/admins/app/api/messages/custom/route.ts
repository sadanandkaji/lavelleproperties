// app/api/messages/custom/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'
import { sendTextMessage, sendImageMessage, sendVideoMessage, sendDocumentMessage, sendInteractiveButtonsMessage, sendQuickRepliesList, sendQuickRepliesMessage, sendMediaMessage } from '../../../lib/whatsapp-service'
import { v4 as uuid } from 'uuid'

const RATE_MS = Math.round(1000 / parseInt(process.env.BULK_SEND_RATE_LIMIT_PER_SEC ?? '10'))

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') ?? ''
    const category = searchParams.get('category') ?? ''
    const where: any = {}
    if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { body: { contains: search, mode: 'insensitive' } }]
    if (category) where.category = category
    const templates = await prisma.customTemplate.findMany({ where, orderBy: { usageCount: 'desc' } })
    return NextResponse.json({ success: true, data: templates })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action } = body

    // ── SAVE ──────────────────────────────────────────────────────────────
    if (action === 'save') {
      const { name, message, category = 'General', emoji = '💬', mediaType, mediaUrl, mediaCaption, buttons, quickReplies } = body
      if (!name?.trim()) return NextResponse.json({ success: false, error: 'name is required' }, { status: 400 })
      
      const tpl = await prisma.customTemplate.upsert({
        where: { name: name.trim() },
        update: {
          body: message?.trim() ?? '',
          category,
          emoji,
          mediaType: mediaType ?? null,
          mediaUrl: mediaUrl ?? null,
          mediaCaption: mediaCaption ?? null,
          buttons: buttons ?? [],
          quickReplies: quickReplies ?? [],
          updatedAt: new Date()
        },
        create: {
          id: uuid(),
          name: name.trim(),
          body: message?.trim() ?? '',
          category,
          emoji,
          mediaType: mediaType ?? null,
          mediaUrl: mediaUrl ?? null,
          mediaCaption: mediaCaption ?? null,
          buttons: buttons ?? [],
          quickReplies: quickReplies ?? [],
          usageCount: 0
        },
      })
      return NextResponse.json({ success: true, data: tpl })
    }

    // app/api/messages/custom/route.ts - Updated send handler
// Inside the POST function, replace the send logic with:

// In your POST function, update the send handler section:

// ── SEND single ────────────────────────────────────────────────────────
if (action === 'send' || !action) {
  const { to, message, type = 'text', mediaUrl, mediaCaption, customTemplateId, buttons, quickReplies } = body

  if (!to) {
    return NextResponse.json({ success: false, error: 'to is required' }, { status: 400 })
  }

  let msgBody = message?.trim()
  let msgType = type
  let msgMediaUrl = mediaUrl
  let msgCaption = mediaCaption
  let msgButtons = buttons
  let msgQuickReplies = quickReplies

  // Load from template if specified
  if (customTemplateId) {
    const tpl = await prisma.customTemplate.findUnique({ where: { id: customTemplateId } })
    if (!tpl) {
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 })
    }
    msgBody = tpl.body
    msgType = tpl.mediaType ?? 'text'
    msgMediaUrl = tpl.mediaUrl ?? undefined
    msgCaption = tpl.mediaCaption ?? undefined
    msgButtons = tpl.buttons as any[]
    msgQuickReplies = tpl.quickReplies as any[]
    await prisma.customTemplate.update({ where: { id: customTemplateId }, data: { usageCount: { increment: 1 } } })
  }

  // Get or create contact
  let contact = await prisma.waContact.findUnique({ where: { phone: to } })
  if (!contact) {
    contact = await prisma.waContact.create({ data: { phone: to } })
  }

  let result: any
  const now = new Date()
  const msgId = `msg_${uuid()}`

  try {
    // Handle different message types
    if (msgType === 'image' && msgMediaUrl) {
      result = await sendImageMessage(to, msgMediaUrl, msgCaption || msgBody)
    } 
    else if (msgType === 'video' && msgMediaUrl) {
      result = await sendVideoMessage(to, msgMediaUrl, msgCaption || msgBody)
    }
    else if (msgType === 'document' && msgMediaUrl) {
      result = await sendDocumentMessage(to, msgMediaUrl, undefined, msgCaption || msgBody)
    }
    // ─── NEW BUTTON HANDLING LOGIC ─────────────────────────────────────
    else if (msgButtons && msgButtons.length > 0) {
      // Filter to valid button types only (cta_url, reply, quick_reply)
      const validButtons = msgButtons.filter((btn: any) => 
        btn.type === 'cta_url' || btn.type === 'reply' || btn.type === 'quick_reply'
      ).map((btn: any) => ({
        type: btn.type,
        title: btn.title,
        url: btn.url
      }))
      
      const textToSend = msgBody || msgCaption || 'Select an option'
      
      if (validButtons.length > 0) {
        result = await sendInteractiveButtonsMessage(to, textToSend, validButtons, msgCaption)
      } else {
        // If no valid buttons, send as text
        result = await sendTextMessage(to, textToSend, true)
      }
    }
    // ─── QUICK REPLY LIST HANDLING ─────────────────────────────────────
    else if (msgQuickReplies && msgQuickReplies.length > 0) {
  // Send as quick replies list
  const textToSend = msgBody || msgCaption || 'Select an option'
  result = await sendQuickRepliesList(to, textToSend, msgQuickReplies, msgCaption)  // Changed function name
}
    // ─── PLAIN TEXT MESSAGE ──────────────────────────────────────────
    else {
      const textToSend = msgBody || message
      if (!textToSend) {
        return NextResponse.json({ success: false, error: 'message is required' }, { status: 400 })
      }
      result = await sendTextMessage(to, textToSend, true)
    }

    if (!result.success) {
      throw new Error(result.error)
    }

    // Save to database
    await prisma.waMessage.create({
      data: {
        id: msgId,
        to,
        type: (msgType?.toUpperCase() as any) ?? 'TEXT',
        body: msgBody ?? msgCaption ?? message ?? '',
        status: 'SENT',
        direction: 'OUTBOUND',
        wamid: result.messageId ?? null,
        sentAt: now,
        contactId: contact.id,
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: { id: msgId, to, status: 'sent', whatsappMessageId: result.messageId } 
    })
    
  } catch (error: any) {
    console.error('Send error:', error)
    
    await prisma.waMessage.create({
      data: {
        id: msgId,
        to,
        type: (msgType?.toUpperCase() as any) ?? 'TEXT',
        body: msgBody ?? msgCaption ?? message ?? '',
        status: 'FAILED',
        direction: 'OUTBOUND',
        errorMessage: error.message,
        failedAt: now,
        contactId: contact.id,
      }
    })
    
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

    // ── BULK ───────────────────────────────────────────────────────────────
    if (action === 'bulk') {
      const { phones, csvText, message, type = 'text', mediaUrl, mediaCaption, customTemplateId, label, buttons, quickReplies } = body

      let msgBody = message?.trim()
      let msgType = type
      let msgMediaUrl = mediaUrl
      let msgCaption = mediaCaption
      let msgButtons = buttons
      let msgQuickReplies = quickReplies

      if (customTemplateId) {
        const tpl = await prisma.customTemplate.findUnique({ where: { id: customTemplateId } })
        if (!tpl) return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 })
        msgBody = tpl.body
        msgType = tpl.mediaType ?? 'text'
        msgMediaUrl = tpl.mediaUrl ?? undefined
        msgCaption = tpl.mediaCaption ?? undefined
        msgButtons = tpl.buttons as any[]
        msgQuickReplies = tpl.quickReplies as any[]
        await prisma.customTemplate.update({ where: { id: customTemplateId }, data: { usageCount: { increment: 1 } } })
      }

      // Validate based on type
      if (msgType === 'text' && !msgBody) {
        return NextResponse.json({ success: false, error: 'message is required for text type' }, { status: 400 })
      }
      if (msgType !== 'text' && !msgMediaUrl) {
        return NextResponse.json({ success: false, error: 'mediaUrl is required for media type' }, { status: 400 })
      }

      // Parse recipients
      let recipientPhones: string[] = []
      if (phones) {
        recipientPhones = phones.split(/[\n,;]+/).map((s: string) => s.trim().replace(/\s/g, '')).filter((s: string) => s.length >= 7)
      }
      if (csvText) {
        const lines = csvText.trim().split('\n').filter(Boolean)
        const headers = lines[0].split(',').map((h: string) => h.trim().toLowerCase())
        const phoneCol = headers.findIndex((h: string) => ['phone', 'mobile', 'number', 'to'].includes(h))
        if (phoneCol >= 0) {
          recipientPhones = lines.slice(1).map((l: string) => l.split(',')[phoneCol]?.trim().replace(/\s/g, '') ?? '').filter((p: string) => p.length >= 7)
        }
      }

      if (recipientPhones.length === 0) {
        return NextResponse.json({ success: false, error: 'No valid recipients' }, { status: 400 })
      }

      const jobId = uuid()
      
      await prisma.waBulkJob.create({
        data: {
          id: jobId,
          label: label?.trim() || 'Custom message',
          type: 'SIMPLE',
          message: msgBody ?? msgCaption ?? '',
          total: recipientPhones.length,
          sent: 0,
          failed: 0,
          status: 'RUNNING',
          recipients: {
            create: recipientPhones.map(phone => ({ phone, status: 'QUEUED', variables: {} }))
          }
        }
      })

      // Process bulk in background
      processCustomBulk(jobId, msgType, msgBody, msgMediaUrl, msgCaption)
      
      return NextResponse.json({
        success: true,
        jobId,
        data: { id: jobId, total: recipientPhones.length, status: 'running' }
      }, { status: 202 })
    }

    return NextResponse.json({ success: false, error: 'action must be send, save, or bulk' }, { status: 400 })
  } catch (err: any) {
    console.error('POST /api/messages/custom error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 })
    await prisma.customTemplate.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

async function processCustomBulk(jobId: string, type: string, message?: string, mediaUrl?: string, caption?: string) {
  const job = await prisma.waBulkJob.findUnique({
    where: { id: jobId },
    include: { recipients: { orderBy: { id: 'asc' } } }
  })
  if (!job) return

  let sent = 0, failed = 0

  for (const r of job.recipients) {
    const current = await prisma.waBulkJob.findUnique({ where: { id: jobId }, select: { status: true } })
    if (current?.status === 'CANCELLED') return

    try {
      let result: any
      if (type !== 'text' && mediaUrl) {
        result = await sendMediaMessage(r.phone,  type as 'image' | 'video' | 'document' | 'audio', mediaUrl, caption || message)
      } else {
        result = await sendTextMessage(r.phone, message!)
      }
      
      if (!result.success) throw new Error(result.error)

      await prisma.waBulkRecipient.update({
        where: { id: r.id },
        data: { status: 'SENT', wamid: result.messageId, sentAt: new Date() }
      })
      
      await prisma.waMessage.create({
        data: {
          wamid: result.messageId,
          direction: 'OUTBOUND',
          status: 'SENT',
          to: r.phone,
          type: (type.toUpperCase() as any),
          body: message ?? caption ?? '',
          bulkJobId: jobId,
          sentAt: new Date()
        }
      })
      sent++
    } catch (err: any) {
      await prisma.waBulkRecipient.update({
        where: { id: r.id },
        data: { status: 'FAILED', errorMsg: err.message }
      })
      await prisma.waMessage.create({
        data: {
          direction: 'OUTBOUND',
          status: 'FAILED',
          to: r.phone,
          type: (type.toUpperCase() as any),
          body: message ?? caption ?? '',
          bulkJobId: jobId,
          errorMessage: err.message,
          failedAt: new Date()
        }
      })
      failed++
    }

    await prisma.waBulkJob.update({
      where: { id: jobId },
      data: { sent, failed }
    })
    await new Promise(r => setTimeout(r, RATE_MS))
  }

  await prisma.waBulkJob.update({
    where: { id: jobId },
    data: { status: 'COMPLETED', completedAt: new Date() }
  })
}