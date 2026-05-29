'use client'
import useAdminAuth from '@/hooks/useAdminAuth'
import Sidebar from '../components/Sidebar'
import { useEffect, useState, useCallback } from 'react'

// ── Shared classes ────────────────────────────────────────────────────────────
const INP = 'w-full bg-[var(--surface2)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 text-[var(--text)] font-mono text-[13px] outline-none focus:border-[var(--accent)] transition-colors'
const LBL = 'block text-[11px] text-[var(--muted)] tracking-[0.12em] uppercase font-mono mb-1.5'

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    sent:    'bg-[#00e5a015] border-[#00e5a040] text-[#00e5a0]',
    failed:  'bg-[#ef444415] border-[#ef444440] text-[#ef4444]',
    pending: 'bg-[#f59e0b15] border-[#f59e0b40] text-[#f59e0b]',
  }
  return (
    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold tracking-[0.12em] uppercase font-mono border inline-block ${map[status] ?? map.pending}`}>
      {status.toUpperCase()}
    </span>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="bg-[var(--surface2)] border border-[var(--border)] rounded-xl px-4 py-3.5 md:px-5 md:py-4">
      <div className="text-[10px] md:text-[11px] text-[var(--muted)] tracking-[0.12em] uppercase font-mono mb-2">{label}</div>
      <div className="text-[22px] md:text-[28px] font-bold font-[var(--font-display)]" style={{ color: color ?? 'var(--text)' }}>
        {value}
      </div>
    </div>
  )
}

// ── Mobile message card ───────────────────────────────────────────────────────
function MessageCard({ msg, expanded, onToggle, fmt }: {
  msg: any; expanded: boolean; onToggle: () => void
  fmt: (iso: string) => string
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
      {/* Summary row */}
      <div onClick={onToggle} className="flex items-start justify-between gap-3 px-4 py-3.5 cursor-pointer active:bg-[var(--surface2)]">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[13px] font-mono font-bold text-[var(--text)]">+{msg.to}</span>
            <Badge status={msg.status} />
            <span className={`text-[10px] px-2 py-0.5 rounded font-mono border
              ${msg.type === 'template'
                ? 'bg-[#7c3aed15] border-[#7c3aed30] text-[#a78bfa]'
                : 'bg-[var(--surface2)] border-[var(--border)] text-[var(--muted)]'}`}>
              {msg.type === 'template' ? '◈ template' : '✉ simple'}
            </span>
          </div>
          <div className="text-[11px] text-[var(--muted)] mb-1">{fmt(msg.sentAt ?? msg.createdAt)}</div>
          <div className="text-[12px] text-[var(--muted)] truncate">{msg.body || msg.templateId || '—'}</div>
        </div>
        <span className={`text-[var(--muted)] text-[13px] flex-shrink-0 mt-0.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 pt-3 bg-[var(--surface2)] border-t border-[var(--border)]">
          <div className="grid grid-cols-1 gap-3 mb-3">
            <div>
              <label className={LBL}>Message ID</label>
              <span className="text-[11px] font-mono text-[var(--muted)] break-all">{msg.id}</span>
            </div>
            {msg.whatsappMessageId && (
              <div>
                <label className={LBL}>WhatsApp ID</label>
                <span className="text-[11px] font-mono text-[var(--muted)] break-all">{msg.whatsappMessageId}</span>
              </div>
            )}
            {msg.templateId && (
              <div>
                <label className={LBL}>Template ID</label>
                <span className="text-[11px] font-mono text-[#a78bfa] break-all">{msg.templateId}</span>
              </div>
            )}
            {msg.error && (
              <div>
                <label className={LBL}>Error</label>
                <span className="text-[12px] text-[#ef4444]">{msg.error}</span>
              </div>
            )}
          </div>

          {msg.body && (
            <div className="mb-3">
              <label className={LBL}>Full Message</label>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3.5 py-3 text-[13px] text-[var(--text)] leading-relaxed whitespace-pre-wrap">
                {msg.body}
              </div>
            </div>
          )}

          {msg.variables && Object.keys(msg.variables).length > 0 && (
            <div>
              <label className={LBL}>Variables Used</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(msg.variables).map(([k, v]: any) => (
                  <span key={k} className="text-[11px] px-2.5 py-1 rounded bg-[#7c3aed15] border border-[#7c3aed30] text-[#a78bfa] font-mono">
                    {k}: {v}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Pagination ────────────────────────────────────────────────────────────────
function Pagination({ page, pages, goPage }: { page: number; pages: number; goPage: (p: number) => void }) {
  if (pages <= 1) return null
  const nums = Array.from({ length: pages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === pages || Math.abs(p - page) <= 1)

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <button onClick={() => goPage(page - 1)} disabled={page === 1}
        className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] text-[12px] font-mono cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
        ← Prev
      </button>

      {nums.map((p, idx, arr) => (
        <div key={p} className="flex items-center gap-2">
          {idx > 0 && arr[idx - 1] !== p - 1 && (
            <span className="text-[var(--muted)] text-[12px]">…</span>
          )}
          <button onClick={() => goPage(p)}
            className={`w-9 h-9 rounded-lg border text-[12px] font-mono cursor-pointer transition-colors
              ${p === page
                ? 'bg-[#00e5a015] border-[#00e5a050] text-[#00e5a0]'
                : 'bg-[var(--surface2)] border-[var(--border)] text-[var(--muted)] hover:border-[#00e5a030]'}`}>
            {p}
          </button>
        </div>
      ))}

      <button onClick={() => goPage(page + 1)} disabled={page === pages}
        className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] text-[12px] font-mono cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
        Next →
      </button>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function SentMessagesPage() {
  useAdminAuth()

  const [messages, setMessages]   = useState<any[]>([])
  const [total, setTotal]         = useState(0)
  const [page, setPage]           = useState(1)
  const [pages, setPages]         = useState(1)
  const [loading, setLoading]     = useState(false)
  const [search, setSearch]       = useState('')
  const [statusFilter, setStatus] = useState('')
  const [typeFilter, setType]     = useState('')
  const [expanded, setExpanded]   = useState<string | null>(null)
  const [stats, setStats]         = useState({ total: 0, sent: 0, failed: 0, templates: 0 })
  const [showFilters, setShowFilters] = useState(false)

  const fetchMessages = useCallback(async (p = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(p), limit: '20',
        ...(search       ? { phone: search }          : {}),
        ...(statusFilter ? { status: statusFilter }   : {}),
        ...(typeFilter   ? { type: typeFilter }       : {}),
      })
      const res  = await fetch(`/api/messages/sent?${params}`)
      const data = await res.json()
      if (data.success) {
        setMessages(data.data ?? [])
        setTotal(data.total ?? 0)
        setPages(data.pages ?? 1)
        const all    = await fetch('/api/messages/sent?limit=9999').then(r => r.json())
        const allMsg: any[] = all.data ?? []
        setStats({
          total:     allMsg.length,
          sent:      allMsg.filter((m: any) => m.status === 'sent').length,
          failed:    allMsg.filter((m: any) => m.status === 'failed').length,
          templates: allMsg.filter((m: any) => m.type === 'template').length,
        })
      }
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter, typeFilter])

  useEffect(() => { fetchMessages(1); setPage(1) }, [fetchMessages])

  const fmt = (iso: string) => {
    if (!iso) return '—'
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  const goPage = (p: number) => { setPage(p); fetchMessages(p) }

  const activeFilters = [search, statusFilter, typeFilter].filter(Boolean).length

  return (
    <div className="min-h-screen bg-[var(--bg)] md:pl-[224px]">
      <Sidebar />

      <main className="min-w-0 overflow-x-hidden">
        <div className="px-4 py-6 sm:px-6 md:px-10 md:py-10 max-w-[1400px] w-full mx-auto">

          {/* ── Page header ── */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-6 md:mb-8">
            <div>
              <h1 className="font-[var(--font-display)] text-2xl md:text-[32px] font-extrabold tracking-tight text-[var(--text)] mb-1">
                Sent Messages
              </h1>
              <p className="text-sm text-[var(--muted)]">View all messages sent to your contacts</p>
            </div>
            <button onClick={() => fetchMessages(page)}
              className="self-start sm:self-auto bg-[#00e5a010] border border-[#00e5a050] text-[#00e5a0] rounded-xl px-4 py-2 text-[12px] font-mono cursor-pointer flex-shrink-0">
              ↻ Refresh
            </button>
          </div>

          {/* ── Stats grid — 2-col mobile, 4-col desktop ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 md:mb-8">
            <StatCard label="Total Sent"     value={stats.total.toLocaleString()} />
            <StatCard label="Delivered"      value={stats.sent.toLocaleString()}      color="#00e5a0" />
            <StatCard label="Failed"         value={stats.failed.toLocaleString()}    color="#ef4444" />
            <StatCard label="Templates Used" value={stats.templates.toLocaleString()} color="#a78bfa" />
          </div>

          {/* ── Filters ── */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl mb-5">

            {/* Mobile: collapsible filter toggle */}
            <button
              onClick={() => setShowFilters(v => !v)}
              className="md:hidden w-full flex items-center justify-between px-4 py-3.5 text-left bg-transparent border-none cursor-pointer"
            >
              <span className="text-[13px] font-bold text-[var(--text)]">
                Filters
                {activeFilters > 0 && (
                  <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[#00e5a015] border border-[#00e5a040] text-[#00e5a0] font-mono">
                    {activeFilters} active
                  </span>
                )}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className={`text-[var(--muted)] transition-transform duration-200 ${showFilters ? 'rotate-90' : 'rotate-0'}`}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Filter body — always visible on desktop, toggle on mobile */}
            <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="px-4 pb-4 pt-1 md:pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_auto_auto] gap-3 items-end">

                <div>
                  <label className={LBL}>Search by phone</label>
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="e.g. 917892358529" className={INP} inputMode="tel" />
                </div>

                <div>
                  <label className={LBL}>Status</label>
                  <select value={statusFilter} onChange={e => setStatus(e.target.value)} className={INP}>
                    <option value="">All statuses</option>
                    <option value="sent">Sent</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className={LBL}>Type</label>
                  <select value={typeFilter} onChange={e => setType(e.target.value)} className={INP}>
                    <option value="">All types</option>
                    <option value="template">Template</option>
                    <option value="simple">Simple</option>
                  </select>
                </div>

                {/* Buttons: stack on mobile, row on desktop */}
                <div className="flex gap-2 sm:col-span-2 md:col-span-1 md:flex-row">
                  <button onClick={() => { setSearch(''); setStatus(''); setType('') }}
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] text-[12px] font-mono cursor-pointer min-h-[42px]">
                    Reset
                  </button>
                  <button onClick={() => fetchMessages(page)}
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-lg border border-[#00e5a050] bg-[#00e5a010] text-[#00e5a0] text-[12px] font-mono cursor-pointer min-h-[42px]">
                    ↻ Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Results count ── */}
          <div className="text-[12px] text-[var(--muted)] font-mono mb-3">
            {loading
              ? <span className="animate-pulse">Loading…</span>
              : `${total.toLocaleString()} message${total !== 1 ? 's' : ''} found`}
          </div>

          {/* ── DESKTOP: table (hidden on mobile) ── */}
          <div className="hidden md:block bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden mb-6">

            {/* Table header */}
            <div className="grid grid-cols-[180px_140px_100px_90px_1fr_36px] gap-3 px-5 py-3 bg-[var(--surface2)] border-b border-[var(--border)] text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase font-mono">
              <span>To (Phone)</span>
              <span>Sent At</span>
              <span>Type</span>
              <span>Status</span>
              <span>Message</span>
              <span />
            </div>

            {/* Empty state */}
            {messages.length === 0 && !loading && (
              <div className="py-16 text-center text-[var(--muted)] text-[13px]">No messages found.</div>
            )}

            {/* Loading shimmer */}
            {loading && messages.length === 0 && (
              <div className="py-16 text-center text-[var(--muted)] text-[13px] animate-pulse font-mono">Loading…</div>
            )}

            {/* Rows */}
            {messages.map((msg: any) => {
              const isExp = expanded === msg.id
              return (
                <div key={msg.id} className="border-b border-[var(--border)] last:border-b-0">
                  {/* Main row */}
                  <div
                    onClick={() => setExpanded(isExp ? null : msg.id)}
                    className="grid grid-cols-[180px_140px_100px_90px_1fr_36px] gap-3 px-5 py-3.5 items-center cursor-pointer hover:bg-[var(--surface2)] transition-colors"
                  >
                    <span className="text-[13px] font-mono text-[var(--text)] truncate">+{msg.to}</span>
                    <span className="text-[11px] text-[var(--muted)]">{fmt(msg.sentAt ?? msg.createdAt)}</span>
                    <span className={`text-[11px] px-2 py-1 rounded w-fit font-mono border
                      ${msg.type === 'template'
                        ? 'bg-[#7c3aed15] border-[#7c3aed30] text-[#a78bfa]'
                        : 'bg-[var(--surface2)] border-[var(--border)] text-[var(--muted)]'}`}>
                      {msg.type === 'template' ? '◈ template' : '✉ simple'}
                    </span>
                    <Badge status={msg.status} />
                    <span className="text-[12px] text-[var(--muted)] truncate">{msg.body || msg.templateId || '—'}</span>
                    <span className={`text-[var(--muted)] text-[13px] text-center transition-transform duration-200 ${isExp ? 'rotate-180' : ''}`}>▼</span>
                  </div>

                  {/* Expanded */}
                  {isExp && (
                    <div className="px-5 py-4 bg-[var(--surface2)] border-t border-[var(--border)]">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className={LBL}>Message ID</label>
                          <span className="text-[12px] font-mono text-[var(--muted)] break-all">{msg.id}</span>
                        </div>
                        {msg.whatsappMessageId && (
                          <div>
                            <label className={LBL}>WhatsApp Message ID</label>
                            <span className="text-[12px] font-mono text-[var(--muted)] break-all">{msg.whatsappMessageId}</span>
                          </div>
                        )}
                        {msg.templateId && (
                          <div>
                            <label className={LBL}>Template ID</label>
                            <span className="text-[12px] font-mono text-[#a78bfa] break-all">{msg.templateId}</span>
                          </div>
                        )}
                        {msg.error && (
                          <div>
                            <label className={LBL}>Error</label>
                            <span className="text-[12px] text-[#ef4444]">{msg.error}</span>
                          </div>
                        )}
                      </div>
                      {msg.body && (
                        <div className="mb-4">
                          <label className={LBL}>Full Message</label>
                          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[13px] text-[var(--text)] leading-relaxed whitespace-pre-wrap">
                            {msg.body}
                          </div>
                        </div>
                      )}
                      {msg.variables && Object.keys(msg.variables).length > 0 && (
                        <div>
                          <label className={LBL}>Variables Used</label>
                          <div className="flex gap-2 flex-wrap">
                            {Object.entries(msg.variables).map(([k, v]: any) => (
                              <span key={k} className="text-[11px] px-2.5 py-1 rounded bg-[#7c3aed15] border border-[#7c3aed30] text-[#a78bfa] font-mono">
                                {k}: {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ── MOBILE: card list (hidden on desktop) ── */}
          <div className="md:hidden flex flex-col gap-3 mb-6">
            {messages.length === 0 && !loading && (
              <div className="py-16 text-center text-[var(--muted)] text-[13px] bg-[var(--surface)] border border-[var(--border)] rounded-xl">
                No messages found.
              </div>
            )}
            {loading && messages.length === 0 && (
              <div className="py-12 text-center text-[var(--muted)] text-[13px] animate-pulse font-mono">Loading…</div>
            )}
            {messages.map((msg: any) => (
              <MessageCard
                key={msg.id}
                msg={msg}
                expanded={expanded === msg.id}
                onToggle={() => setExpanded(expanded === msg.id ? null : msg.id)}
                fmt={fmt}
              />
            ))}
          </div>

          {/* ── Pagination ── */}
          <Pagination page={page} pages={pages} goPage={goPage} />

        </div>
      </main>
    </div>
  )
}