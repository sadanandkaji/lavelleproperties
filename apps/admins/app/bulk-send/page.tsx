'use client'
import Sidebar from '../components/Sidebar'
import CustomMessageTab from '../components/CustomMessageTab'

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] md:pl-[224px]">
      <Sidebar />

      <main className="min-w-0 overflow-x-hidden">
        <div className="px-4 py-6 sm:px-6 md:px-10 md:py-10 max-w-[1400px] w-full mx-auto">

          {/* ── Page header ── */}
          <div className="mb-6 md:mb-8">
            <h1 className="font-[var(--font-display)] text-2xl md:text-[32px] font-extrabold tracking-tight text-[var(--text)] mb-1">
              Custom Messages
            </h1>
            <p className="text-sm text-[var(--muted)]">
              Send free-form text, images, videos, and documents within the 24-hour window
            </p>
          </div>

          <CustomMessageTab />
        </div>
      </main>
    </div>
  )
}