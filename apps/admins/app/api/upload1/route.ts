// app/api/upload1/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '../../lib/cloudinary-service'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    // Validate type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'application/pdf']
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: `File type "${file.type}" not supported. Use JPG, PNG, MP4, or PDF.` },
        { status: 400 }
      )
    }

    // Size limits
    const maxBytes: Record<string, number> = {
      'image/jpeg': 5 * 1024 * 1024,
      'image/png': 5 * 1024 * 1024,
      'image/webp': 5 * 1024 * 1024,
      'image/gif': 5 * 1024 * 1024,
      'video/mp4': 16 * 1024 * 1024,
      'application/pdf': 10 * 1024 * 1024,
    }
    
    const maxSize = maxBytes[file.type] || 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `File too large. Max size: ${maxSize / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await uploadToCloudinary(buffer, file.name, file.type, 'wa_templates')

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    })

  } catch (err: any) {
    console.error('Upload error:', err)
    return NextResponse.json(
      { success: false, error: err.message ?? 'Upload failed' },
      { status: 500 }
    )
  }
}