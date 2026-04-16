"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";

interface PropertyImage { id: string; url: string; isPrimary: boolean; order: number; }
interface Amenity { id: string; name: string; }
interface Property {
  id: string; title: string; location: string; description: string;
  price: number; pricePerSqft?: number | null; callForPrice: boolean;
  isSoldOut: boolean; type: string; subType: string; layoutType: string;
  furnishing: string; amenityCategory: "BASIC" | "FULL";
  bedrooms?: number | null; bathrooms?: number | null; areaSqft?: number | null;
  images: PropertyImage[]; basicAmenities: Amenity[]; fullAmenities: Amenity[];
  createdAt: string;
}

const TYPES      = ["RENT", "LEASE", "SALE"];
const SUBTYPES   = ["FLAT", "STANDALONE_HOUSE", "INDEPENDENT_VILLA", "PENTHOUSE"];
const LAYOUTS    = ["BHK1","BHK2","BHK2_5","BHK3","BHK3_5","BHK4","BHK5","BHK5P"];
const FURNISHING = ["FURNISHED","SEMIFURNISHED","UNFURNISHED"];
const AMENITY    = ["BASIC","FULL"];

const LAYOUT_LABEL: Record<string,string> = {
  BHK1:"1 BHK",BHK2:"2 BHK",BHK2_5:"2.5 BHK",BHK3:"3 BHK",
  BHK3_5:"3.5 BHK",BHK4:"4 BHK",BHK5:"5 BHK",BHK5P:"5 BHK+",
};
const SUBTYPE_LABEL: Record<string,string> = {
  FLAT:"Flat",STANDALONE_HOUSE:"Standalone House",
  INDEPENDENT_VILLA:"Ind. Villa",PENTHOUSE:"Penthouse",
};

const IMG_TRANSFORM = "w_600,h_400,c_fill,q_auto,f_auto";

function cloudinaryUrl(url: string): string {
  if (!url) return "";
  if (url.includes(IMG_TRANSFORM)) return url;
  if (url.includes("res.cloudinary.com") && url.includes("/upload/"))
    return url.replace("/upload/", `/upload/${IMG_TRANSFORM}/`);
  return url;
}
function primaryImage(images: PropertyImage[]): string {
  if (!images?.length) return "";
  return cloudinaryUrl((images.find(i => i.isPrimary) ?? images[0]).url);
}

// ── Chip ───────────────────────────────────────────────────────────────────────
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`flex-shrink-0 px-3 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all
        ${active
          ? "bg-[#d4af37] border-[#d4af37] text-black shadow-[0_0_14px_rgba(212,175,55,0.4)]"
          : "border-[#2a2a2a] text-[#555] hover:border-[#d4af3766] hover:text-[#c5a059] bg-[#111]"}`}>
      {label}
    </button>
  );
}

