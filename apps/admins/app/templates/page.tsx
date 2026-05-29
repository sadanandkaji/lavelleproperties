'use client'
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import TemplateCreator from '../components/TemplateCreator'
import useAdminAuth from '@/hooks/useAdminAuth'

/* ─── Btn ─── */
function Btn({
  children, onClick, variant = 'default', disabled = false, small = false, className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'accent' | 'danger' | 'warn' | 'purple'
  disabled?: boolean
  small?: boolean
  className?: string
}) {
  const styles = {
    default: 'bg-[var(--surface2)] border-[var(--border)]   text-[var(--text)]',
    accent:  'bg-[#00e5a020]   border-[#00e5a060]           text-[var(--accent)]',
    danger:  'bg-[#ef444420]   border-[#ef444460]           text-[var(--danger)]',
    warn:    'bg-[#f59e0b20]   border-[#f59e0b60]           text-[var(--warn)]',
    purple:  'bg-[#7c3aed20]   border-[#7c3aed60]           text-[var(--accent2)]',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-1.5 border rounded-lg
        font-mono transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${small ? 'px-3 py-1.5 text-[11px]' : 'px-4 py-2.5 text-[13px]'}
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

/* ─── Badge ─── */
function Badge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    approved: 'bg-[#00e5a020] border-[#00e5a060] text-[#00e5a0]',
    pending:  'bg-[#f59e0b20] border-[#f59e0b60] text-[#f59e0b]',
    rejected: 'bg-[#ef444420] border-[#ef444460] text-[#ef4444]',
  }
  return (
    <span className={`
      text-[10px] px-2.5 py-0.5 rounded-full border font-mono
      font-bold tracking-[0.1em] uppercase
      ${styles[status] ?? styles.pending}
    `}>
      {status}
    </span>
  )
}

