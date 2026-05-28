'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Sidebar from '../components/Sidebar'
import useAdminAuth from '@/hooks/useAdminAuth'

// ── Shared styles ──────────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  label:   { fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 6, fontFamily: 'var(--font-mono)' },
  input:   { width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const },
  section: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 20 },
  hint:    { fontSize: 11, color: 'var(--muted)', marginTop: 6, margin: 0 },
}

function Badge({ status }: { status: string }) {
  const map: any = {
    approved: { bg: '#00e5a015', border: '#00e5a040', text: '#00e5a0' },
    pending:  { bg: '#f59e0b15', border: '#f59e0b40', text: '#f59e0b' },
    rejected: { bg: '#ef444415', border: '#ef444440', text: '#ef4444' },
  }
  const c = map[status?.toLowerCase()] ?? map.pending
  return (
    <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 100, fontWeight: 700,
      letterSpacing: '0.12em', background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      fontFamily: 'var(--font-mono)', textTransform: 'uppercase' as const }}>
      {status}
    </span>
  )
}

function Tag({ label, color = '#a78bfa', bg = '#7c3aed15', border = '#7c3aed30' }: any) {
  return (
    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4,
      background: bg, border: `1px solid ${border}`, color }}>
      {label}
    </span>
  )
}

function extractVars(text: string): string[] {
  const vars: string[] = []
  const rx = /\{\{([^}]+)\}\}/g; let m
  while ((m = rx.exec(text)) !== null) if (!vars.includes(m[1])) vars.push(m[1])
  return vars
}

function renderPreview(text: string, values: Record<string, string>): string {
  return text.replace(/\{\{([^}]+)\}\}/g, (_, key) => values[key] || `{{${key}}}`)
}

// ── Get the Cloudinary (or any stored) URL from template media ─────────────
// Priority: media[].url (Cloudinary) → headerMediaUrl → null
function getTemplateImageUrl(template: any): string | null {
  if (!template) return null

  // 1. Check media array for header image (from Cloudinary/CDN upload)
  if (Array.isArray(template.media) && template.media.length > 0) {
    const headerMedia = template.media.find((m: any) => m.isHeader && m.url)
    if (headerMedia?.url) return headerMedia.url
    // fallback: any media with a url
    const anyMedia = template.media.find((m: any) => m.url)
    if (anyMedia?.url) return anyMedia.url
  }

  // 2. Check direct headerMediaUrl field (if stored on template)
  if (template.headerMediaUrl) return template.headerMediaUrl

  return null
}

