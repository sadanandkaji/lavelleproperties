"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PropertyForm from "./components/PropertyForm";
import PropertyCard from "./components/PropertyCard";
import AmenityModal from "./components/AmenityModal";

interface AmenityModalState {
  isOpen: boolean;
  category: "BASIC" | "FULL";
}

export default function AdminPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amenityModal, setAmenityModal] = useState<AmenityModalState>({
    isOpen: false,
    category: "BASIC",
  });

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
    <div className="min-h-screen bg-[#0f0f0f] pb-20 font-mono">
      {/* HEADER */}
      <header className="sticky top-0 z-10 w-full border-b border-[#222] bg-[#0f0f0f]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-5 md:flex-row md:items-center md:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                PROPERTY ADMIN
              </h1>
            </div>
            <p className="mt-1 text-xs text-[#555] uppercase tracking-widest">
              Manage listings & amenity tiers
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setAmenityModal({ isOpen: true, category: "BASIC" })}
              className="inline-flex items-center gap-2 rounded border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2 text-xs font-bold text-[#60a5fa] uppercase tracking-widest transition hover:border-[#60a5fa]/40 hover:bg-[#60a5fa]/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa]" />
              BASIC TIER
            </button>
            <button
              onClick={() => setAmenityModal({ isOpen: true, category: "FULL" })}
              className="inline-flex items-center gap-2 rounded border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2 text-xs font-bold text-[#a78bfa] uppercase tracking-widest transition hover:border-[#a78bfa]/40 hover:bg-[#a78bfa]/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              FULL TIER
            </button>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={`inline-flex items-center gap-2 rounded px-5 py-2 text-xs font-bold uppercase tracking-widest transition ${
                isFormOpen
                  ? "border border-[#333] bg-[#1a1a1a] text-white"
                  : "bg-emerald-500 text-black hover:bg-emerald-400"
              }`}
            >
              {isFormOpen ? "✕ CLOSE" : "+ NEW LISTING"}
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2 text-xs font-bold text-red-400 uppercase tracking-widest transition hover:border-red-500/30 hover:bg-red-500/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* AMENITY MODAL */}
      <AmenityModal
        isOpen={amenityModal.isOpen}
        category={amenityModal.category}
        onClose={() => setAmenityModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* MAIN */}
      <main className="mx-auto mt-8 max-w-7xl px-4 md:px-8">
        {isFormOpen && (
          <section className="mb-10 overflow-hidden rounded-xl border border-[#222] bg-[#141414]">
            <PropertyForm
              onAdded={() => {
                fetchData();
                setIsFormOpen(false);
              }}
            />
          </section>
        )}

        {/* INVENTORY HEADER */}
        <div className="mb-6 flex items-center justify-between border-b border-[#222] pb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#888]">
            Active Inventory
          </h2>
          <span className="rounded border border-[#222] bg-[#1a1a1a] px-3 py-1 text-xs font-bold text-[#555] uppercase tracking-wider">
            {properties.length} properties
          </span>
        </div>

        {loading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            <p className="text-xs text-[#444] uppercase tracking-widest animate-pulse">
              Loading listings...
            </p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-[#222]">
            <p className="text-sm text-[#444]">No properties found.</p>
            <p className="text-xs text-[#333] mt-1">Start by adding a new listing above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} onDelete={fetchData} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}