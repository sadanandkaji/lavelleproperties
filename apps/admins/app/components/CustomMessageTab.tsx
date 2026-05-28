'use client'
// components/CustomMessageTab.tsx
// Send FREE-FORM messages within the 24-hour window.
// Supports: text, images, videos, documents, phone buttons, and quick replies.

import { useState, useEffect, useRef } from 'react'

const S: Record<string, React.CSSProperties> = {
  label:   { fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 6, fontFamily: 'var(--font-mono)' },
  input:   { width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const },
  section: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 20 },
  hint:    { fontSize: 11, color: 'var(--muted)', marginTop: 6, margin: 0 },
}

function Btn({ children, onClick, variant = 'default', disabled = false, small = false, full = false }: any) {
  const map: any = {
    default: { bg: 'var(--surface2)', border: 'var(--border)',    color: 'var(--text)' },
    accent:  { bg: '#00e5a015',       border: '#00e5a050',        color: '#00e5a0' },
    danger:  { bg: '#ef444415',       border: '#ef444450',        color: '#ef4444' },
    warn:    { bg: '#f59e0b15',       border: '#f59e0b50',        color: '#f59e0b' },
    green:   { bg: '#10b98115',       border: '#10b98150',        color: '#10b981' },
    purple:  { bg: '#7c3aed15',       border: '#7c3aed50',        color: '#a78bfa' },
    ghost:   { bg: 'transparent',     border: 'transparent',      color: 'var(--muted)' },
  }
  const c = map[variant]
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: c.bg, border: `1px solid ${c.border}`, color: c.color,
      borderRadius: 8, padding: small ? '6px 14px' : '10px 22px',
      fontSize: small ? 11 : 13, fontFamily: 'var(--font-mono)',
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
      transition: 'all 0.15s', width: full ? '100%' : undefined,
    }}>{children}</button>
  )
}

// Message type for rich media
type RichMediaType = 'text' | 'image' | 'video' | 'document'

// ONLY supported button types by WhatsApp API
type ButtonType = 'cta_url' | 'reply' | 'quick_reply'

interface InteractiveButton {
  id: string
  type: ButtonType
  title: string
  url?: string  // Only for cta_url type
}

interface QuickReply {
  id: string
  title: string
}

