'use client'
// components/TemplateCreator.tsx
// — Uploads header media to Cloudinary via /api/upload
// — Shows live image preview (even before approval)
// — Stores Cloudinary URL in DB via POST /api/templates
// — Mobile responsive

import { useState, useRef, useEffect } from 'react'

// ── Full Meta language list ────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'en',    label: 'English' },       { code: 'en_US', label: 'English (US)' },
  { code: 'en_GB', label: 'English (UK)' },  { code: 'en_IN', label: 'English (India)' },
  { code: 'hi',    label: 'Hindi' },         { code: 'ta',    label: 'Tamil' },
  { code: 'te',    label: 'Telugu' },        { code: 'kn',    label: 'Kannada' },
  { code: 'ml',    label: 'Malayalam' },     { code: 'mr',    label: 'Marathi' },
  { code: 'bn',    label: 'Bengali' },       { code: 'gu',    label: 'Gujarati' },
  { code: 'pa',    label: 'Punjabi' },       { code: 'ur',    label: 'Urdu' },
  { code: 'ar',    label: 'Arabic' },        { code: 'fr',    label: 'French' },
  { code: 'de',    label: 'German' },        { code: 'es',    label: 'Spanish' },
  { code: 'pt_BR', label: 'Portuguese (BR)' },{ code: 'pt_PT',label: 'Portuguese (PT)' },
  { code: 'id',    label: 'Indonesian' },    { code: 'ms',    label: 'Malay' },
  { code: 'tr',    label: 'Turkish' },       { code: 'ru',    label: 'Russian' },
  { code: 'zh_CN', label: 'Chinese (CN)' },  { code: 'zh_TW', label: 'Chinese (TW)' },
  { code: 'ja',    label: 'Japanese' },      { code: 'ko',    label: 'Korean' },
  { code: 'vi',    label: 'Vietnamese' },    { code: 'th',    label: 'Thai' },
  { code: 'it',    label: 'Italian' },       { code: 'nl',    label: 'Dutch' },
  { code: 'pl',    label: 'Polish' },        { code: 'uk',    label: 'Ukrainian' },
  { code: 'ro',    label: 'Romanian' },      { code: 'sv',    label: 'Swedish' },
  { code: 'nb',    label: 'Norwegian' },     { code: 'da',    label: 'Danish' },
  { code: 'fi',    label: 'Finnish' },       { code: 'he',    label: 'Hebrew' },
  { code: 'sw',    label: 'Swahili' },       { code: 'af',    label: 'Afrikaans' },
  { code: 'fil',   label: 'Filipino' },      { code: 'ha',    label: 'Hausa' },
]

const CATEGORIES   = ['MARKETING', 'UTILITY', 'AUTHENTICATION']
const BUTTON_TYPES = [
  { value: 'QUICK_REPLY',  label: 'Quick Reply',  desc: 'Tap to send a predefined reply' },
  { value: 'URL',          label: 'Visit Website', desc: 'Opens a URL in the browser' },
  { value: 'PHONE_NUMBER', label: 'Call Phone',   desc: 'Calls a phone number' },
]

type Button     = { type: string; text: string; url?: string; phone?: string }
type HeaderType = 'none' | 'text' | 'image' | 'video' | 'document'

// Meta error subcode → user-friendly hint
const META_HINTS: Record<number, string> = {
  2388273: 'Template variables need example values. Please try submitting again.',
  2388023: 'Missing example values. Please try again.',
  132016:  'A template with this name already exists.',
  132023:  'Template category may not match the content.',
  132001:  'Template body contains invalid characters.',
  132012:  'Invalid button configuration.',
  190:     'Access token expired — regenerate it in Meta Developer Console.',
  200:     'Permission denied. Check whatsapp_business_management permission.',
  80007:   'Template quota exceeded (max 100/hour).',
}

const S: Record<string, React.CSSProperties> = {
  label:   { fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6, fontFamily: 'var(--font-mono)' },
  input:   { width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const },
  section: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 20 },
  hint:    { fontSize: 11, color: 'var(--muted)', marginTop: 6 },
}

