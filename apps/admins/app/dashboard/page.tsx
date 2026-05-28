'use client'
import useAdminAuth from '@/hooks/useAdminAuth'
// app/dashboard/page.tsx
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'

interface StatsData {
  templates: {
    total: number
    approved: number
    pending: number
    rejected: number
    paused?: number
    archived?: number
    approvalRate?: string
  }
  messages: {
    total: number
    sent: number
    delivered: number
    read: number
    failed: number
    queued: number
    simple: number
    template: number
    media: number
    successRate: number
    templateUsageRate: number
    trends: {
      last24h: number
      last7d: number
      last30d: number
    }
  }
  bulkJobs: {
    total: number
    running: number
    completed: number
    failed: number
    cancelled: number
    successRate: number
  }
  contacts: {
    total: number
    valid: number
    optedOut: number
    invalid: number
    validityRate: number
    newLast7d: number
    newLast30d: number
  }
  media?: {
    totalFiles: number
    totalSizeMB: string
  }
  performance?: {
    avgDeliveryTimeSeconds: number
    avgDeliveryTimeFormatted: string
  }
  aiAgent?: {
    conversations: number
    totalMessages: number
  }
}

function StatCard({ 
  label, 
  value, 
  sub, 
  color = 'var(--accent)', 
  trend,
  trendLabel 
}: { 
  label: string
  value: number | string
  sub?: string
  color?: string
  trend?: number
  trendLabel?: string
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      transition: 'all 0.2s ease',
    }}>
      <div style={{ 
        fontSize: 11, 
        color: 'var(--muted)', 
        letterSpacing: '0.12em', 
        textTransform: 'uppercase',
        fontWeight: 500
      }}>
        {label}
      </div>
      <div style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: 36, 
        fontWeight: 700, 
        color, 
        lineHeight: 1 
      }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {trend !== undefined && (
        <div style={{ 
          fontSize: 11, 
          color: trend >= 0 ? 'var(--accent)' : 'var(--danger)',
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }}>
          <span>{trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
          {trendLabel && <span style={{ color: 'var(--muted)' }}>{trendLabel}</span>}
        </div>
      )}
      {sub && <div style={{ fontSize: 11, color: 'var(--muted)' }}>{sub}</div>}
    </div>
  )
}

function MetricCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ 
      background: 'var(--surface)', 
      border: '1px solid var(--border)', 
      borderRadius: 12, 
      padding: 24 
    }}>
      <div style={{ 
        fontSize: 11, 
        color: 'var(--muted)', 
        letterSpacing: '0.12em', 
        textTransform: 'uppercase',
        marginBottom: 20,
        fontWeight: 500
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

export default function Dashboard() {
    useAdminAuth()

  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data)
        } else {
          setError(data.error || 'Failed to load stats')
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching stats:', err)
        setError('Failed to connect to server')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: 220, flex: 1, padding: '40px 48px', minHeight: '100vh' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '60vh' 
          }}>
            <div style={{ color: 'var(--muted)', fontSize: 14 }}>Loading dashboard stats...</div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: 220, flex: 1, padding: '40px 48px', minHeight: '100vh' }}>
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid var(--danger)',
            borderRadius: 12, 
            padding: 20,
            color: 'var(--danger)'
          }}>
            <strong>Error:</strong> {error}
          </div>
        </main>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, padding: '40px 48px', minHeight: '100vh' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 32, 
            fontWeight: 800, 
            letterSpacing: '-0.02em',
            marginBottom: 8
          }}>
            Dashboard
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>
            Overview of your messaging platform
          </p>
        </div>

        {/* Templates Section */}
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ 
            fontSize: 13, 
            color: 'var(--muted)', 
            letterSpacing: '0.15em', 
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 16
          }}>
            WhatsApp Templates
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
          <StatCard 
            label="Total Templates" 
            value={stats.templates.total} 
            color="var(--text)"
          />
          <StatCard 
            label="Approved" 
            value={stats.templates.approved} 
            color="var(--accent)" 
            sub={`${stats.templates.approvalRate || 0}% of total`}
          />
          <StatCard 
            label="Pending Review" 
            value={stats.templates.pending} 
            color="var(--warn)" 
          />
          <StatCard 
            label="Rejected" 
            value={stats.templates.rejected} 
            color="var(--danger)" 
          />
        </div>

        {/* Messages Section */}
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ 
            fontSize: 13, 
            color: 'var(--muted)', 
            letterSpacing: '0.15em', 
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 16
          }}>
            Messages
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
          <StatCard 
            label="Total Messages" 
            value={stats.messages.total} 
            color="var(--text)"
            trend={stats.messages.trends.last24h > 0 ? 
              Math.round((stats.messages.trends.last24h / stats.messages.total) * 100) : 0}
            trendLabel="last 24h"
          />
          <StatCard 
            label="Delivered" 
            value={stats.messages.delivered || stats.messages.sent} 
            color="var(--accent)" 
            sub={`${stats.messages.successRate}% success rate`}
          />
          <StatCard 
            label="Failed" 
            value={stats.messages.failed} 
            color="var(--danger)" 
          />
          <StatCard 
            label="Template Messages" 
            value={stats.messages.template} 
            color="var(--accent2)" 
            sub={`${stats.messages.templateUsageRate}% of total`}
          />
        </div>

        {/* Message Trends - Optional */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          <StatCard 
            label="Last 24 Hours" 
            value={stats.messages.trends.last24h} 
            color="var(--accent2)"
          />
          <StatCard 
            label="Last 7 Days" 
            value={stats.messages.trends.last7d} 
            color="var(--accent2)"
          />
          <StatCard 
            label="Last 30 Days" 
            value={stats.messages.trends.last30d} 
            color="var(--accent2)"
          />
        </div>

        {/* Bottom Row - Bulk Jobs & Contacts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          {/* Bulk Jobs */}
          <MetricCard title="Bulk Jobs">
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700 }}>
                  {stats.bulkJobs.total}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Total Jobs</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--warn)' }}>
                  {stats.bulkJobs.running}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Running</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>
                  {stats.bulkJobs.completed}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Completed</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--danger)' }}>
                  {stats.bulkJobs.failed}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Failed</div>
              </div>
            </div>
            <div style={{ 
              marginTop: 16, 
              paddingTop: 16, 
              borderTop: '1px solid var(--border)',
              fontSize: 12,
              color: 'var(--muted)'
            }}>
              Success Rate: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{stats.bulkJobs.successRate}%</span>
            </div>
          </MetricCard>

          {/* Contacts */}
          <MetricCard title="Contacts">
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700 }}>
                  {stats.contacts.total}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Total Contacts</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>
                  {stats.contacts.valid}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Valid</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--danger)' }}>
                  {stats.contacts.optedOut}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Opted Out</div>
              </div>
            </div>
            <div style={{ 
              marginTop: 16, 
              paddingTop: 16, 
              borderTop: '1px solid var(--border)',
              fontSize: 12,
              color: 'var(--muted)',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Validity Rate: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{stats.contacts.validityRate}%</span></span>
              <span>New (30d): <span style={{ color: 'var(--accent2)', fontWeight: 600 }}>{stats.contacts.newLast30d}</span></span>
            </div>
          </MetricCard>
        </div>

        {/* Performance & Media Row - Optional */}
        {(stats.performance || stats.media) && (
          <div style={{ display: 'grid', gridTemplateColumns: stats.performance && stats.media ? '1fr 1fr' : '1fr', gap: 20 }}>
            {stats.performance && (
              <MetricCard title="Performance">
                <div style={{ display: 'flex', gap: 32 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--accent2)' }}>
                      {stats.performance.avgDeliveryTimeSeconds}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Avg Delivery Time (seconds)</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>
                      {stats.performance.avgDeliveryTimeFormatted}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Formatted</div>
                  </div>
                </div>
              </MetricCard>
            )}
            
            {stats.media && (
              <MetricCard title="Media Storage">
                <div style={{ display: 'flex', gap: 32 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--accent2)' }}>
                      {stats.media.totalFiles}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Total Media Files</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--accent)' }}>
                      {stats.media.totalSizeMB} MB
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Total Size</div>
                  </div>
                </div>
              </MetricCard>
            )}
          </div>
        )}

        {/* AI Agent Section - Only if data exists */}
        {stats.aiAgent && (
          <>
            <div style={{ marginTop: 40, marginBottom: 12 }}>
              <h2 style={{ 
                fontSize: 13, 
                color: 'var(--muted)', 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: 16
              }}>
                AI Agent
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <StatCard 
                label="Conversations" 
                value={stats.aiAgent.conversations} 
                color="var(--accent2)"
              />
              <StatCard 
                label="Total Messages" 
                value={stats.aiAgent.totalMessages} 
                color="var(--accent)"
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}