// app/api/messages/bulk/route.ts
// Injects headerImageUrl (Cloudinary URL) into every recipient's variables

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'
import { sendTextMessage, sendTemplateMessage } from '../../../lib/whatsapp-service'
import { v4 as uuid } from 'uuid'

const RATE_MS = Math.round(1000 / parseInt(process.env.BULK_SEND_RATE_LIMIT_PER_SEC ?? '10'))

// ── helpers ────────────────────────────────────────────────────────────────

function renderTemplate(body: string, vars: Record<string, string>): string {
  return body.replace(/\{\{([^}]+)\}\}/g, (_, key) => vars[key] ?? `{{${key}}}`)
}

function parsePhoneList(raw: string): string[] {
  return raw.split(/[\n,;]+/).map(s => s.trim().replace(/\s/g, '')).filter(s => s.length >= 7)
}

function parseCSV(csv: string): Array<{ phone: string; variables: Record<string, string>; name?: string }> {
  const lines = csv.trim().split('\n').filter(Boolean)
  if (lines.length < 2) return []

  const headers  = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''))
  const phoneCol = headers.findIndex(h => ['phone', 'mobile', 'number', 'to'].includes(h))
  if (phoneCol === -1) return []

  return lines.slice(1).map(line => {
    const cols: string[] = []
    let cur = '', inQ = false
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ }
      else if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = '' }
      else { cur += ch }
    }
    cols.push(cur.trim())

    const phone = cols[phoneCol]?.replace(/\s/g, '') ?? ''
    const variables: Record<string, string> = {}
    let name = ''

    headers.forEach((h, i) => {
      if (i === phoneCol) return
      const val = cols[i] ?? ''
      if (h === 'name') name = val
      variables[String(i)] = val
      variables[h] = val
    })

    return { phone, variables, name }
  }).filter(r => r.phone.length >= 7)
}

// ── Get Cloudinary URL from template's stored media ────────────────────────
// This is the KEY function — returns the Cloudinary URL, not Meta's handle
async function getTemplateCloudinaryUrl(templateId: string): Promise<string | null> {
  try {
    const template = await prisma.waTemplate.findUnique({
      where: { id: templateId },
      include: {
        media: {
          where: { isHeader: true },
          take: 1
        }
      }
    })

    if (!template) return null

    // Priority 1: header media url from media table (Cloudinary)
    if (template.media?.[0]?.url) {
      return template.media[0].url
    }

    // Priority 2: headerMediaUrl field directly on template
    if (template.headerMediaUrl) {
      return template.headerMediaUrl
    }

    return null
  } catch (err) {
    console.error('Error fetching template Cloudinary URL:', err)
    return null
  }
}

