'use client'
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import TemplateCreator from '../components/TemplateCreator'
import useAdminAuth from '@/hooks/useAdminAuth'

const S: Record<string, React.CSSProperties> = {
  label:   { fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 6, fontFamily: 'var(--font-mono)' },
  input:   { width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', boxSizing: 'border-box' as const },
  section: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 20 },
}

const Btn = ({ children, onClick, variant = 'default', disabled = false, small = false }: any) => {
  const colors: any = {
    default: { bg: 'var(--surface2)', border: 'var(--border)', color: 'var(--text)' },
    accent:  { bg: '#00e5a020', border: '#00e5a060', color: 'var(--accent)' },
    danger:  { bg: '#ef444420', border: '#ef444460', color: 'var(--danger)' },
    warn:    { bg: '#f59e0b20', border: '#f59e0b60', color: 'var(--warn)' },
    purple:  { bg: '#7c3aed20', border: '#7c3aed60', color: 'var(--accent2)' },
  }
  const c = colors[variant]
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: c.bg, border: `1px solid ${c.border}`, color: c.color,
      borderRadius: 8, padding: small ? '6px 14px' : '10px 20px',
      fontSize: small ? 11 : 13, fontFamily: 'var(--font-mono)', cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, transition: 'all 0.15s',
    }}>
      {children}
    </button>
  )
}

function Badge({ status }: { status: string }) {
  const colors: any = {
    approved: { bg: '#00e5a020', border: '#00e5a060', color: '#00e5a0' },
    pending: { bg: '#f59e0b20', border: '#f59e0b60', color: '#f59e0b' },
    rejected: { bg: '#ef444420', border: '#ef444460', color: '#ef4444' },
  }
  const c = colors[status] || colors.pending
  return (
    <span style={{
      fontSize: 10, padding: '3px 10px', borderRadius: 100, fontFamily: 'var(--font-mono)',
      letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700,
      background: c.bg, border: `1px solid ${c.border}`, color: c.color
    }}>
      {status}
    </span>
  )
}

