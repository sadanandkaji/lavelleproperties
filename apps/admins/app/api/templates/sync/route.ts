// app/api/templates/sync/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@repo/db'
import { syncApprovedFromMeta } from '../../../lib/whatsapp-template-service'

// ── helpers ────────────────────────────────────────────────────────────────

function extractBody(components: any[]): string {
  return components?.find((c: any) => c.type === 'BODY')?.text ?? ''
}

function extractHeader(components: any[]): { format: string; text?: string } | null {
  const h = components?.find((c: any) => c.type === 'HEADER')
  if (!h) return null
  return { format: (h.format ?? 'TEXT').toUpperCase(), text: h.text }
}

function extractFooter(components: any[]): string | null {
  return components?.find((c: any) => c.type === 'FOOTER')?.text ?? null
}

function extractButtons(components: any[]): any[] {
  const bc = components?.find((c: any) => c.type === 'BUTTONS')
  if (!bc?.buttons) return []
  return bc.buttons.map((btn: any, idx: number) => ({
    index: idx,
    type:  (btn.type ?? 'QUICK_REPLY').toUpperCase(),
    text:  btn.text ?? '',
    url:   btn.url ?? null,
    phone: btn.phone_number ?? btn.phone ?? null,
  }))
}

function extractVariables(text: string): string[] {
  const vars: string[] = []
  const rx = /\{\{([^}]+)\}\}/g; let m
  while ((m = rx.exec(text)) !== null) {
    const p = `{{${m[1]}}}`
    if (!vars.includes(p)) vars.push(p)
  }
  return vars
}

function paramFormat(text: string): 'NAMED' | 'POSITIONAL' {
  return /\{\{\d+\}\}/.test(text) ? 'POSITIONAL' : 'NAMED'
}

async function upsertTemplate(mt: any): Promise<'created' | 'updated' | 'failed'> {
  try {
    const body     = extractBody(mt.components ?? [])
    const vars     = extractVariables(body)
    const header   = extractHeader(mt.components ?? [])
    const footer   = extractFooter(mt.components ?? [])
    const buttons  = extractButtons(mt.components ?? [])
    const fmt      = paramFormat(body)
    const now      = new Date()

    const coreData: any = {
      name:           mt.name,
      category:       (mt.category ?? 'UTILITY').toUpperCase(),
      language:       mt.language ?? 'en',
      body,
      variables:      vars,
      status:         'APPROVED',
      parameterFormat: fmt,
      components:     mt.components ?? [],
      updatedAt:      now,
    }
    if (footer)           coreData.footer           = footer
    if (mt.id)            coreData.metaTemplateId   = String(mt.id)
    if (mt.rejected_reason) coreData.rejectionReason = mt.rejected_reason
    if (header) {
      coreData.headerFormat = header.format
      if (header.text) coreData.headerText = header.text
    }

    const existing = await prisma.waTemplate.findFirst({
      where: { OR: [{ metaTemplateId: String(mt.id) }, { name: mt.name }] },
    })

    if (existing) {
      await prisma.waTemplate.update({ where: { id: existing.id }, data: coreData })
      await prisma.waTemplateButton.deleteMany({ where: { templateId: existing.id } })
      if (buttons.length > 0) {
        await prisma.waTemplateButton.createMany({
          data: buttons.map(b => ({ ...b, templateId: existing.id })),
        })
      }
      return 'updated'
    } else {
      const newId = `meta_${mt.id ?? Date.now()}`
      await prisma.waTemplate.create({
        data: {
          ...coreData,
          id: newId,
          createdAt: now,
          buttons: buttons.length > 0 ? { create: buttons } : undefined,
        },
      })
      return 'created'
    }
  } catch (err: any) {
    console.error(`Failed to upsert template "${mt.name}":`, err.message)
    return 'failed'
  }
}

// ── GET /api/templates/sync ────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const result = await syncApprovedFromMeta()

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error, metaError: result.metaError },
        { status: 500 }
      )
    }

    const metaTemplates = result.data ?? []
    let created = 0, updated = 0, failed = 0

    for (const mt of metaTemplates) {
      const outcome = await upsertTemplate(mt)
      if (outcome === 'created') created++
      else if (outcome === 'updated') updated++
      else failed++
    }

    const totalInDb    = await prisma.waTemplate.count()
    const approvedInDb = await prisma.waTemplate.count({ where: { status: 'APPROVED' } })

    return NextResponse.json({
      success: true,
      message: `Synced ${metaTemplates.length} templates (${created} new, ${updated} updated${failed ? `, ${failed} failed` : ''})`,
      data: {
        total:            metaTemplates.length,
        created,
        updated,
        failed,
        totalInDatabase:   totalInDb,
        approvedInDatabase: approvedInDb,
      },
    })
  } catch (err: any) {
    console.error('GET /api/templates/sync error:', err)
    return NextResponse.json({ success: false, error: err.message ?? 'Sync failed' }, { status: 500 })
  }
}

// ── POST /api/templates/sync — force re-sync (clear meta_ rows + re-pull) ──

export async function POST(_req: NextRequest) {
  try {
    // Parse body safely — body may be empty
    // (this was the cause of "Unexpected end of JSON input")
    let body: any = {}
    try {
      const text = await _req.text()
      if (text.trim()) body = JSON.parse(text)
    } catch {
      // ignore — treat as empty body
    }

    const clearFirst = body.clearFirst !== false  // default true

    if (clearFirst) {
      await prisma.waTemplate.deleteMany({ where: { id: { startsWith: 'meta_' } } })
    }

    const result = await syncApprovedFromMeta()
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error, metaError: result.metaError },
        { status: 500 }
      )
    }

    const metaTemplates = result.data ?? []
    let created = 0, updated = 0, failed = 0

    for (const mt of metaTemplates) {
      const outcome = await upsertTemplate(mt)
      if (outcome === 'created') created++
      else if (outcome === 'updated') updated++
      else failed++
    }

    return NextResponse.json({
      success: true,
      message: `Re-synced ${metaTemplates.length} approved templates from Meta`,
      data: { total: metaTemplates.length, created, updated, failed },
    })
  } catch (err: any) {
    console.error('POST /api/templates/sync error:', err)
    return NextResponse.json({ success: false, error: err.message ?? 'Sync failed' }, { status: 500 })
  }
}