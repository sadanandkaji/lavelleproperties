"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface PropertyImage {
  id: string;
  url: string;
  isPrimary: boolean;
  order: number;
}

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  pricePerSqft?: number | null;
  callForPrice?: boolean;
  type: string;
  subType: string;
  layoutType: string;
  furnishing: string;
  amenityCategory: "BASIC" | "FULL";
  description: string;
  bedrooms?: number | null;
  isSoldOut?: boolean; // ✅ ADD THIS
  bathrooms?: number | null;
  areaSqft?: number | null;
  statuses?: string[];
  images: PropertyImage[];
  createdAt: string;
}

const TRANSFORM = "w_600,h_400,c_fill,q_auto,f_auto";

function getCloudinaryUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.includes(TRANSFORM)) return url;
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", `/upload/${TRANSFORM}/`);
  }
  return url;
}

function getPrimaryImage(images: PropertyImage[]): string {
  if (!images?.length) return "";
  const primary = images.find((i) => i.isPrimary) ?? images[0];
  return getCloudinaryUrl(primary.url);
}

function PropImage({ images, alt }: { images: PropertyImage[]; alt: string }) {
  const [imgSrc, setImgSrc] = useState(() => getPrimaryImage(images));
  const [error, setError] = useState(false);

  useEffect(() => {
    const src = getPrimaryImage(images);
    if (!src) setError(true);
    else { setImgSrc(src); setError(false); }
  }, [images]);

  if (error || !imgSrc) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#c5a05922] to-[#c5a05944]">
        <span className="text-[10px] font-light uppercase tracking-[4px] text-[#c5a059]">
          Luxury Living
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      onError={() => setError(true)}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-[35px] bg-[#c5a05911] border border-[#d4af3722]">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

function PropertyList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const type = searchParams.get("type");
  const subtype = searchParams.get("subtype");
  const layouttype = searchParams.get("layouttype");
  const furnishing = searchParams.get("furnishing");
  const amenities = searchParams.get("amenities");

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (type) query.set("type", type);
        if (subtype) query.set("subtype", subtype);
        if (layouttype) query.set("layouttype", layouttype);
        if (furnishing) query.set("furnishing", furnishing);
        if (amenities) query.set("amenities", amenities);

        const res = await fetch(`/api/property?${query.toString()}`);
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredData();
  }, [type, subtype, layouttype, furnishing, amenities]);

  if (loading) {
    return (
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 p-10 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-[#c5a059] space-y-6">
        <p className="text-xl font-light tracking-[5px] uppercase text-center">
          No matching inventory found
        </p>
        <div className="h-[1px] w-24 bg-[#c5a059]" />
        <button
          onClick={() => router.push("/amenities")}
          className="text-xs font-bold uppercase tracking-widest border border-[#c5a059] px-8 py-3 hover:bg-[#c5a059] hover:text-black transition-all"
        >
          Adjust Amenities
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 p-10 sm:grid-cols-2 lg:grid-cols-3 max-md:p-5">
      {properties.map((prop) => {
        const imageCount = prop.images?.length ?? 0;
        return (
          <div
  key={prop.id}
  onClick={() => {
    if (!prop.isSoldOut) {
      router.push(`/property/${prop.id}`);
    }
  }}
  className={`group relative h-[500px] w-full overflow-hidden rounded-[35px] border-[1px] 
  border-[#d4af3733] bg-[#1a1a1a] shadow-[0_15px_35px_rgba(0,0,0,0.2)] 
  transition-all duration-500 flex flex-col
  ${
    prop.isSoldOut
      ? "cursor-not-allowed opacity-60 grayscale"
      : "cursor-pointer hover:shadow-[0_25px_60px_rgba(139,109,29,0.3)] hover:-translate-y-2"
  }`}
>
            {/* Image */}
            <div className="relative h-[260px] w-full flex-shrink-0 overflow-hidden">
              {prop.isSoldOut && (
  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
    <span className="text-white text-sm font-black tracking-[4px] uppercase border border-white px-4 py-2">
      Sold Out
    </span>
  </div>
)}
              <PropImage images={prop.images ?? []} alt={prop.title} />

              {/* Image count pill */}
              {imageCount > 1 && (
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1 text-[10px] font-bold text-white">
                  📷 {imageCount}
                </div>
              )}

              {/* Type badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-[#d4af37] text-black text-[9px] font-black uppercase tracking-[2px] px-3 py-1.5 rounded-full shadow-md">
                  {prop.type}
                </span>
              </div>

              {/* Amenity tier */}
              <div className="absolute bottom-3 left-3">
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                    prop.amenityCategory === "BASIC"
                      ? "bg-[#1e3a5f]/80 border-[#60a5fa]/30 text-[#60a5fa]"
                      : "bg-[#2d1b69]/80 border-[#a78bfa]/30 text-[#a78bfa]"
                  }`}
                >
                  {prop.amenityCategory === "BASIC" ? "● Basic" : "◆ Full"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-5 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[9px] bg-white/10 backdrop-blur-md text-white px-2 py-0.5 rounded-md font-bold uppercase">
                  {prop.layoutType?.replace("BHK", " BHK")}
                </span>
                <span className="text-[9px] bg-white/10 text-[#c5a059] px-2 py-0.5 rounded-md font-bold uppercase">
                  {prop.subType}
                </span>
                <span className="text-[9px] bg-white/10 text-[#888] px-2 py-0.5 rounded-md font-bold uppercase">
                  {prop.furnishing}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-black text-white tracking-tight leading-tight line-clamp-1">
                {prop.title.toUpperCase()}
              </h3>

              {/* Location */}
              <p className="mt-1 text-[0.75rem] font-semibold text-[#c5a059] tracking-widest opacity-90 line-clamp-1">
                {prop.location.toUpperCase()}
              </p>

              {/* Quick stats */}
              <div className="mt-2 flex items-center gap-3 text-[11px] text-[#666]">
                {prop.bedrooms != null && (
                  <span className="flex items-center gap-1">
                    🛏 <span className="text-[#888]">{prop.bedrooms}</span>
                  </span>
                )}
                {prop.bathrooms != null && (
                  <span className="flex items-center gap-1">
                    🚿 <span className="text-[#888]">{prop.bathrooms}</span>
                  </span>
                )}
                {prop.areaSqft != null && (
                  <span className="flex items-center gap-1">
                    📐 <span className="text-[#888]">{prop.areaSqft.toLocaleString("en-IN")} sqft</span>
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-2 text-[0.72rem] leading-relaxed text-gray-500 line-clamp-2 font-medium italic flex-grow">
                {prop.description}
              </p>

              {/* Price row */}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 uppercase font-bold">Total Price</span>
                  <span className="text-xl font-black text-[#d4af37]">
                    {prop.callForPrice
                      ? "Call for Price"
                      : `₹${prop.price.toLocaleString("en-IN")}`}
                  </span>
                  {prop.pricePerSqft && (
                    <span className="text-[10px] text-[#666] mt-0.5">
                      ₹{prop.pricePerSqft.toLocaleString("en-IN")} /sqft
                    </span>
                  )}
                </div>

                <div
  className={`flex h-10 w-24 items-center justify-center rounded-full border-[1.5px] 
  text-[10px] font-black uppercase tracking-widest transition-all
  ${
    prop.isSoldOut
      ? "border-gray-500 text-gray-500 cursor-not-allowed"
      : "border-[#d4af37] text-white group-hover:bg-[#d4af37] group-hover:text-black"
  }`}
>
  {prop.isSoldOut ? "Unavailable" : "View"}
</div>
              </div>
            </div>

            {/* Hover arrow */}
            <div className="absolute top-4 right-14 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BackButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "rent";
  const subtype = searchParams.get("subtype") || "flat";
  const layouttype = searchParams.get("layouttype") || "1bhk";
  const furnishing = searchParams.get("furnishing") || "furnished";

  return (
    <button
      onClick={() =>
        router.push(
          `/amenities?type=${type}&subtype=${subtype}&layouttype=${layouttype}&furnishing=${furnishing}`
        )
      }
      className="fixed left-6 top-36 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af3744] bg-white/10 backdrop-blur-md text-[#c5a059] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#d4af37] hover:text-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 max-md:left-4 max-md:top-36 max-md:h-10 max-md:w-10"
      title="Back to Amenities"
    >
      <ArrowLeft size={24} />
    </button>
  );
}

export default function FilteredPropertiesPage() {
  return (
    <main className="relative min-h-screen bg-transparent pt-20 pb-20">
      <div className="w-full text-center mb-12 px-14">
        <h1 className="text-[#c5a059] text-[0.7rem] font-bold uppercase tracking-[12px] md:tracking-[20px] opacity-80 mt-18 sm:mt-26">
          Curated Estate
        </h1>
        <div className="mt-4 mx-auto h-[1px] w-16 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
      </div>

      <Suspense
        fallback={
          <div className="flex flex-col h-[50vh] items-center justify-center space-y-4">
            <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#c5a059] tracking-[8px] uppercase text-[10px] font-bold animate-pulse">
              Searching Archive
            </p>
          </div>
        }
      >
        <BackButton />
        <PropertyList />
      </Suspense>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        body { background-color: #0a0a0a; }
      `}</style>
    </main>
  );
}