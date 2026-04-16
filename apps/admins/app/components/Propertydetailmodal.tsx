"use client";

import React, { useState, useEffect } from "react";
import { Property, formatLabel, formatLayout } from "./PropertyCard";
import { formatPrice } from "@/lib/formatPrice";

interface Props {
  property: Property;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function PropertyDetailModal({ property, onClose, onDelete, onEdit }: Props) {
  const [activeImg,   setActiveImg]   = useState(0);
  const [isDeleting,  setIsDeleting]  = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isBasic        = property.amenityCategory === "BASIC";
  const isSoldOut      = property.isSoldOut ?? false;
  const images         = property.images         || [];
  const basicAmenities = property.basicAmenities || [];
  const fullAmenities  = property.fullAmenities  || [];

  const handleDelete = async () => {
    if (!confirm(`Delete "${property.title}"?`)) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/property?id=${property.id}`, { method: "DELETE" });
      if (res.ok) onDelete();
      else { const d = await res.json(); alert(d.error || "Failed to delete"); setIsDeleting(false); }
    } catch { alert("Network error"); setIsDeleting(false); }
  };

  const Stat = ({ label, value }: { label: string; value: any }) => {
    if (value == null || value === "" || value === false) return null;
    return (
      <div className="flex flex-col gap-0.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-[#444]">{label}</span>
        <span className="text-sm font-bold text-white">{value}</span>
      </div>
    );
  };

  const TagList = ({ label, items }: { label: string; items?: string[] }) => {
    if (!items?.length) return null;
    return (
      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-[#444]">{label}</span>
        <div className="flex flex-wrap gap-1.5">
          {items.map((t) => (
            <span key={t} className="text-[10px] font-bold px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] uppercase tracking-wide">
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#141414] border border-[#222] rounded-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-black/80 border border-[#333] text-[#888] text-sm flex items-center justify-center hover:text-white hover:border-[#555] transition"
        >
          ✕
        </button>

        {/* IMAGE GALLERY */}
        {images.length > 0 ? (
          <div className="relative w-full bg-[#0a0a0a]">
            <div className="relative w-full h-[340px] overflow-hidden">
              <img
                src={images[activeImg]?.url}
                alt={property.title}
                className={`w-full h-full object-cover ${isSoldOut ? "grayscale opacity-60" : ""}`}
              />
              {isSoldOut && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="border-2 border-red-500/70 bg-red-500/20 backdrop-blur-sm text-red-400 text-2xl font-bold uppercase tracking-[0.3em] px-8 py-4 rounded rotate-[-6deg]">
                    SOLD OUT
                  </div>
                </div>
              )}
              {!isSoldOut && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="bg-black/80 backdrop-blur-sm border border-[#333] text-white px-4 py-2 rounded-lg text-lg font-bold">
                    {property.callForPrice ? "Call for Price" : `₹${formatPrice(property.price)}`}
                  </div>
                  {property.pricePerSqft && (
                    <div className="bg-black/70 backdrop-blur-sm border border-[#333] text-[#aaa] px-3 py-2 rounded-lg text-sm">
                      ₹{formatPrice(property.pricePerSqft)} /sqft
                    </div>
                  )}
                </div>
              )}
              <div className={`absolute top-4 left-4 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-widest border backdrop-blur-sm
                ${isBasic ? "bg-[#1e3a5f]/80 border-[#60a5fa]/30 text-[#60a5fa]" : "bg-[#2d1b69]/80 border-[#a78bfa]/30 text-[#a78bfa]"}`}
              >
                {isBasic ? "● BASIC TIER" : "◆ FULL TIER"}
              </div>
              {images.length > 1 && (
                <>
                  <div className="absolute top-4 right-14 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {activeImg + 1}/{images.length}
                  </div>
                  <button onClick={() => setActiveImg((p) => (p - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/70 border border-[#333] text-white flex items-center justify-center hover:bg-black/90 transition">‹</button>
                  <button onClick={() => setActiveImg((p) => (p + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/70 border border-[#333] text-white flex items-center justify-center hover:bg-black/90 transition">›</button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto bg-[#0f0f0f] border-t border-[#1a1a1a]">
                {images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImg(idx)}
                    className={`flex-shrink-0 h-14 w-20 rounded overflow-hidden border-2 transition
                      ${activeImg === idx ? "border-emerald-500" : "border-transparent opacity-50 hover:opacity-80"}`}>
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-48 bg-[#0f0f0f] flex items-center justify-center text-[#333] text-xs uppercase tracking-widest">No Images</div>
        )}

        {/* CONTENT */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-[9px] font-bold px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[#60a5fa] uppercase tracking-widest">{property.type}</span>
              <span className="text-[9px] font-bold px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-emerald-400 uppercase tracking-widest">{formatLayout(property.layoutType)}</span>
              <span className="text-[9px] font-bold px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[#f59e0b] uppercase tracking-widest">{formatLabel(property.subType)}</span>
              <span className="text-[9px] font-bold px-2 py-1 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[#a78bfa] uppercase tracking-widest">{formatLabel(property.furnishing)}</span>
              {isSoldOut && <span className="text-[9px] font-bold px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 uppercase tracking-widest">SOLD OUT</span>}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{property.title}</h2>
            <p className="text-sm text-[#666] flex items-center gap-1.5"><span>📍</span> {property.location}</p>
            {property.priceNote && <p className="text-xs text-[#555] mt-1 italic">{property.priceNote}</p>}
          </div>

          {property.description?.trim() && (
            <div className="mb-6 border-b border-[#1e1e1e] pb-6">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-2">Description</p>
              <p className="text-sm text-[#777] leading-relaxed">{property.description}</p>
            </div>
          )}

          <div className="mb-6 border-b border-[#1e1e1e] pb-6">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">Basic Facts</p>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-5">
              <Stat label="Bedrooms"    value={property.bedrooms} />
              <Stat label="Bathrooms"   value={property.bathrooms} />
              <Stat label="Half Baths"  value={property.halfBaths} />
              <Stat label="Total Rooms" value={property.totalRooms} />
              <Stat label="Floors"      value={property.floors} />
              <Stat label="Floor Level" value={property.floorLevel} />
              <Stat label="Area (sqft)" value={property.areaSqft?.toLocaleString("en-IN")} />
              <Stat label="Lot (sqft)"  value={property.lotSizeSqft?.toLocaleString("en-IN")} />
              <Stat label="Year Built"  value={property.yearBuilt} />
              <Stat label="Remodeled"   value={property.yearRemodeled} />
            </div>
          </div>

          {(property.rentPeriods?.length || property.statuses?.length ||
            property.parkingOptions?.length || property.basementOptions?.length) ? (
            <div className="mb-6 border-b border-[#1e1e1e] pb-6">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] mb-4">Details</p>
              <div className="grid grid-cols-2 gap-4">
                <TagList label="Rent Periods" items={property.rentPeriods} />
                <TagList label="Statuses"     items={property.statuses} />
                <TagList label="Parking"      items={property.parkingOptions} />
                <TagList label="Basement"     items={property.basementOptions} />
              </div>
            </div>
          ) : null}

          {/* Basic Amenities */}
          {basicAmenities.length > 0 && (
            <div className="mb-4 border-b border-[#1e1e1e] pb-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#60a5fa] mb-3">
                🛡 Basic Amenities ({basicAmenities.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {basicAmenities.map((a) => (
                  <span key={a.id} className="text-[10px] font-bold px-2 py-1 rounded bg-[#1e3a5f]/30 border border-[#60a5fa]/20 text-[#60a5fa] uppercase tracking-wide">
                    ✓ {a.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full Amenities */}
          {fullAmenities.length > 0 && (
            <div className="mb-6 border-b border-[#1e1e1e] pb-6">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#a78bfa] mb-3">
                💎 Full Amenities ({fullAmenities.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {fullAmenities.map((a) => (
                  <span key={a.id} className="text-[10px] font-bold px-2 py-1 rounded bg-[#2d1b69]/30 border border-[#a78bfa]/20 text-[#a78bfa] uppercase tracking-wide">
                    ✓ {a.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={onEdit}
              className="flex-1 py-2.5 rounded border border-[#2a2a2a] bg-[#1a1a1a] text-xs font-bold text-[#555] uppercase tracking-widest transition-all hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-400">
              ✎ Edit Listing
            </button>
            <button onClick={handleDelete} disabled={isDeleting}
              className="flex-1 py-2.5 rounded border border-[#2a2a2a] bg-[#1a1a1a] text-xs font-bold text-[#555] uppercase tracking-widest transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed">
              {isDeleting ? "Removing..." : "✕ Delete Listing"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}