// ── GET /api/messages/bulk ─────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const where: any = {}
    if (status) where.status = status.toUpperCase()

    const jobs = await prisma.waBulkJob.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        template: {
          select: { id: true, name: true }
        },
        _count: {
          select: { recipients: true }
        }
      }
    })

    const formatted = jobs.map(job => ({
      id:            job.id,
      label:         job.label,
      type:          job.type.toLowerCase(),
      templateId:    job.templateId,
      templateName:  job.template?.name,
      status:        job.status.toLowerCase(),
      total:         job.total,
      sent:          job.sent,
      failed:        job.failed,
      recipientCount: job._count.recipients,
      createdAt:     job.createdAt,
      completedAt:   job.completedAt,
    }))

    return NextResponse.json({ success: true, data: formatted, total: formatted.length })
  } catch (err: any) {
    console.error('GET /api/messages/bulk error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

// ── POST /api/messages/bulk ────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, label, headerImageUrl } = body
    // headerImageUrl: optional Cloudinary URL passed from the UI to override stored URL

    if (!type || !['simple', 'template'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'type must be "simple" or "template"' },
        { status: 400 }
      )
    }

    // ── Parse recipients ────────────────────────────────────────────────
    let recipients: Array<{ phone: string; variables?: Record<string, string>; name?: string }> = []

    if (body.csv) {
      recipients = parseCSV(body.csv)
    } else if (body.phones) {
      recipients = parsePhoneList(body.phones).map(phone => ({ phone, variables: {} }))
    } else if (Array.isArray(body.recipients)) {
      recipients = body.recipients
    }

    if (recipients.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid recipients. Provide phones, csv, or recipients[]' },
        { status: 400 }
      )
    }

    // ── Validate simple ─────────────────────────────────────────────────
    if (type === 'simple' && !body.message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'message is required for type "simple"' },
        { status: 400 }
      )
    }

    // ── Validate template ───────────────────────────────────────────────
    let template: any = null
    if (type === 'template') {
      if (!body.templateId) {
        return NextResponse.json({ success: false, error: 'templateId is required' }, { status: 400 })
      }

      template = await prisma.waTemplate.findUnique({
        where: { id: body.templateId },
        include: {
          media: { where: { isHeader: true }, take: 1 }
        }
      })

      if (!template) {
        return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 })
      }
      if (template.status !== 'APPROVED') {
        return NextResponse.json({ success: false, error: 'Template is not approved' }, { status: 400 })
      }
    }

    // ── Resolve Cloudinary URL for IMAGE header templates ───────────────
    let resolvedImageUrl: string | null = null

    if (type === 'template' && template) {
      // 1. Use URL passed explicitly from UI (user override)
      if (headerImageUrl) {
        resolvedImageUrl = headerImageUrl
        console.log('📸 Using override image URL:', resolvedImageUrl)
      }
      // 2. Fall back to stored Cloudinary URL from template media
      else if (template.media?.[0]?.url) {
        resolvedImageUrl = template.media[0].url
        console.log('📸 Using stored Cloudinary URL:', resolvedImageUrl)
      }
      // 3. Fall back to headerMediaUrl field
      else if (template.headerMediaUrl) {
        resolvedImageUrl = template.headerMediaUrl
        console.log('📸 Using headerMediaUrl:', resolvedImageUrl)
      }
    }

    // ── Create bulk job in DB ───────────────────────────────────────────
    const jobId = uuid()
    const now   = new Date()

    const job = await prisma.waBulkJob.create({
      data: {
        id:         jobId,
        label:      label?.trim() || (type === 'template' ? `Template: ${template?.name}` : 'Simple bulk'),
        type:       type.toUpperCase() as any,
        templateId: template?.id ?? null,
        message:    body.message ?? null,
        total:      recipients.length,
        sent:       0,
        failed:     0,
        status:     'RUNNING',
        createdAt:  now,
        updatedAt:  now,

        // Create all recipient rows
        recipients: {
          create: recipients.map(r => ({
            phone:     r.phone,
            name:      r.name || null,
            variables: r.variables || {},
            status:    'QUEUED',
          }))
        }
      }
    })

    // ── Fire background job ─────────────────────────────────────────────
    processBulkJob(jobId, resolvedImageUrl)

    return NextResponse.json({
      success: true,
      jobId,
      data: {
        id:     jobId,
        label:  job.label,
        total:  recipients.length,
        status: 'running',
        imageUrl: resolvedImageUrl,
      },
    }, { status: 202 })

  } catch (err: any) {
    console.error('POST /api/messages/bulk error:', err)
    return NextResponse.json(
      { success: false, error: err.message ?? 'Invalid request' },
      { status: 400 }
    )
  }
}

// ── Background processor ───────────────────────────────────────────────────