export default function TemplateCreator({ onSave, onCancel }: { onSave?: (data: any) => void; onCancel?: () => void }) {
  // ── Responsive breakpoint ─────────────────────────────────────────────
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const [name, setName]         = useState('')
  const [category, setCategory] = useState('MARKETING')
  const [language, setLanguage] = useState('en')

  const [headerType, setHeaderType]     = useState<HeaderType>('none')
  const [headerText, setHeaderText]     = useState('')
  const [mediaUrl, setMediaUrl]         = useState('')
  const [mediaPublicId, setMediaPublicId] = useState('')
  const [mediaLocalPreview, setMediaLocalPreview] = useState('')
  const [uploading, setUploading]       = useState(false)
  const [uploadError, setUploadError]   = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const [body, setBody]     = useState('')
  const [footer, setFooter] = useState('')
  const [buttons, setButtons] = useState<Button[]>([])
  const [metaHandle, setMetaHandle] = useState<string>('')
  const [cloudinaryStatus, setCloudinaryStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')

  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [modal, setModal]   = useState<{
    type: 'success' | 'error'
    title: string; message: string; details?: string; hint?: string
  } | null>(null)

  // ── Preview collapsed on mobile ───────────────────────────────────────
  const [previewOpen, setPreviewOpen] = useState(false)

  const bodyVars: string[] = []
  const rx = /\{\{(\w+)\}\}/g; let m
  while ((m = rx.exec(body)) !== null) if (!bodyVars.includes(m[1])) bodyVars.push(m[1])

  const addButton = () => { if (buttons.length < 10) setButtons(p => [...p, { type: 'QUICK_REPLY', text: '' }]) }
  const updateButton = (i: number, k: keyof Button, v: string) => setButtons(p => p.map((b, idx) => idx === i ? { ...b, [k]: v } : b))
  const removeButton = (i: number) => setButtons(p => p.filter((_, idx) => idx !== i))
  const moveButton   = (i: number, dir: -1 | 1) => {
    const a = [...buttons]; const j = i + dir
    if (j < 0 || j >= a.length) return
    ;[a[i], a[j]] = [a[j], a[i]]; setButtons(a)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const blobUrl = URL.createObjectURL(file)
    setMediaLocalPreview(blobUrl)
    setMediaUrl('')
    setMediaPublicId('')
    setMetaHandle('')
    setUploadError('')
    setUploading(true)

    try {
      const metaForm = new FormData()
      metaForm.append('file', file)
      metaForm.append('type', headerType)

      const metaRes = await fetch('/api/upload-media', { method: 'POST', body: metaForm })
      const metaData = await metaRes.json()

      if (!metaData.success || !metaData.handle) throw new Error(metaData.error || 'Meta upload failed')

      const metaHandleValue = metaData.handle
      setMetaHandle(metaHandleValue)

      const cloudForm = new FormData()
      cloudForm.append('file', file)
      const cloudRes = await fetch('/api/upload1', { method: 'POST', body: cloudForm })
      const cloudData = await cloudRes.json()

      if (cloudData.success) {
        setMediaUrl(cloudData.url)
        setMediaPublicId(cloudData.publicId)
      }

      setModal({
        type: 'success',
        title: '✓ Media uploaded!',
        message: `Uploaded to Meta and Cloudinary successfully.`,
        details: `Meta Handle: ${metaHandleValue.substring(0, 30)}...\nCloudinary: ${cloudData.success ? '✓ Saved' : '⚠️ Failed'}`,
      })
      setTimeout(() => setModal(null), 3000)
    } catch (err: any) {
      setUploadError(err.message ?? 'Upload failed')
      setMediaLocalPreview('')
      setMetaHandle('')
      setModal({ type: 'error', title: '✕ Upload failed', message: err.message || 'Failed to upload media' })
      setTimeout(() => setModal(null), 3000)
    } finally {
      setUploading(false)
    }
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim())         e.name = 'Template name is required'
    if (name.includes(' '))   e.name = 'Use underscores instead of spaces'
    if (!body.trim())         e.body = 'Body text is required'
    if (body.length > 1024)   e.body = 'Body must be under 1024 characters'
    if (headerType === 'text' && headerText.length > 60) e.headerText = 'Max 60 characters'
    if (footer.length > 60)   e.footer = 'Footer must be under 60 characters'
    if (['image', 'video', 'document'].includes(headerType) && !metaHandle)
      e.media = uploading ? 'Still uploading to Meta — please wait' : 'Please upload media to Meta first'
    buttons.forEach((b, i) => {
      if (!b.text.trim()) e[`btn_${i}`] = 'Button text is required'
      if (b.type === 'URL' && !b.url?.trim()) e[`btn_${i}`] = 'URL is required'
      if (b.type === 'PHONE_NUMBER' && !b.phone?.trim()) e[`btn_${i}`] = 'Phone number is required'
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    if (['image', 'video', 'document'].includes(headerType) && !metaHandle) {
      setModal({ type: 'error', title: '✕ Media not uploaded to Meta', message: 'Please upload your media file first.' })
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.toLowerCase().replace(/\s+/g, '_'),
          category, language, body, headerType,
          headerText: headerType === 'text' ? headerText : undefined,
          headerHandle: metaHandle,
          headerMediaUrl: mediaUrl,
          footer: footer || undefined,
          buttons,
          parameterFormat: bodyVars.some(v => /^\d+$/.test(v)) ? 'positional' : 'named',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setModal({ type: 'success', title: '✓ Template submitted!', message: data.message ?? 'Template submitted to Meta for review.' })
        onSave?.(data.data)
      }
    } catch (err: any) {
      // Error handling
    }
    setSaving(false)
  }

  const closeModal = () => {
    if (modal?.type === 'success') {
      setName(''); setCategory('MARKETING'); setLanguage('en')
      setHeaderType('none'); setHeaderText(''); setMediaUrl('')
      setMediaPublicId(''); setMediaLocalPreview(''); setMetaHandle('')
      setBody(''); setFooter(''); setButtons([])
      onCancel?.()
    }
    setModal(null)
  }

  const previewImgSrc = mediaLocalPreview || mediaUrl
  const v1 = '{{1}}'; const vn = '{{name}}'

  // ── Shared preview panel (used in both layouts) ───────────────────────
  const PreviewPanel = () => (
    <div>
      <div style={{ background: '#1a1a2e', borderRadius: 24, padding: '18px 10px', border: '6px solid #333' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px 10px', fontSize: 10, color: '#888' }}>
          <span>9:41</span><span>● ● ●</span>
        </div>
        <div style={{ background: '#0b1418', borderRadius: 14, minHeight: 200, padding: 10,
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff08 1px, transparent 0)', backgroundSize: '20px 20px' }}>
          <div style={{ maxWidth: '85%', background: '#202c33', borderRadius: '0 12px 12px 12px', overflow: 'hidden', boxShadow: '0 2px 8px #0004' }}>
            {headerType === 'text' && headerText && (
              <div style={{ padding: '10px 14px 6px', fontSize: 14, fontWeight: 700, color: '#e9edef' }}>{headerText}</div>
            )}
            {headerType === 'image' && (
              <div style={{ height: 140, background: '#2a3942', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {previewImgSrc
                  ? <img src={previewImgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: 32 }}>🖼</span>}
              </div>
            )}
            {headerType === 'video' && (
              <div style={{ height: 140, background: '#2a3942', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 32 }}>▶</span>
                <span style={{ fontSize: 11, color: '#8696a0' }}>Video</span>
              </div>
            )}
            {headerType === 'document' && (
              <div style={{ padding: '10px 14px', background: '#2a3942', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>📄</span>
                <span style={{ fontSize: 12, color: '#8696a0' }}>Document.pdf</span>
              </div>
            )}
            <div style={{ padding: '10px 14px', fontSize: 13, color: '#e9edef', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {body || <span style={{ color: '#8696a0' }}>Your message will appear here...</span>}
            </div>
            {footer && <div style={{ padding: '2px 14px 10px', fontSize: 11, color: '#8696a0' }}>{footer}</div>}
            <div style={{ padding: '0 14px 8px', fontSize: 10, color: '#8696a0', textAlign: 'right' }}>
              {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} ✓✓
            </div>
            {buttons.length > 0 && (
              <div style={{ borderTop: '1px solid #3b4a54' }}>
                {buttons.slice(0, 3).map((btn, i) => (
                  <div key={i} style={{ padding: '10px 14px', textAlign: 'center', fontSize: 13, color: '#53bdeb',
                    borderBottom: i < Math.min(buttons.length, 3) - 1 ? '1px solid #3b4a54' : undefined,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    {btn.type === 'URL' && '↗ '}{btn.type === 'PHONE_NUMBER' && '📞 '}
                    {btn.text || `Button ${i + 1}`}
                  </div>
                ))}
                {buttons.length > 3 && (
                  <div style={{ padding: '9px 14px', textAlign: 'center', fontSize: 12, color: '#53bdeb', borderTop: '1px solid #3b4a54' }}>
                    ≡ See all {buttons.length} options
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div style={{ marginTop: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10, letterSpacing: '0.1em' }}>CHECKLIST</div>
        {[
          { ok: name.length > 0 && !name.includes(' '), text: 'Name: lowercase with underscores' },
          { ok: body.length > 0 && body.length <= 1024, text: 'Body filled (≤1024 chars)' },
          { ok: footer.length <= 60, text: 'Footer ≤60 chars' },
          { ok: !['image','video','document'].includes(headerType) || !!metaHandle, text: 'Media uploaded to Meta' },
          { ok: buttons.every(b => b.text.trim()), text: 'All buttons have text' },
        ].map(c => (
          <div key={c.text} style={{ display: 'flex', gap: 8, fontSize: 11, marginBottom: 5, color: c.ok ? 'var(--accent)' : 'var(--muted)' }}>
            <span>{c.ok ? '✓' : '○'}</span><span>{c.text}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {/* ── Mobile: collapsible preview banner ── */}
      {isMobile && (
        <div style={{ marginBottom: 16 }}>
          <button
            onClick={() => setPreviewOpen(o => !o)}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 10,
              border: '1px solid var(--border)', background: 'var(--surface)',
              color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-mono)',
              cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <span>📱 Live Preview</span>
            <span style={{ color: 'var(--muted)' }}>{previewOpen ? '▲ Hide' : '▼ Show'}</span>
          </button>
          {previewOpen && (
            <div style={{ marginTop: 12 }}>
              <PreviewPanel />
            </div>
          )}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
        gap: isMobile ? 0 : 28,
        alignItems: 'start',
      }}>

        {/* ── LEFT: Form ── */}
        <div>

          {/* Basic info */}
          <div style={S.section}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Basic information</div>

            <div style={{ marginBottom: 20 }}>
              <label style={S.label}>Template name</label>
              <input value={name} onChange={e => setName(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                placeholder="e.g. lavelle_welcome" maxLength={512}
                style={{ ...S.input, borderColor: errors.name ? '#ef4444' : undefined }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                {errors.name
                  ? <span style={{ fontSize: 11, color: '#ef4444' }}>{errors.name}</span>
                  : <span style={S.hint}>Lowercase letters, numbers, underscores only</span>}
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{name.length}/512</span>
              </div>
            </div>

            {/* Category + Language: stacks on mobile */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
              <div>
                <label style={S.label}>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={S.input}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <p style={S.hint}>{category === 'MARKETING' ? 'Promos, offers' : category === 'UTILITY' ? 'Order updates, alerts' : 'OTPs, verification'}</p>
              </div>
              <div>
                <label style={S.label}>Language</label>
                <select value={language} onChange={e => setLanguage(e.target.value)} style={S.input}>
                  {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label} ({l.code})</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Header */}
          <div style={S.section}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Header</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Optional · Appears at the top</div>

            <label style={S.label}>Header type</label>
            {/* On mobile: 3-col + 2-col wrap; on desktop: 5-col */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
              gap: 8,
              marginBottom: 16,
            }}>
              {(['none', 'text', 'image', 'video', 'document'] as HeaderType[]).map(t => (
                <button key={t}
                  onClick={() => {
                    setHeaderType(t)
                    setMediaUrl('')
                    setMediaLocalPreview('')
                    setUploadError('')
                    setMetaHandle('')
                  }}
                  style={{
                    padding: isMobile ? '10px 4px' : '10px 6px',
                    borderRadius: 8, cursor: 'pointer',
                    border: `1px solid ${headerType === t ? '#00e5a060' : 'var(--border)'}`,
                    background: headerType === t ? '#00e5a010' : 'var(--surface2)',
                    color: headerType === t ? '#00e5a0' : 'var(--muted)',
                    fontSize: isMobile ? 10 : 11,
                    fontFamily: 'var(--font-mono)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                  }}>
                  <span style={{ fontSize: 17 }}>{t === 'none' ? '∅' : t === 'text' ? 'T' : t === 'image' ? '🖼' : t === 'video' ? '▶' : '📄'}</span>
                  <span style={{ textTransform: 'capitalize' }}>{t}</span>
                </button>
              ))}
            </div>

            {headerType === 'text' && (
              <div>
                <label style={S.label}>Header text</label>
                <input value={headerText} onChange={e => setHeaderText(e.target.value)}
                  placeholder="e.g. 🌿 Welcome to Lavelle Venture" maxLength={60}
                  style={{ ...S.input, borderColor: errors.headerText ? '#ef4444' : undefined }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  {errors.headerText
                    ? <span style={{ fontSize: 11, color: '#ef4444' }}>{errors.headerText}</span>
                    : <span style={S.hint}>You can use {'{{variable}}'} placeholders</span>}
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{headerText.length}/60</span>
                </div>
              </div>
            )}

            {(['image', 'video', 'document'] as HeaderType[]).includes(headerType) && (
              <div>
                <label style={S.label}>
                  Upload {headerType}
                  {uploading && <span style={{ color: 'var(--warn)', marginLeft: 8 }}>⟳ Uploading to Meta...</span>}
                  {metaHandle && !uploading && <span style={{ color: 'var(--accent)', marginLeft: 8 }}>✓ Meta: Uploaded</span>}
                </label>

                <div onClick={() => fileRef.current?.click()}
                  style={{
                    border: `2px dashed ${errors.media ? '#ef4444' : metaHandle ? '#00e5a050' : 'var(--border)'}`,
                    borderRadius: 10,
                    padding: mediaLocalPreview && headerType === 'image' ? 0 : '24px',
                    textAlign: 'center', cursor: 'pointer', background: 'var(--surface2)',
                    overflow: 'hidden',
                  }}>
                  {mediaLocalPreview && headerType === 'image' ? (
                    <div style={{ position: 'relative' }}>
                      <img src={mediaLocalPreview} alt="Header preview"
                        style={{ width: '100%', maxHeight: 200, objectFit: 'cover', display: 'block' }} />
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                        padding: '20px 12px 10px',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                          <div>
                            {metaHandle && <div style={{ fontSize: 10, color: '#00e5a0' }}>✓ Meta: Ready</div>}
                            {mediaUrl && <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>✓ Cloudinary: Saved</div>}
                          </div>
                          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Click to change</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{headerType === 'image' ? '🖼' : headerType === 'video' ? '▶' : '📄'}</div>
                      <div style={{ fontSize: 13, color: 'var(--text)' }}>
                        {uploading ? 'Uploading to Meta...' : 'Click or drag & drop'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
                        {headerType === 'image' ? 'JPG / PNG — max 5MB'
                          : headerType === 'video' ? 'MP4 — max 16MB'
                          : 'PDF — max 10MB'}
                      </div>
                    </>
                  )}
                </div>

                <input ref={fileRef} type="file"
                  accept={headerType === 'image' ? 'image/jpeg,image/png,image/webp'
                    : headerType === 'video' ? 'video/mp4'
                    : 'application/pdf'}
                  onChange={handleFileChange} style={{ display: 'none' }} />

                {uploadError && (
                  <div style={{ marginTop: 8, fontSize: 12, color: '#ef4444', padding: '6px 12px', background: '#ef444410', borderRadius: 6 }}>
                    ✕ {uploadError}
                  </div>
                )}

                {metaHandle && !uploading && (
                  <div style={{ marginTop: 8, fontSize: 11, color: 'var(--muted)', wordBreak: 'break-all' }}>
                    <div><span style={{ color: 'var(--accent)' }}>Meta Handle: </span><code style={{ fontSize: 10 }}>{metaHandle.substring(0, 40)}...</code></div>
                    {mediaUrl && <div><span style={{ color: 'var(--accent)' }}>Cloudinary URL: </span><code style={{ fontSize: 10 }}>{mediaUrl.substring(0, 60)}...</code></div>}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Body */}
          <div style={S.section}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Body</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Required · Main message content</div>

            <textarea value={body} onChange={e => setBody(e.target.value)}
              placeholder={`Enter your message...\n\nExample: Hello {{name}}, thank you for contacting Lavelle Venture!`}
              maxLength={1024} rows={6}
              style={{ ...S.input, resize: 'vertical', lineHeight: 1.6, borderColor: errors.body ? '#ef4444' : undefined }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              {errors.body
                ? <span style={{ fontSize: 11, color: '#ef4444' }}>{errors.body}</span>
                : <span style={S.hint}>{'{{variable}}'} or {'{{1}}'} for dynamic content · *bold* _italic_ ~strikethrough~</span>}
              <span style={{ fontSize: 11, color: body.length > 900 ? '#ef4444' : 'var(--muted)' }}>{body.length}/1024</span>
            </div>

            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              {[
                { label: 'B', apply: '*text*', title: 'Bold' },
                { label: 'I', apply: '_text_', title: 'Italic' },
                { label: 'S', apply: '~text~', title: 'Strikethrough' },
                { label: v1, apply: v1, title: 'Positional var' },
                { label: vn, apply: vn, title: 'Named var' },
              ].map(f => (
                <button key={f.label} title={f.title} onClick={() => setBody(p => p + f.apply)} style={{
                  padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)',
                  background: 'var(--surface2)', color: 'var(--muted)', fontSize: 11,
                  fontFamily: 'var(--font-mono)', cursor: 'pointer',
                }}>{f.label}</button>
              ))}
            </div>

            {bodyVars.length > 0 && (
              <div style={{ marginTop: 12, padding: '10px 14px', background: '#7c3aed10', border: '1px solid #7c3aed30', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#a78bfa', marginBottom: 6, letterSpacing: '0.1em' }}>DETECTED VARIABLES</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {bodyVars.map(v => (
                    <span key={v} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: '#7c3aed20', border: '1px solid #7c3aed40', color: '#a78bfa' }}>
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={S.section}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Footer</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Optional · Small text at the bottom (no variables)</div>
            <input value={footer} onChange={e => setFooter(e.target.value)}
              placeholder="e.g. Lavelle Venture | Frazer Town, Bangalore" maxLength={60}
              style={{ ...S.input, borderColor: errors.footer ? '#ef4444' : undefined }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              {errors.footer
                ? <span style={{ fontSize: 11, color: '#ef4444' }}>{errors.footer}</span>
                : <span style={S.hint}>Cannot contain variables</span>}
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{footer.length}/60</span>
            </div>
          </div>

          {/* Buttons */}
          <div style={S.section}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Buttons</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Optional · Up to 10</div>
              </div>
              <button onClick={addButton} disabled={buttons.length >= 10} style={{
                padding: '8px 16px', borderRadius: 8, border: '1px solid #00e5a050',
                background: '#00e5a010', color: '#00e5a0', fontSize: 12,
                fontFamily: 'var(--font-mono)', cursor: buttons.length >= 10 ? 'not-allowed' : 'pointer',
                opacity: buttons.length >= 10 ? 0.5 : 1,
              }}>+ Add button</button>
            </div>

            {buttons.length === 0 && (
              <div style={{ padding: 20, background: 'var(--surface2)', borderRadius: 8, fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>
                No buttons added.
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              {buttons.map((btn, i) => (
                <div key={i} style={{
                  background: 'var(--surface2)',
                  border: `1px solid ${errors[`btn_${i}`] ? '#ef4444' : 'var(--border)'}`,
                  borderRadius: 10, padding: isMobile ? 12 : 16,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Button {i + 1}</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => moveButton(i, -1)} disabled={i === 0} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)', cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.4 : 1, fontSize: 12 }}>↑</button>
                      <button onClick={() => moveButton(i, 1)} disabled={i === buttons.length - 1} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)', cursor: i === buttons.length - 1 ? 'not-allowed' : 'pointer', opacity: i === buttons.length - 1 ? 0.4 : 1, fontSize: 12 }}>↓</button>
                      <button onClick={() => removeButton(i)} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #ef444440', background: '#ef444415', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}>✕</button>
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={S.label}>Button type</label>
                    {/* On mobile: stack button types vertically */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                      gap: 8,
                    }}>
                      {BUTTON_TYPES.map(bt => (
                        <button key={bt.value} onClick={() => updateButton(i, 'type', bt.value)} style={{
                          padding: '9px 8px', borderRadius: 8, cursor: 'pointer',
                          border: `1px solid ${btn.type === bt.value ? '#00e5a060' : 'var(--border)'}`,
                          background: btn.type === bt.value ? '#00e5a010' : 'var(--surface)',
                          color: btn.type === bt.value ? '#00e5a0' : 'var(--muted)',
                          fontSize: 11, fontFamily: 'var(--font-mono)', textAlign: 'left' as const,
                        }}>
                          <div style={{ fontWeight: 700, marginBottom: 2 }}>{bt.label}</div>
                          <div style={{ opacity: 0.7, fontSize: 10 }}>{bt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: btn.type !== 'QUICK_REPLY' ? 12 : 0 }}>
                    <label style={S.label}>Button text</label>
                    <input value={btn.text} onChange={e => updateButton(i, 'text', e.target.value)}
                      placeholder={btn.type === 'QUICK_REPLY' ? 'e.g. Yes, Tell Me More' : btn.type === 'URL' ? 'e.g. Visit Website' : 'e.g. Call Now'}
                      maxLength={25} style={{ ...S.input, borderColor: errors[`btn_${i}`] ? '#ef4444' : undefined }} />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                      {errors[`btn_${i}`] && <span style={{ fontSize: 11, color: '#ef4444', flex: 1 }}>{errors[`btn_${i}`]}</span>}
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>{btn.text.length}/25</span>
                    </div>
                  </div>

                  {btn.type === 'URL' && (
                    <div>
                      <label style={S.label}>Website URL</label>
                      <input value={btn.url ?? ''} onChange={e => updateButton(i, 'url', e.target.value)}
                        placeholder="https://lavelleventure.com" style={S.input} />
                      <p style={S.hint}>Use {'{{1}}'} for a dynamic URL suffix</p>
                    </div>
                  )}
                  {btn.type === 'PHONE_NUMBER' && (
                    <div>
                      <label style={S.label}>Phone number</label>
                      <input value={btn.phone ?? ''} onChange={e => updateButton(i, 'phone', e.target.value)}
                        placeholder="+919187569958" style={S.input} />
                      <p style={S.hint}>Include country code with + prefix</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 12,
            justifyContent: isMobile ? 'stretch' : 'flex-end',
            marginBottom: isMobile ? 32 : 0,
          }}>
            {onCancel && (
              <button onClick={onCancel} style={{
                padding: '12px 24px', borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--surface2)',
                color: 'var(--muted)', fontSize: 13,
                fontFamily: 'var(--font-mono)', cursor: 'pointer',
                width: isMobile ? '100%' : undefined,
                order: isMobile ? 2 : undefined,
              }}>
                Cancel
              </button>
            )}
            <button onClick={handleSave} disabled={saving || uploading} style={{
              padding: '12px 28px', borderRadius: 8,
              border: '1px solid #00e5a050', background: '#00e5a015',
              color: '#00e5a0', fontSize: 13,
              fontFamily: 'var(--font-mono)', cursor: saving || uploading ? 'not-allowed' : 'pointer',
              opacity: saving || uploading ? 0.6 : 1,
              width: isMobile ? '100%' : undefined,
              order: isMobile ? 1 : undefined,
            }}>
              {uploading ? '⟳ Uploading media...' : saving ? '⟳ Submitting to Meta...' : '✓ Submit for Review'}
            </button>
          </div>
        </div>

        {/* ── RIGHT: Desktop-only sticky preview ── */}
        {!isMobile && (
          <div style={{ position: 'sticky', top: 24 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>LIVE PREVIEW</div>
            <PreviewPanel />
          </div>
        )}
      </div>

      {/* ── Result Modal ── */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)', padding: isMobile ? 16 : 0 }}>
          <div style={{
            background: 'var(--surface)', borderRadius: 16, padding: isMobile ? 24 : 36,
            width: isMobile ? '100%' : 480, maxWidth: '90vw',
            border: `1px solid ${modal.type === 'success' ? '#00e5a040' : '#ef444440'}`,
            boxShadow: `0 0 40px ${modal.type === 'success' ? '#00e5a015' : '#ef444415'}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                background: modal.type === 'success' ? '#00e5a015' : '#ef444415',
                border: `1px solid ${modal.type === 'success' ? '#00e5a040' : '#ef444440'}`,
                color: modal.type === 'success' ? '#00e5a0' : '#ef4444',
                flexShrink: 0,
              }}>
                {modal.type === 'success' ? '✓' : '✕'}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: isMobile ? 16 : 18, color: modal.type === 'success' ? '#00e5a0' : '#ef4444' }}>
                {modal.title}
              </div>
            </div>

            <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6, marginBottom: 16 }}>{modal.message}</div>

            {modal.hint && (
              <div style={{ padding: '12px 16px', background: '#f59e0b10', border: '1px solid #f59e0b30', borderRadius: 8, marginBottom: 16, fontSize: 13, color: '#f59e0b', lineHeight: 1.5 }}>
                💡 {modal.hint}
              </div>
            )}

            {modal.details && (
              <div style={{ padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 6 }}>DETAILS</div>
                <pre style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', margin: 0, wordBreak: 'break-all' }}>{modal.details}</pre>
              </div>
            )}

            {modal.type === 'success' && (
              <div style={{ padding: '12px 16px', background: '#00e5a008', border: '1px solid #00e5a020', borderRadius: 8, marginBottom: 20, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--text)' }}>What happens next?</strong><br />
                Meta reviews your template (minutes to 24 hours). Once approved, click <strong style={{ color: 'var(--accent)' }}>⟳ Sync from Meta</strong> to see it here.
              </div>
            )}

            <button onClick={closeModal} style={{
              width: '100%', padding: 12, borderRadius: 8,
              border: `1px solid ${modal.type === 'success' ? '#00e5a050' : '#ef444450'}`,
              background: modal.type === 'success' ? '#00e5a015' : '#ef444415',
              color: modal.type === 'success' ? '#00e5a0' : '#ef4444',
              fontSize: 14, fontFamily: 'var(--font-mono)', cursor: 'pointer',
            }}>
              {modal.type === 'success' ? 'Done' : 'Close & Fix'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}