// ── WhatsApp bubble with rich media support ───────────────────────────────
function WaRichBubble({ message, mediaUrl, mediaType, caption, buttons, quickReplies }: {
  message: string
  mediaUrl?: string | null
  mediaType?: RichMediaType
  caption?: string
  buttons?: InteractiveButton[]
  quickReplies?: QuickReply[]
}) {
  if (!message && !mediaUrl) return (
    <div style={{ textAlign: 'center', color: '#8696a0', fontSize: 12, padding: 20 }}>
      Type a message to preview
    </div>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ background: '#005c4b', borderRadius: '16px 16px 4px 16px',
        padding: mediaUrl ? '0px' : '10px 14px', maxWidth: '82%', overflow: 'hidden' }}>
        
        {/* Media preview */}
        {mediaUrl && mediaType === 'image' && (
          <img src={mediaUrl} alt="media" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', display: 'block' }} />
        )}
        {mediaUrl && mediaType === 'video' && (
          <video src={mediaUrl} controls style={{ width: '100%', maxHeight: 200 }} />
        )}
        {mediaUrl && mediaType === 'document' && (
          <div style={{ padding: 12, background: '#0b3b32', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24 }}>📄</span>
            <div>
              <div style={{ fontSize: 12, color: '#e9edef' }}>Document</div>
              <a href={mediaUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: '#53bdeb' }}>Open</a>
            </div>
          </div>
        )}
        
        {/* Caption */}
        {caption && <div style={{ padding: '8px 12px 4px', fontSize: 11, color: '#8abeae' }}>{caption}</div>}
        
        {/* Message body */}
        {message && (
          <div style={{ padding: mediaUrl ? '10px 12px' : '0px', fontSize: 13, color: '#e9edef', lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {message}
          </div>
        )}
        
{/* Interactive Buttons */}
{buttons && buttons.length > 0 && (
  <div style={{ borderTop: '1px solid #0b3b32', marginTop: 8 }}>
    {buttons.map((btn, i) => (
      <div key={btn.id} style={{ 
        padding: '10px 12px', 
        textAlign: 'center', 
        fontSize: 13, 
        color: '#53bdeb',
        borderBottom: i < buttons.length - 1 ? '1px solid #0b3b32' : undefined,
        cursor: 'pointer'
      }}>
        {btn.type === 'cta_url' && '🔗 '}
        {btn.type === 'reply' && '💬 '}
        {btn.type === 'quick_reply' && '⚡ '}
        {btn.title}
        {btn.type === 'cta_url' && btn.url && ` (${btn.url})`}
      </div>
    ))}
  </div>
)}
        
        {/* Quick Replies */}
        {quickReplies && quickReplies.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8, padding: '4px 0' }}>
            {quickReplies.map(reply => (
              <div key={reply.id} style={{
                padding: '6px 12px',
                borderRadius: 20,
                background: '#0b3b32',
                fontSize: 12,
                color: '#e9edef',
                cursor: 'pointer'
              }}>
                {reply.title}
              </div>
            ))}
          </div>
        )}
        
        {/* Timestamp */}
        <div style={{ fontSize: 10, color: '#8abeae', textAlign: 'right', marginTop: 4, padding: '0 12px 8px' }}>
          {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} ✓✓
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function CustomMessageTab({ onJobStarted }: { onJobStarted?: (jobId: string) => void }) {
  const [mode, setMode] = useState<'single' | 'bulk'>('single')
  
  // Rich media state
  const [mediaType, setMediaType] = useState<RichMediaType>('text')
  const [mediaUrl, setMediaUrl] = useState('')
  const [mediaCaption, setMediaCaption] = useState('')
  const [uploadingMedia, setUploadingMedia] = useState(false)
  const [uploadedHandle, setUploadedHandle] = useState('')
  
  // Interactive buttons state - ONLY reply and phone_number
  const [buttons, setButtons] = useState<InteractiveButton[]>([])
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([])
  const [showButtonBuilder, setShowButtonBuilder] = useState(false)
  const [newButton, setNewButton] = useState<Partial<InteractiveButton>>({ type: 'reply', title: '' })
  
  // Message content
  const [message, setMessage] = useState('')
  
  // Quick templates
  const [quickTemplates, setQuickTemplates] = useState<any[]>([])
  const [selectedQT, setSelectedQT] = useState<any>(null)
  const [showSaveForm, setShowSaveForm] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [saveCategory, setSaveCategory] = useState('General')
  const [saveEmoji, setSaveEmoji] = useState('💬')
  
  // Recipients
  const [phone, setPhone] = useState('')
  const [phones, setPhones] = useState('')
  const [csvText, setCsvText] = useState('')
  const [inputMode, setInputMode] = useState<'manual' | 'csv'>('manual')
  const [label, setLabel] = useState('')
  
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const mediaFileRef = useRef<HTMLInputElement>(null)

  const showToast = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 4000) }

  // Load quick templates
  useEffect(() => {
    fetch('/api/messages/custom').then(r => r.json()).then(d => setQuickTemplates(d.data ?? []))
  }, [])

  const loadQT = () => fetch('/api/messages/custom').then(r => r.json()).then(d => setQuickTemplates(d.data ?? []))

  const selectQT = (tpl: any) => {
    if (selectedQT?.id === tpl.id) {
      setSelectedQT(null)
      setMessage('')
      setMediaType('text')
      setMediaUrl('')
      setButtons([])
      setQuickReplies([])
    } else {
      setSelectedQT(tpl)
      setMessage(tpl.body || '')
      setMediaType(tpl.mediaType || 'text')
      setMediaUrl(tpl.mediaUrl || '')
      setMediaCaption(tpl.mediaCaption || '')
      setButtons(tpl.buttons || [])
      setQuickReplies(tpl.quickReplies || [])
    }
  }

  const deleteQT = async (id: string) => {
    await fetch(`/api/messages/custom?id=${id}`, { method: 'DELETE' })
    if (selectedQT?.id === id) {
      setSelectedQT(null)
      setMessage('')
    }
    loadQT()
  }

  const saveAsQT = async () => {
    if (!saveName.trim() || (!message.trim() && mediaType === 'text')) return
    const res = await fetch('/api/messages/custom', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'save',
        name: saveName,
        message,
        category: saveCategory,
        emoji: saveEmoji,
        mediaType: mediaType !== 'text' ? mediaType : undefined,
        mediaUrl,
        mediaCaption,
        buttons,
        quickReplies,
      }),
    })
    const data = await res.json()
    if (data.success) { showToast('✓ Saved'); setShowSaveForm(false); setSaveName(''); loadQT() }
    else showToast(`✕ ${data.error}`, false)
  }

  // Upload media
  const handleMediaUpload = async (file: File) => {
    setUploadingMedia(true)
    const previewUrl = URL.createObjectURL(file)
    setMediaUrl(previewUrl)
    
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('type', mediaType)
      
      const res = await fetch('/api/upload-media', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success && data.url) {
        setMediaUrl(data.url)
        setUploadedHandle(data.handle || data.url)
        showToast(`✓ ${mediaType} uploaded successfully`)
      } else {
        showToast(`✕ Upload failed: ${data.error}`, false)
      }
    } catch (err: any) {
      showToast(`✕ ${err.message}`, false)
    }
    setUploadingMedia(false)
  }

  // Add button - ONLY reply and phone_number
