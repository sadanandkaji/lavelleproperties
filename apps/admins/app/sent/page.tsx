'use client'
import useAdminAuth from '@/hooks/useAdminAuth'
import Sidebar from '../components/Sidebar'
import { useEffect, useState, useCallback } from 'react'

const S: Record<string, React.CSSProperties> = {
  surface: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 },
  label:   { fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 },
  input:   { width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const },
}

function Badge({ status }: { status: string }) {
  const map: any = {
    sent:    { bg: '#00e5a015', border: '#00e5a040', text: '#00e5a0' },
    failed:  { bg: '#ef444415', border: '#ef444440', text: '#ef4444' },
    pending: { bg: '#f59e0b15', border: '#f59e0b40', text: '#f59e0b' },
  }
  const c = map[status] ?? map.pending
  return (
    <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 100, fontWeight: 700,
      letterSpacing: '0.12em', background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
      {status.toUpperCase()}
    </span>
  )
}

function StatCard({ label, value, color }: { label: string; value: number | string; color?: string }) {
  return (
    <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color ?? 'var(--text)', fontFamily: 'var(--font-display)' }}>{value}</div>
    </div>
  )
}

export default function SentMessagesPage() {
    useAdminAuth()

  const [messages, setMessages]     = useState<any[]>([])
  const [total, setTotal]           = useState(0)
  const [page, setPage]             = useState(1)
  const [pages, setPages]           = useState(1)
  const [loading, setLoading]       = useState(false)
  const [search, setSearch]         = useState('')
  const [statusFilter, setStatus]   = useState('')
  const [typeFilter, setType]       = useState('')
  const [expanded, setExpanded]     = useState<string | null>(null)
  const [stats, setStats]           = useState({ total: 0, sent: 0, failed: 0, templates: 0 })

  const fetchMessages = useCallback(async (p = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(p),
        limit: '20',
        ...(search       ? { phone: search }   : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
        ...(typeFilter   ? { type: typeFilter } : {}),
      })
      const res  = await fetch(`/api/messages/sent?${params}`)
      const data = await res.json()
      if (data.success) {
        setMessages(data.data ?? [])
        setTotal(data.total ?? 0)
        setPages(data.pages ?? 1)
        // compute stats from all messages (unfiltered call)
        const all = await fetch('/api/messages/sent?limit=9999').then(r => r.json())
        const allMsgs: any[] = all.data ?? []
        setStats({
          total:     allMsgs.length,
          sent:      allMsgs.filter((m: any) => m.status === 'sent').length,
          failed:    allMsgs.filter((m: any) => m.status === 'failed').length,
          templates: allMsgs.filter((m: any) => m.type === 'template').length,
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

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, padding: '40px 48px', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
            Sent Messages
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6 }}>
            View all messages sent to your contacts
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
          <StatCard label="TOTAL SENT"      value={stats.total.toLocaleString()} />
          <StatCard label="DELIVERED"       value={stats.sent.toLocaleString()}      color="#00e5a0" />
          <StatCard label="FAILED"          value={stats.failed.toLocaleString()}    color="#ef4444" />
          <StatCard label="TEMPLATES USED"  value={stats.templates.toLocaleString()} color="#a78bfa" />
        </div>

        {/* Filters */}
        <div style={{ ...S.surface, padding: 20, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 2, minWidth: 200 }}>
            <label style={S.label}>SEARCH BY PHONE</label>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="e.g. 917892358529"
              style={S.input}
            />
          </div>

          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={S.label}>STATUS</label>
            <select value={statusFilter} onChange={e => setStatus(e.target.value)} style={S.input}>
              <option value="">All statuses</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={S.label}>TYPE</label>
            <select value={typeFilter} onChange={e => setType(e.target.value)} style={S.input}>
              <option value="">All types</option>
              <option value="template">Template</option>
              <option value="simple">Simple</option>
            </select>
          </div>

          <button
            onClick={() => { setSearch(''); setStatus(''); setType('') }}
            style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid var(--border)',
              background: 'var(--surface2)', color: 'var(--muted)', fontSize: 12,
              fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
            Reset
          </button>

          <button
            onClick={() => fetchMessages(page)}
            style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #00e5a050',
              background: '#00e5a010', color: '#00e5a0', fontSize: 12,
              fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
            ↻ Refresh
          </button>
        </div>

        {/* Results count */}
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          {loading ? 'Loading…' : `${total.toLocaleString()} message${total !== 1 ? 's' : ''} found`}
        </div>

        {/* Table */}
        <div style={{ ...S.surface, overflow: 'hidden', marginBottom: 24 }}>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '180px 130px 90px 80px 1fr 36px',
            gap: 12, padding: '12px 20px',
            background: 'var(--surface2)', borderBottom: '1px solid var(--border)',
            fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em' }}>
            <span>TO (PHONE)</span>
            <span>SENT AT</span>
            <span>TYPE</span>
            <span>STATUS</span>
            <span>MESSAGE</span>
            <span></span>
          </div>

          {/* Rows */}
          {messages.length === 0 && !loading && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
              No messages found.
            </div>
          )}

          {messages.map((msg: any) => {
            const isExp = expanded === msg.id
            return (
              <div key={msg.id} style={{ borderBottom: '1px solid var(--border)' }}>
                {/* Main row */}
                <div
                  onClick={() => setExpanded(isExp ? null : msg.id)}
                  style={{ display: 'grid', gridTemplateColumns: '180px 130px 90px 80px 1fr 36px',
                    gap: 12, padding: '14px 20px', alignItems: 'center',
                    cursor: 'pointer', transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Phone */}
                  <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>
                    +{msg.to}
                  </span>

                  {/* Time */}
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {fmt(msg.sentAt ?? msg.createdAt)}
                  </span>

                  {/* Type */}
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4,
                    background: msg.type === 'template' ? '#7c3aed15' : 'var(--surface2)',
                    color: msg.type === 'template' ? '#a78bfa' : 'var(--muted)',
                    border: msg.type === 'template' ? '1px solid #7c3aed30' : '1px solid var(--border)',
                    width: 'fit-content' }}>
                    {msg.type === 'template' ? '◈ template' : '✉ simple'}
                  </span>

                  {/* Status */}
                  <Badge status={msg.status} />

                  {/* Message preview */}
                  <span style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.body || msg.templateId || '—'}
                  </span>

                  {/* Expand arrow */}
                  <span style={{ color: 'var(--muted)', fontSize: 14, textAlign: 'center' }}>
                    {isExp ? '▲' : '▼'}
                  </span>
                </div>

                {/* Expanded detail */}
                {isExp && (
                  <div style={{ padding: '16px 20px 20px', background: 'var(--surface2)',
                    borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={S.label}>MESSAGE ID</label>
                        <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{msg.id}</span>
                      </div>
                      {msg.whatsappMessageId && (
                        <div>
                          <label style={S.label}>WHATSAPP MESSAGE ID</label>
                          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{msg.whatsappMessageId}</span>
                        </div>
                      )}
                      {msg.templateId && (
                        <div>
                          <label style={S.label}>TEMPLATE ID</label>
                          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#a78bfa' }}>{msg.templateId}</span>
                        </div>
                      )}
                      {msg.error && (
                        <div>
                          <label style={S.label}>ERROR</label>
                          <span style={{ fontSize: 12, color: '#ef4444' }}>{msg.error}</span>
                        </div>
                      )}
                    </div>

                    {msg.body && (
                      <div>
                        <label style={S.label}>FULL MESSAGE</label>
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)',
                          borderRadius: 8, padding: '12px 16px', fontSize: 13,
                          color: 'var(--text)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                          {msg.body}
                        </div>
                      </div>
                    )}

                    {msg.variables && Object.keys(msg.variables).length > 0 && (
                      <div style={{ marginTop: 12 }}>
                        <label style={S.label}>VARIABLES USED</label>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {Object.entries(msg.variables).map(([k, v]: any) => (
                            <span key={k} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 4,
                              background: '#7c3aed15', border: '1px solid #7c3aed30', color: '#a78bfa' }}>
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

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <button
              onClick={() => goPage(page - 1)} disabled={page === 1}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--surface2)', color: 'var(--muted)', cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.4 : 1, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
              ← Prev
            </button>

            {Array.from({ length: pages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === pages || Math.abs(p - page) <= 2)
              .map((p, idx, arr) => (
  <div
    key={`page-group-${p}`}
    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
  >
    {idx > 0 && arr[idx - 1] !== p - 1 && (
      <span
        key={`ellipsis-${p}`}
        style={{ color: 'var(--muted)', fontSize: 12 }}
      >
        …
      </span>
    )}

    <button
      onClick={() => goPage(p)}
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        border: `1px solid ${
          p === page ? '#00e5a050' : 'var(--border)'
        }`,
        background:
          p === page
            ? '#00e5a015'
            : 'var(--surface2)',
        color:
          p === page
            ? '#00e5a0'
            : 'var(--muted)',
        cursor: 'pointer',
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
      }}
    >
      {p}
    </button>
  </div>
))}

            <button
              onClick={() => goPage(page + 1)} disabled={page === pages}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--surface2)', color: 'var(--muted)', cursor: page === pages ? 'not-allowed' : 'pointer',
                opacity: page === pages ? 0.4 : 1, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
              Next →
            </button>
          </div>
        )}

      </main>
    </div>
  )
}