// app/api/webhooks/whatsapp/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { templates } from '../../../lib/store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ success: false })
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {

        if (change.field !== 'message_template_status_update') {
          continue
        }

        const value = change.value

        const metaId = String(value.message_template_id)

        // Find template
        const template = Array.from(templates.values()).find(
          t => t.id === `meta_${metaId}`
        )

        if (!template) continue

        // UPDATE STATUS
        template.status = value.event.toLowerCase()

        template.updatedAt = new Date().toISOString()

        // Store rejection reason if exists
        if (value.reason) {
          template.reason = value.reason
        }

        // Store rejection info
        if (value.rejection_info) {
          template.rejectionInfo = value.rejection_info
        }

        templates.set(template.id, template)
      }
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (
    mode === 'subscribe' &&
    token === process.env.WEBHOOK_VERIFY_TOKEN
  ) {
    return new Response(challenge, { status: 200 })
  }

  return new Response('Forbidden', { status: 403 })
}