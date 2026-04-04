"use client";

import React, { useState } from "react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  description: string;
  type: string;
  subType: string;
  layoutType: string;
  furnishing: string;
  amenityCategory: "BASIC" | "FULL"; // ← from schema, not a relation
}

interface PropertyCardProps {
  property: Property;
  onDelete: () => void;
}

const formatLabel = (str: string) => {
  if (!str) return "";
  return str.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const formatLayout = (layout: string) => {
  return layout
    .replace("BHK", "")
    .replace("_", ".")
    .replace("P", "+") + " BHK";
};

export default function PropertyCard({ property, onDelete }: PropertyCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm(`Delete "${property.title}"?`);
    if (!confirmDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/property?id=${property.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onDelete();
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.error || "Failed to delete"}`);
      }
    } catch (err) {
      alert("Network error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  const isBasic = property.amenityCategory === "BASIC";

  return (
    <div
      className={`group flex flex-col bg-[#141414] border border-[#222] rounded-xl overflow-hidden transition-all duration-200 hover:border-[#333] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/50 font-mono ${
        isDeleting ? "opacity-40 pointer-events-none" : ""
      }`}
    >
      {/* IMAGE */}
      <div className="relative h-[180px] w-full overflow-hidden">
        <img
          src={property.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-[#333] text-white px-3 py-1.5 rounded text-sm font-bold">
          ₹{Number(property.price).toLocaleString("en-IN")}
        </div>
        {/* Amenity Tier Badge */}
        <div
          className={`absolute top-3 right-3 rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border ${
            isBasic
              ? "bg-[#1e3a5f]/80 border-[#60a5fa]/30 text-[#60a5fa]"
              : "bg-[#2d1b69]/80 border-[#a78bfa]/30 text-[#a78bfa]"
          } backdrop-blur-sm`}
        >
          {isBasic ? "● BASIC" : "◆ FULL"}
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 flex flex-col flex-grow gap-3">
        {/* Tags Row */}
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[9px] font-bold px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[#60a5fa] uppercase tracking-widest">
            {property.type}
          </span>
          <span className="text-[9px] font-bold px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-emerald-400 uppercase tracking-widest">
            {formatLayout(property.layoutType)}
          </span>
          <span className="text-[9px] font-bold px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[#f59e0b] uppercase tracking-widest">
            {formatLabel(property.subType)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white leading-snug line-clamp-1">
          {property.title}
        </h3>

        {/* Meta */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-[#666] flex items-center gap-1.5">
            <span className="text-[#444]">📍</span>
            {property.location}
          </p>
          <p className="text-xs text-[#555] flex items-center gap-1.5">
            <span className="text-[#444]">🛋</span>
            {formatLabel(property.furnishing)}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-[#555] leading-relaxed line-clamp-2 mt-auto">
          {property.description}
        </p>

        {/* Amenity Tier Indicator */}
        <div
          className={`rounded border px-3 py-2 text-[10px] font-bold uppercase tracking-widest ${
            isBasic
              ? "border-[#60a5fa]/20 bg-[#60a5fa]/5 text-[#60a5fa]"
              : "border-[#a78bfa]/20 bg-[#a78bfa]/5 text-[#a78bfa]"
          }`}
        >
          {isBasic ? "🛡 Basic Amenity Package" : "💎 Full Amenity Package"}
        </div>

        {/* Delete */}
        <button
          className="mt-1 flex items-center justify-center gap-2 w-full py-2 rounded border border-[#2a2a2a] bg-[#1a1a1a] text-xs font-bold text-[#555] uppercase tracking-widest transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Removing...
            </span>
          ) : (
            "✕ Delete Listing"
          )}
        </button>
      </div>
    </div>
  );
}