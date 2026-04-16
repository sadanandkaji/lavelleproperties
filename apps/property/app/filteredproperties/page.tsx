"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/lib/useCart";
import { useAuth } from "@/lib/useAuth";
import { type CartProperty } from "@/lib/cart";
import LoginModal from "@/app/components/LoginModal";

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
  isSoldOut?: boolean;
  bathrooms?: number | null;
  areaSqft?: number | null;
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
  const primary = images.find(i => i.isPrimary) ?? images[0];
  return getCloudinaryUrl(primary.url);
}

function PropImage({ images, alt }: { images: PropertyImage[]; alt: string }) {
  const [imgSrc, setImgSrc] = useState(() => getPrimaryImage(images));
  const [error,  setError]  = useState(false);

  useEffect(() => {
    const src = getPrimaryImage(images);
    if (!src) setError(true);
    else { setImgSrc(src); setError(false); }
  }, [images]);

  if (error || !imgSrc) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#c5a05922] to-[#c5a05944]">
        <span className="text-[10px] font-light uppercase tracking-[4px] text-[#c5a059]">Luxury Living</span>
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
    <div className="relative h-[480px] w-full overflow-hidden rounded-[35px] bg-[#c5a05911] border border-[#d4af3722]">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

// ─── Property List ─────────────────────────────────────────────────────────────
function PropertyList() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const { isLoggedIn } = useAuth();
  const { add, isInCart, refresh } = useCart();

  const [properties,      setProperties]      = useState<Property[]>([]);
  const [loading,         setLoading]         = useState(true);
  const [cartIds,         setCartIds]         = useState<Set<string>>(new Set());
  const [showLoginModal,  setShowLoginModal]  = useState(false);
  const [pendingProp,     setPendingProp]     = useState<Property | null>(null);

  const type       = searchParams.get("type");
  const subtype    = searchParams.get("subtype");
  const layouttype = searchParams.get("layouttype");
  const furnishing = searchParams.get("furnishing");

  // Keep cartIds in sync with localStorage
  useEffect(() => {
    const sync = () => {
      try {
        const raw  = localStorage.getItem("lv_property_cart");
        const cart = raw ? JSON.parse(raw) : [];
        setCartIds(new Set(cart.map((p: { id: string }) => p.id)));
      } catch { setCartIds(new Set()); }
    };
    sync();
    window.addEventListener("cart-updated", sync);
    return () => window.removeEventListener("cart-updated", sync);
  }, []);

  // Fetch properties
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (type)       query.set("type",       type);
        if (subtype)    query.set("subtype",    subtype);
        if (layouttype) query.set("layouttype", layouttype);
        if (furnishing) query.set("furnishing", furnishing);

        const res  = await fetch(`/api/property?${query.toString()}`);
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type, subtype, layouttype, furnishing]);

  const backUrl = `/innerlayout?type=${type || "rent"}&subtype=${subtype || "flat"}&layouttype=${layouttype || "1bhk"}`;

  const buildCartProperty = (prop: Property): CartProperty => ({
    id:              prop.id,
    title:           prop.title,
    location:        prop.location,
    price:           prop.price,
    pricePerSqft:    prop.pricePerSqft,
    callForPrice:    prop.callForPrice,
    type:            prop.type,
    subType:         prop.subType,
    layoutType:      prop.layoutType,
    furnishing:      prop.furnishing,
    amenityCategory: prop.amenityCategory,
    bedrooms:        prop.bedrooms,
    bathrooms:       prop.bathrooms,
    areaSqft:        prop.areaSqft,
    isSoldOut:       prop.isSoldOut,
    imageUrl:        getCloudinaryUrl(
      prop.images?.find(i => i.isPrimary)?.url ?? prop.images?.[0]?.url ?? ""
    ),
  });

  const handleAddToCart = (e: React.MouseEvent, prop: Property) => {
    e.stopPropagation();
    if (cartIds.has(prop.id)) return; // already in cart

    if (!isLoggedIn) {
      setPendingProp(prop);
      setShowLoginModal(true);
      return;
    }

    add(buildCartProperty(prop));
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (pendingProp) {
      add(buildCartProperty(pendingProp));
      setPendingProp(null);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 p-10 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-[#c5a059] space-y-6">
        <p className="text-xl font-light tracking-[5px] uppercase text-center">No matching inventory found</p>
        <div className="h-[1px] w-24 bg-[#c5a059]" />
        <button onClick={() => router.push(backUrl)}
          className="text-xs font-bold uppercase tracking-widest border border-[#c5a059] px-8 py-3 hover:bg-[#c5a059] hover:text-black transition-all">
          Adjust Furnishing
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 p-10 sm:grid-cols-2 lg:grid-cols-3 max-md:p-5">
        {properties.map(prop => {
          const imageCount = prop.images?.length ?? 0;
          const inCart     = cartIds.has(prop.id);

          return (
            <div
              key={prop.id}
              className={`group relative w-full overflow-hidden rounded-[35px] border-[1px]
                bg-[#1a1a1a] shadow-[0_15px_35px_rgba(0,0,0,0.2)]
                transition-all duration-500 flex flex-col
                ${prop.isSoldOut
                  ? "opacity-60 grayscale border-[#d4af3733] cursor-not-allowed"
                  : "border-[#d4af3733] cursor-pointer hover:shadow-[0_25px_60px_rgba(139,109,29,0.3)] hover:-translate-y-2"}`}
              onClick={() => {
                if (!prop.isSoldOut) {
                  router.push(
                    `/property/${prop.id}?type=${type}&subType=${subtype}&layoutType=${layouttype}&furnishing=${furnishing}`
                  );
                }
              }}
            >
              {/* Image */}
              <div className="relative h-[240px] w-full flex-shrink-0 overflow-hidden">
                {prop.isSoldOut && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                    <span className="text-white text-sm font-black tracking-[4px] uppercase border border-white px-4 py-2">
                      Sold Out
                    </span>
                  </div>
                )}

                <PropImage images={prop.images ?? []} alt={prop.title} />

                {imageCount > 1 && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1 text-[10px] font-bold text-white">
                    📷 {imageCount}
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <span className="bg-[#d4af37] text-black text-[9px] font-black uppercase tracking-[2px] px-3 py-1.5 rounded-full shadow-md">
                    {prop.type}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-sm
                    ${prop.amenityCategory === "BASIC"
                      ? "bg-[#1e3a5f]/80 border-[#60a5fa]/30 text-[#60a5fa]"
                      : "bg-[#2d1b69]/80 border-[#a78bfa]/30 text-[#a78bfa]"}`}>
                    {prop.amenityCategory === "BASIC" ? "● Basic" : "◆ Full"}
                  </span>
                </div>

                {/* In-cart badge */}
                {inCart && (
                  <div className="absolute bottom-3 right-3 bg-[#d4af37]/90 backdrop-blur-sm text-black text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full">
                    ✓ Saved
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-5 bg-gradient-to-b from-[#111] to-[#0a0a0a]">

                {/* Chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[9px] bg-white/10 backdrop-blur-md text-white px-2 py-0.5 rounded-md font-bold uppercase">
                    {prop.layoutType?.replace(/^BHK(\d+)(_5)?(P)?$/, (_, n, half, plus) =>
                      `${n}${half ? ".5" : ""}${plus ? "+" : ""} BHK`
                    )}
                  </span>
                  <span className="text-[9px] bg-white/10 text-[#c5a059] px-2 py-0.5 rounded-md font-bold uppercase">
                    {prop.subType}
                  </span>
                  <span className="text-[9px] bg-white/10 text-[#888] px-2 py-0.5 rounded-md font-bold uppercase">
                    {prop.furnishing}
                  </span>
                </div>

                <h3 className="text-base font-black text-white tracking-tight leading-tight line-clamp-1">
                  {prop.title.toUpperCase()}
                </h3>
                <p className="mt-1 text-[0.75rem] font-semibold text-[#c5a059] tracking-widest opacity-90 line-clamp-1">
                  {prop.location.toUpperCase()}
                </p>

                <div className="mt-2 flex items-center gap-3 text-[11px] text-[#666]">
                  {prop.bedrooms  != null && <span className="flex items-center gap-1">🛏 <span className="text-[#888]">{prop.bedrooms}</span></span>}
                  {prop.bathrooms != null && <span className="flex items-center gap-1">🚿 <span className="text-[#888]">{prop.bathrooms}</span></span>}
                  {prop.areaSqft  != null && <span className="flex items-center gap-1">📐 <span className="text-[#888]">{prop.areaSqft.toLocaleString("en-IN")} sqft</span></span>}
                </div>

                {prop.description && (
                  <p className="mt-2 text-[0.72rem] leading-relaxed text-gray-500 line-clamp-2 font-medium italic flex-grow">
                    {prop.description}
                  </p>
                )}

                {/* Bottom — price + buttons */}
                <div className="mt-4 border-t border-white/10 pt-4">

                  {/* Price */}
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase font-bold block">Total Price</span>
                      <span className="text-xl font-black text-[#d4af37]">
                        {prop.callForPrice ? "Call for Price" : `₹${formatPrice(prop.price)}`}
                      </span>
                      {prop.pricePerSqft && (
                        <span className="text-[10px] text-[#666] block mt-0.5">
                          ₹{formatPrice(prop.pricePerSqft)} /sqft
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  {!prop.isSoldOut ? (
                    <div className="flex gap-2" onClick={e => e.stopPropagation()}>

                      {/* View Details */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          router.push(
                            `/property/${prop.id}?type=${type}&subType=${subtype}&layoutType=${layouttype}&furnishing=${furnishing}`
                          );
                        }}
                        className="flex-1 h-10 flex items-center justify-center rounded-full border border-white/15 text-[10px] font-black uppercase tracking-widest text-[#888] hover:border-[#c5a059] hover:text-[#c5a059] transition-all"
                      >
                        View
                      </button>

                      {/* Add to Cart */}
                      <button
                        onClick={e => handleAddToCart(e, prop)}
                        disabled={inCart}
                        className={`flex-[2] h-10 flex items-center justify-center gap-2 rounded-full border-[1.5px] text-[10px] font-black uppercase tracking-widest transition-all
                          ${inCart
                            ? "border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37] cursor-default"
                            : "border-[#d4af37] text-white hover:bg-[#d4af37] hover:text-black"}`}
                      >
                        {inCart ? (
                          <>
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                              <path d="M1.5 6l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Saved
                          </>
                        ) : (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                              <line x1="3" y1="6" x2="21" y2="6" />
                              <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            Save
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-10 w-full items-center justify-center rounded-full border border-gray-500/40 text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Unavailable
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Login modal triggered by add-to-cart */}
      {showLoginModal && (
        <LoginModal
          reason="Sign in to save properties to your cart"
          onClose={() => { setShowLoginModal(false); setPendingProp(null); }}
          onSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

// ─── Back Button ───────────────────────────────────────────────────────────────
function BackButton() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const type         = searchParams.get("type")       || "rent";
  const subtype      = searchParams.get("subtype")    || "flat";
  const layouttype   = searchParams.get("layouttype") || "1bhk";

  return (
    <button
      onClick={() => router.push(`/innerlayout?type=${type}&subtype=${subtype}&layouttype=${layouttype}`)}
      className="fixed left-6 top-36 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af3744] bg-white/10 backdrop-blur-md text-[#c5a059] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#d4af37] hover:text-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 max-md:left-4 max-md:top-36 max-md:h-10 max-md:w-10"
      title="Back to Furnishing">
      <ArrowLeft size={24} />
    </button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function FilteredPropertiesPage() {
  return (
    <main className="relative min-h-screen bg-transparent pt-20 pb-20">
      <div className="w-full text-center mb-12 px-14">
        <h1 className="text-[#c5a059] text-[0.7rem] font-bold uppercase tracking-[12px] md:tracking-[20px] opacity-80 mt-18 sm:mt-26">
          Curated Estate
        </h1>
        <div className="mt-4 mx-auto h-[1px] w-16 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
        <p className="mt-3 text-[#555] text-[10px] uppercase tracking-[4px] font-bold">
          Browse · Save to cart · Book from cart
        </p>
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
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        body { background-color: #0a0a0a; }
      `}</style>
    </main>
  );
}