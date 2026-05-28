// app/api/upload-media/route.ts
// Uses Meta Resumable Upload API — required for template header media
import { NextRequest, NextResponse } from 'next/server'

const API_VERSION = process.env.WHATSAPP_API_VERSION || 'v21.0'
const APP_ID      = process.env.META_APP_ID!          // Your Meta App ID (not WABA ID)
const TOKEN       = process.env.WHATSAPP_ACCESS_TOKEN!
const BASE        = `https://graph.facebook.com/${API_VERSION}`

export async function POST(req: NextRequest) {
  try {
    if (!APP_ID || !TOKEN) {
      return NextResponse.json(
        { success: false, error: 'META_APP_ID and WHATSAPP_ACCESS_TOKEN must be set in .env.local' },
        { status: 500 }
      )
    }

    const formData = await req.formData()
    const file     = formData.get('file') as File
    const fileType = formData.get('type') as string // 'image' | 'video' | 'document'

    if (!file || !fileType) {
      return NextResponse.json(
        { success: false, error: 'file and type are required' },
        { status: 400 }
      )
    }

    // ── Map type to MIME ──────────────────────────────────────────────────────
    const mimeMap: Record<string, string> = {
      image:    file.type || 'image/jpeg',
      video:    file.type || 'video/mp4',
      document: file.type || 'application/pdf',
    }
    const mimeType = mimeMap[fileType] ?? file.type

    console.log(`📤 Starting resumable upload: ${file.name} (${mimeType}, ${file.size} bytes)`)

    // ── STEP 1: Start upload session ──────────────────────────────────────────
    // POST /app_id/uploads
    const startRes = await fetch(`${BASE}/${APP_ID}/uploads`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file_length: file.size,
        file_type:   mimeType,
      }),
    })

    const startData = await startRes.json()
    console.log('Step 1 response:', JSON.stringify(startData))

    if (!startRes.ok || !startData.id) {
      return NextResponse.json(
        {
          success: false,
          error:   startData.error?.message ?? 'Failed to start upload session',
          details: startData.error,
        },
        { status: startRes.status }
      )
    }

    const uploadSessionId = startData.id // e.g. "upload:MTc..."
    console.log('✅ Upload session created:', uploadSessionId)

    // ── STEP 2: Upload the file bytes ─────────────────────────────────────────
    // POST /upload_session_id  with raw bytes
    const fileBuffer = await file.arrayBuffer()

    const uploadRes = await fetch(`${BASE}/${uploadSessionId}`, {
      method: 'POST',
      headers: {
        Authorization:   `OAuth ${TOKEN}`,   // NOTE: OAuth not Bearer for upload step
        'Content-Type':  mimeType,
        file_offset:     '0',
      },
      body: fileBuffer,
    })

    const uploadData = await uploadRes.json()
    console.log('Step 2 response:', JSON.stringify(uploadData))

    if (!uploadRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error:   uploadData.error?.message ?? 'File upload failed',
          details: uploadData.error,
        },
        { status: uploadRes.status }
      )
    }

    // The handle is in uploadData.h — this is what you pass to the template
    const handle = uploadData.h
    if (!handle) {
      return NextResponse.json(
        {
          success: false,
          error:   'Upload succeeded but no handle returned. Check response.',
          details: uploadData,
        },
        { status: 500 }
      )
    }

    console.log('✅ Upload complete. Handle:', handle)

    return NextResponse.json({
      success: true,
      handle,                    // Pass this as header_handle in template creation
      sessionId: uploadSessionId,
    })

  } catch (err: any) {
    console.error('Upload error:', err)
    return NextResponse.json(
      { success: false, error: err.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}