'use client'
// components/CustomMessageTab.tsx
// Send FREE-FORM messages within the 24-hour window.
// Fully rewritten with Tailwind CSS — mobile-first, all functionality preserved.

import { useState, useEffect, useRef } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────
type RichMediaType  = 'text' | 'image' | 'video' | 'document'
type ButtonType     = 'cta_url' | 'reply' | 'quick_reply'
interface InteractiveButton { id: string; type: ButtonType; title: string; url?: string }
interface QuickReply        { id: string; title: string }

// ── Shared label style (Tailwind string) ──────────────────────────────────────
const LBL = 'block text-[11px] text-[var(--muted)] tracking-[0.12em] uppercase font-mono mb-1.5'
const INP = 'w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--text)] font-mono text-[13px] outline-none focus:border-[var(--accent)] transition-colors'
const CARD = 'bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 mb-4'

// ── Btn ───────────────────────────────────────────────────────────────────────
function Btn({ children, onClick, variant = 'default', disabled = false, small = false, full = false, className = '' }: any) {
  const map: Record<string, string> = {
    default: 'bg-[var(--surface2)] border-[var(--border)] text-[var(--text)]',
    accent:  'bg-[#00e5a015] border-[#00e5a050] text-[#00e5a0]',
    danger:  'bg-[#ef444415] border-[#ef444450] text-[#ef4444]',
    warn:    'bg-[#f59e0b15] border-[#f59e0b50] text-[#f59e0b]',
    green:   'bg-[#10b98115] border-[#10b98150] text-[#10b981]',
    purple:  'bg-[#7c3aed15] border-[#7c3aed50] text-[#a78bfa]',
    ghost:   'bg-transparent border-transparent text-[var(--muted)]',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-1.5 border rounded-lg font-mono
        transition-all duration-150 cursor-pointer
        disabled:opacity-45 disabled:cursor-not-allowed
        ${small ? 'px-3 py-1.5 text-[11px] min-h-[32px]' : 'px-4 py-2.5 text-[13px] min-h-[40px]'}
        ${full ? 'w-full' : ''}
        ${map[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

// ── WhatsApp bubble preview ────────────────────────────────────────────────────
function WaRichBubble({ message, mediaUrl, mediaType, caption, buttons, quickReplies }: {
  message: string; mediaUrl?: string | null; mediaType?: RichMediaType
  caption?: string; buttons?: InteractiveButton[]; quickReplies?: QuickReply[]
}) {
  if (!message && !mediaUrl) return (
    <div className="text-center text-[#8696a0] text-[12px] py-5">Type a message to preview</div>
  )
  return (
    <div className="flex justify-end">
      <div className={`bg-[#005c4b] max-w-[92%] overflow-hidden ${mediaUrl ? 'rounded-[16px_16px_4px_16px] p-0' : 'rounded-[16px_16px_4px_16px] px-3 py-2.5'}`}>
        {mediaUrl && mediaType === 'image' && <img src={mediaUrl} alt="media" className="w-full max-h-[180px] object-cover block" />}
        {mediaUrl && mediaType === 'video' && <video src={mediaUrl} controls className="w-full max-h-[180px]" />}
        {mediaUrl && mediaType === 'document' && (
          <div className="p-3 bg-[#0b3b32] flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <div>
              <div className="text-[12px] text-[#e9edef]">Document</div>
              <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#53bdeb]">Open</a>
            </div>
          </div>
        )}
        {caption && <div className="px-3 pt-2 pb-1 text-[11px] text-[#8abeae]">{caption}</div>}
        {message && (
          <div className={`text-[13px] text-[#e9edef] leading-[1.55] whitespace-pre-wrap break-words ${mediaUrl ? 'px-3 py-2.5' : ''}`}>
            {message}
          </div>
        )}
        {buttons && buttons.length > 0 && (
          <div className="border-t border-[#0b3b32] mt-2">
            {buttons.map((btn, i) => (
              <div key={btn.id}
                className="px-3 py-2.5 text-center text-[13px] text-[#53bdeb] cursor-pointer"
                style={{ borderBottom: i < buttons.length - 1 ? '1px solid #0b3b32' : undefined }}>
                {btn.type === 'cta_url' && '🔗 '}
                {btn.type === 'reply' && '💬 '}
                {btn.type === 'quick_reply' && '⚡ '}
                {btn.title}{btn.type === 'cta_url' && btn.url && ` (${btn.url})`}
              </div>
            ))}
          </div>
        )}
        {quickReplies && quickReplies.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mt-2 px-2 pb-2">
            {quickReplies.map(r => (
              <div key={r.id} className="px-2.5 py-1 rounded-full bg-[#0b3b32] text-[12px] text-[#e9edef] cursor-pointer">{r.title}</div>
            ))}
          </div>
        )}
        <div className="text-[10px] text-[#8abeae] text-right mt-1 px-3 pb-2">
          {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} ✓✓
        </div>
      </div>
    </div>
  )
}

// ── Collapsible section (mobile) ──────────────────────────────────────────────
function Section({ title, children, defaultOpen = true }: { title: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={CARD}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer p-0 text-left md:cursor-default"
        // On desktop the section is always open, toggle only matters on mobile
      >
        <span className="font-bold text-[14px] md:text-[15px] text-[var(--text)] font-[var(--font-display)]">{title}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className={`md:hidden flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {/* On desktop always visible; on mobile hide/show */}
      <div className={`md:block overflow-hidden transition-all duration-300 ${open ? 'mt-3.5' : 'max-h-0 md:max-h-none'}`}
        style={{ maxHeight: open ? undefined : 0 }}>
        {children}
      </div>
    </div>
  )
}

// ── Mobile preview bottom sheet ───────────────────────────────────────────────
function PreviewDrawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 z-80 bg-black/60 backdrop-blur-sm transition-opacity duration-250 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
      <div className={`fixed bottom-0 left-0 right-0 z-90 bg-[var(--surface)] rounded-t-[20px] border border-[var(--border)] px-4 pb-8 pt-4 max-h-[85vh] overflow-y-auto transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`}>
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

// ── Preview panel (reused on desktop + mobile drawer) ─────────────────────────
function PreviewPanel({ message, mediaUrl, mediaType, mediaCaption, buttons, quickReplies, selectedQT }: any) {
  return (
    <>
      <div className="bg-[#1a1a2e] rounded-[20px] p-3.5 border-[5px] border-[#333]">
        <div className="flex justify-between px-2 pb-2 text-[10px] text-[#888]">
          <span>9:41</span><span>● ● ●</span>
        </div>
        <div className="bg-[#0b1418] rounded-xl min-h-[180px] p-2.5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff08 1px, transparent 0)', backgroundSize: '20px 20px' }}>
          <WaRichBubble
            message={message}
            mediaUrl={mediaType !== 'text' ? mediaUrl : null}
            mediaType={mediaType !== 'text' ? mediaType : undefined}
            caption={mediaCaption}
            buttons={buttons.length > 0 ? buttons : undefined}
            quickReplies={quickReplies.length > 0 ? quickReplies : undefined}
          />
        </div>
      </div>

      {/* 24-hr rules */}
      <div className="mt-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-3.5">
        <div className="text-[10px] text-[var(--muted)] tracking-[0.1em] font-mono mb-2.5">24-HR WINDOW RULES</div>
        {[
          { icon: '✓',  text: 'Customer messaged you first',          color: '#10b981' },
          { icon: '✓',  text: 'Within 24 hours of their message',     color: '#10b981' },
          { icon: '✓',  text: 'Send text, images, videos, documents', color: '#10b981' },
          { icon: '✓',  text: 'Add phone buttons & quick replies',    color: '#10b981' },
          { icon: '💡', text: 'URLs are clickable in text messages',   color: '#f59e0b' },
          { icon: '✕',  text: 'URL buttons not supported by WhatsApp',color: '#ef4444' },
        ].map((c, i) => (
          <div key={i} className="flex gap-2 text-[11px] mb-1.5">
            <span className="font-bold flex-shrink-0" style={{ color: c.color }}>{c.icon}</span>
            <span className="text-[var(--muted)]">{c.text}</span>
          </div>
        ))}
      </div>

      {selectedQT && (
        <div className="mt-3 bg-[#00e5a008] border border-[#00e5a025] rounded-xl p-3">
          <div className="text-[10px] text-[#00e5a0] tracking-[0.1em] font-mono mb-1.5">USING QUICK TEMPLATE</div>
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedQT.emoji}</span>
            <div>
              <div className="text-[13px] font-bold text-[var(--text)]">{selectedQT.name}</div>
              <div className="text-[11px] text-[var(--muted)]">{selectedQT.category}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ── Send button ───────────────────────────────────────────────────────────────
function SendButton({ mode, mediaType, sending, canSend, recipientCount, onSend, full }: any) {
  const isMedia = mediaType !== 'text'
  return (
    <button
      onClick={onSend}
      disabled={!canSend}
      className={`
        flex items-center justify-center gap-2 rounded-xl text-[13px] font-mono font-bold
        border transition-all duration-150 min-h-[48px]
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        ${full ? 'w-full flex-1 px-4' : 'px-6'}
        ${isMedia
          ? 'bg-[#00e5a015] border-[#00e5a050] text-[#00e5a0]'
          : 'bg-[#10b98115] border-[#10b98150] text-[#10b981]'}
      `}
    >
      {sending
        ? (mode === 'single' ? '⟳ Sending...' : '⟳ Launching...')
        : mode === 'single'
          ? `📤 Send ${isMedia ? mediaType.charAt(0).toUpperCase() + mediaType.slice(1) : 'Message'}`
          : `🚀 Send to ${recipientCount.toLocaleString()} recipient${recipientCount !== 1 ? 's' : ''}`}
    </button>
  )
}

// ── Quick Templates Content ────────────────────────────────────────────────────
function QuickTemplatesContent({ quickTemplates, selectedQT, showSaveForm, setShowSaveForm,
  saveName, setSaveName, saveCategory, setSaveCategory, saveEmoji, setSaveEmoji,
  EMOJIS, CATEGORIES, message, mediaType, saveAsQT, selectQT, deleteQT, hideHeader }: any) {
  return (
    <>
      {!hideHeader && (
        <div className="flex justify-between items-center mb-3.5">
          <div>
            <div className="font-bold text-[14px] text-[var(--text)]">Quick Templates</div>
            <div className="text-[12px] text-[var(--muted)] mt-0.5">Tap to load a saved message</div>
          </div>
          <Btn small onClick={() => setShowSaveForm(!showSaveForm)}>{showSaveForm ? '✕ Cancel' : '+ Save current'}</Btn>
        </div>
      )}

      {showSaveForm && (
        <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl p-3.5 mb-3.5">
          <div className="grid grid-cols-2 gap-2.5 mb-2.5">
            <div>
              <label className={LBL}>Name</label>
              <input value={saveName} onChange={e => setSaveName(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                placeholder="welcome_with_image" className={INP} />
            </div>
            <div>
              <label className={LBL}>Category</label>
              <select value={saveCategory} onChange={e => setSaveCategory(e.target.value)} className={INP}>
                {CATEGORIES.map((c: string) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className={LBL}>Emoji</label>
            <div className="flex gap-1.5 flex-wrap">
              {EMOJIS.map((e: string) => (
                <button key={e} onClick={() => setSaveEmoji(e)}
                  className={`w-9 h-9 rounded-lg cursor-pointer text-[17px] border transition-colors ${saveEmoji === e ? 'bg-[#00e5a010] border-[#00e5a050]' : 'bg-[var(--surface)] border-[var(--border)]'}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          <Btn variant="accent" disabled={!saveName.trim() || (!message.trim() && mediaType === 'text')} onClick={saveAsQT} full>
            Save as &ldquo;{saveName || 'template'}&rdquo;
          </Btn>
        </div>
      )}

      {quickTemplates.length === 0 ? (
        <div className="text-[12px] text-[var(--muted)] text-center py-3">
          No quick templates yet. Create a rich message and tap &ldquo;+ Save current&rdquo;.
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {quickTemplates.map((tpl: any) => (
            <div key={tpl.id} className="relative inline-flex group">
              <button onClick={() => selectQT(tpl)}
                className={`
                  flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-mono
                  border cursor-pointer transition-colors min-h-[36px]
                  ${selectedQT?.id === tpl.id
                    ? 'bg-[#00e5a015] border-[#00e5a050] text-[#00e5a0]'
                    : 'bg-[var(--surface2)] border-[var(--border)] text-[var(--muted)]'}
                `}>
                <span>{tpl.emoji}</span>
                <span>{tpl.name}</span>
                {tpl.mediaType && tpl.mediaType !== 'text' && (
                  <span className="text-[10px]">
                    {tpl.mediaType === 'image' && '🖼'}{tpl.mediaType === 'video' && '🎥'}{tpl.mediaType === 'document' && '📄'}
                  </span>
                )}
              </button>
              <button
                onClick={e => { e.stopPropagation(); deleteQT(tpl.id) }}
                onTouchStart={e => (e.currentTarget.style.opacity = '1')}
                className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-[#ef4444] text-white text-[10px] border-none cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >✕</button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function CustomMessageTab({ onJobStarted }: { onJobStarted?: (jobId: string) => void }) {
  const [mode, setMode]                       = useState<'single' | 'bulk'>('single')
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  // Rich media
  const [mediaType, setMediaType]             = useState<RichMediaType>('text')
  const [mediaUrl, setMediaUrl]               = useState('')
  const [mediaCaption, setMediaCaption]       = useState('')
  const [uploadingMedia, setUploadingMedia]   = useState(false)
  const [uploadedHandle, setUploadedHandle]   = useState('')

  // Buttons
  const [buttons, setButtons]                 = useState<InteractiveButton[]>([])
  const [quickReplies, setQuickReplies]       = useState<QuickReply[]>([])
  const [showButtonBuilder, setShowButtonBuilder] = useState(false)
  const [newButton, setNewButton]             = useState<Partial<InteractiveButton>>({ type: 'reply', title: '' })

  // Message
  const [message, setMessage]                 = useState('')

  // Quick templates
  const [quickTemplates, setQuickTemplates]   = useState<any[]>([])
  const [selectedQT, setSelectedQT]           = useState<any>(null)
  const [showSaveForm, setShowSaveForm]        = useState(false)
  const [saveName, setSaveName]               = useState('')
  const [saveCategory, setSaveCategory]       = useState('General')
  const [saveEmoji, setSaveEmoji]             = useState('💬')

  // Recipients
  const [phone, setPhone]                     = useState('')
  const [phones, setPhones]                   = useState('')
  const [csvText, setCsvText]                 = useState('')
  const [inputMode, setInputMode]             = useState<'manual' | 'csv'>('manual')
  const [label, setLabel]                     = useState('')

  const [sending, setSending]                 = useState(false)
  const [toast, setToast]                     = useState<{ msg: string; ok: boolean } | null>(null)
  const fileRef      = useRef<HTMLInputElement>(null)
  const mediaFileRef = useRef<HTMLInputElement>(null)

  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 4000) }

  useEffect(() => {
    fetch('/api/messages/custom').then(r => r.json()).then(d => setQuickTemplates(d.data ?? []))
  }, [])

  const loadQT    = () => fetch('/api/messages/custom').then(r => r.json()).then(d => setQuickTemplates(d.data ?? []))

  const selectQT  = (tpl: any) => {
    if (selectedQT?.id === tpl.id) {
      setSelectedQT(null); setMessage(''); setMediaType('text'); setMediaUrl(''); setButtons([]); setQuickReplies([])
    } else {
      setSelectedQT(tpl); setMessage(tpl.body || ''); setMediaType(tpl.mediaType || 'text')
      setMediaUrl(tpl.mediaUrl || ''); setMediaCaption(tpl.mediaCaption || '')
      setButtons(tpl.buttons || []); setQuickReplies(tpl.quickReplies || [])
    }
  }

  const deleteQT  = async (id: string) => {
    await fetch(`/api/messages/custom?id=${id}`, { method: 'DELETE' })
    if (selectedQT?.id === id) { setSelectedQT(null); setMessage('') }
    loadQT()
  }

  const saveAsQT  = async () => {
    if (!saveName.trim() || (!message.trim() && mediaType === 'text')) return
    const res  = await fetch('/api/messages/custom', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'save', name: saveName, message, category: saveCategory, emoji: saveEmoji,
        mediaType: mediaType !== 'text' ? mediaType : undefined, mediaUrl, mediaCaption, buttons, quickReplies }),
    })
    const data = await res.json()
    if (data.success) { showToast('✓ Saved'); setShowSaveForm(false); setSaveName(''); loadQT() }
    else showToast(`✕ ${data.error}`, false)
  }

  const handleMediaUpload = async (file: File) => {
    setUploadingMedia(true)
    setMediaUrl(URL.createObjectURL(file))
    try {
      const fd = new FormData(); fd.append('file', file); fd.append('type', mediaType)
      const res  = await fetch('/api/upload-media', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success && data.url) { setMediaUrl(data.url); setUploadedHandle(data.handle || data.url); showToast(`✓ ${mediaType} uploaded`) }
      else showToast(`✕ Upload failed: ${data.error}`, false)
    } catch (err: any) { showToast(`✕ ${err.message}`, false) }
    setUploadingMedia(false)
  }

  const addButton = () => {
    if (!newButton.title?.trim()) return
    if (newButton.type === 'cta_url' && !newButton.url?.trim()) { showToast('Please enter a URL', false); return }
    setButtons(prev => [...prev, {
      id: `btn_${Date.now()}`, type: newButton.type as ButtonType,
      title: newButton.title!.trim(), url: newButton.type === 'cta_url' ? newButton.url?.trim() : undefined,
    }])
    setNewButton({ type: 'reply', title: '' })
    showToast('✓ Button added')
  }

  const addLinkToMessage = () => {
    const linkUrl  = prompt('Enter URL:', 'https://')
    const linkText = prompt('Enter link text (optional):', 'Click here')
    if (linkUrl) { setMessage(prev => prev + (linkText ? `\n\n🔗 ${linkText}: ${linkUrl}` : `\n\n🔗 ${linkUrl}`)); showToast('✓ Link added') }
  }

  const buildPayload = (to: string) => {
    const base: any = { action: 'send', to }
    if (mediaType !== 'text' && mediaUrl) {
      base.type = mediaType; base.mediaUrl = mediaUrl
      if (mediaCaption) base.mediaCaption = mediaCaption
      if (message) base.message = message
    } else if (buttons.length > 0 || quickReplies.length > 0) {
      base.type = 'interactive'; base.message = message || mediaCaption || 'Select an option'
      if (buttons.length > 0) base.buttons = buttons
      if (quickReplies.length > 0) base.quickReplies = quickReplies
      if (mediaCaption) base.mediaCaption = mediaCaption
    } else if (message) { base.type = 'text'; base.message = message }
    return base
  }

  const sendSingle = async () => {
    if (!phone.trim()) return
    if (mediaType === 'text' && !message.trim() && buttons.length === 0 && quickReplies.length === 0) { showToast('Please enter a message or add media/buttons', false); return }
    setSending(true)
    try {
      const res  = await fetch('/api/messages/custom', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(buildPayload(phone.replace(/\D/g, ''))) })
      const data = await res.json()
      if (data.success) {
        showToast(`✓ Sent to +${phone.replace(/\D/g, '')}`); setPhone('')
        if (!selectedQT) { setMessage(''); setMediaType('text'); setMediaUrl(''); setMediaCaption(''); setButtons([]); setQuickReplies([]) }
      } else showToast(`✕ ${data.error}`, false)
    } catch (err: any) { showToast(`✕ ${err.message}`, false) }
    setSending(false)
  }

  const sendBulk = async () => {
    if (mediaType === 'text' && !message.trim() && buttons.length === 0 && quickReplies.length === 0) { showToast('Please enter a message or add media/buttons', false); return }
    if (recipientCount === 0) { showToast('No valid recipients', false); return }
    setSending(true)
    try {
      const payload: any = { action: 'bulk', label: label || `Custom ${mediaType} message`,
        mediaType: mediaType !== 'text' ? mediaType : undefined, mediaUrl, mediaCaption, message, buttons, quickReplies }
      if (inputMode === 'csv') payload.csvText = csvText; else payload.phones = phones
      const res  = await fetch('/api/messages/custom', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data.success) {
        showToast(`✓ Bulk job started — ${data.data?.total || recipientCount} recipients`)
        setPhones(''); setCsvText(''); setLabel('')
        if (!selectedQT) { setMessage(''); setMediaType('text'); setMediaUrl(''); setMediaCaption(''); setButtons([]); setQuickReplies([]) }
        onJobStarted?.(data.jobId)
      } else showToast(`✕ ${data.error}`, false)
    } catch (err: any) { showToast(`✕ ${err.message}`, false) }
    setSending(false)
  }

  const recipientCount = inputMode === 'manual'
    ? phones.split(/[\n,;]+/).map(s => s.trim()).filter(s => s.length >= 7).length
    : Math.max(0, csvText.trim().split('\n').filter(Boolean).length - 1)

  const canSendSingle = !sending && phone.trim().length >= 7 && !!(mediaType !== 'text' ? mediaUrl : message.trim().length > 0 || buttons.length > 0 || quickReplies.length > 0)
  const canSendBulk   = !sending && recipientCount > 0 && !!(mediaType !== 'text' ? mediaUrl : message.trim().length > 0 || buttons.length > 0 || quickReplies.length > 0)

  const EMOJIS     = ['💬', '🌿', '🏠', '✅', '👋', '📋', '🎉', '⚡', '💡', '🔔', '🖼️', '🎥', '📄']
  const CATEGORIES = ['General', 'Follow-up', 'Support', 'Greetings', 'Offers', 'Reminders', 'Media']

  const previewProps = { message, mediaUrl, mediaType, mediaCaption, buttons, quickReplies, selectedQT }

  return (
    <div className="pb-24 md:pb-0">

      {/* ── Info banner ── */}
      <div className="bg-[#10b98110] border border-[#10b98130] rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">⏱</span>
        <div>
          <div className="text-[13px] font-bold text-[#10b981] mb-1">24-Hour Customer Service Window</div>
          <div className="text-[12px] text-[var(--muted)] leading-relaxed">
            When a customer messages you first, you can reply with <strong>text, images, videos, documents</strong>,
            add <strong>phone buttons</strong>, or <strong>quick replies</strong>.{' '}
            <span className="text-[10px] text-[#10b98180]">💡 Tip: Add links directly in text — they'll be clickable!</span>
          </div>
        </div>
      </div>

      {/* ── Layout: single column mobile / two-col desktop ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 items-start">

        {/* ══ MAIN COLUMN ══ */}
        <div>

          {/* Mode toggle */}
          <div className="flex gap-0 mb-5 bg-[var(--surface2)] p-1 rounded-xl border border-[var(--border)]">
            {(['single', 'bulk'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`
                  flex-1 py-2.5 rounded-[10px] cursor-pointer font-mono text-[13px] min-h-[44px]
                  border transition-all duration-150
                  ${mode === m
                    ? 'bg-[var(--surface)] border-[var(--border)] text-[var(--text)] font-bold'
                    : 'bg-transparent border-transparent text-[var(--muted)]'}
                `}>
                {m === 'single' ? '👤 Single' : '👥 Bulk'}
              </button>
            ))}
          </div>

          {/* ── Quick Templates ── */}
          <Section title="⚡ Quick Templates">
            <QuickTemplatesContent
              quickTemplates={quickTemplates} selectedQT={selectedQT}
              showSaveForm={showSaveForm} setShowSaveForm={setShowSaveForm}
              saveName={saveName} setSaveName={setSaveName}
              saveCategory={saveCategory} setSaveCategory={setSaveCategory}
              saveEmoji={saveEmoji} setSaveEmoji={setSaveEmoji}
              EMOJIS={EMOJIS} CATEGORIES={CATEGORIES}
              message={message} mediaType={mediaType}
              saveAsQT={saveAsQT} selectQT={selectQT} deleteQT={deleteQT}
              hideHeader
            />
            {/* "+ Save current" lives inside the section on mobile */}
            <div className="flex justify-end mt-3 border-t border-[var(--border)] pt-3">
              <Btn small onClick={() => setShowSaveForm(!showSaveForm)}>{showSaveForm ? '✕ Cancel' : '+ Save current'}</Btn>
            </div>
          </Section>

          {/* ── Message Type ── */}
          <Section title="Message Type">
            <div className="grid grid-cols-4 gap-2">
              {(['text', 'image', 'video', 'document'] as RichMediaType[]).map(t => (
                <button key={t} onClick={() => { setMediaType(t); if (t === 'text') setMediaUrl('') }}
                  className={`
                    flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl cursor-pointer text-[11px] font-mono
                    border transition-all duration-150 min-h-[64px]
                    ${mediaType === t
                      ? 'bg-[#00e5a010] border-[#00e5a060] text-[#00e5a0]'
                      : 'bg-[var(--surface2)] border-[var(--border)] text-[var(--muted)]'}
                  `}>
                  <span className="text-[22px]">
                    {t === 'text' && '✉'}{t === 'image' && '🖼'}{t === 'video' && '🎥'}{t === 'document' && '📄'}
                  </span>
                  <span>{t === 'text' ? 'Text' : t === 'image' ? 'Image' : t === 'video' ? 'Video' : 'Doc'}</span>
                </button>
              ))}
            </div>
          </Section>

          {/* ── Media Upload ── */}
          {mediaType !== 'text' && (
            <Section title={mediaType === 'image' ? '🖼 Image' : mediaType === 'video' ? '🎥 Video' : '📄 Document'}>
              <div
                onClick={() => mediaFileRef.current?.click()}
                className={`border-2 border-dashed border-[var(--border)] rounded-xl p-5 text-center cursor-pointer bg-[var(--surface2)] mb-3 transition-opacity ${uploadingMedia ? 'opacity-60' : ''}`}
              >
                {mediaUrl ? (
                  <>
                    {mediaType === 'image' && <img src={mediaUrl} alt="preview" className="max-h-[100px] rounded-lg max-w-full mx-auto" />}
                    {mediaType === 'video' && <video src={mediaUrl} controls className="max-h-[100px] max-w-full" />}
                    {mediaType === 'document' && (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[32px]">📄</span>
                        <div className="text-[11px] text-[var(--muted)]">Document ready</div>
                      </div>
                    )}
                    <div className={`text-[11px] mt-2 ${uploadedHandle ? 'text-[#00e5a0]' : 'text-[var(--muted)]'}`}>
                      {uploadingMedia ? '⟳ Uploading...' : '✓ Tap to change'}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-[32px] mb-1">
                      {mediaType === 'image' && '🖼'}{mediaType === 'video' && '🎥'}{mediaType === 'document' && '📄'}
                    </div>
                    <div className="text-[12px] text-[var(--muted)]">Tap to upload {mediaType}</div>
                  </>
                )}
              </div>
              <input ref={mediaFileRef} type="file"
                accept={mediaType === 'image' ? 'image/*' : mediaType === 'video' ? 'video/*' : '.pdf,.doc,.docx,.txt'}
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleMediaUpload(f) }} />
              <label className={LBL}>Caption (optional)</label>
              <input value={mediaCaption} onChange={e => setMediaCaption(e.target.value)}
                placeholder="Add a caption to your media" className={INP} />
            </Section>
          )}

          {/* ── Message Text ── */}
          <Section title={mediaType === 'text' ? 'Message' : 'Additional Text (optional)'}>
            <div className="flex justify-end mb-2">
              <Btn small variant="purple" onClick={addLinkToMessage}>🔗 Add Link</Btn>
            </div>
            <textarea
              value={message}
              onChange={e => { setMessage(e.target.value); if (selectedQT) setSelectedQT(null) }}
              placeholder={mediaType === 'text'
                ? 'Type your message here...\n\nSupports emojis, links, and line breaks!\n\n💡 Tip: URLs are automatically clickable!'
                : 'Optional text to accompany your media...'}
              rows={mediaType === 'text' ? 6 : 3}
              className={`${INP} resize-y leading-relaxed`}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-[var(--muted)]">{message.length} chars</span>
              {selectedQT && <span className="text-[11px] text-[#00e5a0]">Using: {selectedQT.emoji} {selectedQT.name}</span>}
            </div>
          </Section>

          {/* ── Interactive Buttons ── */}
          <Section title="Interactive Buttons">
            <div className="text-[12px] text-[var(--muted)] -mt-1 mb-3">Add call-to-action buttons (max 3)</div>

            {buttons.length > 0 && (
              <div className="mb-3">
                {buttons.map(btn => (
                  <div key={btn.id} className="flex items-center gap-2 py-2 border-b border-[var(--border)]">
                    <span className="text-base">
                      {btn.type === 'reply' && '💬'}{btn.type === 'cta_url' && '🔗'}{btn.type === 'quick_reply' && '⚡'}
                    </span>
                    <div className="flex-1 text-[12px]">
                      <div className="font-medium text-[var(--text)]">{btn.title}</div>
                      <div className="text-[10px] text-[var(--muted)]">
                        {btn.type === 'cta_url' && btn.url}
                        {btn.type === 'reply' && '📱 Reply Button'}
                        {btn.type === 'quick_reply' && '⚡ Quick Reply'}
                      </div>
                    </div>
                    <button onClick={() => setButtons(b => b.filter(x => x.id !== btn.id))}
                      className="bg-transparent border-none text-[#ef4444] cursor-pointer text-lg px-2 min-h-[36px]">✕</button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mb-2">
              <span />
              <Btn small onClick={() => setShowButtonBuilder(!showButtonBuilder)}>
                {showButtonBuilder ? '✕ Close' : '+ Add Button'}
              </Btn>
            </div>

            {showButtonBuilder && (
              <div className="bg-[var(--surface2)] rounded-xl p-3 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                  <select value={newButton.type}
                    onChange={e => setNewButton({ ...newButton, type: e.target.value as any, url: '' })}
                    className={INP}>
                    <option value="reply">💬 Reply Button</option>
                    <option value="cta_url">🔗 URL Button</option>
                    <option value="quick_reply">⚡ Quick Reply</option>
                  </select>
                  <input value={newButton.title} onChange={e => setNewButton({ ...newButton, title: e.target.value })}
                    placeholder="Button label" className={INP} />
                </div>
                {newButton.type === 'cta_url' && (
                  <input value={newButton.url || ''} onChange={e => setNewButton({ ...newButton, url: e.target.value })}
                    placeholder="https://example.com" className={`${INP} mb-2`} />
                )}
                {newButton.type !== 'cta_url' && (
                  <div className="flex items-start gap-1.5 text-[11px] text-[#f59e0b] bg-[#f59e0b10] px-3 py-2 rounded-lg mb-2">
                    <span className="flex-shrink-0">💡</span>
                    <span>For phone numbers, add them directly in your message text (e.g., "Call us at +917892358529")</span>
                  </div>
                )}
                <Btn small variant="accent" onClick={addButton} full
                  disabled={!newButton.title?.trim() || (newButton.type === 'cta_url' && !newButton.url?.trim())}>
                  + Add {newButton.type === 'reply' ? 'Reply Button' : newButton.type === 'cta_url' ? 'URL Button' : 'Quick Reply'}
                </Btn>
              </div>
            )}

            {/* Quick Replies */}
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <div className="text-[12px] font-semibold mb-1 text-[var(--text)]">💬 Quick Reply Options</div>
              <div className="text-[11px] text-[var(--muted)] mb-2.5">These appear as suggested replies for users to tap</div>
              {quickReplies.length > 0 && (
                <div className="mb-2.5">
                  {quickReplies.map(qr => (
                    <div key={qr.id} className="flex items-center gap-2 py-1.5">
                      <span className="text-[12px] flex-1 text-[var(--text)]">💬 {qr.title}</span>
                      <button onClick={() => setQuickReplies(q => q.filter(x => x.id !== qr.id))}
                        className="bg-transparent border-none text-[#ef4444] cursor-pointer text-base min-h-[32px] px-2">✕</button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input id="quickReplyInput" placeholder="Yes, No, Maybe..."
                  className={`flex-1 ${INP}`}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const el = e.target as HTMLInputElement
                      if (el.value) { setQuickReplies(q => [...q, { id: `qr_${Date.now()}`, title: el.value.trim() }]); el.value = '' }
                    }
                  }} />
                <Btn small variant="green" onClick={() => {
                  const el = document.getElementById('quickReplyInput') as HTMLInputElement
                  if (el?.value) { setQuickReplies(q => [...q, { id: `qr_${Date.now()}`, title: el.value.trim() }]); el.value = '' }
                }}>+ Add</Btn>
              </div>
            </div>
          </Section>

          {/* ── Recipients: Single ── */}
          {mode === 'single' && (
            <Section title="Recipient">
              <div className="text-[12px] text-[var(--muted)] -mt-1 mb-3">
                Must have messaged you within the last 24 hours
              </div>
              <label className={LBL}>Phone number</label>
              <input value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="917892358529 or +91 78923 58529"
                className={`${INP} text-[16px] md:text-[13px]`}  /* 16px prevents iOS zoom */
                inputMode="tel" />
              <p className="text-[11px] text-[var(--muted)] mt-1.5">Country code required · spaces stripped automatically</p>
            </Section>
          )}

          {/* ── Recipients: Bulk ── */}
          {mode === 'bulk' && (
            <Section title="Recipients">
              <div className="text-[12px] text-[var(--muted)] -mt-1 mb-3">
                All numbers must have messaged you within 24 hours
              </div>
              <div className="mb-3.5">
                <label className={LBL}>Job label (optional)</label>
                <input value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. May follow-ups" className={INP} />
              </div>
              {/* Manual / CSV toggle */}
              <div className="flex gap-2 mb-3.5">
                {(['manual', 'csv'] as const).map(m => (
                  <button key={m} onClick={() => setInputMode(m)}
                    className={`
                      flex-1 py-2.5 rounded-xl text-[12px] font-mono border cursor-pointer min-h-[44px] transition-all
                      ${inputMode === m
                        ? 'bg-[var(--surface2)] border-[var(--border)] text-[var(--text)] font-bold'
                        : 'bg-transparent border-transparent text-[var(--muted)]'}
                    `}>
                    {m === 'manual' ? '✎ Paste numbers' : '⬆ CSV'}
                  </button>
                ))}
              </div>

              {inputMode === 'manual' ? (
                <>
                  <textarea value={phones} onChange={e => setPhones(e.target.value)}
                    placeholder={'+917892358529\n+918765432109'} rows={5}
                    className={`${INP} resize-y font-mono`} />
                  <div className="text-[11px] text-[var(--muted)] mt-1.5">
                    {recipientCount} recipient{recipientCount !== 1 ? 's' : ''} detected
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      e.preventDefault()
                      const f = e.dataTransfer.files[0]
                      if (f) { const r = new FileReader(); r.onload = ev => setCsvText(ev.target?.result as string ?? ''); r.readAsText(f) }
                    }}
                    className="border-2 border-dashed border-[var(--border)] rounded-xl p-5 text-center cursor-pointer bg-[var(--surface2)] mb-2.5"
                  >
                    <div className="text-[22px] mb-1.5">⬆</div>
                    <div className="text-[13px] text-[var(--text)]">{csvText ? `${recipientCount} recipients loaded` : 'Tap or drag CSV'}</div>
                    <div className="text-[11px] text-[var(--muted)] mt-1">Column: phone, mobile, number, or to</div>
                    <input ref={fileRef} type="file" accept=".csv" className="hidden"
                      onChange={e => {
                        const f = e.target.files?.[0]
                        if (f) { const r = new FileReader(); r.onload = ev => setCsvText(ev.target?.result as string ?? ''); r.readAsText(f) }
                      }} />
                  </div>
                  <textarea value={csvText} onChange={e => setCsvText(e.target.value)}
                    placeholder={'phone,name\n917892358529,Raj'} rows={4}
                    className={`${INP} resize-y font-mono text-[12px]`} />
                </>
              )}
            </Section>
          )}

          {/* ── Send button (desktop only) ── */}
          <div className="hidden md:flex justify-end">
            <SendButton mode={mode} mediaType={mediaType} sending={sending}
              canSend={mode === 'single' ? canSendSingle : canSendBulk}
              recipientCount={recipientCount}
              onSend={mode === 'single' ? sendSingle : sendBulk} />
          </div>
        </div>

        {/* ══ RIGHT COLUMN: desktop preview (hidden on mobile) ══ */}
        <div className="hidden md:block sticky top-6">
          <div className="text-[11px] text-[var(--muted)] tracking-[0.12em] font-mono mb-3">LIVE PREVIEW</div>
          <PreviewPanel {...previewProps} />
        </div>
      </div>

      {/* ══ MOBILE: sticky bottom bar ══ */}
      <div className="fixed bottom-0 left-0 right-0 z-60 bg-[var(--surface)] border-t border-[var(--border)] px-4 py-2.5 flex gap-2.5 items-center md:hidden"
        style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}>
        <button
          onClick={() => setShowMobilePreview(true)}
          className="bg-[#00e5a010] border border-[#00e5a040] text-[#00e5a0] rounded-xl px-3.5 py-3 text-[12px] font-mono cursor-pointer flex-shrink-0 min-h-[48px] whitespace-nowrap"
        >
          👁 Preview
        </button>
        <SendButton mode={mode} mediaType={mediaType} sending={sending}
          canSend={mode === 'single' ? canSendSingle : canSendBulk}
          recipientCount={recipientCount}
          onSend={mode === 'single' ? sendSingle : sendBulk}
          full />
      </div>

      {/* ══ MOBILE: preview drawer ══ */}
      <PreviewDrawer open={showMobilePreview} onClose={() => setShowMobilePreview(false)}>
        <PreviewPanel {...previewProps} />
      </PreviewDrawer>

      {/* ── Toast ── */}
      {toast && (
        <div className={`
          fixed z-[300] text-[13px] font-mono rounded-xl px-5 py-3
          bg-[var(--surface)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]
          border transition-all
          bottom-20 left-4 right-4 text-center md:bottom-8 md:right-8 md:left-auto md:text-left
          ${toast.ok ? 'border-[#10b98150] text-[#10b981]' : 'border-[#ef444450] text-[#ef4444]'}
        `}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}