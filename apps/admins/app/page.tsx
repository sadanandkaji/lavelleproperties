'use client'
// app/dashboard/page.tsx
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'

function StatCard({ label, value, sub, color = 'var(--accent)' }: { label: string; value: number | string; sub?: string; color?: string }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12, padding: '24px 28px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--muted)' }}>{sub}</div>}
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(d => setStats(d.data))
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, padding: '40px 48px', minHeight: '100vh' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>
            Dashboard
          </h1>
          <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 13 }}>
            Overview of your messaging platform
          </p>
        </div>

        {!stats ? (
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>Loading stats...</div>
        ) : (
          <>
            <div style={{ marginBottom: 12, fontSize: 11, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Templates
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
              <StatCard label="Total Templates" value={stats.templates.total} />
              <StatCard label="Approved" value={stats.templates.approved} color="var(--accent)" />
              <StatCard label="Pending Review" value={stats.templates.pending} color="var(--warn)" />
              <StatCard label="Rejected" value={stats.templates.rejected} color="var(--danger)" />
            </div>

            <div style={{ marginBottom: 12, fontSize: 11, color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Messages
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
              <StatCard label="Total Sent" value={stats.messages.total} />
              <StatCard label="Delivered" value={stats.messages.sent} color="var(--accent)" />
              <StatCard label="Failed" value={stats.messages.failed} color="var(--danger)" />
              <StatCard label="Template Msgs" value={stats.messages.template} color="var(--accent2)" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 28 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', marginBottom: 20 }}>BULK JOBS</div>
                <div style={{ display: 'flex', gap: 32 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800 }}>{stats.bulkJobs.total}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>Total Jobs</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--warn)' }}>{stats.bulkJobs.running}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>Running</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--accent)' }}>{stats.bulkJobs.completed}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>Completed</div>
                  </div>
                </div>
              </div>
              {/* <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 28 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', marginBottom: 20 }}>AI AGENT</div>
                <div style={{ display: 'flex', gap: 32 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'var(--accent2)' }}>{stats.aiAgent.conversations}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>Conversations</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800 }}>{stats.aiAgent.totalMessages}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>Total Messages</div>
                  </div>
                </div>
              </div> */}
            </div>
          </>
        )}
      </main>
    </div>
  )
}