// lib/whatsapp-service.ts
import axios from 'axios'

const API_VERSION   = process.env.WHATSAPP_API_VERSION || 'v19.0'
const BASE_URL      = `https://graph.facebook.com/${API_VERSION}`
const PHONE_ID      = process.env.WHATSAPP_PHONE_NUMBER_ID!
const ACCESS_TOKEN  = process.env.WHATSAPP_ACCESS_TOKEN!

export interface SendResult {
  success:    boolean
  messageId?: string
  error?:     string
  errorCode?: number
}

// ── Format phone number ────────────────────────────────────────────────────
function fmt(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  // Already has country code (starts with 91 and length >= 12)
  if (cleaned.length >= 12) return cleaned
  // 10-digit Indian number → prepend 91
  if (cleaned.length === 10) return `91${cleaned}`
  return cleaned
}

// ── Shared axios call ──────────────────────────────────────────────────────
async function post(payload: object): Promise<SendResult> {
  try {
    const res = await axios.post(
      `${BASE_URL}/${PHONE_ID}/messages`,
      payload,
      {
        headers: {
          Authorization:  `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return { success: true, messageId: res.data.messages?.[0]?.id }
  } catch (err: any) {
    const apiErr = err.response?.data?.error
    console.error('WhatsApp API error:', apiErr || err.message)
    return {
      success:   false,
      error:     apiErr?.message || err.message,
      errorCode: apiErr?.code,
    }
  }
}

// ── 1. TEXT ────────────────────────────────────────────────────────────────
export async function sendTextMessage(
  to: string,
  body: string,
  previewUrl = true
): Promise<SendResult> {
  return post({
    messaging_product: 'whatsapp',
    to: fmt(to),
    type: 'text',
    text: { body: body.substring(0, 4096), preview_url: previewUrl },
  })
}

// ── 2. IMAGE ───────────────────────────────────────────────────────────────
export async function sendImageMessage(
  to: string,
  imageUrl: string,
  caption?: string
): Promise<SendResult> {
  return post({
    messaging_product: 'whatsapp',
    to: fmt(to),
    type: 'image',
    image: { link: imageUrl, ...(caption ? { caption: caption.substring(0, 200) } : {}) },
  })
}

// ── 3. VIDEO ───────────────────────────────────────────────────────────────
export async function sendVideoMessage(
  to: string,
  videoUrl: string,
  caption?: string
): Promise<SendResult> {
  return post({
    messaging_product: 'whatsapp',
    to: fmt(to),
    type: 'video',
    video: { link: videoUrl, ...(caption ? { caption: caption.substring(0, 200) } : {}) },
  })
}

// ── 4. DOCUMENT ────────────────────────────────────────────────────────────
export async function sendDocumentMessage(
  to: string,
  documentUrl: string,
  filename = 'document.pdf',
  caption?: string
): Promise<SendResult> {
  return post({
    messaging_product: 'whatsapp',
    to: fmt(to),
    type: 'document',
    document: {
      link: documentUrl,
      filename,
      ...(caption ? { caption: caption.substring(0, 200) } : {}),
    },
  })
}

// ── 5. GENERIC MEDIA (image | video | document | audio) ───────────────────
// Used by custom/route.ts for media sends
export async function sendMediaMessage(
  to: string,
  type: 'image' | 'video' | 'document' | 'audio',
  url: string,
  caption?: string,
  filename?: string
): Promise<SendResult> {
  const mediaObj: any = { link: url }
  if (caption && type !== 'audio') mediaObj.caption = caption.substring(0, 200)
  if (filename && type === 'document') mediaObj.filename = filename

  return post({
    messaging_product: 'whatsapp',
    to: fmt(to),
    type,
    [type]: mediaObj,
  })
}

// ── 6. INTERACTIVE REPLY BUTTONS (up to 3) ────────────────────────────────
export async function sendInteractiveButtonsMessage(
  to: string,
  bodyText: string,
  buttons: Array<{ title: string }>,
  footerText?: string,
  headerText?: string,
  headerImageUrl?: string
): Promise<SendResult> {
  const interactive: any = {
    type: 'button',
    body:   { text: bodyText.substring(0, 1024) },
    action: {
      buttons: buttons.slice(0, 3).map((btn, i) => ({
        type:  'reply',
        reply: { id: `btn_${i + 1}`, title: btn.title.substring(0, 20) },
      })),
    },
  }

  if (footerText) interactive.footer = { text: footerText.substring(0, 60) }

  if (headerImageUrl) {
    interactive.header = { type: 'image', image: { link: headerImageUrl } }
  } else if (headerText) {
    interactive.header = { type: 'text', text: headerText.substring(0, 60) }
  }

  return post({
    messaging_product: 'whatsapp',
    to: fmt(to),
    type: 'interactive',
    interactive,
  })
}

// ── 7. INTERACTIVE LIST (quick replies — up to 10 rows) ───────────────────
export async function sendQuickRepliesList(
  to: string,
  bodyText: string,
  options: Array<{ id: string; title: string; description?: string }>,
  footerText?: string,
  buttonLabel = 'Select Option'
): Promise<SendResult> {
  const interactive: any = {
    type: 'list',
    body: { text: bodyText.substring(0, 1024) },
    action: {
      button: buttonLabel.substring(0, 20),
      sections: [
        {
          title: 'Options',
          rows: options.slice(0, 10).map(opt => ({
            id:    opt.id.substring(0, 200),
            title: opt.title.substring(0, 24),
            ...(opt.description ? { description: opt.description.substring(0, 72) } : {}),
          })),
        },
      ],
    },
  }

  if (footerText) interactive.footer = { text: footerText.substring(0, 60) }

  return post({
    messaging_product: 'whatsapp',
    to: fmt(to),
    type: 'interactive',
    interactive,
  })
}

// Alias for backwards compatibility
export const sendQuickRepliesMessage = sendQuickRepliesList

// ── 8. TEMPLATE MESSAGE ────────────────────────────────────────────────────
// Detects named vs positional vars, handles IMAGE/VIDEO/DOCUMENT headers

function detectFormat(body: string): 'positional' | 'named' | 'none' {
  if (/\{\{\d+\}\}/.test(body))             return 'positional'
  if (/\{\{[a-zA-Z_][^}]*\}\}/.test(body)) return 'named'
  return 'none'
}

function getHeaderInfo(components: any[]): {
  format: string
  exampleHandle?: string
  exampleUrl?: string
} | null {
  if (!Array.isArray(components)) return null
  const h = components.find(c => c.type === 'HEADER')
  if (!h) return null
  return {
    format:        h.format,
    exampleHandle: h.example?.header_handle?.[0],
    exampleUrl:    h.example?.header_url?.[0],
  }
}

function buildBodyParams(body: string, variables: Record<string, string>): any[] {
  const format = detectFormat(body)
  if (format === 'none') return []

  if (format === 'positional') {
    return Object.entries(variables)
      .filter(([k]) => /^\d+$/.test(k))
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([, v]) => ({ type: 'text', text: v || ' ' }))
  }

  // named
  return Object.entries(variables)
    .filter(([k]) => !/^\d+$/.test(k) && !k.startsWith('_'))
    .map(([k, v]) => ({ type: 'text', parameter_name: k, text: v || ' ' }))
}

export async function sendTemplateMessage(
  to:                 string,
  templateName:       string,
  languageCode:       string,
  variables:          Record<string, string> = {},
  templateBody?:      string,
  templateComponents?: any[]
): Promise<SendResult> {
  const components: any[] = []

  // ── Header ──────────────────────────────────────────────────────────────
  const headerInfo = templateComponents ? getHeaderInfo(templateComponents) : null

  if (headerInfo && headerInfo.format !== 'TEXT') {
    const mediaType = headerInfo.format.toLowerCase() as 'image' | 'video' | 'document'

    // Priority: caller-supplied URL > caller-supplied ID > example URL > example handle
    const mediaLink = variables['_header_url'] || headerInfo.exampleUrl || null
    const mediaId   = variables['_header_id']  || null

    if (mediaLink) {
      components.push({
        type: 'header',
        parameters: [{ type: mediaType, [mediaType]: { link: mediaLink } }],
      })
    } else if (mediaId) {
      components.push({
        type: 'header',
        parameters: [{ type: mediaType, [mediaType]: { id: mediaId } }],
      })
    } else if (headerInfo.exampleHandle) {
      // Use the handle stored from template creation
      components.push({
        type: 'header',
        parameters: [{ type: mediaType, [mediaType]: { id: headerInfo.exampleHandle } }],
      })
    } else {
      // No media provided at all — return an error
      return {
        success: false,
        error: `Template "${templateName}" has a ${headerInfo.format} header but no media URL or ID was provided. Pass _header_url in variables.`,
      }
    }
  }

  // ── Body ─────────────────────────────────────────────────────────────────
  const bodyParams = templateBody ? buildBodyParams(templateBody, variables) : []
  if (bodyParams.length > 0) {
    components.push({ type: 'body', parameters: bodyParams })
  }

  // ── Buttons (dynamic URL suffix only) ────────────────────────────────────
  if (templateComponents) {
    const btnComp = templateComponents.find(c => c.type === 'BUTTONS')
    if (btnComp?.buttons) {
      btnComp.buttons.forEach((btn: any, idx: number) => {
        if (btn.type === 'URL' && btn.url?.includes('{{')) {
          const urlSuffix = variables[`_btn_url_${idx}`] || variables['_btn_url'] || ''
          if (urlSuffix) {
            components.push({
              type: 'button', sub_type: 'url', index: String(idx),
              parameters: [{ type: 'text', text: urlSuffix }],
            })
          }
        }
      })
    }
  }

  const payload: any = {
    messaging_product: 'whatsapp',
    to: fmt(to),
    type: 'template',
    template: {
      name:     templateName,
      language: { code: languageCode },
      ...(components.length > 0 && { components }),
    },
  }

  console.log('📤 Template payload:', JSON.stringify(payload, null, 2))
  const result = await post(payload)
  console.log('📥 Template response:', result)
  return result
}

// ── 9. MARK AS READ ────────────────────────────────────────────────────────
export async function markMessageAsRead(messageId: string): Promise<boolean> {
  try {
    await axios.post(
      `${BASE_URL}/${PHONE_ID}/messages`,
      { messaging_product: 'whatsapp', status: 'read', message_id: messageId },
      { headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' } }
    )
    return true
  } catch { return false }
}

export default {
  sendTextMessage,
  sendImageMessage,
  sendVideoMessage,
  sendDocumentMessage,
  sendMediaMessage,
  sendInteractiveButtonsMessage,
  sendQuickRepliesList,
  sendQuickRepliesMessage,
  sendTemplateMessage,
  markMessageAsRead,
}