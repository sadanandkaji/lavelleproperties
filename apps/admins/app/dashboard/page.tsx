'use client'
import useAdminAuth from '@/hooks/useAdminAuth'
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'

interface StatsData {
  templates: {
    total: number; approved: number; pending: number; rejected: number
    paused?: number; archived?: number; approvalRate?: string
  }
  messages: {
    total: number; sent: number; delivered: number; read: number; failed: number
    queued: number; simple: number; template: number; media: number
    successRate: number; templateUsageRate: number
    trends: { last24h: number; last7d: number; last30d: number }
  }
  bulkJobs: {
    total: number; running: number; completed: number; failed: number
    cancelled: number; successRate: number
  }
  contacts: {
    total: number; valid: number; optedOut: number; invalid: number
    validityRate: number; newLast7d: number; newLast30d: number
  }
  media?: { totalFiles: number; totalSizeMB: string }
  performance?: { avgDeliveryTimeSeconds: number; avgDeliveryTimeFormatted: string }
  aiAgent?: { conversations: number; totalMessages: number }
}

function StatCard({
  label, value, sub, colorClass = 'text-[var(--accent)]', trend, trendLabel,
}: {
  label: string; value: number | string; sub?: string; colorClass?: string
  trend?: number; trendLabel?: string
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 flex flex-col gap-1.5 min-w-0 transition-colors duration-200 hover:border-white/10">
      <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[var(--muted)] leading-tight">{label}</p>
      <p className={`font-[var(--font-display)] text-[clamp(20px,3.5vw,32px)] font-bold leading-none ${colorClass}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-[11px] ${trend >= 0 ? 'text-[var(--accent)]' : 'text-[var(--danger)]'}`}>
          <span>{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
          {trendLabel && <span className="text-[var(--muted)]">{trendLabel}</span>}
        </div>
      )}
      {sub && <p className="text-[11px] text-[var(--muted)]">{sub}</p>}
    </div>
  )
}

function MetricCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
      <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[var(--muted)] mb-4">{title}</p>
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--muted)] mb-3 mt-0">
      {children}
    </h2>
  )
}

