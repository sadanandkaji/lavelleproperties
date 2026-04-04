"use client";

import React, { useState, useEffect } from "react";

interface AmenityModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: "BASIC" | "FULL";
}

export default function AmenityModal({ isOpen, onClose, category }: AmenityModalProps) {
  const [amenities, setAmenities] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAmenities = async () => {
    try {
      const res = await fetch(`/api/amenity?category=${category}`);
      const data = await res.json();
      if (Array.isArray(data)) setAmenities(data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAmenities();
      setNewName("");
      setError("");
    }
  }, [isOpen, category]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/amenity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), category }),
      });

      if (res.ok) {
        setNewName("");
        fetchAmenities();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add amenity");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/amenity?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchAmenities();
    } else {
      const data = await res.json();
      alert(data.error || "Cannot delete: amenity may be in use.");
    }
  };

  if (!isOpen) return null;

  const isBasic = category === "BASIC";
  const accent = isBasic ? "#60a5fa" : "#a78bfa";
  const accentBg = isBasic ? "bg-[#60a5fa]/10" : "bg-[#a78bfa]/10";
  const accentBorder = isBasic ? "border-[#60a5fa]/30" : "border-[#a78bfa]/30";
  const accentText = isBasic ? "text-[#60a5fa]" : "text-[#a78bfa]";
  const accentRing = isBasic ? "focus:ring-[#60a5fa]/40 focus:border-[#60a5fa]/40" : "focus:ring-[#a78bfa]/40 focus:border-[#a78bfa]/40";
  const btnBg = isBasic ? "bg-[#60a5fa] hover:bg-[#93c5fd]" : "bg-[#a78bfa] hover:bg-[#c4b5fd]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#141414] rounded-xl border border-[#222] shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={`flex items-center justify-between px-5 py-4 border-b border-[#222] ${accentBg}`}>
          <div>
            <h2 className={`text-sm font-bold uppercase tracking-widest ${accentText}`}>
              {isBasic ? "🛡 Basic" : "💎 Full"} Amenity Tier
            </h2>
            <p className="text-[10px] text-[#444] mt-0.5 uppercase tracking-widest">
              Global configuration
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#444] hover:text-white transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* ADD FORM */}
        <form onSubmit={handleAdd} className="p-4 border-b border-[#1e1e1e] bg-[#0f0f0f] flex gap-2">
          <input
            autoFocus
            className={`flex-1 px-3 py-2 rounded border border-[#2a2a2a] bg-[#141414] text-white text-sm placeholder:text-[#333] outline-none ring-offset-0 focus:ring-1 ${accentRing} transition-all font-mono`}
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
              setError("");
            }}
            placeholder={`New ${category.toLowerCase()} amenity name...`}
          />
          <button
            type="submit"
            disabled={loading || !newName.trim()}
            className={`px-5 py-2 ${btnBg} disabled:bg-[#1a1a1a] disabled:text-[#333] text-black text-xs font-bold rounded uppercase tracking-widest transition-all`}
          >
            {loading ? "..." : "Add"}
          </button>
        </form>

        {error && (
          <p className="px-4 py-2 text-[10px] text-red-400 border-b border-[#1e1e1e] bg-red-500/5 uppercase tracking-widest">
            ⚠ {error}
          </p>
        )}

        {/* LIST */}
        <div className="max-h-[360px] overflow-y-auto p-4 space-y-1.5">
          {amenities.length === 0 ? (
            <div className="text-center py-10 text-[#333] text-xs uppercase tracking-widest">
              No amenities in this tier yet.
            </div>
          ) : (
            amenities.map((a) => (
              <div
                key={a.id}
                className={`group flex items-center justify-between px-4 py-2.5 rounded border border-[#1e1e1e] bg-[#0f0f0f] hover:border-red-500/20 hover:bg-red-500/5 transition-all`}
              >
                <span className="text-xs text-[#888] font-mono">{a.name}</span>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-[9px] font-bold text-[#333] hover:text-red-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-[#1e1e1e] text-center">
          <button
            onClick={onClose}
            className="text-[10px] font-bold text-[#444] hover:text-white uppercase tracking-widest transition-colors"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
}