// ── Mobile Filter Bottom Sheet ─────────────────────────────────────────────────
function MobileFilterSheet({
  open, onClose,
  type, setType, subType, setSubType, layout, setLayout,
  furnish, setFurnish, amenity, setAmenity,
  soldOut, setSoldOut, minPrice, setMinPrice, maxPrice, setMaxPrice,
  activeCount, onClear,
}: {
  open: boolean; onClose: () => void;
  type: string; setType: (v: string) => void;
  subType: string; setSubType: (v: string) => void;
  layout: string; setLayout: (v: string) => void;
  furnish: string; setFurnish: (v: string) => void;
  amenity: string; setAmenity: (v: string) => void;
  soldOut: string; setSoldOut: (v: string) => void;
  minPrice: string; setMinPrice: (v: string) => void;
  maxPrice: string; setMaxPrice: (v: string) => void;
  activeCount: number; onClear: () => void;
}) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const FilterRow = ({
    label, items, val, set, labelMap,
  }: {
    label: string; items: string[]; val: string;
    set: (v: string) => void; labelMap?: Record<string, string>;
  }) => (
    <div className="mb-5">
      <p className="text-[10px] font-black uppercase tracking-[3px] text-[#555] mb-2.5">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {items.map(t => (
          <Chip key={t} label={labelMap?.[t] ?? t} active={val === t}
            onClick={() => set(val === t ? "" : t)} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-[301] bg-[#0f0f0f] border-t border-[#222] rounded-t-[28px] animate-[sheetUp_0.3s_cubic-bezier(0.32,0.72,0,1)] max-h-[88vh] flex flex-col">

        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-0 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#333]" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a] flex-shrink-0">
          <div>
            <h3 className="text-base font-black text-white tracking-tight">Filters</h3>
            {activeCount > 0 && (
              <p className="text-[10px] text-[#c5a059] font-bold mt-0.5">{activeCount} active</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button onClick={onClear}
                className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-300 transition-all">
                Clear All
              </button>
            )}
            <button onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#555] flex items-center justify-center hover:text-white transition-all text-sm">
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">

          <FilterRow label="Property Type" items={TYPES} val={type} set={setType} />
          <FilterRow label="Sub Type"      items={SUBTYPES} val={subType} set={setSubType} labelMap={SUBTYPE_LABEL} />
          <FilterRow label="Layout"        items={LAYOUTS}  val={layout}  set={setLayout}  labelMap={LAYOUT_LABEL}  />
          <FilterRow label="Furnishing"    items={FURNISHING} val={furnish} set={setFurnish} />
          <FilterRow label="Amenity Tier"  items={AMENITY}  val={amenity} set={setAmenity}  />

          {/* Availability */}
          <div className="mb-5">
            <p className="text-[10px] font-black uppercase tracking-[3px] text-[#555] mb-2.5">Availability</p>
            <div className="flex gap-2">
              <Chip label="Available" active={soldOut === "false"} onClick={() => setSoldOut(soldOut === "false" ? "" : "false")} />
              <Chip label="Sold Out"  active={soldOut === "true"}  onClick={() => setSoldOut(soldOut === "true"  ? "" : "true")} />
            </div>
          </div>

          {/* Price range */}
          <div className="mb-5">
            <p className="text-[10px] font-black uppercase tracking-[3px] text-[#555] mb-2.5">Price Range (₹)</p>
            <div className="flex items-center gap-3">
              <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)}
                placeholder="Min price"
                className="flex-1 px-4 py-3 rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#d4af3766] transition-all" />
              <span className="text-[#333] font-bold">—</span>
              <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
                placeholder="Max price"
                className="flex-1 px-4 py-3 rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d] text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#d4af3766] transition-all" />
            </div>
          </div>

          {/* Extra bottom padding so last item clears the apply button */}
          <div className="h-24" />
        </div>

        {/* Sticky apply button */}
        <div className="flex-shrink-0 px-5 pb-6 pt-3 border-t border-[#1a1a1a] bg-[#0f0f0f]">
          <button onClick={onClose}
            className="w-full py-4 rounded-2xl bg-[#d4af37] text-black font-black text-sm uppercase tracking-widest hover:bg-[#c5a059] transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            {activeCount > 0 ? `Show Results · ${activeCount} filter${activeCount > 1 ? "s" : ""}` : "Show Results"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Mobile Card ────────────────────────────────────────────────────────────────
function MobilePropertyCard({ prop, onClick }: { prop: Property; onClick: () => void }) {
  const img = primaryImage(prop.images);
  return (
    <div onClick={onClick}
      className={`flex bg-[#111] border rounded-[20px] overflow-hidden transition-all duration-200 active:scale-[0.98] cursor-pointer
        ${prop.isSoldOut ? "opacity-50 grayscale border-[#1e1e1e]" : "border-[#1e1e1e] active:border-[#d4af3744]"}`}>

      <div className={`w-1 flex-shrink-0 ${prop.isSoldOut ? "bg-[#333]" : "bg-gradient-to-b from-[#d4af37] to-[#c5a059]"}`} />

      {/* Image */}
      <div className="relative w-[110px] flex-shrink-0 bg-[#0a0a0a]">
        {img ? (
          <img src={img} alt={prop.title}
            className={`w-full h-full object-cover ${prop.isSoldOut ? "opacity-40" : "opacity-90"}`} />
        ) : (
          <div className="w-full h-full flex items-center justify-center min-h-[130px]">
            <span className="text-[8px] text-[#333] uppercase font-bold text-center px-2">No Image</span>
          </div>
        )}
        <div className="absolute top-1.5 left-1.5">
          <span className="bg-[#d4af37] text-black text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full">
            {prop.type}
          </span>
        </div>
        {prop.isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[7px] font-black uppercase text-red-400 border border-red-500/40 px-1.5 py-0.5 rounded-full bg-black/60">
              Sold Out
            </span>
          </div>
        )}
        {prop.images?.length > 1 && (
          <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-[#aaa] text-[7px] font-bold px-1.5 py-0.5 rounded-full">
            📷 {prop.images.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-3 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-[13px] font-black text-white leading-tight line-clamp-1 flex-1">{prop.title}</h3>
          <span className={`text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border flex-shrink-0
            ${prop.amenityCategory === "BASIC"
              ? "border-[#60a5fa]/30 text-[#60a5fa] bg-[#0d1f35]/60"
              : "border-[#a78bfa]/30 text-[#a78bfa] bg-[#16093a]/60"}`}>
            {prop.amenityCategory === "BASIC" ? "Basic" : "Full"}
          </span>
        </div>

        <p className="text-[10px] text-[#c5a059] font-semibold opacity-80 line-clamp-1 mb-1.5">📍 {prop.location}</p>

        <div className="flex flex-wrap gap-1 mb-1.5">
          <span className="text-[7px] bg-white/5 border border-white/8 text-[#888] px-1.5 py-0.5 rounded-full font-bold uppercase">
            {LAYOUT_LABEL[prop.layoutType] ?? prop.layoutType}
          </span>
          <span className="text-[7px] bg-white/5 border border-white/8 text-[#c5a059]/70 px-1.5 py-0.5 rounded-full font-bold uppercase">
            {SUBTYPE_LABEL[prop.subType] ?? prop.subType}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[9px] text-[#444] mb-1.5">
          {prop.bedrooms  != null && <span>🛏 {prop.bedrooms}</span>}
          {prop.bathrooms != null && <span>🚿 {prop.bathrooms}</span>}
          {prop.areaSqft  != null && <span>📐 {prop.areaSqft.toLocaleString("en-IN")}</span>}
        </div>

        <div className="flex items-end justify-between mt-auto pt-2 border-t border-white/5">
          <div>
            <span className="text-base font-black text-[#d4af37] leading-none">
              {prop.callForPrice ? "Call" : `₹${formatPrice(prop.price)}`}
            </span>
            {prop.pricePerSqft && (
              <span className="text-[8px] text-[#333] block">₹{formatPrice(prop.pricePerSqft)}/sqft</span>
            )}
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Desktop Card ───────────────────────────────────────────────────────────────
function DesktopPropertyCard({ prop, onClick }: { prop: Property; onClick: () => void }) {
  const img = primaryImage(prop.images);
  return (
    <div onClick={onClick}
      className={`group flex flex-col bg-[#111] border rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.12)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer
        ${prop.isSoldOut ? "opacity-50 grayscale border-[#1e1e1e]" : "border-[#1e1e1e] hover:border-[#d4af3733]"}`}>

      <div className="relative h-[180px] w-full overflow-hidden bg-[#0a0a0a]">
        {img ? (
          <img src={img} alt={prop.title} loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-[4px] text-[#333]">No Image</span>
          </div>
        )}

        {prop.isSoldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-red-400 text-[10px] font-black uppercase tracking-[4px] border border-red-500/50 px-3 py-1.5 rounded-full">Sold Out</span>
          </div>
        )}
        <div className="absolute top-2.5 left-2.5">
          <span className="bg-[#d4af37] text-black text-[8px] font-black uppercase tracking-[2px] px-2.5 py-1 rounded-full">{prop.type}</span>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border backdrop-blur-sm
            ${prop.amenityCategory === "BASIC" ? "bg-[#0d1f35]/90 border-[#60a5fa]/30 text-[#60a5fa]" : "bg-[#16093a]/90 border-[#a78bfa]/30 text-[#a78bfa]"}`}>
            {prop.amenityCategory === "BASIC" ? "● Basic" : "◆ Full"}
          </span>
        </div>
        {prop.images?.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-[#aaa] text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/10">
            📷 {prop.images.length}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="flex flex-wrap gap-1 mb-2.5">
          <span className="text-[8px] bg-white/5 border border-white/8 text-[#888] px-2 py-0.5 rounded-full font-bold uppercase">{LAYOUT_LABEL[prop.layoutType] ?? prop.layoutType}</span>
          <span className="text-[8px] bg-white/5 border border-white/8 text-[#c5a059] px-2 py-0.5 rounded-full font-bold uppercase">{SUBTYPE_LABEL[prop.subType] ?? prop.subType}</span>
          <span className="text-[8px] bg-white/5 border border-white/8 text-[#555] px-2 py-0.5 rounded-full font-bold uppercase">{prop.furnishing}</span>
        </div>
        <h3 className="text-sm font-black text-white line-clamp-1 leading-tight">{prop.title}</h3>
        <p className="text-[11px] text-[#c5a059] font-semibold mt-0.5 line-clamp-1 opacity-80">📍 {prop.location}</p>
        <div className="mt-1.5 flex items-center gap-2.5 text-[10px] text-[#555]">
          {prop.bedrooms  != null && <span>🛏 {prop.bedrooms}</span>}
          {prop.bathrooms != null && <span>🚿 {prop.bathrooms}</span>}
          {prop.areaSqft  != null && <span>📐 {prop.areaSqft.toLocaleString("en-IN")} sqft</span>}
        </div>
        {prop.description && (
          <p className="mt-2 text-[10px] text-[#444] line-clamp-2 leading-relaxed flex-grow italic">{prop.description}</p>
        )}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-end justify-between">
          <div>
            <span className="text-[8px] text-[#333] uppercase font-bold block mb-0.5">Price</span>
            <span className="text-lg font-black text-[#d4af37] leading-none">
              {prop.callForPrice ? "Call" : `₹${formatPrice(prop.price)}`}
            </span>
            {prop.pricePerSqft && <span className="text-[9px] text-[#444] block mt-0.5">₹{formatPrice(prop.pricePerSqft)}/sqft</span>}
          </div>
          <div className="text-right space-y-0.5">
            {prop.basicAmenities?.length > 0 && <p className="text-[9px] text-[#60a5fa]/70 font-bold">{prop.basicAmenities.length} basic</p>}
            {prop.fullAmenities?.length  > 0 && <p className="text-[9px] text-[#a78bfa]/70 font-bold">{prop.fullAmenities.length} full</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Detail Modal ───────────────────────────────────────────────────────────────
function PropertyDetailModal({ prop, onClose }: { prop: Property; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  const images = prop.images ?? [];
  const basic  = prop.basicAmenities ?? [];
  const full   = prop.fullAmenities  ?? [];

  const StatRow = ({ label, value }: { label: string; value: any }) => {
    if (value == null || value === "") return null;
    return (
      <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
        <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#444]">{label}</span>
        <span className="text-[12px] font-bold text-[#e8dfc8]">{value}</span>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-start sm:justify-center bg-black/80 backdrop-blur-sm sm:p-4 sm:pt-6 sm:overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-2xl bg-[#111] border-t sm:border border-[#1e1e1e] sm:rounded-[28px] overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.8)] sm:mb-6 max-h-[92vh] overflow-y-auto animate-[sheetUp_0.35s_cubic-bezier(0.32,0.72,0,1)] sm:animate-[slideUp_0.3s_ease]"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[#333]" />
        </div>

        {/* Image */}
        <div className="relative h-[220px] sm:h-[280px] bg-[#0a0a0a]">
          {images.length > 0 ? (
            <img src={cloudinaryUrl(images[activeImg]?.url ?? "")} alt={prop.title}
              className={`w-full h-full object-cover ${prop.isSoldOut ? "grayscale opacity-40" : "opacity-90"}`} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[12px] font-bold uppercase tracking-[6px] text-[#333]">No Images</span>
            </div>
          )}
          {prop.isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-2 border-red-500/60 bg-red-500/15 backdrop-blur-sm text-red-400 text-lg font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded rotate-[-6deg]">SOLD OUT</div>
            </div>
          )}
          {images.length > 1 && (
            <>
              <button onClick={() => setActiveImg(p => (p - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 border border-white/10 text-white flex items-center justify-center">‹</button>
              <button onClick={() => setActiveImg(p => (p + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 border border-white/10 text-white flex items-center justify-center">›</button>
              <div className="absolute top-3 right-3 bg-black/70 border border-white/10 text-[#888] text-[10px] font-bold px-2.5 py-1 rounded-full">
                {activeImg + 1} / {images.length}
              </div>
            </>
          )}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {images.slice(0, 5).map((img, idx) => (
                <button key={idx} onClick={() => setActiveImg(idx)}
                  className={`w-7 h-7 rounded-lg overflow-hidden border-2 transition-all ${activeImg === idx ? "border-[#d4af37]" : "border-transparent opacity-40"}`}>
                  <img src={cloudinaryUrl(img.url)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <button onClick={onClose}
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/70 border border-white/10 text-[#888] flex items-center justify-center text-sm hover:text-white transition">✕</button>
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            <span className="bg-[#d4af37] text-black text-[9px] font-black uppercase tracking-[2px] px-2.5 py-1 rounded-full">{prop.type}</span>
            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border backdrop-blur-sm
              ${prop.amenityCategory === "BASIC" ? "bg-[#0d1f35]/90 border-[#60a5fa]/30 text-[#60a5fa]" : "bg-[#16093a]/90 border-[#a78bfa]/30 text-[#a78bfa]"}`}>
              {prop.amenityCategory === "BASIC" ? "Basic" : "Full"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5">
          <div>
            {prop.isSoldOut && (
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[3px] text-red-400">Sold Out</span>
              </div>
            )}
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{prop.title}</h2>
            <p className="text-sm text-[#c5a059] font-semibold mt-1 opacity-80">📍 {prop.location}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] text-[#333] font-mono">ID:</span>
              <code className="text-[9px] text-[#444] font-mono bg-white/5 px-2 py-0.5 rounded select-all break-all">{prop.id}</code>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[prop.type, SUBTYPE_LABEL[prop.subType] ?? prop.subType, LAYOUT_LABEL[prop.layoutType] ?? prop.layoutType, prop.furnishing].map(t => (
              <span key={t} className="text-[9px] font-bold px-2.5 py-1.5 rounded-full border border-[#d4af3733] text-[#c5a059] bg-[#d4af3708] uppercase tracking-wide">{t}</span>
            ))}
          </div>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af3733] to-transparent" />

          <div className="flex items-center justify-between bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl px-4 py-3">
            <div>
              <p className="text-[9px] text-[#444] uppercase font-bold tracking-[2px] mb-0.5">Total Price</p>
              <p className="text-2xl font-black text-[#d4af37] leading-none">
                {prop.callForPrice ? "Call for Price" : `₹${formatPrice(prop.price)}`}
              </p>
              {prop.pricePerSqft && <p className="text-[10px] text-[#444] mt-0.5">₹{formatPrice(prop.pricePerSqft)}/sqft</p>}
            </div>
            {(basic.length > 0 || full.length > 0) && (
              <div className="text-right">
                {basic.length > 0 && <p className="text-[10px] text-[#60a5fa]/70 font-bold">{basic.length} basic</p>}
                {full.length  > 0 && <p className="text-[10px] text-[#a78bfa]/70 font-bold">{full.length} full</p>}
              </div>
            )}
          </div>

          {prop.description?.trim() && <p className="text-sm text-[#555] leading-relaxed">{prop.description}</p>}

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[4px] text-[#c5a059] mb-3">Property Details</p>
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl px-4 divide-y divide-white/5">
              <StatRow label="Bedrooms"   value={prop.bedrooms}  />
              <StatRow label="Bathrooms"  value={prop.bathrooms} />
              <StatRow label="Area"       value={prop.areaSqft ? `${prop.areaSqft.toLocaleString("en-IN")} sqft` : null} />
              <StatRow label="Furnishing" value={prop.furnishing} />
              <StatRow label="Layout"     value={LAYOUT_LABEL[prop.layoutType] ?? prop.layoutType} />
              <StatRow label="Sub Type"   value={SUBTYPE_LABEL[prop.subType]   ?? prop.subType}    />
              <StatRow label="Listed"     value={new Date(prop.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })} />
            </div>
          </div>

          {basic.length > 0 && (
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[4px] text-[#60a5fa] mb-3">🛡 Basic Amenities</p>
              <div className="flex flex-wrap gap-1.5">
                {basic.map(a => (
                  <span key={a.id} className="text-[9px] font-bold px-2.5 py-1.5 rounded-full border border-[#60a5fa]/20 text-[#60a5fa] bg-[#60a5fa]/5 uppercase">✓ {a.name}</span>
                ))}
              </div>
            </div>
          )}

          {full.length > 0 && (
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[4px] text-[#a78bfa] mb-3">💎 Full Amenities</p>
              <div className="flex flex-wrap gap-1.5">
                {full.map(a => (
                  <span key={a.id} className="text-[9px] font-bold px-2.5 py-1.5 rounded-full border border-[#a78bfa]/20 text-[#a78bfa] bg-[#a78bfa]/5 uppercase">✓ {a.name}</span>
                ))}
              </div>
            </div>
          )}

          <button onClick={onClose}
            className="w-full py-3.5 rounded-2xl border border-[#2a2a2a] text-[#555] text-[11px] font-black uppercase tracking-widest hover:border-[#d4af3733] hover:text-[#c5a059] transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Desktop Filter Panel ───────────────────────────────────────────────────────
function DesktopFilterPanel({
  show, type, setType, subType, setSubType, layout, setLayout,
  furnish, setFurnish, amenity, setAmenity, soldOut, setSoldOut,
  minPrice, setMinPrice, maxPrice, setMaxPrice,
  activeCount, onClear,
}: {
  show: boolean;
  type: string; setType: (v: string) => void;
  subType: string; setSubType: (v: string) => void;
  layout: string; setLayout: (v: string) => void;
  furnish: string; setFurnish: (v: string) => void;
  amenity: string; setAmenity: (v: string) => void;
  soldOut: string; setSoldOut: (v: string) => void;
  minPrice: string; setMinPrice: (v: string) => void;
  maxPrice: string; setMaxPrice: (v: string) => void;
  activeCount: number; onClear: () => void;
}) {
  if (!show) return null;
  return (
    <div className="hidden sm:block border-t border-[#1a1a1a] animate-[fadeDown_0.2s_ease]">
      <div className="max-w-[1400px] mx-auto px-6 py-4 space-y-3">
        {[
          { label: "Type",       items: TYPES,      val: type,    set: setType     },
          { label: "Sub Type",   items: SUBTYPES,   val: subType, set: setSubType, labelMap: SUBTYPE_LABEL },
          { label: "Layout",     items: LAYOUTS,    val: layout,  set: setLayout,  labelMap: LAYOUT_LABEL  },
          { label: "Furnishing", items: FURNISHING, val: furnish, set: setFurnish  },
          { label: "Amenity",    items: AMENITY,    val: amenity, set: setAmenity  },
        ].map(({ label, items, val, set, labelMap }) => (
          <div key={label} className="flex items-center gap-4">
            <p className="text-[9px] font-black uppercase tracking-[3px] text-[#333] w-20 flex-shrink-0">{label}</p>
            <div className="flex gap-2 flex-wrap">
              {items.map(t => (
                <Chip key={t} label={(labelMap as any)?.[t] ?? t} active={val === t}
                  onClick={() => set(val === t ? "" : t)} />
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4">
          <p className="text-[9px] font-black uppercase tracking-[3px] text-[#333] w-20 flex-shrink-0">Avail.</p>
          <div className="flex gap-2">
            <Chip label="Available" active={soldOut === "false"} onClick={() => setSoldOut(soldOut === "false" ? "" : "false")} />
            <Chip label="Sold Out"  active={soldOut === "true"}  onClick={() => setSoldOut(soldOut === "true"  ? "" : "true")} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-[9px] font-black uppercase tracking-[3px] text-[#333] w-20 flex-shrink-0">Price</p>
          <div className="flex items-center gap-2">
            <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min"
              className="w-32 px-3 py-2 rounded-xl border border-[#1e1e1e] bg-[#0d0d0d] text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#d4af3766] transition-all" />
            <span className="text-[#333] font-bold">—</span>
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max"
              className="w-32 px-3 py-2 rounded-xl border border-[#1e1e1e] bg-[#0d0d0d] text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#d4af3766] transition-all" />
            {activeCount > 0 && (
              <button onClick={onClear}
                className="ml-2 text-[10px] font-bold text-red-500/60 uppercase tracking-widest hover:text-red-400 transition-all whitespace-nowrap">
                ✕ Clear all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function PropertiesListPage() {
  const router = useRouter();

  const [properties,   setProperties]   = useState<Property[]>([]);
  const [total,        setTotal]        = useState(0);
  const [pages,        setPages]        = useState(1);
  const [currentPage,  setCurrentPage]  = useState(1);
  const [loading,      setLoading]      = useState(true);
  const [selectedProp, setSelectedProp] = useState<Property | null>(null);

  // Desktop inline filter visibility
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  // Mobile filter sheet
  const [showMobileSheet, setShowMobileSheet] = useState(false);

  const [query,    setQuery]    = useState("");
  const [type,     setType]     = useState("");
  const [subType,  setSubType]  = useState("");
  const [layout,   setLayout]   = useState("");
  const [furnish,  setFurnish]  = useState("");
  const [amenity,  setAmenity]  = useState("");
  const [soldOut,  setSoldOut]  = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const searchRef   = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeFiltersCount = [type, subType, layout, furnish, amenity, soldOut, minPrice, maxPrice].filter(Boolean).length;

  const fetchProperties = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query)    params.set("query",      query);
      if (type)     params.set("type",       type);
      if (subType)  params.set("subType",    subType);
      if (layout)   params.set("layout",     layout);
      if (furnish)  params.set("furnishing", furnish);
      if (amenity)  params.set("amenity",    amenity);
      if (soldOut)  params.set("soldOut",    soldOut);
      if (minPrice) params.set("minPrice",   minPrice);
      if (maxPrice) params.set("maxPrice",   maxPrice);
      params.set("page", String(page)); params.set("limit", "18");

      const res  = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data.properties ?? []);
      setTotal(data.total ?? 0);
      setPages(data.pages ?? 1);
      setCurrentPage(page);
    } catch (err) {
      console.error(err); setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [query, type, subType, layout, furnish, amenity, soldOut, minPrice, maxPrice]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchProperties(1), 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [fetchProperties]);

  const clearAllFilters = () => {
    setQuery(""); setType(""); setSubType(""); setLayout("");
    setFurnish(""); setAmenity(""); setSoldOut("");
    setMinPrice(""); setMaxPrice(""); setCurrentPage(1);
    searchRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ── Sticky Top Bar ── */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/97 backdrop-blur-md border-b border-[#1a1a1a]">

        {/* Main bar */}
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-3">

          {/* Title + filter toggle row */}
          <div className="flex items-center gap-2.5 mb-3">
            <button onClick={() => router.back()}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:border-[#d4af3744] hover:text-[#c5a059] transition-all flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse flex-shrink-0" />
                <h1 className="text-base sm:text-lg font-black text-white tracking-tight leading-none truncate">All Properties</h1>
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#444] font-bold uppercase tracking-[3px] mt-0.5 ml-3.5">
                {loading ? "Loading…" : `${total.toLocaleString("en-IN")} listing${total !== 1 ? "s" : ""}`}
              </p>
            </div>

            {/* Mobile filter button → opens bottom sheet */}
            <button
              onClick={() => setShowMobileSheet(true)}
              className={`sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all flex-shrink-0
                ${activeFiltersCount > 0
                  ? "bg-[#d4af37] border-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  : "border-[#2a2a2a] text-[#555]"}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="11" y1="18" x2="13" y2="18" />
              </svg>
              Filter
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-black text-white text-[8px] font-black flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Desktop filter button → toggles inline panel */}
            <button
              onClick={() => setShowDesktopFilters(p => !p)}
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border text-[11px] font-black uppercase tracking-widest transition-all flex-shrink-0
                ${showDesktopFilters || activeFiltersCount > 0
                  ? "bg-[#d4af37] border-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  : "border-[#2a2a2a] text-[#555] hover:border-[#d4af3744] hover:text-[#c5a059]"}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="11" y1="18" x2="13" y2="18" />
              </svg>
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-black text-white text-[8px] font-black flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input ref={searchRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search title, location, ID…"
              className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-2xl border border-[#1e1e1e] bg-[#111] text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#d4af3766] transition-all" />
            {query && (
              <button onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#1e1e1e] text-[#555] text-xs flex items-center justify-center hover:text-[#888] transition-all">✕</button>
            )}
          </div>
        </div>

        {/* Desktop inline filter panel — lives INSIDE sticky bar so it sticks too */}
        <DesktopFilterPanel
          show={showDesktopFilters}
          type={type} setType={setType}
          subType={subType} setSubType={setSubType}
          layout={layout} setLayout={setLayout}
          furnish={furnish} setFurnish={setFurnish}
          amenity={amenity} setAmenity={setAmenity}
          soldOut={soldOut} setSoldOut={setSoldOut}
          minPrice={minPrice} setMinPrice={setMinPrice}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          activeCount={activeFiltersCount} onClear={clearAllFilters}
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {loading ? (
          <>
            <div className="sm:hidden space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[130px] rounded-[20px] bg-[#111] border border-[#1a1a1a] overflow-hidden relative">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>
              ))}
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-[380px] rounded-[24px] bg-[#111] border border-[#1a1a1a] overflow-hidden relative">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>
              ))}
            </div>
          </>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-full bg-[#111] border border-[#1e1e1e] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <p className="text-base font-black text-[#333]">No properties found</p>
            <p className="text-sm text-[#2a2a2a]">Try adjusting your search or filters</p>
            {activeFiltersCount > 0 && (
              <button onClick={clearAllFilters}
                className="px-6 py-2.5 rounded-full bg-[#d4af37] text-black text-sm font-black uppercase tracking-widest hover:bg-[#c5a059] transition-all">
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="sm:hidden space-y-2.5">
              {properties.map(prop => (
                <MobilePropertyCard key={prop.id} prop={prop} onClick={() => setSelectedProp(prop)} />
              ))}
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {properties.map(prop => (
                <DesktopPropertyCard key={prop.id} prop={prop} onClick={() => setSelectedProp(prop)} />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {!loading && pages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-8 sm:mt-12">
            <button onClick={() => fetchProperties(currentPage - 1)} disabled={currentPage === 1}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#555] disabled:opacity-20 hover:border-[#d4af3744] hover:text-[#c5a059] transition-all">‹</button>

            {Array.from({ length: pages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === pages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…");
                acc.push(p); return acc;
              }, [])
              .map((p, idx) =>
                p === "…" ? (
                  <span key={`e-${idx}`} className="text-[#333] px-0.5 text-sm">…</span>
                ) : (
                  <button key={p} onClick={() => fetchProperties(p as number)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-[11px] font-black transition-all
                      ${currentPage === p
                        ? "bg-[#d4af37] text-black shadow-[0_0_16px_rgba(212,175,55,0.3)]"
                        : "border border-[#2a2a2a] text-[#555] hover:border-[#d4af3744] hover:text-[#c5a059]"}`}>
                    {p}
                  </button>
                )
              )}

            <button onClick={() => fetchProperties(currentPage + 1)} disabled={currentPage === pages}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#555] disabled:opacity-20 hover:border-[#d4af3744] hover:text-[#c5a059] transition-all">›</button>
          </div>
        )}
      </div>

      {/* Mobile filter bottom sheet */}
      <MobileFilterSheet
        open={showMobileSheet} onClose={() => setShowMobileSheet(false)}
        type={type} setType={setType}
        subType={subType} setSubType={setSubType}
        layout={layout} setLayout={setLayout}
        furnish={furnish} setFurnish={setFurnish}
        amenity={amenity} setAmenity={setAmenity}
        soldOut={soldOut} setSoldOut={setSoldOut}
        minPrice={minPrice} setMinPrice={setMinPrice}
        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
        activeCount={activeFiltersCount} onClear={clearAllFilters}
      />

      {selectedProp && (
        <PropertyDetailModal prop={selectedProp} onClose={() => setSelectedProp(null)} />
      )}

      <style jsx global>{`
        @keyframes shimmer  { 100% { transform: translateX(200%); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes sheetUp  { from { opacity:0; transform:translateY(100%); } to { opacity:1; transform:translateY(0); } }
        body { background-color: #0a0a0a; }
      `}</style>
    </div>
  );
}