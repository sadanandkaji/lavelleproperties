'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

type Child   = { label: string; href: string; icon: React.ReactNode }
type Section = { label: string; icon: React.ReactNode; children: Child[] }
type TopLink = { label: string; href: string; icon: React.ReactNode; top: true }
type NavItem = Section | TopLink

/* ─── Nav config ─── */
const NAV: NavItem[] = [
  {
    top: true as const,
    label: 'Dashboard',
    href: '/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: 'Property',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    children: [
      {
        label: 'Add New Property',
        href: '/admin',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        ),
      },
      {
        label: 'All Listings',
        href: '/propertieslist',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
        ),
      },
    ],
  },
  {
    label: 'WhatsApp',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    children: [
      {
        label: 'Templates',
        href: '/templates',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
        ),
      },
      {
        label: 'Bulk Send',
        href: '/bulk-send',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        ),
      },
      {
        label: 'Sent Messages',
        href: '/sent',
        icon: (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ),
      },
    ],
  },
]

/* ─── Chevron ─── */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
    >
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}

/* ─── Hamburger / X icon ─── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </>
      ) : (
        <>
          <line x1="3" y1="6"  x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </>
      )}
    </svg>
  )
}

/* ─── Logo strip ─── */
function Logo() {
  return (
    <div className="px-5 pt-[22px] pb-4 border-b border-[#1a1a1a]">
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full flex-shrink-0 bg-emerald-500 shadow-[0_0_7px_#10b981]" />
        <span className="text-[15px] font-black text-white tracking-[0.14em] uppercase">LAVELLE</span>
      </div>
      <div className="text-[9px] text-[#3a3a3a] tracking-[0.22em] mt-1.5 uppercase">Admin Panel</div>
    </div>
  )
}

/* ─── Shared nav content ─── */
function NavContent({
  pathname,
  open,
  toggle,
  isActive,
  handleLogout,
  onNavClick,
}: {
  pathname: string | null
  open: Record<string, boolean>
  toggle: (label: string) => void
  isActive: (href: string) => boolean
  handleLogout: () => void
  onNavClick?: () => void
}) {
  return (
    <>
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        {NAV.map((item) => {

          /* ── Top-level link (Dashboard) ── */
          if ('top' in item && item.top === true) {
            const topItem = item as TopLink
            const active  = isActive(topItem.href)
            return (
              <Link
                key={topItem.href}
                href={topItem.href}
                onClick={onNavClick}
                className="block no-underline mb-2"
              >
                <div className={`
                  flex items-center gap-2.5 px-3 py-2.5 rounded-lg border
                  cursor-pointer transition-all duration-150
                  ${active
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-[#111] border-[#1e1e1e] text-[#888] hover:text-[#bbb] hover:bg-[#161616]'
                  }
                `}>
                  <span className={`flex-shrink-0 ${active ? 'text-emerald-400' : 'text-[#444]'}`}>
                    {topItem.icon}
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.1em] uppercase">
                    {topItem.label}
                  </span>
                  {active && (
                    <span className="ml-auto w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                  )}
                </div>
              </Link>
            )
          }

          /* ── Collapsible section ── */
          const section = item as Section
          const isOpen  = open[section.label] ?? false

          return (
            <div key={section.label} className="mb-0.5">
              {/* Section header */}
              <button
                onClick={() => toggle(section.label)}
                className={`
                  w-full flex items-center justify-between gap-2
                  px-2.5 py-2 rounded-lg mb-0.5 border
                  cursor-pointer transition-all duration-150 text-left
                  ${isOpen
                    ? 'bg-[#141414] border-transparent text-[#d4d4d4]'
                    : 'bg-transparent border-transparent text-[#555] hover:text-[#999] hover:bg-[#111]'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span className={`flex-shrink-0 ${isOpen ? 'text-emerald-500' : 'text-[#333]'}`}>
                    {section.icon}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.14em] uppercase">
                    {section.label}
                  </span>
                </div>
                <Chevron open={isOpen} />
              </button>

              {/* Children — animated reveal */}
              <div
                className="overflow-hidden transition-all duration-250 ease-in-out"
                style={{ maxHeight: isOpen ? 300 : 0 }}
              >
                <div className="ml-3 pl-2.5 border-l border-[#1e1e1e] mb-1.5">
                  {section.children.map(child => {
                    const active = isActive(child.href)
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onNavClick}
                        className="block no-underline"
                      >
                        <div className={`
                          flex items-center gap-2 px-2.5 py-[7px] rounded-md mb-px
                          cursor-pointer transition-all duration-100 border
                          ${active
                            ? 'bg-emerald-500/[0.07] border-emerald-500/[0.16] text-emerald-400'
                            : 'bg-transparent border-transparent text-[#555] hover:text-[#999] hover:bg-[#111]'
                          }
                        `}>
                          <span className="flex-shrink-0">{child.icon}</span>
                          <span className={`text-[11px] tracking-[0.05em] flex-1 ${active ? 'font-bold' : 'font-normal'}`}>
                            {child.label}
                          </span>
                          {active && (
                            <span className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-[#1a1a1a]">
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-2
            bg-transparent border border-transparent
            text-red-500 cursor-pointer transition-all duration-150 text-left
            hover:bg-red-500/[0.06] hover:border-red-500/[0.16]
          "
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span className="text-[10px] font-bold tracking-[0.14em] uppercase">Logout</span>
        </button>
        <div className="text-[9px] text-[#2a2a2a] tracking-[0.12em] px-1">v1.0.0 · PRODUCTION</div>
      </div>
    </>
  )
}

/* ════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════ */
export default function Sidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  const [open,       setOpen]       = useState<Record<string, boolean>>({ Property: true, WhatsApp: true })
  const [mobileOpen, setMobileOpen] = useState(false)

  const drawerRef    = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  /* Close on outside click */
  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (!drawerRef.current?.contains(target) && !hamburgerRef.current?.contains(target)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileOpen])

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggle = (label: string) => setOpen(p => ({ ...p, [label]: !p[label] }))

  const isActive = (href: string) => {
    if (!href || !pathname) return false
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const handleLogout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST' }) } catch {}
    localStorage.removeItem('admin_token')
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    router.push('/login')
  }

  const sharedProps = { pathname, open, toggle, isActive, handleLogout }

  return (
    <>
      {/* ══════════════════════════════════════
          MOBILE HEADER BAR  (visible < md)
      ══════════════════════════════════════ */}
      <header className="
        md:hidden fixed top-0 left-0 right-0 z-[60] h-[52px]
        flex items-center justify-between px-4
        bg-[#0b0b0b] border-b border-[#1e1e1e]
        font-mono
      ">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="w-[7px] h-[7px] rounded-full bg-emerald-500 shadow-[0_0_7px_#10b981]" />
          <span className="text-[13px] font-black text-white tracking-[0.14em] uppercase">LAVELLE</span>
          <span className="text-[8px] text-[#3a3a3a] tracking-[0.18em] uppercase ml-0.5">Admin</span>
        </div>

        {/* Hamburger toggle */}
        <button
          ref={hamburgerRef}
          onClick={() => setMobileOpen(v => !v)}
          className={`
            w-9 h-9 flex items-center justify-center rounded-lg border
            cursor-pointer transition-all duration-150
            ${mobileOpen
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-[#111] border-[#1e1e1e] text-[#888] hover:text-[#ccc] hover:border-[#2e2e2e]'
            }
          `}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </header>

      {/* Height spacer so content isn't hidden under header */}
      <div className="md:hidden h-[52px]" />

      {/* ══════════════════════════════════════
          MOBILE BACKDROP
      ══════════════════════════════════════ */}
      <div
        className={`
          md:hidden fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm
          transition-opacity duration-250
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════
          MOBILE SLIDE-IN DRAWER
      ══════════════════════════════════════ */}
      <div
        ref={drawerRef}
        className={`
          md:hidden fixed top-0 left-0 bottom-0 z-[70]
          w-64 flex flex-col overflow-y-auto
          bg-[#0b0b0b] border-r border-[#1e1e1e]
          font-mono
          transition-transform duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Logo />
        <NavContent {...sharedProps} onNavClick={() => setMobileOpen(false)} />
      </div>

      {/* ══════════════════════════════════════
          DESKTOP FIXED SIDEBAR  (visible md+)
      ══════════════════════════════════════ */}
      <aside className="
        hidden md:flex flex-col
        fixed top-0 left-0 bottom-0 z-50
        w-[224px] bg-[#0b0b0b] border-r border-[#1e1e1e]
        font-mono overflow-y-auto
      ">
        <Logo />
        <NavContent {...sharedProps} />
      </aside>

      {/* Desktop content offset spacer — add this class to your page wrapper:
          md:pl-[224px]  */}
    </>
  )
}