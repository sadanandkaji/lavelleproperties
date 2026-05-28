// lib/media-upload-service.ts

export interface UploadResult {
  success: boolean
  handle?: string
  sessionId?: string
  error?: string
  details?: any
}

export function validateMediaFile(
  file: File,
  type: 'image' | 'video' | 'document'
): { valid: boolean; error?: string } {
  const rules = {
    image:    { types: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], maxMB: 5 },
    video:    { types: ['video/mp4'],                                           maxMB: 16 },
    document: { types: ['application/pdf'],                                     maxMB: 10 },
  }
  const rule = rules[type]
  if (!rule.types.includes(file.type)) {
    return { valid: false, error: `Invalid file type. Allowed: ${rule.types.join(', ')}` }
  }
  if (file.size > rule.maxMB * 1024 * 1024) {
    return { valid: false, error: `File too large. Max ${rule.maxMB}MB for ${type}` }
  }
  return { valid: true }
}

export async function uploadMediaToMeta(
  file: File,
  type: 'image' | 'video' | 'document'
): Promise<UploadResult> {
  // Validate first
  const validation = validateMediaFile(file, type)
  if (!validation.valid) {
    return { success: false, error: validation.error }
  }

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    const res  = await fetch('/api/upload-media', { method: 'POST', body: formData })
    const data = await res.json()

    if (!res.ok || !data.success) {
      return {
        success: false,
        error:   data.error || 'Upload failed',
        details: data.details,
      }
    }

    return {
      success:   true,
      handle:    data.handle,
      sessionId: data.sessionId,
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error' }
  }
}