"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "../components/Sidebar";
import PropertyForm from "../components/PropertyForm";
import PropertyCard, { Property } from "../components/PropertyCard";
import PropertyEditModal from "../components/Propertyeditmodal";

export default function AdminPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.replace("/login");
  }, [router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/property");
      if (!res.ok) throw new Error("Failed to fetch properties");
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLogout = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch (_) {}
    localStorage.removeItem("admin_token");
    router.push("/login");
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f0f', fontFamily: 'monospace' }}>

      {/* ── Sidebar ── */}
      <AdminSidebar  />

      {/* ── Main content (offset by sidebar width) ── */}
      <div style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Top bar */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 10,
          borderBottom: '1px solid #1f1f1f',
          background: 'rgba(15,15,15,0.92)',
          backdropFilter: 'blur(12px)',
          padding: '18px 36px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#10b981', display: 'inline-block',
                animation: 'pulse 2s infinite',
              }} />
              <h1 style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
                Property Admin
              </h1>
            </div>
            <p style={{ fontSize: 10, color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>
              Manage listings & amenity tiers
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '9px 20px', borderRadius: 6,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.15s',
              background: isFormOpen ? '#1a1a1a' : '#10b981',
              color: isFormOpen ? '#fff' : '#000',
              border: isFormOpen ? '1px solid #333' : '1px solid transparent',
            }}
          >
            {isFormOpen ? '✕ Close' : '+ New Listing'}
          </button>
        </header>

        {/* Edit modal */}
        {editingProperty && (
          <PropertyEditModal
            property={editingProperty}
            onClose={() => setEditingProperty(null)}
            onSaved={() => { setEditingProperty(null); fetchData(); }}
          />
        )}

        {/* Page body */}
        <main style={{ padding: '32px 36px', flex: 1 }}>

          {/* Add property form */}
          {isFormOpen && (
            <section style={{
              marginBottom: 32, borderRadius: 14,
              border: '1px solid #1f1f1f', background: '#141414', overflow: 'hidden',
            }}>
              <PropertyForm onAdded={() => { fetchData(); setIsFormOpen(false); }} />
            </section>
          )}

          {/* Inventory header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid #1f1f1f', paddingBottom: 16, marginBottom: 24,
          }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#666', textTransform: 'uppercase', margin: 0 }}>
              Active Inventory
            </h2>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{
                padding: '4px 12px', borderRadius: 5,
                border: '1px solid #222', background: '#1a1a1a',
                fontSize: 10, fontWeight: 700, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                {properties.length} properties
              </span>
              {properties.some(p => p.isSoldOut) && (
                <span style={{
                  padding: '4px 12px', borderRadius: 5,
                  border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)',
                  fontSize: 10, fontWeight: 700, color: '#f87171', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  {properties.filter(p => p.isSoldOut).length} sold out
                </span>
              )}
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 260, gap: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                border: '2px solid #10b981', borderTopColor: 'transparent',
                animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ fontSize: 10, color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Loading listings...
              </p>
            </div>
          ) : properties.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: 260,
              border: '1px dashed #222', borderRadius: 14,
            }}>
              <p style={{ fontSize: 13, color: '#444' }}>No properties found.</p>
              <p style={{ fontSize: 11, color: '#333', marginTop: 6 }}>Start by adding a new listing above.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 20,
            }}>
              {properties.map(p => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onDelete={fetchData}
                  onEdit={prop => setEditingProperty(prop)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  );
}