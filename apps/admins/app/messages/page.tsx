'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Sidebar from '../components/Sidebar'
import useAdminAuth from '@/hooks/useAdminAuth'

// ── Helpers ───────────────────────────────────────────────────────────────────
function extractVars(text: string): string[] {
  const vars: string[] = []
  const rx = /\{\{([^}]+)\}\}/g; let m
  while ((m = rx.exec(text)) !== null) if (!vars.includes(m[1])) vars.push(m[1])
  return vars
}
function renderPreview(text: string, values: Record<string, string>): string {
  return text.replace(/\{\{([^}]+)\}\}/g, (_, k) => values[k] || `{{${k}}}`)
}
function getTemplateImageUrl(template: any): string | null {
  if (!template) return null
  if (Array.isArray(template.media) && template.media.length > 0) {
    const h = template.media.find((m: any) => m.isHeader && m.url)
    if (h?.url) return h.url
    const a = template.media.find((m: any) => m.url)
    if (a?.url) return a.url
  }
  if (template.headerMediaUrl) return template.headerMediaUrl
  return null
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: 'bg-[#00e5a015] border-[#00e5a040] text-[#00e5a0]',
    pending:  'bg-[#f59e0b15] border-[#f59e0b40] text-[#f59e0b]',
    rejected: 'bg-[#ef444415] border-[#ef444440] text-[#ef4444]',
  }
  return (
    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold tracking-[0.12em] uppercase font-mono border ${map[status?.toLowerCase()] ?? map.pending}`}>
      {status}
    </span>
  )
}

function Tag({ label, color = '#a78bfa', bg = '#7c3aed15', border = '#7c3aed30' }: any) {
  return (
    <span className="text-[10px] px-2 py-0.5 rounded"
      style={{ color, background: bg, border: `1px solid ${border}` }}>
      {label}
    </span>
  )
}

// ── Phone preview ─────────────────────────────────────────────────────────────
function PhonePreview({ template, previewBody, overrideImgUrl }: {
  template: any; previewBody: string; overrideImgUrl?: string | null
}) {
  const headerComp  = template?.components?.find((c: any) => c.type === 'HEADER')
  const footerComp  = template?.components?.find((c: any) => c.type === 'FOOTER')
  const buttonsComp = template?.components?.find((c: any) => c.type === 'BUTTONS')
  const imgSrc      = overrideImgUrl || getTemplateImageUrl(template)

  return (
    <div className="bg-[#1a1a2e] rounded-[22px] p-3.5 border-[5px] border-[#333]">
      <div className="flex justify-between px-2 pb-2 text-[10px] text-[#888]">
        <span>9:41</span><span>● ● ●</span>
      </div>
      <div className="bg-[#0b1418] rounded-[14px] min-h-[200px] p-2.5"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff08 1px, transparent 0)', backgroundSize: '20px 20px' }}>
        {!template ? (
          <div className="py-5 text-center text-[#8696a0] text-[12px]">Select a template to preview</div>
        ) : (
          <div className="max-w-[88%] bg-[#202c33] rounded-[0_10px_10px_10px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.25)]">

            {/* Header */}
            {headerComp && (() => {
              if (headerComp.format === 'TEXT') return (
                <div className="px-3 pt-2.5 pb-1.5 text-[13px] font-bold text-[#e9edef]">{headerComp.text}</div>
              )
              if (headerComp.format === 'IMAGE') return (
                <div className="h-[140px] bg-[#2a3942] flex items-center justify-center overflow-hidden">
                  {imgSrc
                    ? <img src={imgSrc} alt="header" className="w-full h-full object-cover" />
                    : <div className="text-center text-[#8696a0]"><div className="text-[30px]">🖼</div><div className="text-[10px] mt-1">Image header</div></div>}
                </div>
              )
              if (headerComp.format === 'VIDEO') return (
                <div className="h-[120px] bg-[#2a3942] flex flex-col items-center justify-center gap-1.5">
                  <span className="text-[28px]">▶</span>
                  <span className="text-[10px] text-[#8696a0]">Video</span>
                </div>
              )
              if (headerComp.format === 'DOCUMENT') return (
                <div className="px-3 py-2.5 bg-[#2a3942] flex items-center gap-2">
                  <span className="text-xl">📄</span>
                  <span className="text-[11px] text-[#8696a0]">Document</span>
                </div>
              )
              return null
            })()}

            {/* Body */}
            <div className="px-3 py-2.5 text-[12px] text-[#e9edef] leading-relaxed whitespace-pre-wrap break-words">
              {previewBody || <span className="text-[#8696a0]">Message body...</span>}
            </div>

            {/* Footer */}
            {footerComp && <div className="px-3 pb-2 text-[10px] text-[#8696a0]">{footerComp.text}</div>}

            {/* Timestamp */}
            <div className="px-3 pb-1.5 text-[9px] text-[#8696a0] text-right">
              {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} ✓✓
            </div>

            {/* Buttons */}
            {buttonsComp?.buttons && (
              <div className="border-t border-[#3b4a54]">
                {buttonsComp.buttons.slice(0, 3).map((btn: any, i: number) => (
                  <div key={i}
                    className="px-3 py-2 text-center text-[12px] text-[#53bdeb] flex items-center justify-center gap-1"
                    style={{ borderBottom: i < Math.min(buttonsComp.buttons.length, 3) - 1 ? '1px solid #3b4a54' : undefined }}>
                    {btn.type === 'URL' && '↗ '}{btn.type === 'PHONE_NUMBER' && '📞 '}{btn.text}
                  </div>
                ))}
                {buttonsComp.buttons.length > 3 && (
                  <div className="p-2 text-center text-[11px] text-[#53bdeb] border-t border-[#3b4a54]">
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

// ── Preview bottom drawer (mobile) ────────────────────────────────────────────
function PreviewDrawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  return (
    <>
      <div onClick={onClose}
        className={`fixed inset-0 z-80 bg-black/60 backdrop-blur-sm transition-opacity duration-250 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
      <div className={`fixed bottom-0 left-0 right-0 z-90 bg-[var(--surface)] rounded-t-[20px] border border-[var(--border)] px-4 pb-10 pt-4 max-h-[88vh] overflow-y-auto transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="w-10 h-1 rounded-full bg-[var(--border)] mx-auto mb-4" />
        <div className="flex justify-between items-center mb-4">
          <span className="text-[11px] text-[var(--muted)] tracking-[0.12em] font-mono">LIVE PREVIEW</span>
          <button onClick={onClose} className="bg-transparent border-none text-[var(--muted)] cursor-pointer text-lg p-1">✕</button>
        </div>
        {children}
      </div>
    </>
  )
}

// ── Shared input classes ──────────────────────────────────────────────────────
const INP = 'w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--text)] font-mono text-[13px] outline-none focus:border-[var(--accent)] transition-colors'
const LBL = 'block text-[11px] text-[var(--muted)] tracking-[0.12em] uppercase font-mono mb-1.5'
const CARD = 'bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 mb-4'

// ── Section wrapper (collapsible on mobile) ───────────────────────────────────
function Section({ title, subtitle, children, defaultOpen = true }: {
  title: string; subtitle?: string; children: React.ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={CARD}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start justify-between bg-transparent border-none p-0 cursor-pointer md:cursor-default text-left"
      >
        <div>
          <div className="font-bold text-[15px] text-[var(--text)] font-[var(--font-display)]">{title}</div>
          {subtitle && <div className="text-[12px] text-[var(--muted)] mt-0.5">{subtitle}</div>}
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className={`md:hidden flex-shrink-0 mt-1 transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'} text-[var(--muted)]`}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <div className={`md:block overflow-hidden transition-all duration-300 ${open ? 'mt-3.5' : 'max-h-0 md:max-h-none'}`}
        style={{ maxHeight: open ? undefined : 0 }}>
        {children}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN CONTENT
// ══════════════════════════════════════════════════════════════════════════════
function MessagesContent() {
  const searchParams    = useSearchParams()
  const templateIdParam = searchParams.get('template')

  const [sendMode, setSendMode]           = useState<'single' | 'bulk'>('single')
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  // Templates
  const [templates, setTemplates]         = useState<any[]>([])
  const [selectedTpl, setSelectedTpl]     = useState<any>(null)
  const [loadingTpls, setLoadingTpls]     = useState(true)
  const [tplSearch, setTplSearch]         = useState('')
  const [showTplList, setShowTplList]     = useState(false)

  // Variables
  const [varValues, setVarValues]         = useState<Record<string, string>>({})

  // Image override
  const [useCustomImage, setUseCustomImage]           = useState(false)
  const [customImagePreview, setCustomImagePreview]   = useState('')
  const [customImageUrl, setCustomImageUrl]           = useState('')
  const [uploadingImage, setUploadingImage]           = useState(false)

  // Single
  const [phone, setPhone]                 = useState('')
  const [sending, setSending]             = useState(false)

  // Bulk
  const [bulkInputMode, setBulkInputMode] = useState<'manual' | 'csv'>('manual')
  const [phoneList, setPhoneList]         = useState('')
  const [csvText, setCsvText]             = useState('')
  const [jobLabel, setJobLabel]           = useState('')
  const [launching, setLaunching]         = useState(false)

  // Jobs
  const [jobs, setJobs]                   = useState<any[]>([])
  const [expandedJob, setExpandedJob]     = useState<string | null>(null)

  // Toast
  const [toast, setToast]                 = useState<{ msg: string; ok: boolean } | null>(null)
  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 4000) }

  // ── Load templates ────────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/templates?status=approved').then(r => r.json()).then(d => {
      const list = d.data ?? []
      setTemplates(list)
      if (templateIdParam) {
        const found = list.find((t: any) => t.id === templateIdParam)
        if (found) setSelectedTpl(found)
      }
      setLoadingTpls(false)
    })
  }, [templateIdParam])

  // ── Load + poll jobs ──────────────────────────────────────────────────────
  const loadJobs = () => fetch('/api/messages/bulk').then(r => r.json()).then(d => setJobs(d.data ?? []))
  useEffect(() => { loadJobs() }, [])
  useEffect(() => {
    const running = jobs.filter(j => j.status === 'running')
    if (!running.length) return
    const iv = setInterval(async () => {
      const updated = await Promise.all(running.map(j =>
        fetch(`/api/messages/bulk/${j.id}`).then(r => r.json()).then(d => d.data)
      ))
      setJobs(prev => {
        const map = new Map(prev.map(j => [j.id, j]))
        updated.filter(Boolean).forEach(j => map.set(j.id, { ...map.get(j.id), ...j }))
        return Array.from(map.values())
      })
    }, 1500)
    return () => clearInterval(iv)
  }, [jobs])

  // ── Reset on template change ──────────────────────────────────────────────
  useEffect(() => {
    if (selectedTpl) {
      const vars = extractVars(selectedTpl.body)
      const init: Record<string, string> = {}
      vars.forEach(v => { init[v] = '' })
      setVarValues(init)
      setUseCustomImage(false); setCustomImagePreview(''); setCustomImageUrl('')
    }
  }, [selectedTpl])

  // ── Derived ───────────────────────────────────────────────────────────────
  const bodyVars       = selectedTpl ? extractVars(selectedTpl.body) : []
  const headerComp     = selectedTpl?.components?.find((c: any) => c.type === 'HEADER')
  const hasImageHeader = headerComp?.format === 'IMAGE'
  const storedImageUrl = getTemplateImageUrl(selectedTpl)
  const previewImgUrl  = useCustomImage ? (customImagePreview || customImageUrl) : storedImageUrl
  const previewBody    = selectedTpl ? renderPreview(selectedTpl.body, varValues) : ''
  const filteredTpls   = templates.filter(t =>
    t.name?.toLowerCase().includes(tplSearch.toLowerCase()) ||
    t.category?.toLowerCase().includes(tplSearch.toLowerCase())
  )
  const recipientCount = bulkInputMode === 'csv'
    ? Math.max(0, csvText.trim().split('\n').filter(Boolean).length - 1)
    : phoneList.split(/[\n,;]+/).map(s => s.trim()).filter(s => s.length >= 7).length

  const buildVariables = (): Record<string, string> => {
    const vars: Record<string, string> = {}
    bodyVars.forEach(v => { vars[v] = varValues[v] || '' })
    if (hasImageHeader) {
      const url = useCustomImage ? customImageUrl.trim() : storedImageUrl ?? ''
      if (url) vars['_header_url'] = url
    }
    return vars
  }

  // ── Image upload ──────────────────────────────────────────────────────────
  const handleImageUpload = async (file: File) => {
    setCustomImagePreview(URL.createObjectURL(file)); setUploadingImage(true)
    try {
      const fd = new FormData(); fd.append('file', file); fd.append('type', 'image')
      const res = await fetch('/api/upload-media', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success && data.cloudinaryUrl) {
        setCustomImageUrl(data.cloudinaryUrl); setCustomImagePreview(data.cloudinaryUrl); showToast('✓ Image uploaded')
      } else { showToast(`✕ Upload failed: ${data.error}`, false); setCustomImagePreview('') }
    } catch (err: any) { showToast(`✕ ${err.message}`, false); setCustomImagePreview('') }
    setUploadingImage(false)
  }

  // ── Single send ───────────────────────────────────────────────────────────
  const handleSingleSend = async () => {
    if (!selectedTpl || phone.trim().length < 7) return
    setSending(true)
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'template', to: phone.replace(/\D/g, ''),
          templateId: selectedTpl.id, templateName: selectedTpl.name,
          language: selectedTpl.language, variables: buildVariables() }),
      })
      const data = await res.json()
      if (data.success) { showToast(`✓ Sent to +${phone.replace(/\D/g, '')}!`); setPhone('') }
      else showToast(`✕ ${data.error}`, false)
    } catch (err: any) { showToast(`✕ ${err.message}`, false) }
    setSending(false)
  }

  // ── Bulk send ─────────────────────────────────────────────────────────────
  const handleBulkSend = async () => {
    if (!selectedTpl) return
    setLaunching(true)
    try {
      const payload: any = { type: 'template', templateId: selectedTpl.id, label: jobLabel || `${selectedTpl.name} — bulk` }
      if (bulkInputMode === 'csv') payload.csv = csvText; else payload.phones = phoneList
      if (hasImageHeader) {
        const url = useCustomImage ? customImageUrl.trim() : storedImageUrl ?? ''
        if (url) payload.headerImageUrl = url
      }
      const res  = await fetch('/api/messages/bulk', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data.success) {
        showToast(`✓ Bulk job started — ${data.data.total} recipients`)
        setPhoneList(''); setCsvText(''); setJobLabel(''); loadJobs()
      } else showToast(`✕ ${data.error}`, false)
    } catch (err: any) { showToast(`✕ ${err.message}`, false) }
    setLaunching(false)
  }

  const cancelJob = async (id: string) => { await fetch(`/api/messages/bulk/${id}`, { method: 'PATCH' }); loadJobs() }
  const deleteJob = async (id: string) => { await fetch(`/api/messages/bulk/${id}`, { method: 'DELETE' }); setJobs(p => p.filter(j => j.id !== id)) }

  const canSingleSend = !!(selectedTpl && phone.trim().length >= 7)
  const canBulkSend   = !!(selectedTpl && recipientCount > 0)

  // ── Shared preview panel ──────────────────────────────────────────────────
  const previewPanel = (
    <>
      <PhonePreview template={selectedTpl} previewBody={previewBody}
        overrideImgUrl={useCustomImage ? (customImagePreview || customImageUrl) : null} />

      {selectedTpl && (
        <div className="mt-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3.5">
          <div className="text-[10px] text-[var(--muted)] tracking-[0.1em] font-mono mb-2.5">TEMPLATE INFO</div>
          <div className="flex flex-col gap-1.5 text-[11px]">
            {[
              { label: 'Name',     value: selectedTpl.name,                mono: true },
              { label: 'Category',value: selectedTpl.category },
              { label: 'Language',value: selectedTpl.language?.toUpperCase() },
              { label: 'Header',  value: headerComp?.format ?? 'None' },
              { label: 'Buttons', value: String(selectedTpl.components?.find((c: any) => c.type === 'BUTTONS')?.buttons?.length ?? 0) },
              { label: 'Vars',    value: bodyVars.length > 0 ? bodyVars.map(v => `{{${v}}}`).join(', ') : 'None', purple: bodyVars.length > 0 },
            ].map(row => (
              <div key={row.label} className="flex justify-between gap-2">
                <span className="text-[var(--muted)] flex-shrink-0">{row.label}</span>
                <span className={`text-right break-all ${(row as any).purple ? 'text-[#a78bfa]' : 'text-[var(--text)]'} ${(row as any).mono ? 'font-mono' : ''}`}>
                  {row.value}
                </span>
              </div>
            ))}
            {hasImageHeader && (
              <div className="pt-2 mt-1 border-t border-[var(--border)]">
                <div className="text-[var(--muted)] mb-1">Image source</div>
                <div className={`text-[10px] ${storedImageUrl ? 'text-[#00e5a0]' : 'text-[#f59e0b]'}`}>
                  {useCustomImage
                    ? (customImageUrl ? '⬆ Custom upload' : '⚠ No image set')
                    : storedImageUrl ? '✓ Cloudinary (stored)' : '⚠ No image stored'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {sendMode === 'single' && phone.trim() && (
        <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3.5">
          <div className="text-[10px] text-[var(--muted)] tracking-[0.1em] font-mono mb-1.5">SENDING TO</div>
          <div className="text-[13px] font-mono text-[var(--text)]">+{phone.replace(/\D/g, '')}</div>
        </div>
      )}

      {sendMode === 'bulk' && recipientCount > 0 && (
        <div className="mt-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3.5">
          <div className="text-[10px] text-[var(--muted)] tracking-[0.1em] font-mono mb-1.5">BULK RECIPIENTS</div>
          <div className="text-[24px] font-[var(--font-display)] font-extrabold text-[#00e5a0]">{recipientCount}</div>
          <div className="text-[11px] text-[var(--muted)] mt-0.5">recipients ready to send</div>
        </div>
      )}
    </>
  )

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--bg)] md:pl-[224px]">
      <Sidebar />

      <main className="min-w-0 overflow-x-hidden pb-24 md:pb-0">
        <div className="px-4 py-6 sm:px-6 md:px-10 md:py-10 max-w-[1400px] w-full mx-auto">

          {/* ── Page header ── */}
          <div className="mb-6 md:mb-8">
            <a href="/templates"
              className="inline-flex items-center gap-1 text-[12px] text-[var(--muted)] font-mono no-underline mb-2 hover:text-[var(--text)] transition-colors">
              ← Templates
            </a>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <h1 className="font-[var(--font-display)] text-2xl md:text-[32px] font-extrabold tracking-tight text-[var(--text)] mb-1">
                  Send Message
                </h1>
                <p className="text-sm text-[var(--muted)]">
                  Send WhatsApp templates to one or many recipients
                </p>
              </div>
              {/* Mobile: preview button in header area */}
              <button
                onClick={() => setShowMobilePreview(true)}
                className="md:hidden self-start bg-[#00e5a010] border border-[#00e5a040] text-[#00e5a0] rounded-xl px-4 py-2 text-[12px] font-mono cursor-pointer"
              >
                👁 Preview
              </button>
            </div>
          </div>

          {/* ── Mode toggle ── */}
          <div className="flex gap-0 mb-6 bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-1 w-full sm:w-fit">
            {(['single', 'bulk'] as const).map(mode => (
              <button key={mode} onClick={() => setSendMode(mode)}
                className={`
                  flex-1 sm:flex-none px-6 py-2.5 rounded-[10px] cursor-pointer font-mono text-[13px]
                  border transition-all duration-150 min-h-[44px]
                  ${sendMode === mode
                    ? 'bg-[var(--surface)] border-[var(--border)] text-[var(--text)] font-bold shadow-sm'
                    : 'bg-transparent border-transparent text-[var(--muted)]'}
                `}>
                {mode === 'single' ? '👤 Single' : '👥 Bulk'}
              </button>
            ))}
          </div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 items-start">

            {/* ══ LEFT / MAIN ══ */}
            <div>

              {/* ── Template selector ── */}
              <Section title="Template">
                <div className="flex justify-between items-center mb-3">
                  <span />
                  {selectedTpl && (
                    <button onClick={() => { setShowTplList(!showTplList); setTplSearch('') }}
                      className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] text-[11px] font-mono cursor-pointer">
                      {showTplList ? 'Cancel' : 'Change'}
                    </button>
                  )}
                </div>

                {/* Selected chip */}
                {selectedTpl && !showTplList && (
                  <div className="px-4 py-3.5 rounded-xl bg-[#00e5a010] border border-[#00e5a040]">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[14px] font-bold text-[#00e5a0]">{selectedTpl.name}</span>
                      <Badge status={selectedTpl.status} />
                      <Tag label={selectedTpl.category} color="var(--muted)" bg="var(--surface)" border="var(--border)" />
                      <Tag label={selectedTpl.language?.toUpperCase()} color="var(--muted)" bg="var(--surface)" border="var(--border)" />
                      {hasImageHeader && (
                        <Tag
                          label={storedImageUrl ? '🖼 Image ready' : '🖼 IMAGE'}
                          color={storedImageUrl ? '#00e5a0' : '#a78bfa'}
                          bg={storedImageUrl ? '#00e5a015' : '#7c3aed15'}
                          border={storedImageUrl ? '#00e5a030' : '#7c3aed30'}
                        />
                      )}
                    </div>
                    <div className="text-[12px] text-[var(--muted)] leading-relaxed">{selectedTpl.body}</div>
                  </div>
                )}

                {/* Template list */}
                {(!selectedTpl || showTplList) && (
                  <>
                    <input value={tplSearch} onChange={e => setTplSearch(e.target.value)}
                      placeholder="Search templates..." className={`${INP} mb-2.5`} />
                    {loadingTpls ? (
                      <div className="py-4 text-center text-[var(--muted)] text-[13px] animate-pulse font-mono">Loading...</div>
                    ) : filteredTpls.length === 0 ? (
                      <div className="py-4 px-4 text-center text-[var(--muted)] text-[13px] bg-[var(--surface2)] rounded-xl">
                        No approved templates.{' '}
                        <a href="/templates" className="text-[var(--accent)] no-underline">Sync from Meta →</a>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto">
                        {filteredTpls.map(t => {
                          const tHeader = t.components?.find((c: any) => c.type === 'HEADER')
                          const tBtns   = t.components?.find((c: any) => c.type === 'BUTTONS')
                          const tImgUrl = getTemplateImageUrl(t)
                          return (
                            <div key={t.id}
                              onClick={() => { setSelectedTpl(t); setShowTplList(false) }}
                              className="px-3.5 py-3 rounded-xl cursor-pointer bg-[var(--surface2)] border border-[var(--border)] hover:border-[#00e5a050] transition-colors">
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <span className="text-[13px] font-bold text-[var(--text)]">{t.name}</span>
                                <Badge status={t.status} />
                                <Tag label={t.category} color="var(--muted)" bg="var(--surface)" border="var(--border)" />
                                {tHeader?.format === 'IMAGE' && (
                                  <Tag label={tImgUrl ? '🖼 has image' : '🖼 no image'}
                                    color={tImgUrl ? '#00e5a0' : '#f59e0b'}
                                    bg={tImgUrl ? '#00e5a010' : '#f59e0b10'}
                                    border={tImgUrl ? '#00e5a030' : '#f59e0b30'} />
                                )}
                                {tBtns && <Tag label={`${tBtns.buttons.length}btn`} color="#53bdeb" bg="#53bdeb10" border="#53bdeb20" />}
                              </div>
                              <div className="text-[11px] text-[var(--muted)] truncate">{t.body}</div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </>
                )}
              </Section>

              {/* ── Image header ── */}
              {selectedTpl && hasImageHeader && !showTplList && (
                <Section title="Header Image" subtitle={storedImageUrl ? 'Stored image from Cloudinary. Override if needed.' : 'This template requires a public image URL.'}>

                  {storedImageUrl && (
                    <div className="flex items-center gap-3 p-3 bg-[#00e5a010] border border-[#00e5a030] rounded-xl mb-4">
                      <img src={storedImageUrl} alt="stored"
                        className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-[#00e5a0] font-bold mb-0.5">✓ Stored image (Cloudinary)</div>
                        <div className="text-[10px] text-[var(--muted)] truncate">{storedImageUrl}</div>
                      </div>
                      <label className="flex items-center gap-1.5 cursor-pointer flex-shrink-0">
                        <input type="checkbox" checked={useCustomImage} onChange={e => setUseCustomImage(e.target.checked)} className="cursor-pointer" />
                        <span className="text-[11px] text-[var(--muted)] font-mono">Override</span>
                      </label>
                    </div>
                  )}

                  {(!storedImageUrl || useCustomImage) && (
                    <div className="flex flex-col gap-3">
                      {/* Upload */}
                      <div>
                        <label className={LBL}>Upload file (saves to Cloudinary)</label>
                        <div onClick={() => !uploadingImage && document.getElementById('msg-img-upload')?.click()}
                          className={`border-2 border-dashed border-[var(--border)] rounded-xl p-4 text-center bg-[var(--surface2)] transition-opacity ${uploadingImage ? 'opacity-60 cursor-wait' : 'cursor-pointer'}`}>
                          {customImagePreview ? (
                            <>
                              <img src={customImagePreview} alt="preview" className="max-h-[100px] rounded-lg max-w-full mx-auto" />
                              <div className={`text-[11px] mt-2 ${uploadingImage ? 'text-[#f59e0b]' : customImageUrl ? 'text-[#00e5a0]' : 'text-[var(--muted)]'}`}>
                                {uploadingImage ? '⟳ Uploading...' : customImageUrl ? '✓ Uploaded' : 'Tap to change'}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-[26px] mb-1">🖼</div>
                              <div className="text-[12px] text-[var(--muted)]">Tap to upload JPG/PNG (max 5MB)</div>
                            </>
                          )}
                        </div>
                        <input id="msg-img-upload" type="file" accept="image/jpeg,image/png,image/jpg,image/webp"
                          className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }} />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-[var(--border)]" />
                        <span className="text-[11px] text-[var(--muted)]">OR</span>
                        <div className="flex-1 h-px bg-[var(--border)]" />
                      </div>

                      {/* URL paste */}
                      <div>
                        <label className={LBL}>Paste public Cloudinary / CDN URL</label>
                        <input value={customImageUrl}
                          onChange={e => { setCustomImageUrl(e.target.value); if (e.target.value.startsWith('http')) setCustomImagePreview(e.target.value) }}
                          placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
                          className={INP} />
                        <p className="text-[11px] text-[var(--muted)] mt-1.5">Must be a publicly accessible HTTPS URL</p>
                      </div>
                    </div>
                  )}
                </Section>
              )}

              {/* ── Variables ── */}
              {selectedTpl && bodyVars.length > 0 && !showTplList && (
                <Section title="Variables" subtitle="Fill in the placeholder values">
                  <div className="flex flex-col gap-3.5">
                    {bodyVars.map(v => (
                      <div key={v}>
                        <label className={LBL}>{`{{${v}}}`}</label>
                        <input value={varValues[v] ?? ''}
                          onChange={e => setVarValues(p => ({ ...p, [v]: e.target.value }))}
                          placeholder={`Value for {{${v}}}`} className={INP} />
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* ── Single: recipient ── */}
              {sendMode === 'single' && selectedTpl && !showTplList && (
                <Section title="Recipient" subtitle="Phone number to send to">
                  <label className={LBL}>Phone number</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="917892358529 or +91 78923 58529"
                    className={`${INP} text-[16px] md:text-[13px]`}  /* 16px prevents iOS zoom */
                    inputMode="tel" />
                  <p className="text-[11px] text-[var(--muted)] mt-1.5">Include country code · spaces and dashes are stripped</p>

                  {hasImageHeader && (
                    <div className="mt-3 px-3.5 py-2.5 bg-[var(--surface2)] border border-[var(--border)] rounded-lg text-[11px] font-mono">
                      <span className="text-[var(--muted)]">Image URL to send: </span>
                      <span className={buildVariables()['_header_url'] ? 'text-[#00e5a0]' : 'text-[#f59e0b]'}>
                        {buildVariables()['_header_url'] || '⚠ No image URL — template example will be used'}
                      </span>
                    </div>
                  )}
                </Section>
              )}

              {/* ── Bulk: recipients ── */}
              {sendMode === 'bulk' && selectedTpl && !showTplList && (
                <Section title="Recipients" subtitle="All numbers must include a country code">
                  <div className="mb-3.5">
                    <label className={LBL}>Job label (optional)</label>
                    <input value={jobLabel} onChange={e => setJobLabel(e.target.value)} placeholder="e.g. May campaign" className={INP} />
                  </div>

                  <div className="flex gap-2 mb-3.5">
                    {(['manual', 'csv'] as const).map(m => (
                      <button key={m} onClick={() => setBulkInputMode(m)}
                        className={`
                          flex-1 py-2.5 rounded-xl text-[12px] font-mono border cursor-pointer min-h-[44px] transition-all
                          ${bulkInputMode === m
                            ? 'bg-[var(--surface2)] border-[var(--border)] text-[var(--text)] font-bold'
                            : 'bg-transparent border-transparent text-[var(--muted)]'}
                        `}>
                        {m === 'manual' ? '✎ Paste numbers' : '⬆ CSV'}
                      </button>
                    ))}
                  </div>

                  {bulkInputMode === 'manual' ? (
                    <>
                      <label className={LBL}>Phone numbers (one per line, comma, or semicolon)</label>
                      <textarea value={phoneList} onChange={e => setPhoneList(e.target.value)}
                        placeholder={'+917892358529\n+918765432109'} rows={6}
                        className={`${INP} resize-y`} />
                      <div className="text-[11px] text-[var(--muted)] mt-1.5">
                        {recipientCount} recipient{recipientCount !== 1 ? 's' : ''} detected
                      </div>
                    </>
                  ) : (
                    <>
                      <label className={LBL}>CSV content (first column must be &ldquo;phone&rdquo;)</label>
                      <textarea value={csvText} onChange={e => setCsvText(e.target.value)}
                        placeholder={'phone,name\n917892358529,Raj\n918765432109,Priya'} rows={6}
                        className={`${INP} resize-y text-[12px]`} />
                      <div className="text-[11px] text-[var(--muted)] mt-1.5">
                        {recipientCount} recipient{recipientCount !== 1 ? 's' : ''} detected
                      </div>
                    </>
                  )}
                </Section>
              )}

              {/* ── Send buttons (desktop only) ── */}
              {selectedTpl && !showTplList && (
                <div className="hidden md:flex justify-end mt-2">
                  {sendMode === 'single' ? (
                    <button onClick={handleSingleSend} disabled={!canSingleSend || sending}
                      className="px-8 py-3 rounded-xl border border-[#00e5a050] bg-[#00e5a015] text-[#00e5a0] text-[13px] font-mono font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]">
                      {sending ? '⟳ Sending...' : '📤 Send Message'}
                    </button>
                  ) : (
                    <button onClick={handleBulkSend} disabled={!canBulkSend || launching}
                      className="px-8 py-3 rounded-xl border border-[#00e5a050] bg-[#00e5a015] text-[#00e5a0] text-[13px] font-mono font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]">
                      {launching ? '⟳ Starting...' : `🚀 Send to ${recipientCount} recipient${recipientCount !== 1 ? 's' : ''}`}
                    </button>
                  )}
                </div>
              )}

              {/* ── Job history (bulk mode) ── */}
              {sendMode === 'bulk' && jobs.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-[var(--font-display)] font-bold text-[16px] text-[var(--text)]">Job History</div>
                    <button onClick={loadJobs}
                      className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] text-[11px] font-mono cursor-pointer">
                      ↻ Refresh
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {jobs.map((job: any) => {
                      const isExp     = expandedJob === job.id
                      const processed = (job.sent ?? 0) + (job.failed ?? 0)
                      const pct       = job.total > 0 ? Math.round((processed / job.total) * 100) : 0
                      const colorMap: any = { running: '#f59e0b', completed: '#00e5a0', failed: '#ef4444', cancelled: '#6b7280' }
                      const color     = colorMap[job.status] ?? '#6b7280'
                      return (
                        <div key={job.id} onClick={() => setExpandedJob(isExp ? null : job.id)}
                          className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3.5 cursor-pointer hover:border-[var(--border2)] transition-colors">
                          <div className="flex justify-between items-center mb-2.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[13px] font-bold text-[var(--text)]">{job.label}</span>
                              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold font-mono tracking-[0.1em]"
                                style={{ background: `${color}15`, border: `1px solid ${color}40`, color }}>
                                {job.status?.toUpperCase()}
                              </span>
                            </div>
                            <span className="text-[var(--muted)] text-sm flex-shrink-0">{isExp ? '▲' : '▼'}</span>
                          </div>

                          {/* Progress bar */}
                          <div className="h-1.5 rounded-full bg-[var(--surface2)] overflow-hidden mb-2">
                            <div className="h-full rounded-full transition-all duration-400" style={{ width: `${pct}%`, background: color }} />
                          </div>

                          <div className="flex gap-4 text-[11px] font-mono">
                            <span className="text-[var(--muted)]">Total <span className="text-[var(--text)]">{job.total}</span></span>
                            <span className="text-[var(--muted)]">Sent <span className="text-[#00e5a0]">{job.sent ?? 0}</span></span>
                            {(job.failed ?? 0) > 0 && <span className="text-[var(--muted)]">Failed <span className="text-[#ef4444]">{job.failed}</span></span>}
                            <span className="ml-auto text-[var(--muted)]">{pct}%</span>
                          </div>

                          {isExp && (
                            <div className="mt-3 pt-3 border-t border-[var(--border)]" onClick={e => e.stopPropagation()}>
                              {job.errors?.length > 0 && (
                                <div className="mb-3">
                                  <div className="text-[11px] text-[#ef4444] mb-1.5">Errors:</div>
                                  {job.errors.slice(-3).map((e: any, i: number) => (
                                    <div key={i} className="text-[11px] text-[var(--muted)] py-0.5">
                                      <span className="text-[var(--text)]">{e.phone}</span> — {e.reason}
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="flex gap-2">
                                {job.status === 'running' && (
                                  <button onClick={() => cancelJob(job.id)}
                                    className="px-3 py-1.5 rounded-lg border border-[#f59e0b40] bg-[#f59e0b10] text-[#f59e0b] text-[11px] font-mono cursor-pointer">
                                    ⏹ Cancel
                                  </button>
                                )}
                                {['completed', 'failed', 'cancelled'].includes(job.status) && (
                                  <button onClick={() => deleteJob(job.id)}
                                    className="px-3 py-1.5 rounded-lg border border-[#ef444440] bg-[#ef444410] text-[#ef4444] text-[11px] font-mono cursor-pointer">
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
            </div>

            {/* ══ RIGHT: desktop preview (hidden on mobile) ══ */}
            <div className="hidden md:block sticky top-6">
              <div className="text-[11px] text-[var(--muted)] tracking-[0.12em] font-mono mb-3">LIVE PREVIEW</div>
              {previewPanel}
            </div>
          </div>
        </div>
      </main>

      {/* ══ Mobile: sticky bottom bar ══ */}
      {selectedTpl && !showTplList && (
        <div className="fixed bottom-0 left-0 right-0 z-60 bg-[var(--surface)] border-t border-[var(--border)] px-4 py-2.5 flex gap-2.5 md:hidden"
          style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}>
          <button onClick={() => setShowMobilePreview(true)}
            className="bg-[#00e5a010] border border-[#00e5a040] text-[#00e5a0] rounded-xl px-3.5 py-3 text-[12px] font-mono cursor-pointer flex-shrink-0 min-h-[48px]">
            👁 Preview
          </button>
          {sendMode === 'single' ? (
            <button onClick={handleSingleSend} disabled={!canSingleSend || sending}
              className="flex-1 py-3 rounded-xl border border-[#00e5a050] bg-[#00e5a015] text-[#00e5a0] text-[13px] font-mono font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]">
              {sending ? '⟳ Sending...' : '📤 Send Message'}
            </button>
          ) : (
            <button onClick={handleBulkSend} disabled={!canBulkSend || launching}
              className="flex-1 py-3 rounded-xl border border-[#00e5a050] bg-[#00e5a015] text-[#00e5a0] text-[13px] font-mono font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]">
              {launching ? '⟳ Starting...' : `🚀 Send to ${recipientCount}`}
            </button>
          )}
        </div>
      )}

      {/* ══ Mobile preview drawer ══ */}
      <PreviewDrawer open={showMobilePreview} onClose={() => setShowMobilePreview(false)}>
        {previewPanel}
      </PreviewDrawer>

      {/* ── Toast ── */}
      {toast && (
        <div className={`
          fixed z-[300] text-[13px] font-mono rounded-xl px-5 py-3
          bg-[var(--surface)] shadow-[0_4px_20px_rgba(0,0,0,0.4)] border
          bottom-20 left-4 right-4 text-center
          md:bottom-8 md:right-8 md:left-auto md:text-left
          ${toast.ok ? 'border-[#00e5a050] text-[#00e5a0]' : 'border-[#ef444450] text-[#ef4444]'}
        `}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}

// ── Page wrapper ──────────────────────────────────────────────────────────────
export default function MessagesPage() {
  useAdminAuth()
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen text-[var(--muted)] font-mono text-[13px]">
        Loading...
      </div>
    }>
      <MessagesContent />
    </Suspense>
  )
}