// app/api/templates/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'
import { createTemplateInMeta } from '../../lib/whatsapp-template-service'
import { v4 as uuid } from 'uuid'

// GET /api/templates
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status   = searchParams.get('status')
    const category = searchParams.get('category')
    const search   = searchParams.get('search')
    const page     = parseInt(searchParams.get('page')  ?? '1')
    const limit    = parseInt(searchParams.get('limit') ?? '50')
    const skip     = (page - 1) * limit

    const where: any = {}
    if (status)   where.status   = status.toUpperCase()
    if (category) where.category = category.toUpperCase()
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { body: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [templates, total] = await Promise.all([
      prisma.waTemplate.findMany({
        where, skip, take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          buttons: { orderBy: { index: 'asc' } },
          media:   true,
          _count:  { select: { messages: true, bulkJobs: true } },
        },
      }),
      prisma.waTemplate.count({ where }),
    ])

    const data = templates.map(tpl => ({
      id:             tpl.id,
      metaTemplateId: tpl.metaTemplateId,
      name:           tpl.name,
      category:       tpl.category.toLowerCase(),
      language:       tpl.language,
      body:           tpl.body,
      variables:      tpl.variables,
      status:         tpl.status.toLowerCase(),
      reason:         tpl.rejectionReason,
      headerFormat:   tpl.headerFormat?.toLowerCase() ?? null,
      headerText:     tpl.headerText,
      headerMediaUrl: tpl.headerMediaUrl,
      footer:         tpl.footer,
      parameterFormat: tpl.parameterFormat.toLowerCase(),
      components:     tpl.components,
      buttons: tpl.buttons.map(b => ({
        type:  b.type.toLowerCase(),
        text:  b.text,
        url:   b.url,
        phone: b.phone,
      })),
      media:      tpl.media,
      usageCount: { messages: tpl._count.messages, bulkJobs: tpl._count.bulkJobs },
      createdAt:  tpl.createdAt,
      updatedAt:  tpl.updatedAt,
    }))

    return NextResponse.json({ success: true, data, total, page, limit, pages: Math.ceil(total / limit) })

  } catch (err: any) {
    console.error('GET /api/templates error:', err)
    return NextResponse.json({ success: false, error: err.message || 'Failed to fetch templates' }, { status: 500 })
  }
}