async function processBulkJob(jobId: string, resolvedImageUrl: string | null) {
  // Fetch job with all recipients and template
  const job = await prisma.waBulkJob.findUnique({
    where: { id: jobId },
    include: {
      recipients: {
        orderBy: { id: 'asc' }
      },
      template: {
        include: {
          media: { where: { isHeader: true }, take: 1 }
        }
      }
    }
  })

  if (!job) return

  const tpl = job.template

  // If we still don't have an image URL, try to get it from DB
  if (!resolvedImageUrl && tpl?.media?.[0]?.url) {
    resolvedImageUrl = tpl.media[0].url
  }

  let sentCount   = 0
  let failedCount = 0
  const errors: { phone: string; reason: string }[] = []

  for (const recipient of job.recipients) {
    // Check cancellation
    const current = await prisma.waBulkJob.findUnique({
      where: { id: jobId },
      select: { status: true }
    })
    if (current?.status === 'CANCELLED') {
      console.log(`⏹ Job ${jobId} cancelled`)
      return
    }

    const { phone, variables } = recipient
    const vars = (variables as Record<string, string>) || {}

    try {
      let result

      if (job.type === 'SIMPLE') {
        result = await sendTextMessage(phone, job.message!)

      } else {
        if (!tpl) throw new Error('Template missing')

        // ✅ KEY: Inject the Cloudinary URL into _header_url
        // This is used by sendTemplateMessage to build the header component
        const sendVars: Record<string, string> = { ...vars }
        
        if (resolvedImageUrl) {
          sendVars['_header_url'] = resolvedImageUrl
          console.log(`📸 Injecting Cloudinary URL for ${phone}: ${resolvedImageUrl}`)
        }

        console.log(`📤 Sending template "${tpl.name}" to ${phone}`)
        
        result = await sendTemplateMessage(
          phone,
          tpl.name,
          tpl.language,
          sendVars,
          tpl.body,
          tpl.components as any[]
        )
      }

      if (!result.success) throw new Error(result.error || 'Send failed')

      // Update recipient status in DB
      await prisma.waBulkRecipient.update({
        where: { id: recipient.id },
        data: {
          status: 'SENT',
          wamid:  result.messageId,
          sentAt: new Date()
        }
      })

      // Create message record
      await prisma.waMessage.create({
        data: {
          wamid:        result.messageId,
          direction:    'OUTBOUND',
          status:       'SENT',
          to:           phone,
          type:         job.type === 'SIMPLE' ? 'TEXT' : 'TEMPLATE',
          body:         job.type === 'SIMPLE'
                          ? job.message!
                          : renderTemplate(tpl!.body, vars),
          templateId:   tpl?.id ?? null,
          variablesUsed: vars,
          bulkJobId:    jobId,
          sentAt:       new Date(),
        }
      })

      sentCount++
      console.log(`✅ Sent to ${phone} — ID: ${result.messageId}`)

    } catch (err: any) {
      console.error(`❌ Failed ${phone}:`, err.message)

      // Update recipient as failed
      await prisma.waBulkRecipient.update({
        where: { id: recipient.id },
        data: {
          status:   'FAILED',
          errorMsg: err.message
        }
      })

      // Create failed message record
      await prisma.waMessage.create({
        data: {
          direction:    'OUTBOUND',
          status:       'FAILED',
          to:           phone,
          type:         job.type === 'SIMPLE' ? 'TEXT' : 'TEMPLATE',
          body:         '',
          templateId:   tpl?.id ?? null,
          bulkJobId:    jobId,
          errorMessage: err.message,
          failedAt:     new Date(),
        }
      })

      failedCount++
      errors.push({ phone, reason: err.message })
    }

    // Update job counters in DB
    await prisma.waBulkJob.update({
      where: { id: jobId },
      data: {
        sent:   sentCount,
        failed: failedCount,
        updatedAt: new Date()
      }
    })

    // Rate limit delay
    await new Promise(r => setTimeout(r, RATE_MS))
  }

  // Mark job as completed
  await prisma.waBulkJob.update({
    where: { id: jobId },
    data: {
      status:      'COMPLETED',
      completedAt: new Date(),
      updatedAt:   new Date()
    }
  })

  console.log(`🎉 Job ${jobId} done: ${sentCount} sent, ${failedCount} failed`)
}