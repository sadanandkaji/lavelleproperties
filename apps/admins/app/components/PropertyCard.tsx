"use client";

import React, { useState } from "react";
import PropertyDetailModal from "./Propertydetailmodal";

export interface PropertyImage {
  id: string;
  url: string;
  isPrimary: boolean;
  order: number;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  pricePerSqft?: number | null;
  priceNote?: string | null;
  callForPrice?: boolean;
  bedrooms?: number | null;
  bathrooms?: number | null;
  halfBaths?: number | null;
  totalRooms?: number | null;
  floors?: number | null;
  floorLevel?: number | null;
  areaSqft?: number | null;
  lotSizeSqft?: number | null;
  yearBuilt?: number | null;
  yearRemodeled?: number | null;
  rentPeriods?: string[];
  statuses?: string[];
  parkingOptions?: string[];
  basementOptions?: string[];
  type: string;
  subType: string;
  layoutType: string;
  furnishing: string;
  amenityCategory: "BASIC" | "FULL";
  images: PropertyImage[];
}

interface PropertyCardProps {
  property: Property;
  onDelete: () => void;
}

export const formatLabel = (str: string) => {
  if (!str) return "";
  return str.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export const formatLayout = (layout: string) =>
  layout.replace("BHK", "").replace("_", ".").replace("P", "+") + " BHK";

export default function PropertyCard({ property, onDelete }: PropertyCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const primaryImage =
    property.images?.find((img) => img.isPrimary)?.url ||
    property.images?.[0]?.url ||
    null;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmDelete = confirm(`Delete "${property.title}"?`);
    if (!confirmDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/property?id=${property.id}`, { method: "DELETE" });
      if (res.ok) {
        onDelete();
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.error || "Failed to delete"}`);
      }
    } catch {
      alert("Network error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  const isBasic = property.amenityCategory === "BASIC";

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className={`group flex flex-col bg-[#141414] border border-[#222] rounded-xl overflow-hidden transition-all duration-200 hover:border-[#333] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/50 font-mono cursor-pointer ${
          isDeleting ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        {/* IMAGE */}
        <div className="relative h-[180px] w-full overflow-hidden">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-[#333] text-xs uppercase tracking-widest">
              No Image
            </div>
          )}

          {/* Image count badge */}
          {property.images?.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm border border-[#333] text-[#aaa] px-2 py-1 rounded text-[10px] font-bold">
              📷 {property.images.length}
            </div>
          )}

          {/* Price Badge */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-[#333] text-white px-3 py-1.5 rounded text-sm font-bold">
            {property.callForPrice ? "Call for Price" : `₹${Number(property.price).toLocaleString("en-IN")}`}
          </div>

          {/* Amenity Badge */}
          <div
            className={`absolute top-3 right-3 rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border backdrop-blur-sm ${
              isBasic
                ? "bg-[#1e3a5f]/80 border-[#60a5fa]/30 text-[#60a5fa]"
                : "bg-[#2d1b69]/80 border-[#a78bfa]/30 text-[#a78bfa]"
            }`}
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
            {property.bedrooms != null && (
              <p className="text-xs text-[#555] flex items-center gap-1.5">
                <span className="text-[#444]">🛏</span>
                {property.bedrooms} bed · {property.bathrooms ?? "—"} bath
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-[#555] leading-relaxed line-clamp-2 mt-auto">
            {property.description}
          </p>

          {/* Amenity Indicator */}
          <div
            className={`rounded border px-3 py-2 text-[10px] font-bold uppercase tracking-widest ${
              isBasic
                ? "border-[#60a5fa]/20 bg-[#60a5fa]/5 text-[#60a5fa]"
                : "border-[#a78bfa]/20 bg-[#a78bfa]/5 text-[#a78bfa]"
            }`}
          >
            {isBasic ? "🛡 Basic Amenity Package" : "💎 Full Amenity Package"}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={(e) => { e.stopPropagation(); setShowDetail(true); }}
              className="flex-1 py-2 rounded border border-[#2a2a2a] bg-[#1a1a1a] text-xs font-bold text-[#555] uppercase tracking-widest transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              View Details
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 py-2 rounded border border-[#2a2a2a] bg-[#1a1a1a] text-xs font-bold text-[#555] uppercase tracking-widest transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isDeleting ? "Removing..." : "✕ Delete"}
            </button>
          </div>
        </div>
      </div>

      {showDetail && (
        <PropertyDetailModal
          property={property}
          onClose={() => setShowDetail(false)}
          onDelete={() => { setShowDetail(false); onDelete(); }}
        />
      )}
    </>
  );
}