/* ─── Tag chip ─── */
function Chip({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-[10px] bg-[var(--surface2)] px-2.5 py-0.5 rounded text-[var(--muted)] ${className}`}>
      {children}
    </span>
  )
}

/* ════════════════════════════════════════
   TEMPLATE CARD
════════════════════════════════════════ */
function TemplateCard({
  template,
  onDelete,
}: {
  template: any
  onDelete: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)

  const components    = template.components || []
  const headerComp   = components.find((c: any) => c.type === 'HEADER')
  const footerComp   = components.find((c: any) => c.type === 'FOOTER')
  const buttonsComp  = components.find((c: any) => c.type === 'BUTTONS')
  const headerMedia  = template.media?.find((m: any) => m.isHeader === true)
  const imageUrl     = headerMedia?.url || template.headerMediaUrl

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-200">

      {/* ── Card header row ── */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-4 border-b border-[var(--border)]">
        {/* Name + badges */}
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          <span className="font-[var(--font-display)] font-bold text-[15px] text-[var(--text)] truncate">
            {template.name}
          </span>
          <Badge status={template.status} />
          <Chip>{template.category}</Chip>
          <Chip>{template.language?.toUpperCase()}</Chip>
          {template.id?.startsWith('meta_') && (
            <span className="text-[10px] bg-[#1877f220] border border-[#1877f240] text-[#1877f2] px-2.5 py-0.5 rounded font-bold">
              META
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {template.status === 'approved' && (
            <Btn variant="accent" small onClick={() => { window.location.href = `/messages?template=${template.id}` }}>
              Use
            </Btn>
          )}
          <Btn variant="danger" small onClick={() => onDelete(template.id)}>
            Delete
          </Btn>
          {/* Expand toggle on mobile */}
          <button
            onClick={() => setExpanded(v => !v)}
            className="
              md:hidden w-7 h-7 flex items-center justify-center rounded-lg
              bg-[var(--surface2)] border border-[var(--border)]
              text-[var(--muted)] text-xs transition-transform duration-200 cursor-pointer
            "
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ▼
          </button>
        </div>
      </div>

      {/* ── Body: preview + details ──
          Desktop → side by side
          Mobile  → stacked, details hidden behind expand toggle
      ── */}
      <div className={`
        flex flex-col md:flex-row gap-0
        ${!expanded ? 'md:flex' : 'flex'}
        ${!expanded ? 'hidden md:flex' : 'flex'}
      `}>

        {/* ── WhatsApp Preview ── */}
        <div className="flex-shrink-0 p-4 md:w-[340px] border-b md:border-b-0 md:border-r border-[var(--border)]">
          <p className="text-[10px] text-[var(--muted)] tracking-[0.1em] font-mono mb-3">PREVIEW</p>

          {/* Phone shell */}
          <div className="bg-[#0a1014] rounded-2xl p-3 border-4 border-[#2a2a2e] max-w-[320px] mx-auto">
            {/* Status bar */}
            <div className="flex justify-between px-2 pb-2 text-[10px] text-[#555]">
              <span>9:41</span><span>● ● ●</span>
            </div>

            {/* Chat bg */}
            <div
              className="bg-[#0b1418] rounded-xl p-2 min-h-[180px]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff08 1px, transparent 0)',
                backgroundSize: '18px 18px',
              }}
            >
              {/* Bubble */}
              <div className="max-w-[90%] bg-[#202c33] rounded-[0_10px_10px_10px] overflow-hidden shadow-md">

                {/* Text header */}
                {headerComp?.format === 'TEXT' && headerComp?.text && (
                  <div className="px-3 pt-2.5 pb-1 text-[13px] font-bold text-[#e9edef]">
                    {headerComp.text}
                  </div>
                )}

                {/* Image header */}
                {template.headerFormat === 'image' && (
                  imageUrl ? (
                    <img
                      src={imageUrl} alt="Template header"
                      className="w-full max-h-[160px] object-cover"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  ) : (
                    <div className="h-32 bg-[#2a3942] flex items-center justify-center text-2xl">🖼</div>
                  )
                )}

                {/* Video header */}
                {template.headerFormat === 'video' && (
                  imageUrl ? (
                    <video src={imageUrl} className="w-full max-h-[160px] object-cover" controls />
                  ) : (
                    <div className="h-32 bg-[#2a3942] flex flex-col items-center justify-center gap-1 text-2xl">
                      <span>▶</span>
                      <span className="text-[10px] text-[#8696a0]">Video</span>
                    </div>
                  )
                )}

                {/* Document header */}
                {template.headerFormat === 'document' && (
                  <div className="px-3 py-2.5 bg-[#2a3942] flex items-center gap-2">
                    <span className="text-xl">📄</span>
                    {imageUrl ? (
                      <a href={imageUrl} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] text-[#53bdeb] no-underline break-all">
                        {template.headerFilename || 'View Document'}
                      </a>
                    ) : (
                      <span className="text-[11px] text-[#8696a0]">Document.pdf</span>
                    )}
                  </div>
                )}

                {/* Body */}
                <div className="px-3 py-2.5 text-[13px] text-[#e9edef] leading-relaxed whitespace-pre-wrap break-words">
                  {template.body}
                </div>

                {/* Footer */}
                {footerComp?.text && (
                  <div className="px-3 pb-2 text-[11px] text-[#8696a0]">{footerComp.text}</div>
                )}

                {/* Timestamp */}
                <div className="px-3 pb-2 text-[10px] text-[#8696a0] text-right">
                  {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} ✓✓
                </div>

                {/* Buttons */}
                {template.buttons?.length > 0 && (
                  <div className="border-t border-[#3b4a54]">
                    {template.buttons.slice(0, 3).map((btn: any, i: number) => (
                      <div
                        key={i}
                        className="px-3 py-2.5 text-center text-[13px] text-[#53bdeb] flex items-center justify-center gap-1.5"
                        style={{ borderBottom: i < Math.min(template.buttons.length, 3) - 1 ? '1px solid #3b4a54' : undefined }}
                      >
                        {btn.type === 'url'          && '↗ '}
                        {btn.type === 'phone_number' && '📞 '}
                        {btn.type === 'quick_reply'  && '💬 '}
                        {btn.text || `Button ${i + 1}`}
                      </div>
                    ))}
                    {template.buttons.length > 3 && (
                      <div className="px-3 py-2.5 text-center text-[12px] text-[#53bdeb] border-t border-[#3b4a54]">
                        ≡ See all {template.buttons.length} options
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Details panel ── */}
        <div className="flex-1 p-4 flex flex-col gap-4">

          {/* Variables */}
          {template.variables?.length > 0 && (
            <div>
              <p className="text-[10px] text-[var(--muted)] tracking-[0.1em] font-mono mb-2">VARIABLES</p>
              <div className="flex flex-wrap gap-1.5">
                {template.variables.map((v: string, i: number) => (
                  <span key={i} className="text-[11px] bg-[#7c3aed15] border border-[#7c3aed30] text-[var(--accent2)] px-2.5 py-1 rounded-md font-mono">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Details grid */}
          <div>
            <p className="text-[10px] text-[var(--muted)] tracking-[0.1em] font-mono mb-2">DETAILS</p>
            <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-lg p-3">
              <div className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-[12px]">
                <span className="text-[var(--muted)]">Template ID:</span>
                <span className="text-[var(--text)] font-mono text-[11px] break-all">{template.metaTemplateId || template.id}</span>

                {headerComp && (
                  <>
                    <span className="text-[var(--muted)]">Header:</span>
                    <span className="text-[var(--text)]">{headerComp.format || 'None'}</span>
                  </>
                )}
                {footerComp && (
                  <>
                    <span className="text-[var(--muted)]">Footer:</span>
                    <span className="text-[var(--text)]">Yes</span>
                  </>
                )}
                {buttonsComp && (
                  <>
                    <span className="text-[var(--muted)]">Buttons:</span>
                    <span className="text-[var(--text)]">
                      {buttonsComp.buttons?.length || 0} button{buttonsComp.buttons?.length !== 1 ? 's' : ''}
                    </span>
                  </>
                )}
                <span className="text-[var(--muted)]">Created:</span>
                <span className="text-[var(--text)]">{new Date(template.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Status banners */}
          {template.status === 'rejected' && template.rejectionReason && (
            <div className="bg-[#ef444410] border border-[#ef444430] rounded-lg px-4 py-3 text-[12px] text-[var(--danger)]">
              <p className="font-bold mb-1">❌ Rejection Reason</p>
              {template.rejectionReason}
            </div>
          )}
          {template.status === 'approved' && (
            <div className="bg-[#00e5a010] border border-[#00e5a030] rounded-lg px-4 py-3 text-[12px]">
              <p className="font-bold text-[var(--accent)] mb-1">✓ Ready to Use</p>
              <p className="text-[var(--muted)]">
                This template is approved and can be sent to contacts. Click "Use Template" to start a bulk campaign.
              </p>
            </div>
          )}
          {template.status === 'pending' && (
            <div className="bg-[#f59e0b10] border border-[#f59e0b30] rounded-lg px-4 py-3 text-[12px]">
              <p className="font-bold text-[var(--warn)] mb-1">⏳ Under Review</p>
              <p className="text-[var(--muted)]">
                This template is being reviewed by Meta. Approval usually takes a few minutes to 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function TemplatesPage() {
  useAdminAuth()

  const [activeTab,       setActiveTab]       = useState<'list' | 'create'>('list')
  const [templates,       setTemplates]       = useState<any[]>([])
  const [loading,         setLoading]         = useState(true)
  const [syncing,         setSyncing]         = useState(false)
  const [syncResult,      setSyncResult]      = useState<any>(null)
  const [filterStatus,    setFilterStatus]    = useState('')
  const [filterCategory,  setFilterCategory]  = useState('')
  const [toast,           setToast]           = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const loadTemplates = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterStatus)   params.append('status',   filterStatus)
      if (filterCategory) params.append('category', filterCategory)
      const res  = await fetch(`/api/templates?${params}`)
      const data = await res.json()
      if (data.success) setTemplates(data.data || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { loadTemplates() }, [filterStatus, filterCategory])

  const syncFromMeta = async () => {
    setSyncing(true); setSyncResult(null)
    try {
      const res  = await fetch('/api/templates/sync', { method: 'POST' })
      const data = await res.json()
      if (data.success) { setSyncResult(data); showToast(`✓ Synced ${data.data.total} templates from Meta`); loadTemplates() }
      else showToast(`✕ Sync failed: ${data.error}`)
    } catch { showToast('✕ Network error during sync') }
    setSyncing(false)
  }

  const deleteTemplate = async (id: string) => {
    if (!confirm('Delete this template? This cannot be undone.')) return
    try {
      const res  = await fetch(`/api/templates/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) { showToast('✓ Template deleted'); loadTemplates() }
      else showToast(`✕ ${data.error}`)
    } catch { showToast('✕ Failed to delete template') }
  }

  const statusCounts = {
    all:      templates.length,
    approved: templates.filter(t => t.status === 'approved').length,
    pending:  templates.filter(t => t.status === 'pending').length,
    rejected: templates.filter(t => t.status === 'rejected').length,
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] md:pl-[224px]">

      {/* Sidebar owns its own mobile header + drawer */}
      <Sidebar />

      <main className="min-w-0 overflow-x-hidden">
        <div className="px-4 py-6 sm:px-6 md:px-10 md:py-10 max-w-[1400px] w-full mx-auto">

       {/* ── Page header ── */}
