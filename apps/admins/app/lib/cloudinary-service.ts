// lib/cloudinary-service.ts
import crypto from 'crypto'

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!
const API_KEY = process.env.CLOUDINARY_API_KEY!
const API_SECRET = process.env.CLOUDINARY_API_SECRET!

export interface CloudinaryResult {
  success: boolean
  url?: string
  secureUrl?: string
  publicId?: string
  format?: string
  width?: number
  height?: number
  bytes?: number
  resourceType?: string
  error?: string
}

/**
 * Generate Cloudinary signature using Node.js crypto
 * Format: SHA-1 of (paramsToSign + API_SECRET)
 */
function generateSignature(paramsToSign: string): string {
  const hash = crypto.createHash('sha1')
  hash.update(paramsToSign + API_SECRET)
  return hash.digest('hex')
}

/**
 * Upload a file buffer to Cloudinary.
 * Returns the secure URL to store in your DB and pass to WhatsApp API.
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  filename: string,
  mimeType: string,
  folder = 'wa_templates'
): Promise<CloudinaryResult> {
  try {
    // Check if Cloudinary is configured
    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
      return {
        success: false,
        error: 'Cloudinary not configured. Please check environment variables.'
      }
    }

    // Determine resource type
    let resourceType: 'image' | 'video' | 'raw' = 'image'
    if (mimeType.startsWith('video/')) resourceType = 'video'
    else if (mimeType === 'application/pdf') resourceType = 'raw'

    console.log('📤 Uploading to Cloudinary:', { filename, mimeType, resourceType, folder })

    // Convert buffer to base64 data URI
    const base64 = fileBuffer.toString('base64')
    const dataUri = `data:${mimeType};base64,${base64}`

    // Generate timestamp and signature
    const timestamp = Math.round(Date.now() / 1000)
    const cleanName = filename
      .replace(/\.[^/.]+$/, '') // Remove extension
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase()
      .slice(0, 30)
    
    const publicId = `${cleanName}_${timestamp}`

    // Parameters to sign (must be in alphabetical order)
    const paramsToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`
    const signature = generateSignature(paramsToSign)

    console.log('🔐 Signature params:', paramsToSign)

    // Build multipart form
    const formData = new FormData()
    formData.append('file', dataUri)
    formData.append('api_key', API_KEY)
    formData.append('timestamp', String(timestamp))
    formData.append('signature', signature)
    formData.append('folder', folder)
    formData.append('public_id', publicId)
    formData.append('resource_type', resourceType)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      { method: 'POST', body: formData }
    )

    const data = await response.json()

    if (!response.ok || data.error) {
      console.error('Cloudinary error:', data.error)
      return {
        success: false,
        error: data.error?.message || `Cloudinary error: ${response.status}`
      }
    }

    console.log('✅ Cloudinary upload success:', data.public_id)

    return {
      success: true,
      url: data.secure_url,
      secureUrl: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
      bytes: data.bytes,
      resourceType: data.resource_type,
    }

  } catch (err: any) {
    console.error('Cloudinary upload error:', err)
    return {
      success: false,
      error: err.message || 'Failed to upload to Cloudinary'
    }
  }
}

/**
 * Delete an asset from Cloudinary by publicId.
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<{ success: boolean; error?: string }> {
  try {
    const timestamp = Math.round(Date.now() / 1000)
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`
    const signature = generateSignature(paramsToSign)

    const formData = new FormData()
    formData.append('public_id', publicId)
    formData.append('api_key', API_KEY)
    formData.append('timestamp', String(timestamp))
    formData.append('signature', signature)
    formData.append('resource_type', resourceType)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/destroy`,
      { method: 'POST', body: formData }
    )

    const data = await response.json()

    if (data.result === 'ok') {
      return { success: true }
    }
    
    return {
      success: false,
      error: data.result || 'Delete failed'
    }
  } catch (err: any) {
    console.error('Cloudinary delete error:', err)
    return {
      success: false,
      error: err.message
    }
  }
}