export default function TemplatesPage() {
    useAdminAuth()

  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list')
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

const loadTemplates = async () => {
  setLoading(true)
  try {
    const params = new URLSearchParams()
    if (filterStatus) params.append('status', filterStatus)
    if (filterCategory) params.append('category', filterCategory)
    
    const res = await fetch(`/api/templates?${params}`)
    const data = await res.json()
    
    if (data.success) {
      // Debug: Log the first template to see media structure
      if (data.data && data.data.length > 0) {
        console.log('First template media:', data.data[0].media)
        console.log('First template components:', data.data[0].components)
      }
      setTemplates(data.data || [])
    }
  } catch (error) {
    console.error('Error loading templates:', error)
  }
  setLoading(false)
}

  useEffect(() => { loadTemplates() }, [filterStatus, filterCategory])

  const syncFromMeta = async () => {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch('/api/templates/sync', { method: 'POST' })
      const data = await res.json()
      
      if (data.success) {
        setSyncResult(data)
        showToast(`✓ Synced ${data.data.total} templates from Meta`)
        loadTemplates()
      } else {
        showToast(`✕ Sync failed: ${data.error}`)
      }
    } catch {
      showToast('✕ Network error during sync')
    }
    setSyncing(false)
  }

  const deleteTemplate = async (id: string) => {
    if (!confirm('Delete this template? This cannot be undone.')) return
    
    try {
      const res = await fetch(`/api/templates/${id}`, { method: 'DELETE' })
      const data = await res.json()
      
      if (data.success) {
        showToast('✓ Template deleted')
        loadTemplates()
      } else {
        showToast(`✕ ${data.error}`)
      }
    } catch {
      showToast('✕ Failed to delete template')
    }
  }

  const handleTemplateCreated = (template: any) => {
    showToast('✓ Template submitted for review!')
    setActiveTab('list')
    loadTemplates()
  }

  // Count templates by status
  const statusCounts = {
    all: templates.length,
    approved: templates.filter(t => t.status === 'approved').length,
    pending: templates.filter(t => t.status === 'pending').length,
    rejected: templates.filter(t => t.status === 'rejected').length,
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 220, flex: 1, padding: '40px 48px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800 }}>
              Message Templates
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>
              Create and manage WhatsApp message templates
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="purple" onClick={syncFromMeta} disabled={syncing}>
              {syncing ? '⟳ Syncing...' : '⟳ Sync from Meta'}
            </Btn>
            <Btn variant="accent" onClick={() => setActiveTab('create')}>
              + Create Template
            </Btn>
          </div>
        </div>

        {/* Sync Result Banner */}
        {syncResult && (
          <div style={{ 
            background: '#00e5a010', border: '1px solid #00e5a030', 
            borderRadius: 10, padding: '14px 20px', marginBottom: 24, 
            display: 'flex', gap: 32, alignItems: 'center' 
          }}>
            <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700 }}>
              ✓ SYNC COMPLETE
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              Loaded <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{syncResult.data.total}</span> templates from Meta
            </div>
            <button 
              onClick={() => setSyncResult(null)} 
              style={{ 
                marginLeft: 'auto', background: 'none', border: 'none', 
                color: 'var(--muted)', cursor: 'pointer', fontSize: 16 
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Tabs */}
        <div style={{ 
          display: 'flex', gap: 4, marginBottom: 32, 
          borderBottom: '1px solid var(--border)', paddingBottom: 0 
        }}>
          <button
            onClick={() => setActiveTab('list')}
            style={{
              padding: '12px 24px', background: 'none', border: 'none',
              borderBottom: activeTab === 'list' ? '2px solid var(--accent)' : '2px solid transparent',
              color: activeTab === 'list' ? 'var(--accent)' : 'var(--muted)',
              fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            All Templates ({statusCounts.all})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            style={{
              padding: '12px 24px', background: 'none', border: 'none',
              borderBottom: activeTab === 'create' ? '2px solid var(--accent)' : '2px solid transparent',
              color: activeTab === 'create' ? 'var(--accent)' : 'var(--muted)',
              fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            Create New
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'create' ? (
          <TemplateCreator 
            onSave={handleTemplateCreated}
            onCancel={() => setActiveTab('list')}
          />
        ) : (
          <>
            {/* Status Filter Tabs */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              {[
                { key: '', label: 'All', count: statusCounts.all },
                { key: 'approved', label: 'Approved', count: statusCounts.approved, color: '#00e5a0' },
                { key: 'pending', label: 'Pending', count: statusCounts.pending, color: '#f59e0b' },
                { key: 'rejected', label: 'Rejected', count: statusCounts.rejected, color: '#ef4444' },
              ].map(status => (
                <button
                  key={status.key}
                  onClick={() => setFilterStatus(status.key)}
                  style={{
                    padding: '8px 16px', borderRadius: 8,
                    background: filterStatus === status.key ? 'var(--surface2)' : 'transparent',
                    border: `1px solid ${filterStatus === status.key ? 'var(--border2)' : 'transparent'}`,
                    color: filterStatus === status.key ? (status.color || 'var(--text)') : 'var(--muted)',
                    fontSize: 12, fontFamily: 'var(--font-mono)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  {status.label}
                  <span style={{ 
                    background: status.color ? `${status.color}20` : 'var(--surface2)',
                    color: status.color || 'var(--muted)',
                    padding: '2px 8px', borderRadius: 100, fontSize: 10, fontWeight: 700 
                  }}>
                    {status.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, color: 'var(--muted)', alignSelf: 'center', marginRight: 8 }}>
                CATEGORY:
              </span>
              {['', 'MARKETING', 'UTILITY', 'AUTHENTICATION'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  style={{
                    padding: '6px 14px', borderRadius: 100, fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    background: filterCategory === cat ? '#7c3aed20' : 'var(--surface2)',
                    border: `1px solid ${filterCategory === cat ? '#7c3aed40' : 'var(--border)'}`,
                    color: filterCategory === cat ? '#7c3aed' : 'var(--muted)',
                    cursor: 'pointer',
                  }}
                >
                  {cat === '' ? 'All' : cat}
                </button>
              ))}
            </div>

            {/* Templates List */}
            {loading ? (
              <div style={{ 
                padding: 60, textAlign: 'center', color: 'var(--muted)', fontSize: 13 
              }}>
                Loading templates...
              </div>
            ) : templates.length === 0 ? (
              <div style={{ 
                background: 'var(--surface)', border: '1px solid var(--border)', 
                borderRadius: 12, padding: 60, textAlign: 'center' 
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📝</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                  No templates found
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>
                  {filterStatus || filterCategory 
                    ? 'Try changing your filters or create a new template'
                    : 'Get started by creating your first template or sync from Meta'}
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <Btn variant="accent" onClick={() => setActiveTab('create')}>
                    + Create Template
                  </Btn>
                  <Btn variant="purple" onClick={syncFromMeta}>
                    ⟳ Sync from Meta
                  </Btn>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {templates.map(template => {
                  // Parse header info from components if available
                  const components = template.components || []
                  const headerComp = components.find((c: any) => c.type === 'HEADER')
                  const footerComp = components.find((c: any) => c.type === 'FOOTER')
                  const buttonsComp = components.find((c: any) => c.type === 'BUTTONS')
                   const headerMedia = template.media?.find((m: any) => m.isHeader === true)
  const headerImageUrl = headerMedia?.url // This is the Cloudinary URL!
                  return (
                    <div
                      key={template.id}
                      style={{
                        background: 'var(--surface)', border: '1px solid var(--border)',
                        borderRadius: 12, padding: '24px', transition: 'all 0.2s',
                      }}
                    >
                      {/* Template Header Info */}
                      <div style={{ 
                        display: 'flex', alignItems: 'center', gap: 10, 
                        marginBottom: 16, flexWrap: 'wrap', paddingBottom: 16,
                        borderBottom: '1px solid var(--border)'
                      }}>
                        <span style={{ 
                          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 
                        }}>
                          {template.name}
                        </span>
                        <Badge status={template.status} />
                        
                        <span style={{ 
                          fontSize: 10, background: 'var(--surface2)', 
                          padding: '3px 10px', borderRadius: 4, color: 'var(--muted)' 
                        }}>
                          {template.category}
                        </span>
                        
                        <span style={{ 
                          fontSize: 10, background: 'var(--surface2)', 
                          padding: '3px 10px', borderRadius: 4, color: 'var(--muted)' 
                        }}>
                          {template.language?.toUpperCase()}
                        </span>
                        
                        {template.id?.startsWith('meta_') && (
                          <span style={{ 
                            fontSize: 10, background: '#1877f220', 
                            border: '1px solid #1877f240', color: '#1877f2',
                            padding: '3px 10px', borderRadius: 4, fontWeight: 700 
                          }}>
                            META
                          </span>
                        )}

                        {/* Actions on the right */}
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                          {template.status === 'approved' && (
                            <Btn variant="accent" small onClick={() => {
                              window.location.href = `/messages?template=${template.id}`
                            }}>
                              Use Template
                            </Btn>
                          )}
                          <Btn variant="danger" small onClick={() => deleteTemplate(template.id)}>
                            Delete
                          </Btn>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 24 }}>
                        
                        {/* LEFT: WhatsApp Message Preview */}
                        <div style={{ flex: '0 0 360px' }}>
                          <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
                            PREVIEW
                          </div>

                          {/* WhatsApp Phone Mockup */}
                          <div style={{ 
                            background: '#0a1014', borderRadius: 20, padding: '16px 10px',
                            border: '4px solid #2a2a2e', maxWidth: 360
                          }}>
                            {/* Status bar */}
                            <div style={{ 
                              display: 'flex', justifyContent: 'space-between', 
                              padding: '0 8px 10px', fontSize: 10, color: '#888' 
                            }}>
                              <span>9:41</span>
                              <span>● ● ●</span>
                            </div>

                            {/* Chat background */}
                            <div style={{ 
                              background: '#0b1418', borderRadius: 14, padding: 10,
                              backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff08 1px, transparent 0)',
                              backgroundSize: '20px 20px', minHeight: 200
                            }}>
                              
                              {/* Message Bubble */}
                              <div style={{ 
                                maxWidth: '85%', background: '#202c33', 
                                borderRadius: '0 12px 12px 12px',
                                overflow: 'hidden', boxShadow: '0 2px 8px #0004'
                              }}>
                                
                               {/* Header with actual image from Cloudinary */}
{/* Header with actual image from Cloudinary - Check media array first */}
{(() => {
  // Get image from media array regardless of headerComp
  const headerMediaItem = template.media?.find((m: any) => m.isHeader === true)
  const imageUrl = headerMediaItem?.url || template.headerMediaUrl
  
  // Check if we have a header component with text
  const hasTextHeader = headerComp?.format === 'TEXT' && headerComp?.text
  
  return (
    <>
      {/* Text Header */}
      {hasTextHeader && (
        <div style={{ 
          padding: '10px 14px 6px', fontSize: 14, 
          fontWeight: 700, color: '#e9edef' 
        }}>
          {headerComp.text}
        </div>
      )}
      
      {/* IMAGE Header - Show from media array */}
      {template.headerFormat === 'image' && (
        <>
          {imageUrl ? (
            <div style={{ overflow: 'hidden' }}>
              <img 
                src={imageUrl} 
                alt="Template header" 
                style={{ width: '100%', height: 'auto', maxHeight: 200, objectFit: 'cover' }}
                onError={(e) => { 
                  console.error('Image failed to load:', imageUrl);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div style={{ 
              height: 140, background: '#2a3942', 
              display: 'flex', alignItems: 'center', 
              justifyContent: 'center', fontSize: 32 
            }}>
              🖼
            </div>
          )}
        </>
      )}
      
      {/* VIDEO Header */}
      {template.headerFormat === 'video' && (
        <>
          {imageUrl ? (
            <div style={{ overflow: 'hidden' }}>
              <video 
                src={imageUrl} 
                style={{ width: '100%', height: 'auto', maxHeight: 200, objectFit: 'cover' }}
                controls
              />
            </div>
          ) : (
            <div style={{ 
              height: 140, background: '#2a3942', 
              display: 'flex', alignItems: 'center', 
              justifyContent: 'center', fontSize: 32,
              flexDirection: 'column', gap: 8
            }}>
              <span>▶</span>
              <span style={{ fontSize: 11, color: '#8696a0' }}>Video</span>
            </div>
          )}
        </>
      )}
      
      {/* DOCUMENT Header */}
      {template.headerFormat === 'document' && (
        <>
          {imageUrl ? (
            <div style={{ 
              padding: '10px 14px', background: '#2a3942', 
              display: 'flex', alignItems: 'center', gap: 10 
            }}>
              <span style={{ fontSize: 24 }}>📄</span>
              <a 
                href={imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: 12, color: '#53bdeb', textDecoration: 'none', wordBreak: 'break-all' }}
              >
                {template.headerFilename || 'View Document'}
              </a>
            </div>
          ) : (
            <div style={{ 
              padding: '10px 14px', background: '#2a3942', 
              display: 'flex', alignItems: 'center', gap: 10 
            }}>
              <span style={{ fontSize: 24 }}>📄</span>
              <span style={{ fontSize: 12, color: '#8696a0' }}>Document.pdf</span>
            </div>
          )}
        </>
      )}
    </>
  )
})()}

                                {/* Body */}
                                <div style={{ 
                                  padding: '10px 14px', fontSize: 13, color: '#e9edef', 
                                  lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' 
                                }}>
                                  {template.body}
                                </div>

                                {/* Footer */}
                                {footerComp && footerComp.text && (
                                  <div style={{ 
                                    padding: '2px 14px 10px', fontSize: 11, color: '#8696a0' 
                                  }}>
                                    {footerComp.text}
                                  </div>
                                )}

                                {/* Timestamp */}
                                <div style={{ 
                                  padding: '0 14px 8px', fontSize: 10, 
                                  color: '#8696a0', textAlign: 'right' 
                                }}>
                                  {new Date().toLocaleTimeString('en-IN', { 
                                    hour: '2-digit', minute: '2-digit' 
                                  })} ✓✓
                                </div>

                                {/* Buttons */}
                                {/* Buttons - Use template.buttons directly, not buttonsComp */}
{(template.buttons && template.buttons.length > 0) && (
  <div style={{ borderTop: '1px solid #3b4a54' }}>
    {template.buttons.slice(0, 3).map((btn: any, i: number) => (
      <div key={i} style={{ 
        padding: '10px 14px', textAlign: 'center', 
        fontSize: 13, color: '#53bdeb',
        borderBottom: i < Math.min(template.buttons.length, 3) - 1 
          ? '1px solid #3b4a54' : undefined,
        display: 'flex', alignItems: 'center', 
        justifyContent: 'center', gap: 6 
      }}>
        {btn.type === 'url' && '↗ '}
        {btn.type === 'phone_number' && '📞 '}
        {btn.type === 'quick_reply' && '💬 '}
        {btn.text || `Button ${i + 1}`}
      </div>
    ))}
    {template.buttons.length > 3 && (
      <div style={{ 
        padding: '10px 14px', textAlign: 'center', 
        fontSize: 12, color: '#53bdeb', 
        borderTop: '1px solid #3b4a54' 
      }}>
        ≡ See all {template.buttons.length} options
      </div>
    )}
  </div>
)}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT: Template Details */}
                        <div style={{ flex: 1 }}>
                          
                          {/* Variables */}
                          {template.variables && template.variables.length > 0 && (
                            <div style={{ marginBottom: 16 }}>
                              <div style={{ 
                                fontSize: 11, color: 'var(--muted)', 
                                letterSpacing: '0.1em', marginBottom: 8,
                                fontFamily: 'var(--font-mono)'
                              }}>
                                VARIABLES
                              </div>
                              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                {template.variables.map((v: string, i: number) => (
                                  <span
                                    key={i}
                                    style={{
                                      background: '#7c3aed15', border: '1px solid #7c3aed30',
                                      color: '#7c3aed', padding: '4px 10px', borderRadius: 6,
                                      fontSize: 11, fontFamily: 'var(--font-mono)'
                                    }}
                                  >
                                    {v}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Template Info */}
                          <div style={{ marginBottom: 16 }}>
                            <div style={{ 
                              fontSize: 11, color: 'var(--muted)', 
                              letterSpacing: '0.1em', marginBottom: 8,
                              fontFamily: 'var(--font-mono)'
                            }}>
                              DETAILS
                            </div>
                            <div style={{ 
                              background: 'var(--surface2)', border: '1px solid var(--border)',
                              borderRadius: 8, padding: 12 
                            }}>
                              <div style={{ 
                                display: 'grid', gridTemplateColumns: '120px 1fr', 
                                gap: '8px 16px', fontSize: 12 
                              }}>
                                <span style={{ color: 'var(--muted)' }}>Template ID:</span>
                                <span style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                                  {template.metaTemplateId || template.id}
                                </span>
                                
                                {headerComp && (
                                  <>
                                    <span style={{ color: 'var(--muted)' }}>Header:</span>
                                    <span style={{ color: 'var(--text)' }}>
                                      {headerComp.format || 'None'}
                                    </span>
                                  </>
                                )}
                                
                                {footerComp && (
                                  <>
                                    <span style={{ color: 'var(--muted)' }}>Footer:</span>
                                    <span style={{ color: 'var(--text)' }}>Yes</span>
                                  </>
                                )}
                                
                                {buttonsComp && (
                                  <>
                                    <span style={{ color: 'var(--muted)' }}>Buttons:</span>
                                    <span style={{ color: 'var(--text)' }}>
                                      {buttonsComp.buttons?.length || 0} button{buttonsComp.buttons?.length !== 1 ? 's' : ''}
                                    </span>
                                  </>
                                )}
                                
                                <span style={{ color: 'var(--muted)' }}>Created:</span>
                                <span style={{ color: 'var(--text)' }}>
                                  {new Date(template.createdAt).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Rejection Reason */}
                          {template.status === 'rejected' && template.rejectionReason && (
                            <div style={{ 
                              fontSize: 12, color: 'var(--danger)',
                              background: '#ef444410', border: '1px solid #ef444430',
                              padding: '12px 16px', borderRadius: 8, marginBottom: 16
                            }}>
                              <div style={{ fontWeight: 700, marginBottom: 4 }}>
                                ❌ Rejection Reason
                              </div>
                              {template.rejectionReason}
                            </div>
                          )}

                          {/* Usage Instructions */}
                          {template.status === 'approved' && (
                            <div style={{ 
                              background: '#00e5a010', border: '1px solid #00e5a030',
                              borderRadius: 8, padding: '12px 16px', fontSize: 12
                            }}>
                              <div style={{ 
                                color: 'var(--accent)', fontWeight: 700, marginBottom: 6 
                              }}>
                                ✓ Ready to Use
                              </div>
                              <div style={{ color: 'var(--muted)' }}>
                                This template is approved and can be sent to contacts. Click "Use Template" to start a bulk campaign.
                              </div>
                            </div>
                          )}
                          
                          {template.status === 'pending' && (
                            <div style={{ 
                              background: '#f59e0b10', border: '1px solid #f59e0b30',
                              borderRadius: 8, padding: '12px 16px', fontSize: 12
                            }}>
                              <div style={{ 
                                color: 'var(--warn)', fontWeight: 700, marginBottom: 6 
                              }}>
                                ⏳ Under Review
                              </div>
                              <div style={{ color: 'var(--muted)' }}>
                                This template is being reviewed by Meta. Approval usually takes a few minutes to 24 hours.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* Toast */}
        {toast && (
          <div style={{ 
            position: 'fixed', bottom: 32, right: 32, zIndex: 200,
            background: 'var(--surface)', border: '1px solid var(--accent)',
            color: 'var(--accent)', padding: '12px 24px', borderRadius: 10,
            fontSize: 13, fontFamily: 'var(--font-mono)', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            {toast}
          </div>
        )}
      </main>
    </div>
  )
}