// ── Phone mockup preview ───────────────────────────────────────────────────
function PhonePreview({ template, previewBody, overrideImgUrl }: {
  template: any
  previewBody: string
  overrideImgUrl?: string | null   // custom image chosen by user at send time
}) {
  const headerComp  = template?.components?.find((c: any) => c.type === 'HEADER')
  const footerComp  = template?.components?.find((c: any) => c.type === 'FOOTER')
  const buttonsComp = template?.components?.find((c: any) => c.type === 'BUTTONS')

  // Image URL: user override > Cloudinary stored > placeholder
  const imgSrc = overrideImgUrl || getTemplateImageUrl(template)

  return (
    <div style={{ background: '#1a1a2e', borderRadius: 24, padding: '16px 10px', border: '6px solid #333' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px 10px', fontSize: 10, color: '#888' }}>
        <span>9:41</span><span>● ● ●</span>
      </div>
      <div style={{ background: '#0b1418', borderRadius: 14, minHeight: 240, padding: 10,
        backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff08 1px, transparent 0)',
        backgroundSize: '20px 20px' }}>
        {!template ? (
          <div style={{ padding: 20, textAlign: 'center', color: '#8696a0', fontSize: 12 }}>
            Select a template to preview
          </div>
        ) : (
          <div style={{ maxWidth: '88%', background: '#202c33', borderRadius: '0 10px 10px 10px',
            overflow: 'hidden', boxShadow: '0 2px 8px #0004' }}>

            {/* Header */}
            {headerComp && (() => {
              if (headerComp.format === 'TEXT') return (
                <div style={{ padding: '10px 12px 6px', fontSize: 13, fontWeight: 700, color: '#e9edef' }}>
                  {headerComp.text}
                </div>
              )
              if (headerComp.format === 'IMAGE') return (
                <div style={{ height: 150, background: '#2a3942', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                  {imgSrc ? (
                    <img src={imgSrc} alt="header"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#8696a0' }}>
                      <div style={{ fontSize: 32 }}>🖼</div>
                      <div style={{ fontSize: 10, marginTop: 4 }}>Image header</div>
                    </div>
                  )}
                </div>
              )
              if (headerComp.format === 'VIDEO') return (
                <div style={{ height: 130, background: '#2a3942', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 32 }}>▶</span>
                  <span style={{ fontSize: 10, color: '#8696a0' }}>Video</span>
                </div>
              )
              if (headerComp.format === 'DOCUMENT') return (
                <div style={{ padding: '10px 12px', background: '#2a3942', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>📄</span>
                  <span style={{ fontSize: 11, color: '#8696a0' }}>Document</span>
                </div>
              )
              return null
            })()}

            {/* Body */}
            <div style={{ padding: '10px 12px', fontSize: 12, color: '#e9edef',
              lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {previewBody || <span style={{ color: '#8696a0' }}>Message body...</span>}
            </div>

            {/* Footer */}
            {footerComp && (
              <div style={{ padding: '2px 12px 8px', fontSize: 10, color: '#8696a0' }}>{footerComp.text}</div>
            )}

            {/* Timestamp */}
            <div style={{ padding: '0 12px 6px', fontSize: 9, color: '#8696a0', textAlign: 'right' }}>
              {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} ✓✓
            </div>

            {/* Buttons */}
            {buttonsComp?.buttons && (
              <div style={{ borderTop: '1px solid #3b4a54' }}>
                {buttonsComp.buttons.slice(0, 3).map((btn: any, i: number) => (
                  <div key={i} style={{ padding: '9px 12px', textAlign: 'center', fontSize: 12, color: '#53bdeb',
                    borderBottom: i < Math.min(buttonsComp.buttons.length, 3) - 1 ? '1px solid #3b4a54' : undefined,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    {btn.type === 'URL' && '↗ '}{btn.type === 'PHONE_NUMBER' && '📞 '}{btn.text}
                  </div>
                ))}
                {buttonsComp.buttons.length > 3 && (
                  <div style={{ padding: '8px', textAlign: 'center', fontSize: 11, color: '#53bdeb', borderTop: '1px solid #3b4a54' }}>
                    ≡ See all {buttonsComp.buttons.length} options
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────
function MessagesContent() {
  const searchParams    = useSearchParams()
  const templateIdParam = searchParams.get('template')

  // Mode
  const [sendMode, setSendMode] = useState<'single' | 'bulk'>('single')

  // Templates
  const [templates, setTemplates]     = useState<any[]>([])
  const [selectedTpl, setSelectedTpl] = useState<any>(null)
  const [loadingTpls, setLoadingTpls] = useState(true)
  const [tplSearch, setTplSearch]     = useState('')
  const [showTplList, setShowTplList] = useState(false)

  // Variables
  const [varValues, setVarValues] = useState<Record<string, string>>({})

  // Image override state (user can override the stored Cloudinary image)
  const [useCustomImage, setUseCustomImage]         = useState(false)
  const [customImagePreview, setCustomImagePreview] = useState('')
  const [customImageUrl, setCustomImageUrl]         = useState('')
  const [uploadingImage, setUploadingImage]         = useState(false)

  // Single send
  const [phone, setPhone]     = useState('')
  const [sending, setSending] = useState(false)

  // Bulk send
  const [bulkInputMode, setBulkInputMode] = useState<'manual' | 'csv'>('manual')
  const [phoneList, setPhoneList]         = useState('')
  const [csvText, setCsvText]             = useState('')
  const [jobLabel, setJobLabel]           = useState('')
  const [launching, setLaunching]         = useState(false)

  // Jobs
  const [jobs, setJobs]               = useState<any[]>([])
  const [expandedJob, setExpandedJob] = useState<string | null>(null)

  // Toast
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 4000)
  }

  // ── Load templates ─────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/templates?status=approved')
      .then(r => r.json())
      .then(d => {
        const list = d.data ?? []
        setTemplates(list)
        if (templateIdParam) {
          const found = list.find((t: any) => t.id === templateIdParam)
          if (found) setSelectedTpl(found)
        }
        setLoadingTpls(false)
      })
  }, [templateIdParam])

  // ── Load jobs ──────────────────────────────────────────────────────────
  const loadJobs = () => {
    fetch('/api/messages/bulk')
      .then(r => r.json())
      .then(d => setJobs(d.data ?? []))
  }
  useEffect(() => { loadJobs() }, [])

  // ── Poll running jobs ──────────────────────────────────────────────────
  useEffect(() => {
    const running = jobs.filter(j => j.status === 'running')
    if (running.length === 0) return
    const iv = setInterval(async () => {
      const updated = await Promise.all(
        running.map(j =>
          fetch(`/api/messages/bulk/${j.id}`)
            .then(r => r.json())
            .then(d => d.data)
        )
      )
      setJobs(prev => {
        const map = new Map(prev.map(j => [j.id, j]))
        updated.filter(Boolean).forEach(j => map.set(j.id, { ...map.get(j.id), ...j }))
        return Array.from(map.values())
      })
    }, 1500)
    return () => clearInterval(iv)
  }, [jobs])

  // ── Reset when template changes ────────────────────────────────────────
  useEffect(() => {
    if (selectedTpl) {
      const vars = extractVars(selectedTpl.body)
      const init: Record<string, string> = {}
      vars.forEach(v => { init[v] = '' })
      setVarValues(init)
      // Reset image override
      setUseCustomImage(false)
      setCustomImagePreview('')
      setCustomImageUrl('')
    }
  }, [selectedTpl])

  // ── Derived values ─────────────────────────────────────────────────────
  const bodyVars        = selectedTpl ? extractVars(selectedTpl.body) : []
  const headerComp      = selectedTpl?.components?.find((c: any) => c.type === 'HEADER')
  const hasImageHeader  = headerComp?.format === 'IMAGE'

  // The Cloudinary URL stored in DB (from template creation)
  const storedImageUrl  = getTemplateImageUrl(selectedTpl)

  // What shows in the preview
  const previewImgUrl   = useCustomImage
    ? (customImagePreview || customImageUrl)
    : storedImageUrl

  const previewBody     = selectedTpl ? renderPreview(selectedTpl.body, varValues) : ''

  const filteredTpls    = templates.filter(t =>
    t.name?.toLowerCase().includes(tplSearch.toLowerCase()) ||
    t.category?.toLowerCase().includes(tplSearch.toLowerCase())
  )

  const recipientCount  = bulkInputMode === 'csv'
    ? Math.max(0, csvText.trim().split('\n').filter(Boolean).length - 1)
    : phoneList.split(/[\n,;]+/).map(s => s.trim()).filter(s => s.length >= 7).length

  // ── Upload custom image ────────────────────────────────────────────────
  const handleImageUpload = async (file: File) => {
    setCustomImagePreview(URL.createObjectURL(file))
    setUploadingImage(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('type', 'image')
      const res  = await fetch('/api/upload-media', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success && data.cloudinaryUrl) {
        // Store the Cloudinary URL for sending
        setCustomImageUrl(data.cloudinaryUrl)
        setCustomImagePreview(data.cloudinaryUrl)
        showToast('✓ Image uploaded', true)
      } else {
        showToast(`✕ Upload failed: ${data.error}`, false)
        setCustomImagePreview('')
      }
    } catch (err: any) {
      showToast(`✕ ${err.message}`, false)
      setCustomImagePreview('')
    }
    setUploadingImage(false)
  }

  // ── Build variables for sending ────────────────────────────────────────
  // KEY FIX: _header_url is set to either:
  //   1. User's custom image URL (if they chose to override)
  //   2. The Cloudinary URL stored in the template DB record (storedImageUrl)
  //   3. Nothing if neither exists (template will use its Meta example image)
  const buildVariables = (): Record<string, string> => {
    const vars: Record<string, string> = {}

    // Body variables
    bodyVars.forEach(v => { vars[v] = varValues[v] || '' })

    // Image header URL - use Cloudinary URL, not Meta handle
    if (hasImageHeader) {
      const imageUrlToSend = useCustomImage
        ? customImageUrl.trim()     // user override
        : storedImageUrl ?? ''      // stored Cloudinary URL from template DB

      if (imageUrlToSend) {
        vars['_header_url'] = imageUrlToSend   // whatsapp-service.ts reads this
      }
    }

    return vars
  }

  // ── Single send ────────────────────────────────────────────────────────
  const handleSingleSend = async () => {
    if (!selectedTpl || phone.trim().length < 7) return
    setSending(true)
    try {
      const variables = buildVariables()
      console.log('📤 Sending with variables:', variables)

      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type:         'template',
          to:           phone.replace(/\D/g, ''),
          templateId:   selectedTpl.id,
          templateName: selectedTpl.name,
          language:     selectedTpl.language,
          variables,
        }),
      })
      const data = await res.json()
      if (data.success) {
        showToast(`✓ Sent to +${phone.replace(/\D/g, '')}!`, true)
        setPhone('')
      } else {
        showToast(`✕ ${data.error}`, false)
      }
    } catch (err: any) {
      showToast(`✕ ${err.message}`, false)
    }
    setSending(false)
  }

  // ── Bulk send ──────────────────────────────────────────────────────────
  const handleBulkSend = async () => {
    if (!selectedTpl) return
    setLaunching(true)
    try {
      const payload: any = {
        type:       'template',
        templateId: selectedTpl.id,
        label:      jobLabel || `${selectedTpl.name} — bulk`,
      }

      if (bulkInputMode === 'csv') {
        payload.csv = csvText
      } else {
        payload.phones = phoneList
      }

      // For bulk: if template has IMAGE header, inject _header_url into all recipients
      // The bulk processor will use this for every recipient
      if (hasImageHeader) {
        const imageUrlToSend = useCustomImage
          ? customImageUrl.trim()
          : storedImageUrl ?? ''
        
        if (imageUrlToSend) {
          payload.headerImageUrl = imageUrlToSend  // API can inject into each recipient's variables
        }
      }

      const res  = await fetch('/api/messages/bulk', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.success) {
        showToast(`✓ Bulk job started — ${data.data.total} recipients`, true)
        setPhoneList(''); setCsvText(''); setJobLabel('')
        loadJobs()
      } else {
        showToast(`✕ ${data.error}`, false)
      }
    } catch (err: any) {
      showToast(`✕ ${err.message}`, false)
    }
    setLaunching(false)
  }

  const cancelJob = async (id: string) => {
    await fetch(`/api/messages/bulk/${id}`, { method: 'PATCH' })
    loadJobs()
  }
  const deleteJob = async (id: string) => {
    await fetch(`/api/messages/bulk/${id}`, { method: 'DELETE' })
    setJobs(p => p.filter(j => j.id !== id))
  }

  const canSingleSend = !!(selectedTpl && phone.trim().length >= 7)
  const canBulkSend   = !!(selectedTpl && recipientCount > 0)

  // ── RENDER ──────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, padding: '32px 36px', minHeight: '100vh',
        maxWidth: 'calc(100vw - 220px)', boxSizing: 'border-box' as const }}>

        {/* Page header */}
        <div style={{ marginBottom: 28 }}>
          <a href="/templates" style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--font-mono)',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
            ← Templates
          </a>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, margin: 0 }}>
            Send Message
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>
            Send WhatsApp templates to one or many recipients
          </p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 28, background: 'var(--surface2)',
          border: '1px solid var(--border)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
          {(['single', 'bulk'] as const).map(mode => (
            <button key={mode} onClick={() => setSendMode(mode)} style={{
              padding: '8px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: sendMode === mode ? 'var(--surface)' : 'transparent',
              color:      sendMode === mode ? 'var(--text)'    : 'var(--muted)',
              fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: sendMode === mode ? 700 : 400,
              boxShadow: sendMode === mode ? '0 1px 4px #0002' : 'none',
              transition: 'all 0.15s',
            }}>
              {mode === 'single' ? '👤 Single' : '👥 Bulk'}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

          {/* ── LEFT: Form ── */}
          <div>

            {/* ── Template Selector ── */}
            <div style={S.section}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Template</div>
                {selectedTpl && (
                  <button onClick={() => { setShowTplList(!showTplList); setTplSearch('') }}
                    style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid var(--border)',
                      background: 'var(--surface2)', color: 'var(--muted)', fontSize: 11,
                      fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
                    {showTplList ? 'Cancel' : 'Change'}
                  </button>
                )}
              </div>

              {/* Selected template chip */}
              {selectedTpl && !showTplList && (
                <div style={{ padding: '14px 16px', borderRadius: 10, background: '#00e5a010', border: '1px solid #00e5a040' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' as const }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#00e5a0' }}>{selectedTpl.name}</span>
                    <Badge status={selectedTpl.status} />
                    <Tag label={selectedTpl.category} color='var(--muted)' bg='var(--surface)' border='var(--border)' />
                    <Tag label={selectedTpl.language?.toUpperCase()} color='var(--muted)' bg='var(--surface)' border='var(--border)' />
                    {hasImageHeader && (
                      <Tag label={storedImageUrl ? '🖼 Image ready' : '🖼 IMAGE'} 
                        color={storedImageUrl ? '#00e5a0' : '#a78bfa'} 
                        bg={storedImageUrl ? '#00e5a015' : '#7c3aed15'} 
                        border={storedImageUrl ? '#00e5a030' : '#7c3aed30'} />
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{selectedTpl.body}</div>
                </div>
              )}

              {/* Template list */}
              {(!selectedTpl || showTplList) && (
                <>
                  <input value={tplSearch} onChange={e => setTplSearch(e.target.value)}
                    placeholder="Search templates..." style={{ ...S.input, marginBottom: 10 }} />
                  {loadingTpls ? (
                    <div style={{ padding: 16, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>Loading...</div>
                  ) : filteredTpls.length === 0 ? (
                    <div style={{ padding: 16, textAlign: 'center', color: 'var(--muted)', fontSize: 13,
                      background: 'var(--surface2)', borderRadius: 8 }}>
                      No approved templates.{' '}
                      <a href="/templates" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sync from Meta →</a>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, maxHeight: 300, overflowY: 'auto' }}>
                      {filteredTpls.map(t => {
                        const tHeader = t.components?.find((c: any) => c.type === 'HEADER')
                        const tBtns   = t.components?.find((c: any) => c.type === 'BUTTONS')
                        const tImgUrl = getTemplateImageUrl(t)
                        return (
                          <div key={t.id} onClick={() => { setSelectedTpl(t); setShowTplList(false) }}
                            style={{ padding: '12px 14px', borderRadius: 8, cursor: 'pointer',
                              background: 'var(--surface2)', border: '1px solid var(--border)', transition: 'all 0.12s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#00e5a050' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' as const }}>
                              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t.name}</span>
                              <Badge status={t.status} />
                              <Tag label={t.category} color='var(--muted)' bg='var(--surface)' border='var(--border)' />
                              {tHeader?.format === 'IMAGE' && (
                                <Tag label={tImgUrl ? '🖼 has image' : '🖼 no image'} 
                                  color={tImgUrl ? '#00e5a0' : '#f59e0b'}
                                  bg={tImgUrl ? '#00e5a010' : '#f59e0b10'}
                                  border={tImgUrl ? '#00e5a030' : '#f59e0b30'} />
                              )}
                              {tBtns && <Tag label={`${tBtns.buttons.length}btn`} color='#53bdeb' bg='#53bdeb10' border='#53bdeb20' />}
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--muted)', overflow: 'hidden',
                              textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.body}</div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Image Header Section (only if template has IMAGE header) ── */}
            {selectedTpl && hasImageHeader && !showTplList && (
              <div style={S.section}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                  Header Image
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>
                  {storedImageUrl
                    ? 'This template has a stored image from Cloudinary. You can use it or override with a different one.'
                    : 'This template has an IMAGE header. Provide a public image URL to send.'}
                </div>

                {/* Stored image info */}
                {storedImageUrl && (
                  <div style={{ 
                    display: 'flex', alignItems: 'center', gap: 12, 
                    padding: '12px 14px', background: '#00e5a010', 
                    border: '1px solid #00e5a030', borderRadius: 8, marginBottom: 16 
                  }}>
                    <img src={storedImageUrl} alt="stored"
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} 
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: '#00e5a0', fontWeight: 700, marginBottom: 2 }}>
                        ✓ Stored image (Cloudinary)
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--muted)', overflow: 'hidden',
                        textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {storedImageUrl}
                      </div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}>
                      <input type="checkbox" checked={useCustomImage}
                        onChange={e => setUseCustomImage(e.target.checked)}
                        style={{ cursor: 'pointer' }} />
                      <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                        Override
                      </span>
                    </label>
                  </div>
                )}

                {/* Custom image input (shown when no stored image, or user checked override) */}
                {(!storedImageUrl || useCustomImage) && (
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>

                    {/* File upload */}
                    <div>
                      <label style={S.label}>Upload file (uploads to Cloudinary)</label>
                      <div onClick={() => !uploadingImage && document.getElementById('msg-img-upload')?.click()}
                        style={{ border: '2px dashed var(--border)', borderRadius: 10, padding: 16,
                          textAlign: 'center' as const, cursor: uploadingImage ? 'wait' : 'pointer',
                          background: 'var(--surface2)', opacity: uploadingImage ? 0.6 : 1, transition: 'all 0.2s' }}>
                        {customImagePreview ? (
                          <>
                            <img src={customImagePreview} alt="preview"
                              style={{ maxHeight: 100, borderRadius: 8, maxWidth: '100%' }} />
                            <div style={{ fontSize: 11, marginTop: 6,
                              color: uploadingImage ? '#f59e0b' : customImageUrl ? '#00e5a0' : 'var(--muted)' }}>
                              {uploadingImage ? '⟳ Uploading to Cloudinary...'
                                : customImageUrl ? '✓ Uploaded — Cloudinary URL ready'
                                : 'Click to change'}
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ fontSize: 24, marginBottom: 6 }}>🖼</div>
                            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Click to upload JPG/PNG (max 5MB)</div>
                          </>
                        )}
                      </div>
                      <input id="msg-img-upload" type="file" accept="image/jpeg,image/png,image/jpg,image/webp"
                        style={{ display: 'none' }}
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>OR</span>
                      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                    </div>

                    {/* Paste URL directly */}
                    <div>
                      <label style={S.label}>Paste public Cloudinary / CDN URL</label>
                      <input value={customImageUrl}
                        onChange={e => {
                          setCustomImageUrl(e.target.value)
                          if (e.target.value.startsWith('http')) {
                            setCustomImagePreview(e.target.value)
                          }
                        }}
                        placeholder="https://res.cloudinary.com/your-cloud/image/upload/..." 
                        style={S.input} />
                      <p style={S.hint}>Must be a publicly accessible HTTPS URL — WhatsApp will fetch it directly</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Variables ── */}
            {selectedTpl && bodyVars.length > 0 && !showTplList && (
              <div style={S.section}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Variables</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Fill in the placeholder values</div>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
                  {bodyVars.map(v => (
                    <div key={v}>
                      <label style={S.label}>{`{{${v}}}`}</label>
                      <input value={varValues[v] ?? ''}
                        onChange={e => setVarValues(p => ({ ...p, [v]: e.target.value }))}
                        placeholder={`Value for {{${v}}}`} style={S.input} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SINGLE SEND ── */}
            {sendMode === 'single' && selectedTpl && !showTplList && (
              <>
                <div style={S.section}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Recipient</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Phone number to send to</div>
                  <label style={S.label}>Phone number</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="917892358529 or +91 78923 58529" style={S.input} />
                  <p style={S.hint}>Include country code · spaces and dashes are stripped</p>
                </div>

                {/* Image URL that will be used */}
                {hasImageHeader && (
                  <div style={{ 
                    padding: '10px 14px', background: 'var(--surface2)', 
                    border: '1px solid var(--border)', borderRadius: 8, marginBottom: 20,
                    fontSize: 11, fontFamily: 'var(--font-mono)' 
                  }}>
                    <span style={{ color: 'var(--muted)' }}>Image URL to send: </span>
                    <span style={{ color: buildVariables()['_header_url'] ? '#00e5a0' : '#f59e0b' }}>
                      {buildVariables()['_header_url'] || '⚠ No image URL — template example will be used'}
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleSingleSend} disabled={!canSingleSend || sending}
                    style={{ padding: '12px 32px', borderRadius: 8, border: '1px solid #00e5a050',
                      background: '#00e5a015', color: '#00e5a0', fontSize: 13, fontFamily: 'var(--font-mono)',
                      cursor: !canSingleSend || sending ? 'not-allowed' : 'pointer',
                      opacity: !canSingleSend || sending ? 0.5 : 1 }}>
                    {sending ? '⟳ Sending...' : '📤 Send Message'}
                  </button>
                </div>
              </>
            )}

            {/* ── BULK SEND ── */}
            {sendMode === 'bulk' && selectedTpl && !showTplList && (
              <>
                <div style={S.section}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Recipients</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Add phone numbers or upload CSV</div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={S.label}>Job label (optional)</label>
                    <input value={jobLabel} onChange={e => setJobLabel(e.target.value)}
                      placeholder="e.g. May campaign" style={S.input} />
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    {(['manual', 'csv'] as const).map(m => (
                      <button key={m} onClick={() => setBulkInputMode(m)} style={{
                        padding: '7px 16px', borderRadius: 8, cursor: 'pointer',
                        background: bulkInputMode === m ? 'var(--surface2)' : 'transparent',
                        border: `1px solid ${bulkInputMode === m ? 'var(--border)' : 'transparent'}`,
                        color: bulkInputMode === m ? 'var(--text)' : 'var(--muted)',
                        fontSize: 12, fontFamily: 'var(--font-mono)',
                      }}>
                        {m === 'manual' ? '✎ Paste numbers' : '⬆ CSV'}
                      </button>
                    ))}
                  </div>

                  {bulkInputMode === 'manual' ? (
                    <>
                      <label style={S.label}>Phone numbers (one per line, comma, or semicolon)</label>
                      <textarea value={phoneList} onChange={e => setPhoneList(e.target.value)}
                        placeholder={'+917892358529\n+918765432109'}
                        rows={6} style={{ ...S.input, resize: 'vertical' as const }} />
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
                        {recipientCount} recipient{recipientCount !== 1 ? 's' : ''} detected · Include country code
                      </div>
                    </>
                  ) : (
                    <>
                      <label style={S.label}>CSV content (first column must be "phone")</label>
                      <textarea value={csvText} onChange={e => setCsvText(e.target.value)}
                        placeholder={'phone,name\n917892358529,Raj\n918765432109,Priya'}
                        rows={6} style={{ ...S.input, resize: 'vertical' as const, fontSize: 12 }} />
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
                        {recipientCount} recipient{recipientCount !== 1 ? 's' : ''} detected
                      </div>
                    </>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={handleBulkSend} disabled={!canBulkSend || launching}
                    style={{ padding: '12px 32px', borderRadius: 8, border: '1px solid #00e5a050',
                      background: '#00e5a015', color: '#00e5a0', fontSize: 13, fontFamily: 'var(--font-mono)',
                      cursor: !canBulkSend || launching ? 'not-allowed' : 'pointer',
                      opacity: !canBulkSend || launching ? 0.5 : 1 }}>
                    {launching ? '⟳ Starting...' : `🚀 Send to ${recipientCount} recipient${recipientCount !== 1 ? 's' : ''}`}
                  </button>
                </div>

                {/* Jobs history */}
                {jobs.length > 0 && (
                  <div style={{ marginTop: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>Job History</div>
                      <button onClick={loadJobs} style={{ padding: '6px 14px', borderRadius: 6,
                        border: '1px solid var(--border)', background: 'var(--surface2)',
                        color: 'var(--muted)', fontSize: 11, fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
                        ↻ Refresh
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                      {jobs.map((job: any) => {
                        const isExp     = expandedJob === job.id
                        const processed = (job.sent ?? 0) + (job.failed ?? 0)
                        const pct       = job.total > 0 ? Math.round((processed / job.total) * 100) : 0
                        const sc: any   = { running: '#f59e0b', completed: '#00e5a0', failed: '#ef4444', cancelled: '#6b7280' }
                        const color     = sc[job.status] ?? '#6b7280'
                        return (
                          <div key={job.id} onClick={() => setExpandedJob(isExp ? null : job.id)}
                            style={{ background: 'var(--surface)', border: '1px solid var(--border)',
                              borderRadius: 10, padding: '14px 16px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                              <div>
                                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginRight: 8 }}>{job.label}</span>
                                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 100, fontWeight: 700,
                                  background: `${color}15`, border: `1px solid ${color}40`, color,
                                  fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                                  {job.status?.toUpperCase()}
                                </span>
                              </div>
                              <span style={{ color: 'var(--muted)', fontSize: 14 }}>{isExp ? '▲' : '▼'}</span>
                            </div>
                            <div style={{ height: 5, borderRadius: 99, background: 'var(--surface2)', overflow: 'hidden', marginBottom: 8 }}>
                              <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.4s' }} />
                            </div>
                            <div style={{ display: 'flex', gap: 16, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                              <span style={{ color: 'var(--muted)' }}>Total <span style={{ color: 'var(--text)' }}>{job.total}</span></span>
                              <span style={{ color: 'var(--muted)' }}>Sent <span style={{ color: '#00e5a0' }}>{job.sent ?? 0}</span></span>
                              {(job.failed ?? 0) > 0 && <span style={{ color: 'var(--muted)' }}>Failed <span style={{ color: '#ef4444' }}>{job.failed}</span></span>}
                              <span style={{ marginLeft: 'auto', color: 'var(--muted)' }}>{pct}%</span>
                            </div>
                            {isExp && (
                              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}
                                onClick={e => e.stopPropagation()}>
                                {job.errors?.length > 0 && (
                                  <div style={{ marginBottom: 10 }}>
                                    <div style={{ fontSize: 11, color: '#ef4444', marginBottom: 6 }}>Errors:</div>
                                    {job.errors.slice(-3).map((e: any, i: number) => (
                                      <div key={i} style={{ fontSize: 11, color: 'var(--muted)', padding: '3px 0' }}>
                                        <span style={{ color: 'var(--text)' }}>{e.phone}</span> — {e.reason}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div style={{ display: 'flex', gap: 8 }}>
                                  {job.status === 'running' && (
                                    <button onClick={() => cancelJob(job.id)}
                                      style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #f59e0b40',
                                        background: '#f59e0b10', color: '#f59e0b', fontSize: 11,
                                        fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
                                      ⏹ Cancel
                                    </button>
                                  )}
                                  {['completed', 'failed', 'cancelled'].includes(job.status) && (
                                    <button onClick={() => deleteJob(job.id)}
                                      style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #ef444440',
                                        background: '#ef444410', color: '#ef4444', fontSize: 11,
                                        fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
                                      ✕ Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── RIGHT: Live Preview ── */}
          <div style={{ position: 'sticky', top: 24 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em',
              marginBottom: 12, fontFamily: 'var(--font-mono)' }}>LIVE PREVIEW</div>

            <PhonePreview
              template={selectedTpl}
              previewBody={previewBody}
              overrideImgUrl={useCustomImage ? (customImagePreview || customImageUrl) : null}
            />

            {/* Template info card */}
            {selectedTpl && (
              <div style={{ marginTop: 14, background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.1em' }}>TEMPLATE INFO</div>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6, fontSize: 11 }}>
                  {[
                    { label: 'Name',     value: selectedTpl.name, mono: true },
                    { label: 'Category', value: selectedTpl.category },
                    { label: 'Language', value: selectedTpl.language?.toUpperCase() },
                    { label: 'Header',   value: headerComp?.format ?? 'None', cap: true },
                    { label: 'Buttons',  value: String(selectedTpl.components?.find((c: any) => c.type === 'BUTTONS')?.buttons?.length ?? 0) },
                    { label: 'Vars',     value: bodyVars.length > 0 ? bodyVars.map(v => `{{${v}}}`).join(', ') : 'None', purple: bodyVars.length > 0 },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{row.label}</span>
                      <span style={{
                        color: (row as any).purple ? '#a78bfa' : 'var(--text)',
                        fontFamily: row.mono ? 'var(--font-mono)' : undefined,
                        textTransform: (row as any).cap ? 'capitalize' : undefined,
                        textAlign: 'right', wordBreak: 'break-all'
                      }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                  {/* Show image URL source */}
                  {hasImageHeader && (
                    <div style={{ paddingTop: 6, borderTop: '1px solid var(--border)' }}>
                      <div style={{ color: 'var(--muted)', marginBottom: 2 }}>Image source</div>
                      <div style={{ fontSize: 10, color: storedImageUrl ? '#00e5a0' : '#f59e0b' }}>
                        {useCustomImage
                          ? (customImageUrl ? '⬆ Custom upload' : '⚠ No image set')
                          : storedImageUrl
                            ? '✓ Cloudinary (stored)'
                            : '⚠ No image stored'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recipient info */}
            {sendMode === 'single' && phone.trim() && (
              <div style={{ marginTop: 10, background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 6, letterSpacing: '0.1em' }}>SENDING TO</div>
                <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>
                  +{phone.replace(/\D/g, '')}
                </div>
              </div>
            )}

            {sendMode === 'bulk' && recipientCount > 0 && (
              <div style={{ marginTop: 10, background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 6, letterSpacing: '0.1em' }}>BULK RECIPIENTS</div>
                <div style={{ fontSize: 24, fontFamily: 'var(--font-display)', fontWeight: 800, color: '#00e5a0' }}>
                  {recipientCount}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>recipients ready to send</div>
              </div>
            )}
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 200,
            background: 'var(--surface)',
            border: `1px solid ${toast.ok ? '#00e5a050' : '#ef444450'}`,
            color: toast.ok ? '#00e5a0' : '#ef4444',
            padding: '12px 24px', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-mono)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            {toast.msg}
          </div>
        )}
      </main>
    </div>
  )
}

export default function MessagesPage() {
    useAdminAuth()

  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        Loading...
      </div>
    }>
      <MessagesContent />
    </Suspense>
  )
}