// POST /api/templates — submit to Meta and save locally
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, category, language, body: tplBody,
      headerType, headerText, headerHandle, headerMediaUrl,
      footer, buttons, parameterFormat,
    } = body

    // ── Basic validation ───────────────────────────────────────────────
    if (!name || !category || !language || !tplBody) {
      return NextResponse.json(
        { success: false, error: 'name, category, language, and body are required' },
        { status: 400 }
      )
    }

    const validCategories = ['MARKETING', 'UTILITY', 'AUTHENTICATION']
    if (!validCategories.includes(category.toUpperCase())) {
      return NextResponse.json(
        { success: false, error: `category must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      )
    }

    // ── Duplicate check (FIXED) ────────────────────────────────────────
    // Only block if a locally-created (non-Meta-synced) PENDING/APPROVED 
    // template with the same name already exists.
    // Reason: Meta itself is the source of truth for template names.
    // If a meta-synced template exists, we allow re-submission 
    // (Meta will return its own error if truly duplicate on their side).
    const existing = await prisma.waTemplate.findFirst({
      where: {
        name: name.trim(),
        // Only block if it's a locally created template (id starts with tpl_)
        // or if it's pending (not yet approved by Meta)
        AND: [
          { id: { startsWith: 'tpl_' } },  // locally created
          { status: { in: ['PENDING', 'APPROVED'] } },
        ],
      },
    })

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: `A template named "${name}" already exists locally (status: ${existing.status.toLowerCase()}). Use a different name or delete the existing one first.`,
          existingId: existing.id,
          existingStatus: existing.status.toLowerCase(),
        },
        { status: 409 }
      )
    }

    // ── Submit to Meta ─────────────────────────────────────────────────
    const metaResult = await createTemplateInMeta(name, category, language, {
      headerType:      headerType ?? 'none',
      headerText,
      headerHandle,
      body:            tplBody,
      footer,
      buttons:         buttons ?? [],
      parameterFormat: parameterFormat ?? 'named',
    })

    if (!metaResult.success) {
      return NextResponse.json(
        { success: false, error: metaResult.error, metaError: metaResult.metaError },
        { status: 400 }
      )
    }

    // ── Extract variables ──────────────────────────────────────────────
    const variables: string[] = []
    const rx = /\{\{([^}]+)\}\}/g
    let m
    while ((m = rx.exec(tplBody)) !== null) {
      const p = `{{${m[1]}}}`
      if (!variables.includes(p)) variables.push(p)
    }

    // ── Build components array ─────────────────────────────────────────
    const components: any[] = []
    if (headerType && headerType !== 'none') {
      if (headerType === 'text' && headerText) {
        components.push({ type: 'HEADER', format: 'TEXT', text: headerText })
      } else if (['image', 'video', 'document'].includes(headerType)) {
        components.push({ type: 'HEADER', format: headerType.toUpperCase() })
      }
    }
    components.push({ type: 'BODY', text: tplBody })
    if (footer?.trim()) components.push({ type: 'FOOTER', text: footer })
    if (buttons?.length > 0) {
      components.push({
        type: 'BUTTONS',
        buttons: buttons.map((b: any) => {
          if (b.type === 'QUICK_REPLY')  return { type: 'QUICK_REPLY', text: b.text }
          if (b.type === 'URL')          return { type: 'URL', text: b.text, url: b.url }
          if (b.type === 'PHONE_NUMBER') return { type: 'PHONE_NUMBER', text: b.text, phone_number: b.phone }
          return b
        }),
      })
    }

    // ── Save to database ───────────────────────────────────────────────
    const id  = `tpl_${uuid()}`
    const now = new Date()

    const templateData: any = {
      id,
      metaTemplateId: metaResult.data?.id?.toString() ?? null,
      name:           name.trim(),
      category:       category.toUpperCase(),
      language,
      body:           tplBody,
      variables,
      status:         (metaResult.data?.status?.toUpperCase() ?? 'PENDING') as any,
      rejectionReason: metaResult.data?.rejected_reason ?? null,
      parameterFormat: (parameterFormat?.toUpperCase() ?? 'NAMED') as any,
      components:     metaResult.data?.components ?? components,
      footer:         footer ?? null,
      createdAt:      now,
      updatedAt:      now,
    }

    if (headerType && headerType !== 'none') {
      templateData.headerFormat = headerType.toUpperCase() as any
      if (headerText)     templateData.headerText    = headerText
      if (headerHandle)   templateData.headerMediaId  = headerHandle
      if (headerMediaUrl) templateData.headerMediaUrl = headerMediaUrl
    }

    await prisma.waTemplate.create({ data: templateData })

    // ── Create buttons ─────────────────────────────────────────────────
    if (buttons?.length > 0) {
      await prisma.waTemplateButton.createMany({
        data: buttons.map((btn: any, idx: number) => ({
          templateId: id,
          index:      idx,
          type:       btn.type.toUpperCase() as any,
          text:       btn.text,
          url:        btn.url   ?? null,
          phone:      btn.phone ?? null,
        })),
      })
    }

    // ── Create header media record ─────────────────────────────────────
    if (headerHandle && headerType && headerType !== 'none' && headerType !== 'text') {
      await prisma.waTemplateMedia.create({
        data: {
          templateId: id,
          mediaType:  headerType.toUpperCase() as any,
          mediaId:    headerHandle,
          url:        headerMediaUrl ?? null,
          isHeader:   true,
        },
      })
    }

    // ── Fetch complete template for response ───────────────────────────
    const complete = await prisma.waTemplate.findUnique({
      where: { id },
      include: { buttons: { orderBy: { index: 'asc' } }, media: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        id:             complete!.id,
        metaTemplateId: complete!.metaTemplateId,
        name:           complete!.name,
        category:       complete!.category.toLowerCase(),
        language:       complete!.language,
        body:           complete!.body,
        variables:      complete!.variables,
        status:         complete!.status.toLowerCase(),
        headerFormat:   complete!.headerFormat?.toLowerCase() ?? null,
        headerText:     complete!.headerText,
        footer:         complete!.footer,
        parameterFormat: complete!.parameterFormat.toLowerCase(),
        buttons: complete!.buttons.map(b => ({
          type: b.type.toLowerCase(), text: b.text, url: b.url, phone: b.phone,
        })),
        media:     complete!.media,
        createdAt: complete!.createdAt,
        updatedAt: complete!.updatedAt,
      },
      meta:    metaResult.data,
      message: 'Template submitted to Meta for review. Approval usually takes a few minutes to 24 hours.',
    }, { status: 201 })

  } catch (err: any) {
    console.error('POST /api/templates error:', err)
    return NextResponse.json(
      { success: false, error: err.message ?? 'Server error' },
      { status: 500 }
    )
  }
}

// PUT /api/templates — bulk action (archive / restore / delete)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { action, templateIds } = body

    if (!action || !Array.isArray(templateIds) || templateIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'action and templateIds[] are required' },
        { status: 400 }
      )
    }

    if (action === 'delete') {
      const result = await prisma.waTemplate.deleteMany({ where: { id: { in: templateIds } } })
      return NextResponse.json({ success: true, message: `${result.count} templates deleted`, deleted: result.count })
    }

    const statusMap: Record<string, string> = { archive: 'ARCHIVED', restore: 'APPROVED' }
    if (!statusMap[action]) {
      return NextResponse.json({ success: false, error: 'action must be archive, restore, or delete' }, { status: 400 })
    }

    const result = await prisma.waTemplate.updateMany({
      where: { id: { in: templateIds } },
      data:  { status: statusMap[action] as any, updatedAt: new Date() },
    })
    return NextResponse.json({ success: true, message: `${result.count} templates updated`, updated: result.count })

  } catch (err: any) {
    console.error('PUT /api/templates error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

// DELETE /api/templates?ids=x,y,z  or  ?all=true
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const ids       = searchParams.get('ids')?.split(',').filter(Boolean) ?? []
    const deleteAll = searchParams.get('all') === 'true'

    if (!deleteAll && ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ids (comma-separated) or all=true is required' },
        { status: 400 }
      )
    }

    const result = await prisma.waTemplate.deleteMany({
      where: deleteAll ? {} : { id: { in: ids } },
    })

    return NextResponse.json({ success: true, message: `${result.count} templates deleted`, deleted: result.count })

  } catch (err: any) {
    console.error('DELETE /api/templates error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}