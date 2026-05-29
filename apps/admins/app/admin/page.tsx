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

  const soldOutCount = properties.filter(p => p.isSoldOut).length;

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] font-mono">

      {/* Sidebar owns its own mobile header + drawer — no wrapper needed */}
      <AdminSidebar />

      {/* Main content
          md:pl-[224px] offsets the fixed desktop sidebar.
          On mobile the Sidebar renders a top header bar (52px),
          so we add pt-[52px] on mobile and remove it on md+. */}
      <div className="flex flex-col flex-1 min-w-0 pt-[52px] md:pt-0 md:pl-[224px]">

        {/* ── Top bar ── */}
        <header className="sticky top-0 z-10 border-b border-[#1f1f1f] bg-[#0f0f0f]/95 backdrop-blur-xl px-4 sm:px-6 lg:px-9 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
              <h1 className="text-sm sm:text-base font-extrabold text-white tracking-widest uppercase">
                Property Admin
              </h1>
            </div>
            <p className="text-[9px] text-[#444] tracking-[0.2em] uppercase mt-0.5 hidden sm:block">
              Manage listings &amp; amenity tiers
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(v => !v)}
            className={[
              "inline-flex items-center gap-2 px-4 py-2 rounded-md",
              "text-[10px] font-bold tracking-widest uppercase cursor-pointer",
              "transition-all duration-150 shrink-0 whitespace-nowrap",
              isFormOpen
                ? "bg-[#1a1a1a] text-white border border-[#333]"
                : "bg-emerald-500 text-black border border-transparent hover:bg-emerald-400",
            ].join(" ")}
          >
            {isFormOpen ? "✕ Close" : "+ New Listing"}
          </button>
        </header>

        {/* ── Edit modal ── */}
        {editingProperty && (
          <PropertyEditModal
            property={editingProperty}
            onClose={() => setEditingProperty(null)}
            onSaved={() => { setEditingProperty(null); fetchData(); }}
          />
        )}

        {/* ── Page body ── */}
        <main className="flex-1 px-4 sm:px-6 lg:px-9 py-6 sm:py-8">

          {isFormOpen && (
            <section className="mb-8 rounded-xl border border-[#1f1f1f] bg-[#141414] overflow-hidden">
              <PropertyForm onAdded={() => { fetchData(); setIsFormOpen(false); }} />
            </section>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f1f1f] pb-4 mb-6">
            <h2 className="text-[10px] font-bold tracking-[0.2em] text-[#666] uppercase">
              Active Inventory
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded border border-[#222] bg-[#1a1a1a] text-[10px] font-bold text-[#555] tracking-widest uppercase">
                {properties.length} properties
              </span>
              {soldOutCount > 0 && (
                <span className="px-3 py-1 rounded border border-red-500/30 bg-red-500/10 text-[10px] font-bold text-red-400 tracking-widest uppercase">
                  {soldOutCount} sold out
                </span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
              <p className="text-[10px] text-[#444] tracking-[0.2em] uppercase">Loading listings…</p>
            </div>

          ) : properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-[#222] rounded-xl">
              <p className="text-sm text-[#444]">No properties found.</p>
              <p className="text-xs text-[#333] mt-1.5">Start by adding a new listing above.</p>
            </div>

          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
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
    </div>
  );
}