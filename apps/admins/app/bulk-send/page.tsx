'use client'
import Sidebar from '../components/Sidebar'
import CustomMessageTab from '../components/CustomMessageTab'

export default function CustomPage() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{
        marginLeft: 224,
        flex: 1,
        padding: '32px 40px',
        minHeight: '100vh',
        maxWidth: 'calc(100vw - 224px)',
        boxSizing: 'border-box' as const,
      }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, margin: 0 }}>
            Custom Messages
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>
            Send free-form text, images, videos, and documents within the 24-hour window
          </p>
        </div>
        <CustomMessageTab />
      </main>
    </div>
  )
}