// lib/whatsapp-template-service.ts

const API_VERSION = process.env.WHATSAPP_API_VERSION || 'v19.0'
const WABA_ID     = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID!
const TOKEN       = process.env.WHATSAPP_ACCESS_TOKEN!
const BASE        = `https://graph.facebook.com/${API_VERSION}`

export interface MetaError {
  message: string
  type: string
  code: number
  error_subcode?: number
  fbtrace_id?: string
}

export interface ServiceResult<T = any> {
  success: boolean
  data?: T
  error?: string
  metaError?: MetaError
}

export interface UIFormData {
  headerType: 'none' | 'text' | 'image' | 'video' | 'document'
  headerText?: string
  headerHandle?: string  // Media handle from pre-uploaded file
  headerMediaId?: string // Media ID from uploaded file (for storage)
  body: string
  footer?: string
  buttons: { type: string; text: string; url?: string; phone?: string }[]
  parameterFormat?: string
}

// ── Extract all {{var}} placeholders in order ──────────────────────────────
function extractVars(text: string): string[] {
  const vars: string[] = []
  const rx = /\{\{([^}]+)\}\}/g
  let m
  while ((m = rx.exec(text)) !== null) {
    if (!vars.includes(m[1])) vars.push(m[1])
  }
  return vars
}

// ── Decide format: if ALL vars are digits → positional, else → named ───────
function detectFormat(texts: string[]): 'named' | 'positional' {
  const allVars = texts.flatMap(t => extractVars(t))
  if (allVars.length === 0) return 'named'
  return allVars.every(v => /^\d+$/.test(v)) ? 'positional' : 'named'
}

// ── Build components array exactly per Meta docs ───────────────────────────
export function buildMetaComponents(form: UIFormData): { components: any[]; parameterFormat: string } {
  const textsForFormat: string[] = [form.body]
  if (form.headerText) textsForFormat.push(form.headerText)
  const format = detectFormat(textsForFormat)
  const parameterFormat = format === 'positional' ? 'POSITIONAL' : 'NAMED'

  const components: any[] = []

  // ── HEADER ───────────────────────────────────────────────────────────────
  if (form.headerType === 'text' && form.headerText?.trim()) {
    const vars = extractVars(form.headerText)
    const comp: any = { type: 'HEADER', format: 'TEXT', text: form.headerText }

    if (vars.length > 0) {
      if (parameterFormat === 'NAMED') {
        comp.example = {
          header_text_named_params: vars.map(v => ({
            param_name: v,
            example: `Sample ${v}`,
          })),
        }
      } else {
        comp.example = { header_text: [`Sample ${vars[0]}`] }
      }
    }
    components.push(comp)
  } 
  else if (['image', 'video', 'document'].includes(form.headerType)) {
    const comp: any = { 
      type: 'HEADER', 
      format: form.headerType.toUpperCase() 
    }
    
    // Meta REQUIRES an example with header_handle for media headers
    if (form.headerHandle) {
      comp.example = {
        header_handle: [form.headerHandle]
      }
    } else {
      // If no handle provided, we need to throw an error
      throw new Error(`Media header of type ${form.headerType} requires a pre-uploaded media handle. Please upload a file first.`)
    }
    
    components.push(comp)
  }

  // ── BODY ─────────────────────────────────────────────────────────────────
  const bodyVars = extractVars(form.body)
  const bodyComp: any = { type: 'BODY', text: form.body }

  if (bodyVars.length > 0) {
    if (parameterFormat === 'NAMED') {
      bodyComp.example = {
        body_text_named_params: bodyVars.map(v => ({
          param_name: v,
          example: `Sample ${v}`,
        })),
      }
    } else {
      bodyComp.example = {
        body_text: [bodyVars.map(v => `Sample ${v}`)],
      }
    }
  }
  components.push(bodyComp)

  // ── FOOTER ───────────────────────────────────────────────────────────────
  if (form.footer?.trim()) {
    components.push({ type: 'FOOTER', text: form.footer })
  }

  // ── BUTTONS ──────────────────────────────────────────────────────────────
  if (form.buttons && form.buttons.length > 0) {
    const buttons = form.buttons.map(btn => {
      if (btn.type === 'QUICK_REPLY') {
        return { type: 'QUICK_REPLY', text: btn.text.slice(0, 25) }
      }
      if (btn.type === 'URL') {
        const button: any = { 
          type: 'URL', 
          text: btn.text.slice(0, 25), 
          url: btn.url 
        }
        if (btn.url?.includes('{{')) {
          button.example = ['example_value']
        }
        return button
      }
      if (btn.type === 'PHONE_NUMBER') {
        return { 
          type: 'PHONE_NUMBER', 
          text: btn.text.slice(0, 25), 
          phone_number: btn.phone?.replace(/[^\d+]/g, '')
        }
      }
      return btn
    })
    components.push({ type: 'BUTTONS', buttons })
  }

  return { components, parameterFormat }
}