const addButton = () => {
  if (!newButton.title?.trim()) return
  if (newButton.type === 'cta_url' && !newButton.url?.trim()) {
    showToast('Please enter a URL for the button', false)
    return
  }
  
  const btn: InteractiveButton = {
    id: `btn_${Date.now()}`,
    type: newButton.type as 'reply' | 'cta_url' | 'quick_reply',
    title: newButton.title.trim(),
    url: newButton.type === 'cta_url' ? newButton.url?.trim() : undefined,
  }
  
  setButtons([...buttons, btn])
  setNewButton({ type: 'reply', title: '' })
  showToast(`✓ Added ${btn.type === 'reply' ? 'reply' : btn.type === 'cta_url' ? 'URL' : 'quick reply'} button`)
}

  const removeButton = (id: string) => {
    setButtons(buttons.filter(b => b.id !== id))
  }

  const addQuickReply = (title: string) => {
    if (!title.trim()) return
    setQuickReplies([...quickReplies, { id: `qr_${Date.now()}`, title: title.trim() }])
  }

  const removeQuickReply = (id: string) => {
    setQuickReplies(quickReplies.filter(q => q.id !== id))
  }

  // Add link as text (not as button - since URL buttons aren't supported)
  const addLinkToMessage = () => {
    const linkUrl = prompt('Enter URL:', 'https://')
    const linkText = prompt('Enter link text (optional):', 'Click here')
    if (linkUrl) {
      const textToAdd = linkText ? `\n\n🔗 ${linkText}: ${linkUrl}` : `\n\n🔗 ${linkUrl}`
      setMessage(prev => prev + textToAdd)
      showToast('✓ Link added to message')
    }
  }

  // Build payload for sending
  const buildPayload = (to: string) => {
    const base: any = { 
      action: 'send',
      to 
    }
    
    // Handle different message types
    if (mediaType === 'image' && mediaUrl) {
      base.type = 'image'
      base.mediaUrl = mediaUrl
      if (mediaCaption) base.mediaCaption = mediaCaption
      if (message) base.message = message
    } 
    else if (mediaType === 'video' && mediaUrl) {
      base.type = 'video'
      base.mediaUrl = mediaUrl
      if (mediaCaption) base.mediaCaption = mediaCaption
      if (message) base.message = message
    }
    else if (mediaType === 'document' && mediaUrl) {
      base.type = 'document'
      base.mediaUrl = mediaUrl
      if (mediaCaption) base.mediaCaption = mediaCaption
      if (message) base.message = message
    }
    else if (buttons.length > 0 || quickReplies.length > 0) {
      base.type = 'interactive'
      base.message = message || mediaCaption || 'Select an option'
      if (buttons.length > 0) {
        base.buttons = buttons
      }
      if (quickReplies.length > 0) {
        base.quickReplies = quickReplies
      }
      if (mediaCaption) base.mediaCaption = mediaCaption
    }
    else if (message) {
      base.type = 'text'
      base.message = message
    }
    
    return base
  }

  // Send handlers
  const sendSingle = async () => {
    if (!phone.trim()) return
    if (mediaType === 'text' && !message.trim() && buttons.length === 0 && quickReplies.length === 0) {
      showToast('Please enter a message or add media/buttons', false)
      return
    }
    
    setSending(true)
    try {
      const payload = buildPayload(phone.replace(/\D/g, ''))
      const res = await fetch('/api/messages/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        showToast(`✓ Sent to +${phone.replace(/\D/g, '')}`)
        setPhone('')
        if (!selectedQT) {
          setMessage('')
          setMediaType('text')
          setMediaUrl('')
          setMediaCaption('')
          setButtons([])
          setQuickReplies([])
        }
      } else {
        showToast(`✕ ${data.error}`, false)
      }
    } catch (err: any) {
      showToast(`✕ ${err.message}`, false)
    }
    setSending(false)
  }

  const sendBulk = async () => {
    if (mediaType === 'text' && !message.trim() && buttons.length === 0 && quickReplies.length === 0) {
      showToast('Please enter a message or add media/buttons', false)
      return
    }
    
    const recipientCount = inputMode === 'manual'
      ? phones.split(/[\n,;]+/).map(s => s.trim()).filter(s => s.length >= 7).length
      : Math.max(0, csvText.trim().split('\n').filter(Boolean).length - 1)
    
    if (recipientCount === 0) {
      showToast('No valid recipients', false)
      return
    }
    
    setSending(true)
    try {
      const payload: any = {
        action: 'bulk',
        label: label || `Custom ${mediaType} message`,
        mediaType: mediaType !== 'text' ? mediaType : undefined,
        mediaUrl,
        mediaCaption,
        message,
        buttons,
        quickReplies,
      }
      
      if (inputMode === 'csv') payload.csvText = csvText
      else payload.phones = phones
      
      const res = await fetch('/api/messages/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        showToast(`✓ Bulk job started — ${data.data?.total || recipientCount} recipients`)
        setPhones('')
        setCsvText('')
        setLabel('')
        if (!selectedQT) {
          setMessage('')
          setMediaType('text')
          setMediaUrl('')
          setMediaCaption('')
          setButtons([])
          setQuickReplies([])
        }
        onJobStarted?.(data.jobId)
      } else {
        showToast(`✕ ${data.error}`, false)
      }
    } catch (err: any) {
      showToast(`✕ ${err.message}`, false)
    }
    setSending(false)
  }

  const canSendSingle = !sending && phone.trim().length >= 7 &&
    (mediaType !== 'text' ? mediaUrl : message.trim().length > 0 || buttons.length > 0 || quickReplies.length > 0)
  
  const recipientCount = inputMode === 'manual'
    ? phones.split(/[\n,;]+/).map(s => s.trim()).filter(s => s.length >= 7).length
    : Math.max(0, csvText.trim().split('\n').filter(Boolean).length - 1)
  
  const canSendBulk = !sending && recipientCount > 0 &&
    (mediaType !== 'text' ? mediaUrl : message.trim().length > 0 || buttons.length > 0 || quickReplies.length > 0)

  const EMOJIS = ['💬', '🌿', '🏠', '✅', '👋', '📋', '🎉', '⚡', '💡', '🔔', '🖼️', '🎥', '📄']
  const CATEGORIES = ['General', 'Follow-up', 'Support', 'Greetings', 'Offers', 'Reminders', 'Media']

  return (
    <div>
      {/* Info banner */}
      <div style={{ background: '#10b98110', border: '1px solid #10b98130', borderRadius: 10,
        padding: '12px 18px', marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>⏱</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981', marginBottom: 3 }}>24-Hour Customer Service Window</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
            When a customer messages you first, you can reply with <strong>text, images, videos, documents</strong>,
            add <strong>phone buttons</strong>, or <strong>quick replies</strong>.
            <br/>
            <span style={{ fontSize: 10, color: '#10b98180' }}>💡 Tip: Add links directly in your message text - they'll be clickable!</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'start' }}>

        {/* LEFT SIDE */}
        <div>
          {/* Mode toggle */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: 'var(--surface2)',
            padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
            {(['single', 'bulk'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: '9px', borderRadius: 8, cursor: 'pointer',
                background: mode === m ? 'var(--surface)' : 'transparent',
                border: `1px solid ${mode === m ? 'var(--border)' : 'transparent'}`,
                color: mode === m ? 'var(--text)' : 'var(--muted)',
                fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: mode === m ? 700 : 400,
              }}>
                {m === 'single' ? '👤 Single' : '👥 Bulk'}
              </button>
            ))}
          </div>

          {/* Quick templates */}
          <div style={S.section}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Quick Templates</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Saved rich messages — click to load</div>
              </div>
              <Btn small onClick={() => setShowSaveForm(!showSaveForm)}>
                {showSaveForm ? '✕ Cancel' : '+ Save current'}
              </Btn>
            </div>

            {showSaveForm && (
              <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={S.label}>Name</label>
                    <input value={saveName} onChange={e => setSaveName(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                      placeholder="e.g. welcome_with_image" style={S.input} />
                  </div>
                  <div>
                    <label style={S.label}>Category</label>
                    <select value={saveCategory} onChange={e => setSaveCategory(e.target.value)} style={S.input}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={S.label}>Emoji</label>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
                    {EMOJIS.map(e => (
                      <button key={e} onClick={() => setSaveEmoji(e)} style={{
                        width: 34, height: 34, borderRadius: 8, cursor: 'pointer', fontSize: 17,
                        border: `1px solid ${saveEmoji === e ? '#00e5a050' : 'var(--border)'}`,
                        background: saveEmoji === e ? '#00e5a010' : 'var(--surface)',
                      }}>{e}</button>
                    ))}
                  </div>
                </div>
                <Btn variant="accent" disabled={!saveName.trim() || (!message.trim() && mediaType === 'text')} onClick={saveAsQT} full>
                  Save as &ldquo;{saveName || 'template'}&rdquo;
                </Btn>
              </div>
            )}

            {quickTemplates.length === 0 ? (
              <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', padding: '12px 0' }}>
                No quick templates yet. Create a rich message and click &ldquo;+ Save current&rdquo;.
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                {quickTemplates.map(tpl => (
                  <div key={tpl.id} style={{ position: 'relative', display: 'inline-flex' }}>
                    <button onClick={() => selectQT(tpl)} style={{
                      padding: '7px 14px', borderRadius: 20, fontSize: 12,
                      background: selectedQT?.id === tpl.id ? '#00e5a015' : 'var(--surface2)',
                      border: `1px solid ${selectedQT?.id === tpl.id ? '#00e5a050' : 'var(--border)'}`,
                      color: selectedQT?.id === tpl.id ? '#00e5a0' : 'var(--muted)',
                      cursor: 'pointer', fontFamily: 'var(--font-mono)',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span>{tpl.emoji}</span><span>{tpl.name}</span>
                      {tpl.mediaType && tpl.mediaType !== 'text' && (
                        <span style={{ fontSize: 10 }}>
                          {tpl.mediaType === 'image' && '🖼'}
                          {tpl.mediaType === 'video' && '🎥'}
                          {tpl.mediaType === 'document' && '📄'}
                        </span>
                      )}
                    </button>
                    <button onClick={e => { e.stopPropagation(); deleteQT(tpl.id) }} style={{
                      position: 'absolute', top: -6, right: -6, width: 16, height: 16,
                      borderRadius: '50%', border: 'none', background: '#ef4444', color: '#fff',
                      fontSize: 9, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: 0, transition: 'opacity 0.15s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                    >✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Media Type Selector */}
          <div style={S.section}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 14 }}>
              Message Type
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {(['text', 'image', 'video', 'document'] as RichMediaType[]).map(t => (
                <button key={t} onClick={() => { setMediaType(t); if (t === 'text') setMediaUrl('') }}
                  style={{
                    padding: '10px', borderRadius: 8, cursor: 'pointer', fontSize: 12,
                    border: `1px solid ${mediaType === t ? '#00e5a060' : 'var(--border)'}`,
                    background: mediaType === t ? '#00e5a010' : 'var(--surface2)',
                    color: mediaType === t ? '#00e5a0' : 'var(--muted)',
                    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 4,
                  }}>
                  <span style={{ fontSize: 20 }}>
                    {t === 'text' && '✉'}
                    {t === 'image' && '🖼'}
                    {t === 'video' && '🎥'}
                    {t === 'document' && '📄'}
                  </span>
                  <span>{t === 'text' ? 'Text' : t === 'image' ? 'Image' : t === 'video' ? 'Video' : 'Document'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Media Upload */}
          {mediaType !== 'text' && (
            <div style={S.section}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 14 }}>
                {mediaType === 'image' ? 'Image' : mediaType === 'video' ? 'Video' : 'Document'}
              </div>
              
              <div onClick={() => mediaFileRef.current?.click()}
                style={{ border: '2px dashed var(--border)', borderRadius: 10, padding: 20,
                  textAlign: 'center' as const, cursor: uploadingMedia ? 'wait' : 'pointer',
                  background: 'var(--surface2)', opacity: uploadingMedia ? 0.6 : 1, marginBottom: 12 }}>
                {mediaUrl ? (
                  <>
                    {mediaType === 'image' && <img src={mediaUrl} alt="preview" style={{ maxHeight: 100, borderRadius: 8 }} />}
                    {mediaType === 'video' && <video src={mediaUrl} controls style={{ maxHeight: 100 }} />}
                    {mediaType === 'document' && <div><span style={{ fontSize: 32 }}>📄</span><div style={{ fontSize: 11, marginTop: 4 }}>Document ready</div></div>}
                    <div style={{ fontSize: 11, marginTop: 6, color: uploadedHandle ? '#00e5a0' : 'var(--muted)' }}>
                      {uploadingMedia ? '⟳ Uploading...' : '✓ Click to change'}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 32, marginBottom: 4 }}>
                      {mediaType === 'image' && '🖼'}
                      {mediaType === 'video' && '🎥'}
                      {mediaType === 'document' && '📄'}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                      Click to upload {mediaType}
                    </div>
                  </>
                )}
              </div>
              <input ref={mediaFileRef} type="file"
                accept={mediaType === 'image' ? 'image/*' : mediaType === 'video' ? 'video/*' : '.pdf,.doc,.docx,.txt'}
                style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleMediaUpload(f) }} />
              
              <label style={S.label}>Caption (optional)</label>
              <input value={mediaCaption} onChange={e => setMediaCaption(e.target.value)}
                placeholder="Add a caption to your media" style={S.input} />
            </div>
          )}

          {/* Message Text */}
          <div style={S.section}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>
                  {mediaType === 'text' ? 'Message' : 'Additional Text (optional)'}
                </div>
              </div>
              <Btn small variant="purple" onClick={addLinkToMessage}>
                🔗 Add Link
              </Btn>
            </div>
            <textarea value={message} onChange={e => { setMessage(e.target.value); if (selectedQT) setSelectedQT(null) }}
              placeholder={mediaType === 'text' ? 'Type your message here...\n\nSupports emojis, links, and line breaks!\n\n💡 Tip: URLs are automatically clickable!' : 'Optional text to accompany your media...'}
              rows={mediaType === 'text' ? 6 : 3} style={{ ...S.input, resize: 'vertical' as const, lineHeight: 1.6 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{message.length} chars</span>
              {selectedQT && <span style={{ fontSize: 11, color: '#00e5a0' }}>Using: {selectedQT.emoji} {selectedQT.name}</span>}
            </div>
          </div>

          {/* Interactive Buttons Builder - ONLY reply and phone_number */}
          

            {/* Existing buttons */}
            

{/* Interactive Buttons Builder - ONLY supported types */}
<div style={S.section}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Interactive Buttons</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Add call-to-action buttons (max 3)</div>
    </div>
    <Btn small onClick={() => setShowButtonBuilder(!showButtonBuilder)}>
      {showButtonBuilder ? '✕ Close' : '+ Add Button'}
    </Btn>
  </div>

  {/* Existing buttons - CORRECTED display */}
  {buttons.length > 0 && (
    <div style={{ marginBottom: 12 }}>
      {buttons.map(btn => (
        <div key={btn.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 16 }}>
            {btn.type === 'reply' && '💬'}
            {btn.type === 'cta_url' && '🔗'}
            {btn.type === 'quick_reply' && '⚡'}
          </span>
          <div style={{ flex: 1, fontSize: 12 }}>
            <div style={{ fontWeight: 500 }}>{btn.title}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>
              {btn.type === 'cta_url' && btn.url}
              {btn.type === 'reply' && '📱 Reply Button'}
              {btn.type === 'quick_reply' && '⚡ Quick Reply'}
            </div>
          </div>
          <button onClick={() => removeButton(btn.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 14 }}>✕</button>
        </div>
      ))}
    </div>
  )}

  {/* Button builder form */}
  {showButtonBuilder && (
    <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: 12, marginTop: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
        <select 
          value={newButton.type} 
          onChange={e => setNewButton({ ...newButton, type: e.target.value as any, url: '' })} 
          style={S.input}
        >
          <option value="reply">💬 Reply Button</option>
          <option value="cta_url">🔗 URL Button</option>
          <option value="quick_reply">⚡ Quick Reply</option>
        </select>
        <input 
          value={newButton.title} 
          onChange={e => setNewButton({ ...newButton, title: e.target.value })}
          placeholder="Button label" 
          style={S.input} 
        />
      </div>
      
      {/* URL input - only for cta_url type */}
      {newButton.type === 'cta_url' && (
        <input 
          value={newButton.url || ''} 
          onChange={e => setNewButton({ ...newButton, url: e.target.value })}
          placeholder="https://example.com" 
          style={{ ...S.input, marginBottom: 8 }} 
        />
      )}
      
      {/* Note about phone numbers */}
      {newButton.type !== 'cta_url' && (
        <div style={{ 
          fontSize: 11, 
          color: '#f59e0b', 
          background: '#f59e0b10', 
          padding: '8px', 
          borderRadius: 6, 
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <span>💡</span>
          <span>For phone numbers, add them directly in your message text (e.g., "Call us at +917892358529")</span>
        </div>
      )}
      
      <Btn 
        small 
        variant="accent" 
        onClick={addButton} 
        full 
        disabled={
          !newButton.title?.trim() || 
          (newButton.type === 'cta_url' && !newButton.url?.trim())
        }
      >
        + Add {newButton.type === 'reply' ? 'Reply Button' : newButton.type === 'cta_url' ? 'URL Button' : 'Quick Reply'}
      </Btn>
    </div>
  )}

  {/* Quick Reply Options - Simple text replies */}
  <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>💬 Quick Reply Options</div>
    <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>
      These appear as suggested replies for users to tap
    </div>
    
    {/* Existing quick replies */}
    {quickReplies.length > 0 && (
      <div style={{ marginBottom: 8 }}>
        {quickReplies.map(qr => (
          <div key={qr.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
            <span style={{ fontSize: 12 }}>💬 {qr.title}</span>
            <button onClick={() => removeQuickReply(qr.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>✕</button>
          </div>
        ))}
      </div>
    )}
    
    {/* Add quick reply input */}
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        id="quickReplyInput"
        placeholder="Quick reply option (e.g. Yes, No, Maybe)"
        style={{ flex: 1, ...S.input, marginBottom: 0 }}
        onKeyDown={e => { 
          if (e.key === 'Enter') { 
            const input = e.target as HTMLInputElement
            if (input.value) { 
              addQuickReply(input.value)
              input.value = ''
            }
          } 
        }}
      />
      <Btn small variant="green" onClick={() => {
        const input = document.getElementById('quickReplyInput') as HTMLInputElement
        if (input?.value) { 
          addQuickReply(input.value)
          input.value = ''
        }
      }}>
        + Add
      </Btn>
    </div>
  </div>
</div>

          {/* Recipients section */}
          {mode === 'single' && (
            <div style={S.section}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Recipient</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>
                Phone number to send this message to (must have messaged you within 24 hours)
              </div>
              <label style={S.label}>Phone number</label>
              <input value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="917892358529 or +91 78923 58529" style={S.input} />
              <p style={S.hint}>Country code required · spaces stripped automatically</p>
            </div>
          )}

          {mode === 'bulk' && (
            <div style={S.section}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Recipients</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>
                Phone numbers to send to (all must have messaged you within 24 hours)
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={S.label}>Job label (optional)</label>
                <input value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. May follow-ups" style={S.input} />
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {(['manual', 'csv'] as const).map(m => (
                  <button key={m} onClick={() => setInputMode(m)} style={{
                    padding: '7px 16px', borderRadius: 8, cursor: 'pointer',
                    background: inputMode === m ? 'var(--surface2)' : 'transparent',
                    border: `1px solid ${inputMode === m ? 'var(--border)' : 'transparent'}`,
                    color: inputMode === m ? 'var(--text)' : 'var(--muted)',
                    fontSize: 12, fontFamily: 'var(--font-mono)',
                  }}>{m === 'manual' ? '✎ Paste numbers' : '⬆ CSV'}</button>
                ))}
              </div>
              {inputMode === 'manual' ? (
                <>
                  <textarea value={phones} onChange={e => setPhones(e.target.value)}
                    placeholder={'+917892358529\n+918765432109'}
                    rows={5} style={{ ...S.input, resize: 'vertical' as const, fontFamily: 'var(--font-mono)' }} />
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
                    {recipientCount} recipient{recipientCount !== 1 ? 's' : ''} detected
                  </div>
                </>
              ) : (
                <>
                  <div onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setCsvText(ev.target?.result as string ?? ''); r.readAsText(f) } }}
                    style={{ border: '2px dashed var(--border)', borderRadius: 10, padding: 20, textAlign: 'center' as const,
                      cursor: 'pointer', background: 'var(--surface2)', marginBottom: 10 }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>⬆</div>
                    <div style={{ fontSize: 13, color: 'var(--text)' }}>{csvText ? `${recipientCount} recipients loaded` : 'Click or drag CSV'}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Column: phone, mobile, number, or to</div>
                    <input ref={fileRef} type="file" accept=".csv" onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) { const r = new FileReader(); r.onload = ev => setCsvText(ev.target?.result as string ?? ''); r.readAsText(file) }
                    }} style={{ display: 'none' }} />
                  </div>
                  <textarea value={csvText} onChange={e => setCsvText(e.target.value)}
                    placeholder={'phone,name\n917892358529,Raj'} rows={4}
                    style={{ ...S.input, resize: 'vertical' as const, fontFamily: 'var(--font-mono)', fontSize: 12 }} />
                </>
              )}
            </div>
          )}

          {/* Send button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {mode === 'single' ? (
              <button
                onClick={sendSingle}
                disabled={!canSendSingle}
                style={{ padding: '12px 32px', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-mono)',
                  border: `1px solid ${mediaType === 'text' ? '#10b98150' : '#00e5a050'}`,
                  background: mediaType === 'text' ? '#10b98115' : '#00e5a015',
                  color: mediaType === 'text' ? '#10b981' : '#00e5a0',
                  cursor: !canSendSingle ? 'not-allowed' : 'pointer', opacity: !canSendSingle ? 0.5 : 1 }}>
                {sending ? '⟳ Sending...' : `📤 Send ${mediaType === 'text' ? 'Message' : mediaType}`}
              </button>
            ) : (
              <button
                onClick={sendBulk}
                disabled={!canSendBulk}
                style={{ padding: '12px 32px', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-mono)',
                  border: `1px solid ${mediaType === 'text' ? '#10b98150' : '#00e5a050'}`,
                  background: mediaType === 'text' ? '#10b98115' : '#00e5a015',
                  color: mediaType === 'text' ? '#10b981' : '#00e5a0',
                  cursor: !canSendBulk ? 'not-allowed' : 'pointer', opacity: !canSendBulk ? 0.5 : 1 }}>
                {sending ? '⟳ Launching...' : `🚀 Send to ${recipientCount.toLocaleString()} recipient${recipientCount !== 1 ? 's' : ''}`}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Preview */}
        <div style={{ position: 'sticky', top: 24 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
            LIVE PREVIEW
          </div>

          {/* Phone mockup */}
          <div style={{ background: '#1a1a2e', borderRadius: 24, padding: '16px 10px', border: '6px solid #333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px 10px', fontSize: 10, color: '#888' }}>
              <span>9:41</span><span>● ● ●</span>
            </div>
            <div style={{ background: '#0b1418', borderRadius: 14, minHeight: 220, padding: 10,
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff08 1px, transparent 0)',
              backgroundSize: '20px 20px' }}>
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

          {/* Info card */}
          <div style={{ marginTop: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 10 }}>24-HR WINDOW RULES</div>
            {[
              { icon: '✓', text: 'Customer messaged you first',           color: '#10b981' },
              { icon: '✓', text: 'Within 24 hours of their message',      color: '#10b981' },
              { icon: '✓', text: 'Send text, images, videos, documents',  color: '#10b981' },
              { icon: '✓', text: 'Add phone buttons & quick replies',     color: '#10b981' },
              { icon: '💡', text: 'URLs are clickable in text messages',   color: '#f59e0b' },
              { icon: '✕', text: 'URL buttons not supported by WhatsApp', color: '#ef4444' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 11, marginBottom: 5 }}>
                <span style={{ fontWeight: 700, color: c.color, flexShrink: 0 }}>{c.icon}</span>
                <span style={{ color: 'var(--muted)' }}>{c.text}</span>
              </div>
            ))}
          </div>

          {/* Template info if loaded */}
          {selectedQT && (
            <div style={{ marginTop: 12, background: '#00e5a008', border: '1px solid #00e5a025', borderRadius: 10, padding: 12 }}>
              <div style={{ fontSize: 10, color: '#00e5a0', letterSpacing: '0.1em', marginBottom: 6 }}>USING QUICK TEMPLATE</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>{selectedQT.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 700 }}>{selectedQT.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{selectedQT.category}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 300,
          background: 'var(--surface)',
          border: `1px solid ${toast.ok ? '#10b98150' : '#ef444450'}`,
          color: toast.ok ? '#10b981' : '#ef4444',
          padding: '12px 24px', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-mono)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          {toast.msg}
        </div>
      )}
    </div>
  
  )}