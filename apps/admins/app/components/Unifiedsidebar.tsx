'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

// ── Types ──────────────────────────────────────────────────────────────────

type Child = { label: string; href: string; icon: React.ReactNode }
type Section = { label: string; icon: React.ReactNode; children: Child[] }

// ── Nav config ─────────────────────────────────────────────────────────────

const NAV: Section[] = [
  {
    label: 'Property',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    children: [
      {
        label: 'Add New Property',
        href: '/admin',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        ),
      },
      {
        label: 'All Listings',
        href: '/propertieslist',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'WhatsApp',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    children: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
      {
        label: 'Templates',
        href: '/templates',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        ),
      },
      {
        label: 'Bulk Send',
        href: '/bulk-send',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        ),
      },
      {
        label: 'Sent Messages',
        href: '/sent',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
      {
        label: 'AI Agent',
        href: '/ai-agent',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        ),
      },
    ],
  },
]

// ── Chevron ────────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0 }}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────

interface UnifiedSidebarProps {
  /** Pass a logout handler when used in the admin panel. Omit for standalone WA pages. */
  onLogout?: () => void
  /** Brand name shown in header */
  brand?: string
  /** Tagline below brand */
  tagline?: string
}

export default function UnifiedSidebar({
  onLogout,
  brand = 'LAVELLE',
  tagline = 'Admin Panel',
}: UnifiedSidebarProps) {
  const pathname = usePathname()
  const router   = useRouter()

  const [open, setOpen] = useState<Record<string, boolean>>({
    Property: true,
    WhatsApp: true,
  })

  const toggle = (label: string) => setOpen(p => ({ ...p, [label]: !p[label] }))

  const isActive = (href: string) =>
    href === '/admin'
      ? pathname === '/admin'          // exact match for admin to avoid collision
      : pathname.startsWith(href)

  return (
    <aside style={{
      width: 224,
      minHeight: '100vh',
      background: '#0b0b0b',
      borderRight: '1px solid #1e1e1e',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0, left: 0,
      zIndex: 50,
      fontFamily: 'ui-monospace, "Space Mono", monospace',
    }}>

      {/* ── Logo ── */}
      <div style={{ padding: '22px 20px 16px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
            background: '#10b981', boxShadow: '0 0 7px #10b981',
            display: 'inline-block',
          }} />
          <span style={{
            fontSize: 15, fontWeight: 800, color: '#ffffff',
            letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            {brand}
          </span>
        </div>
        <div style={{
          fontSize: 9, color: '#3a3a3a', letterSpacing: '0.22em',
          marginTop: 5, textTransform: 'uppercase',
        }}>
          {tagline}
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {NAV.map(section => (
          <div key={section.label} style={{ marginBottom: 2 }}>

            {/* Section toggle button */}
            <button
              onClick={() => toggle(section.label)}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 10px', borderRadius: 7, marginBottom: 2,
                background: open[section.label] ? '#141414' : 'transparent',
                border: '1px solid transparent',
                cursor: 'pointer', transition: 'all 0.15s',
                color: open[section.label] ? '#d4d4d4' : '#555',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: open[section.label] ? '#10b981' : '#333', flexShrink: 0 }}>
                  {section.icon}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                }}>
                  {section.label}
                </span>
              </div>
              <Chevron open={open[section.label]} />
            </button>

            {/* Children */}
            {open[section.label] && (
              <div style={{
                marginLeft: 12, paddingLeft: 10,
                borderLeft: '1px solid #1e1e1e',
                marginBottom: 6,
              }}>
                {section.children.map(child => {
                  const active = isActive(child.href)
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <div
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '7px 10px', borderRadius: 6, marginBottom: 1,
                          cursor: 'pointer', transition: 'all 0.12s',
                          background: active ? '#10b98112' : 'transparent',
                          border: `1px solid ${active ? '#10b98128' : 'transparent'}`,
                          color: active ? '#10b981' : '#555',
                        }}
                      >
                        <span style={{ flexShrink: 0 }}>{child.icon}</span>
                        <span style={{
                          fontSize: 11,
                          fontWeight: active ? 700 : 400,
                          letterSpacing: '0.05em',
                          flex: 1,
                        }}>
                          {child.label}
                        </span>
                        {active && (
                          <span style={{
                            width: 4, height: 4, borderRadius: '50%',
                            background: '#10b981', flexShrink: 0,
                          }} />
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid #1a1a1a' }}>
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 12px', borderRadius: 7,
              background: 'transparent', border: '1px solid transparent',
              color: '#ef4444', cursor: 'pointer', transition: 'all 0.15s',
              textAlign: 'left', marginBottom: 8,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#ef444410'
              el.style.borderColor = '#ef444428'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
              el.style.borderColor = 'transparent'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Logout
            </span>
          </button>
        )}

        <div style={{ fontSize: 9, color: '#2a2a2a', letterSpacing: '0.12em', padding: '0 4px' }}>
          v1.0.0 · PRODUCTION
        </div>
      </div>

    </aside>
  )
}