export async function createTemplateInMeta(
  name: string,
  category: string,
  language: string,
  form: UIFormData
): Promise<ServiceResult> {
  if (!WABA_ID || !TOKEN) {
    return { success: false, error: 'WHATSAPP_BUSINESS_ACCOUNT_ID and WHATSAPP_ACCESS_TOKEN are not set in .env.local' }
  }

  const { components, parameterFormat } = buildMetaComponents(form)

  const hasVars = form.body.includes('{{') || (form.headerText ?? '').includes('{{')
  const safeName = name
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')

  const payload: any = {
    name: safeName,
    category,
    language,
    components,
  }
  
  // CRITICAL: parameter_format is REQUIRED when template has variables
  // Meta expects "NAMED" or "POSITIONAL" (uppercase)
  if (hasVars) {
    payload.parameter_format = parameterFormat // Already uppercase from buildMetaComponents
  }

  console.log('📤 Submitting to Meta:', JSON.stringify(payload, null, 2))

  try {
const res: Response = await fetch(`${BASE}/${WABA_ID}/message_templates`, {
        method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()

    console.log('📥 Meta response:', JSON.stringify(data, null, 2))

    if (res.ok) return { success: true, data }

    const metaError: MetaError = data.error
    return { success: false, error: metaError?.message ?? `Meta API error (${res.status})`, metaError }
  } catch (err: any) {
    return { success: false, error: err.message ?? 'Network error' }
  }
}

// ── Sync approved templates from Meta ─────────────────────────────────────
export async function syncApprovedFromMeta(): Promise<ServiceResult<any[]>> {
  if (!WABA_ID || !TOKEN) {
    return { success: false, error: 'WHATSAPP_BUSINESS_ACCOUNT_ID and WHATSAPP_ACCESS_TOKEN are not set' }
  }
  try {
    let all: any[] = []
    let url: string | null =
      `${BASE}/${WABA_ID}/message_templates?limit=200&status=APPROVED&fields=id,name,status,category,language,components,rejected_reason`

    while (url) {
      const res  = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` }, cache: 'no-store' })
const data: any = await res.json()
      if (!res.ok) return { success: false, error: data.error?.message ?? 'Meta API error', metaError: data.error }
      all = all.concat(data.data ?? [])
      url = data.paging?.next ?? null
    }
    return { success: true, data: all }
  } catch (err: any) {
    return { success: false, error: err.message ?? 'Network error' }
  }
}

// ── Delete template from Meta ─────────────────────────────────────────────
export async function deleteTemplateFromMeta(templateName: string): Promise<ServiceResult> {
  if (!WABA_ID || !TOKEN) return { success: false, error: 'Credentials not set' }
  try {
    const res  = await fetch(`${BASE}/${WABA_ID}/message_templates?name=${encodeURIComponent(templateName)}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    const data = await res.json()
    if (res.ok) return { success: true, data }
    return { success: false, error: data.error?.message ?? 'Delete failed', metaError: data.error }
  } catch (err: any) {
    return { success: false, error: err.message ?? 'Network error' }
  }
}