function MetricStat({ value, label, colorClass }: { value: number | string; label: string; colorClass?: string }) {
  return (
    <div>
      <div className={`font-[var(--font-display)] text-[clamp(20px,3vw,30px)] font-bold leading-none ${colorClass ?? 'text-[var(--text)]'}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-[11px] text-[var(--muted)] mt-1">{label}</div>
    </div>
  )
}

export default function Dashboard() {
  useAdminAuth()

  const [stats, setStats]     = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(d => {
        if (d.success) setStats(d.data)
        else setError(d.error || 'Failed to load stats')
        setLoading(false)
      })
      .catch(() => { setError('Failed to connect to server'); setLoading(false) })
  }, [])

  return (
    /*
      Sidebar handles everything: fixed desktop aside, mobile sticky header,
      slide-in drawer, and backdrop — all internally.
      Dashboard only needs md:pl-[224px] to clear the desktop sidebar.
      NO duplicate drawer state, overlay, or hamburger here.
    */
    <div className="min-h-screen bg-[var(--bg)] md:pl-[224px]">

      <Sidebar />

      <main className="min-w-0 overflow-x-hidden">

        {/* ── Page body ── */}
        <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 max-w-[1400px] w-full mx-auto">

          {/* Desktop heading — Sidebar's mobile header already shows the title on small screens */}
          <div className="hidden md:block mb-10">
            <h1 className="font-[var(--font-display)] text-[32px] font-extrabold tracking-[-0.02em] text-[var(--text)] mb-1.5">
              Dashboard
            </h1>
            <p className="text-sm text-[var(--muted)]">Overview of your messaging platform</p>
          </div>

          {/* Mobile sub-heading — sits just below the Sidebar's sticky header */}
          <p className="md:hidden text-sm text-[var(--muted)] mb-5">
            Overview of your messaging platform
          </p>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center h-60">
              <p className="text-sm text-[var(--muted)] animate-pulse">Loading dashboard stats…</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-[var(--danger)] bg-red-500/10 p-5 text-[var(--danger)] text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Stats */}
          {stats && (
            <div className="flex flex-col gap-8">

              {/* Templates */}
              <section>
                <SectionLabel>WhatsApp Templates</SectionLabel>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <StatCard label="Total Templates" value={stats.templates.total} colorClass="text-[var(--text)]" />
                  <StatCard label="Approved" value={stats.templates.approved} colorClass="text-[var(--accent)]"
                    sub={`${stats.templates.approvalRate ?? 0}% of total`} />
                  <StatCard label="Pending Review" value={stats.templates.pending} colorClass="text-[var(--warn)]" />
                  <StatCard label="Rejected" value={stats.templates.rejected} colorClass="text-[var(--danger)]" />
                </div>
              </section>

              {/* Messages */}
              <section>
                <SectionLabel>Messages</SectionLabel>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                  <StatCard
                    label="Total Messages" value={stats.messages.total} colorClass="text-[var(--text)]"
                    trend={stats.messages.trends.last24h > 0
                      ? Math.round((stats.messages.trends.last24h / stats.messages.total) * 100) : 0}
                    trendLabel="last 24h"
                  />
                  <StatCard label="Delivered" value={stats.messages.delivered || stats.messages.sent}
                    colorClass="text-[var(--accent)]" sub={`${stats.messages.successRate}% success rate`} />
                  <StatCard label="Failed" value={stats.messages.failed} colorClass="text-[var(--danger)]" />
                  <StatCard label="Template Messages" value={stats.messages.template} colorClass="text-[var(--accent2)]"
                    sub={`${stats.messages.templateUsageRate}% of total`} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <StatCard label="Last 24 Hours" value={stats.messages.trends.last24h} colorClass="text-[var(--accent2)]" />
                  <StatCard label="Last 7 Days"   value={stats.messages.trends.last7d}  colorClass="text-[var(--accent2)]" />
                  <StatCard label="Last 30 Days"  value={stats.messages.trends.last30d} colorClass="text-[var(--accent2)]" />
                </div>
              </section>

              {/* Bulk Jobs & Contacts */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricCard title="Bulk Jobs">
                  <div className="flex flex-wrap gap-5">
                    <MetricStat value={stats.bulkJobs.total}     label="Total" />
                    <MetricStat value={stats.bulkJobs.running}   label="Running"   colorClass="text-[var(--warn)]" />
                    <MetricStat value={stats.bulkJobs.completed} label="Completed" colorClass="text-[var(--accent)]" />
                    <MetricStat value={stats.bulkJobs.failed}    label="Failed"    colorClass="text-[var(--danger)]" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
                    Success Rate: <span className="text-[var(--accent)] font-semibold">{stats.bulkJobs.successRate}%</span>
                  </div>
                </MetricCard>

                <MetricCard title="Contacts">
                  <div className="flex flex-wrap gap-5">
                    <MetricStat value={stats.contacts.total}    label="Total" />
                    <MetricStat value={stats.contacts.valid}    label="Valid"     colorClass="text-[var(--accent)]" />
                    <MetricStat value={stats.contacts.optedOut} label="Opted Out" colorClass="text-[var(--danger)]" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-wrap justify-between gap-2 text-xs text-[var(--muted)]">
                    <span>Validity: <span className="text-[var(--accent)] font-semibold">{stats.contacts.validityRate}%</span></span>
                    <span>New (30d): <span className="text-[var(--accent2)] font-semibold">{stats.contacts.newLast30d}</span></span>
                  </div>
                </MetricCard>
              </section>

              {/* Performance & Media */}
              {(stats.performance || stats.media) && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.performance && (
                    <MetricCard title="Performance">
                      <div className="flex flex-wrap items-end gap-5">
                        <MetricStat value={stats.performance.avgDeliveryTimeSeconds}
                          label="Avg Delivery (seconds)" colorClass="text-[var(--accent2)]" />
                        <div>
                          <div className="text-sm font-medium text-[var(--muted)]">{stats.performance.avgDeliveryTimeFormatted}</div>
                          <div className="text-[11px] text-[var(--muted)] mt-1">Formatted</div>
                        </div>
                      </div>
                    </MetricCard>
                  )}
                  {stats.media && (
                    <MetricCard title="Media Storage">
                      <div className="flex flex-wrap gap-5">
                        <MetricStat value={stats.media.totalFiles} label="Total Files" colorClass="text-[var(--accent2)]" />
                        <MetricStat value={`${stats.media.totalSizeMB} MB`} label="Total Size" colorClass="text-[var(--accent)]" />
                      </div>
                    </MetricCard>
                  )}
                </section>
              )}

              {/* AI Agent */}
              {stats.aiAgent && (
                <section>
                  <SectionLabel>AI Agent</SectionLabel>
                  <div className="grid grid-cols-2 gap-3">
                    <StatCard label="Conversations"  value={stats.aiAgent.conversations}  colorClass="text-[var(--accent2)]" />
                    <StatCard label="Total Messages" value={stats.aiAgent.totalMessages}  colorClass="text-[var(--accent)]" />
                  </div>
                </section>
              )}

            </div>
          )}
        </div>
      </main>
    </div>
  )
}