<div className="flex flex-col gap-3 mb-8 sm:flex-row sm:flex-wrap sm:items-start sm:gap-4">
  <div className="flex-1 min-w-0">
    <h1 className="font-[var(--font-display)] text-2xl md:text-[32px] font-extrabold tracking-tight text-[var(--text)] mb-1">
      Message Templates
    </h1>
    <p className="text-sm text-[var(--muted)]">
      Create and manage WhatsApp message templates
    </p>
  </div>
  <div className="flex flex-wrap gap-2 w-full sm:w-auto sm:flex-shrink-0">
    <Btn variant="purple" onClick={syncFromMeta} disabled={syncing} className="flex-1 sm:flex-none justify-center">
      {syncing ? '⟳ Syncing…' : '⟳ Sync from Meta'}
    </Btn>
    <Btn variant="accent" onClick={() => setActiveTab('create')} className="flex-1 sm:flex-none justify-center">
      + Create
    </Btn>
  </div>
</div>

          {/* ── Sync result banner ── */}
          {syncResult && (
            <div className="bg-[#00e5a010] border border-[#00e5a030] rounded-xl px-4 py-3 mb-6 flex flex-wrap items-center gap-4">
              <span className="text-[12px] text-[var(--accent)] font-bold font-mono">✓ SYNC COMPLETE</span>
              <span className="text-[12px] text-[var(--muted)] font-mono">
                Loaded <span className="text-[var(--accent)] font-bold">{syncResult.data.total}</span> templates from Meta
              </span>
              <button
                onClick={() => setSyncResult(null)}
                className="ml-auto text-[var(--muted)] hover:text-[var(--text)] text-base bg-transparent border-none cursor-pointer"
              >✕</button>
            </div>
          )}

          {/* ── Main tabs ── */}
          <div className="flex gap-0 border-b border-[var(--border)] mb-6">
            {(['list', 'create'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-5 py-3 text-[13px] font-bold font-mono border-b-2
                  cursor-pointer transition-all duration-150 bg-transparent
                  ${activeTab === tab
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent text-[var(--muted)] hover:text-[var(--text)]'
                  }
                `}
                style={{ marginBottom: '-1px' }}
              >
                {tab === 'list' ? `All Templates (${statusCounts.all})` : 'Create New'}
              </button>
            ))}
          </div>

          {/* ── Tab: Create ── */}
          {activeTab === 'create' ? (
            <TemplateCreator
              onSave={(t: any) => { showToast('✓ Template submitted for review!'); setActiveTab('list'); loadTemplates() }}
              onCancel={() => setActiveTab('list')}
            />
          ) : (
            <>
              {/* ── Status filter ── */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { key: '',         label: 'All',      count: statusCounts.all,      color: '' },
                  { key: 'approved', label: 'Approved', count: statusCounts.approved, color: '#00e5a0' },
                  { key: 'pending',  label: 'Pending',  count: statusCounts.pending,  color: '#f59e0b' },
                  { key: 'rejected', label: 'Rejected', count: statusCounts.rejected, color: '#ef4444' },
                ].map(s => (
                  <button
                    key={s.key}
                    onClick={() => setFilterStatus(s.key)}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-mono
                      cursor-pointer transition-all duration-150
                      ${filterStatus === s.key
                        ? 'bg-[var(--surface2)] border-[var(--border2)]'
                        : 'bg-transparent border-transparent hover:bg-[var(--surface2)]'
                      }
                    `}
                    style={{ color: filterStatus === s.key ? (s.color || 'var(--text)') : 'var(--muted)' }}
                  >
                    {s.label}
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: s.color ? `${s.color}20` : 'var(--surface2)',
                        color: s.color || 'var(--muted)',
                      }}
                    >
                      {s.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* ── Category filter ── */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-[11px] text-[var(--muted)] font-mono mr-1">CATEGORY:</span>
                {['', 'MARKETING', 'UTILITY', 'AUTHENTICATION'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`
                      px-3 py-1 rounded-full text-[11px] font-mono border cursor-pointer transition-all duration-150
                      ${filterCategory === cat
                        ? 'bg-[#7c3aed20] border-[#7c3aed40] text-[var(--accent2)]'
                        : 'bg-[var(--surface2)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
                      }
                    `}
                  >
                    {cat === '' ? 'All' : cat}
                  </button>
                ))}
              </div>

              {/* ── Templates list ── */}
              {loading ? (
                <div className="py-16 text-center text-sm text-[var(--muted)] animate-pulse font-mono">
                  Loading templates…
                </div>
              ) : templates.length === 0 ? (
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-12 text-center">
                  <div className="text-4xl mb-3">📝</div>
                  <div className="font-bold text-[15px] mb-2 text-[var(--text)]">No templates found</div>
                  <div className="text-[13px] text-[var(--muted)] mb-6">
                    {filterStatus || filterCategory
                      ? 'Try changing your filters or create a new template'
                      : 'Get started by creating your first template or sync from Meta'}
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Btn variant="accent" onClick={() => setActiveTab('create')}>+ Create Template</Btn>
                    <Btn variant="purple" onClick={syncFromMeta}>⟳ Sync from Meta</Btn>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {templates.map(template => (
                    <TemplateCard key={template.id} template={template} onDelete={deleteTemplate} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* ── Toast ── */}
      {toast && (
        <div className="
          fixed bottom-6 right-4 md:right-8 z-[200]
          bg-[var(--surface)] border border-[var(--accent)] text-[var(--accent)]
          px-5 py-3 rounded-xl text-[13px] font-mono
          shadow-[0_4px_24px_rgba(0,0,0,0.35)]
          animate-[fadeUp_0.2s_ease]
        ">
          {toast}
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}