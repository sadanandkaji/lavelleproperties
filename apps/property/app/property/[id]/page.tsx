"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { useAuth } from "@/lib/useAuth";

interface PropertyImage {
  id: string; url: string; isPrimary: boolean; order: number;
}
interface Amenity {
  id: string; name: string; propertyId: string;
}
interface Property {
  id: string; title: string; location: string;
  price: number; pricePerSqft?: number | null; priceNote?: string | null;
  callForPrice?: boolean; isSoldOut?: boolean;
  type: string; subType: string; layoutType: string;
  furnishing: string; amenityCategory: "BASIC" | "FULL";
  description: string;
  bedrooms?: number | null; bathrooms?: number | null; halfBaths?: number | null;
  totalRooms?: number | null; floors?: number | null; floorLevel?: number | null;
  areaSqft?: number | null; lotSizeSqft?: number | null;
  yearBuilt?: number | null; yearRemodeled?: number | null;
  rentPeriods?: string[]; statuses?: string[];
  parkingOptions?: string[]; basementOptions?: string[];
  images: PropertyImage[];
  basicAmenities?: Amenity[]; fullAmenities?: Amenity[];
  createdAt: string;
}

interface BookingModalProps {
  property: Property;
  onClose: () => void;
}

const HERO_TRANSFORM  = "w_1200,h_700,c_fill,q_auto,f_auto";
const THUMB_TRANSFORM = "w_200,h_130,c_fill,q_auto,f_auto";

function getCloudinaryUrl(url: string, transform: string): string {
  if (!url) return "";
  if (url.includes(transform)) return url;
  if (url.includes("res.cloudinary.com") && url.includes("/upload/"))
    return url.replace("/upload/", `/upload/${transform}/`);
  return url;
}

// ── Booking Modal ─────────────────────────────────────────────────────────────
function BookingModal({ property, onClose }: BookingModalProps) {
  const { user } = useAuth();

  const [step,         setStep]         = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [form,         setForm]         = useState({ name: "", email: "", phone: "" });
  const [submitted,    setSubmitted]    = useState(false);
  const [loading,      setLoading]      = useState(false);

  // Pre-fill from logged-in user
  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, phone: user.phone });
  }, [user]);

  // ── Date options: next 4 days ────────────────────────────────────────────────
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableDates: Date[] = Array.from({ length: 4 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const DAY_SHORT   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // ── Time slots ───────────────────────────────────────────────────────────────
  const slots = [
    "09:00 AM","09:30 AM","10:00 AM","10:30 AM",
    "11:00 AM","11:30 AM","12:00 PM","12:30 PM",
    "02:00 PM","02:30 PM","03:00 PM","03:30 PM",
    "04:00 PM","04:30 PM","05:00 PM","05:30 PM",
  ];

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone,
          date: selectedDate
            ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
            : undefined,
          time: selectedTime,
          properties: [{
            id: property.id, title: property.title,
            location: property.location, price: property.price,
            callForPrice: property.callForPrice,
          }],
        }),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Booking failed"); }
      setSubmitted(true);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const canProceedStep1 = selectedDate !== null && selectedTime !== "";
  const canProceedStep2 = form.name.trim() && form.email.trim() && form.phone.trim();

  // ── Success ──────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="bg-white border border-[#d4af3744] rounded-[30px] p-8 max-w-sm w-full text-center space-y-5 shadow-[0_20px_60px_rgba(197,160,89,0.25)]">
          <div className="w-14 h-14 rounded-full bg-[#d4af3722] border border-[#d4af37] flex items-center justify-center mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L19 7" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-black text-[#3a2e0f]">Visit Confirmed!</h3>
          <p className="text-[#8a7040] text-sm leading-relaxed">
            Your visit to <span className="text-[#c5a059] font-bold">{property.title}</span> is confirmed for{" "}
            <span className="text-[#3a2e0f] font-semibold">{selectedDate ? formatDate(selectedDate) : ""}</span> at{" "}
            <span className="text-[#d4af37] font-bold">{selectedTime}</span>.
          </p>
          <p className="text-[#aaa] text-xs">A confirmation will be sent to {form.email}</p>
          <button onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#d4af37] text-white font-black tracking-widest text-sm uppercase hover:bg-[#c5a059] transition-all">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm  ">
      {/* Glass orbs (desktop only) */}
      <div className="hidden sm:block absolute w-[500px] h-[500px] rounded-full bg-[#d4af37]/8 blur-[120px] pointer-events-none " />

      {/* Sheet — bottom sheet on mobile, centered on desktop */}
<div className="relative z-10 w-full sm:max-w-md 
  bg-white 
  sm:rounded-[28px] rounded-t-[28px] 
  max-h-[85vh] sm:max-h-[70vh]
  overflow-hidden 
  flex flex-col
  shadow-[0_-20px_60px_rgba(197,160,89,0.2)] 
  sm:shadow-[0_20px_60px_rgba(197,160,89,0.2)] 
  sm:mx-4 sm:mb-0"
>
        {/* Gold top bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-0 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[#e8dfc8]" />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 pt-5 sm:pt-6  pb-4 border-b border-[#d4af3722] ">
          <div>
            <p className="text-[9px] text-[#c5a059] uppercase tracking-[5px] font-bold mb-0.5">Schedule a Visit</p>
            <h2 className="text-base font-black text-[#3a2e0f] line-clamp-1 pr-4">{property.title}</h2>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#d4af3744] flex items-center justify-center text-[#c5a059] hover:bg-[#d4af3711] transition-all shrink-0 text-sm">
            ✕
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 px-6 py-3">
          {[{ n: 1, label: "Date & Time" }, { n: 2, label: "Details" }, { n: 3, label: "Confirm" }].map(({ n, label }) => (
            <React.Fragment key={n}>
              <div className="flex items-center gap-1.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black transition-all
                  ${step >= n ? "bg-[#d4af37] text-white" : "border border-[#d4af3744] text-[#c5a05966]"}`}>
                  {step > n ? "✓" : n}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest hidden sm:block
                  ${step >= n ? "text-[#c5a059]" : "text-[#c5a05966]"}`}>
                  {label}
                </span>
              </div>
              {n < 3 && <div className={`flex-1 h-[1px] ${step > n ? "bg-[#d4af37]" : "bg-[#d4af3733]"}`} />}
            </React.Fragment>
          ))}
        </div>

<div className="px-6 pt-4 overflow-y-auto flex-1">        
    {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-4">

              {/* Date scroll */}
              <div>
                <p className="text-[9px] uppercase tracking-[4px] text-[#c5a059] font-bold mb-2.5">Select Date</p>
                <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {availableDates.map((d, i) => {
                    const isSelected =
                      selectedDate &&
                      selectedDate.getFullYear() === d.getFullYear() &&
                      selectedDate.getMonth()    === d.getMonth()    &&
                      selectedDate.getDate()     === d.getDate();
                    return (
                      <button key={i} onClick={() => setSelectedDate(d)}
                        className={`flex-shrink-0 snap-start flex flex-col items-center justify-center w-[72px] h-[80px] rounded-2xl border-[1.5px] transition-all duration-200
                          ${isSelected
                            ? "bg-[#d4af37] border-[#d4af37] text-white shadow-[0_0_16px_rgba(212,175,55,0.35)]"
                            : "bg-[#fdfbf0] border-[#d4af3733] text-[#3a2e0f] hover:border-[#d4af37]"}`}>
                        <span className={`text-[9px] font-bold uppercase tracking-widest mb-1
                          ${isSelected ? "text-white/70" : i === 0 ? "text-[#c5a059]" : "text-[#aaa]"}`}>
                          {i === 0 ? "Today" : DAY_SHORT[d.getDay()]}
                        </span>
                        <span className="text-2xl font-black leading-none">{d.getDate()}</span>
                        <span className={`text-[9px] font-bold mt-0.5 ${isSelected ? "text-white/70" : "text-[#aaa]"}`}>
                          {MONTH_SHORT[d.getMonth()]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time scroll */}
              <div>
                <p className="text-[9px] uppercase tracking-[4px] text-[#c5a059] font-bold mb-2.5">Select Time</p>
                <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {slots.map(slot => (
                    <button key={slot} onClick={() => setSelectedTime(slot)}
                      className={`flex-shrink-0 snap-start px-4 py-3 rounded-2xl border-[1.5px] text-[11px] font-black tracking-wide transition-all duration-200 whitespace-nowrap
                        ${selectedTime === slot
                          ? "bg-[#d4af37] border-[#d4af37] text-white shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                          : "bg-[#fdfbf0] border-[#d4af3733] text-[#8a7040] hover:border-[#d4af37]"}`}>
                      {slot}
                    </button>
                  ))}
                  <div className="flex-shrink-0 w-2" />
                </div>
              </div>

              {/* Selection summary */}
              {(selectedDate || selectedTime) && (
                <div className="bg-[#d4af3711] border border-[#d4af3733] rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-base">📅</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-[#3a2e0f] truncate">
                      {selectedDate
                        ? `${DAY_SHORT[selectedDate.getDay()]}, ${selectedDate.getDate()} ${MONTH_SHORT[selectedDate.getMonth()]}`
                        : <span className="text-[#c5a05966] font-normal">No date selected</span>}
                    </p>
                    <p className="text-[10px] text-[#c5a059] font-semibold">
                      {selectedTime || <span className="text-[#c5a05966] font-normal">No time selected</span>}
                    </p>
                  </div>
                  {selectedDate && selectedTime && (
                    <div className="w-5 h-5 rounded-full bg-[#d4af37] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              <button disabled={!canProceedStep1} onClick={() => setStep(2)}
                className={`w-full py-3.5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all
                  ${canProceedStep1
                    ? "bg-[#d4af37] text-white hover:bg-[#c5a059] shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    : "bg-[#d4af3722] text-[#c5a05966] cursor-not-allowed"}`}>
                Continue
              </button>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-[#d4af3711] border border-[#d4af3733] rounded-2xl px-4 py-3 flex items-center gap-3">
                <span className="text-sm">📅</span>
                <div>
                  <p className="text-xs font-bold text-[#3a2e0f]">{selectedDate ? formatDate(selectedDate) : ""}</p>
                  <p className="text-[10px] text-[#c5a059]">{selectedTime}</p>
                </div>
              </div>

              {[
                { key: "name",  label: "Full Name",     type: "text",  placeholder: "Your name"       },
                { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                { key: "phone", label: "Phone Number",  type: "tel",   placeholder: "+91 98765 43210" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[4px] font-bold text-[#8a7040]">{label}</label>
                  <input type={type} value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-[#fdfbf0] border border-[#d4af3744] rounded-xl px-4 py-3 text-sm text-[#3a2e0f] placeholder-[#c5a05966] focus:outline-none focus:border-[#d4af37] transition-all" />
                </div>
              ))}

              <div className="flex gap-3 pt-1">
                <button onClick={() => setStep(1)}
                  className="flex-1 py-3.5 rounded-2xl border border-[#d4af3744] text-sm font-bold text-[#8a7040] hover:text-[#3a2e0f] hover:border-[#c5a059] transition-all">
                  Back
                </button>
                <button disabled={!canProceedStep2} onClick={() => setStep(3)}
                  className={`flex-[2] py-3.5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all
                    ${canProceedStep2 ? "bg-[#d4af37] text-white hover:bg-[#c5a059]" : "bg-[#d4af3722] text-[#c5a05966] cursor-not-allowed"}`}>
                  Review
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            
            <div className="space-y-4">
              
              <div className="bg-[#fdfbf0] border border-[#d4af3733] rounded-2xl divide-y divide-[#d4af3722]">
                {[
                  { icon: "🏠", label: "Property", value: property.title    },
                  { icon: "📍", label: "Location", value: property.location },
                  { icon: "💰", label: "Price",    value: property.callForPrice ? "Call for Price" : `₹${formatPrice(property.price)}` },
                  { icon: "📅", label: "Date",     value: selectedDate ? formatDate(selectedDate) : "" },
                  { icon: "🕐", label: "Time",     value: selectedTime  },
                  { icon: "👤", label: "Name",     value: form.name     },
                  { icon: "📧", label: "Email",    value: form.email    },
                  { icon: "📞", label: "Phone",    value: form.phone    },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 px-4 py-3">
                    <span className="text-sm mt-0.5">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] uppercase tracking-[3px] text-[#c5a05988] font-bold mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-[#3a2e0f] truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

             <div className="sticky bottom-0 bg-white border-t border-[#d4af3722] px-6 py-4 flex gap-3">
      
      <button
        onClick={() => setStep(2)}
        className="flex-1 py-3.5 rounded-2xl border border-[#d4af3744] text-sm font-bold text-[#8a7040] hover:text-[#3a2e0f] hover:border-[#c5a059] transition-all"
      >
        Edit
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex-[2] py-3.5 rounded-2xl bg-[#d4af37] text-white font-black uppercase tracking-widest text-sm hover:bg-[#c5a059] transition-all shadow-[0_0_24px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Booking...
          </>
        ) : (
          "Confirm Visit"
        )}
      </button>

    </div>
            </div>
            
          )}
          
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PropertyDetailPage() {
  const params       = useParams();
  const router       = useRouter();
  const searchParams = useSearchParams();
  const id = params?.id as string;

  const [property,    setProperty]    = useState<Property | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [activeImg,   setActiveImg]   = useState(0);

  const handleBackNavigation = () => {
    const type       = searchParams.get("type")       || "rent";
    const subType    = searchParams.get("subType")    || "flat";
    const layoutType = searchParams.get("layoutType") || "bhk1";
    const furnishing = searchParams.get("furnishing") || "furnished";
    router.push(
      `/filteredproperties?type=${type.toLowerCase()}&subtype=${subType.toLowerCase()}&layouttype=${layoutType.toLowerCase()}&furnishing=${furnishing.toLowerCase()}`
    );
  };

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        const res  = await fetch(`/api/properties/${id}`);
        const data = await res.json();
        setProperty(data);
      } catch { setProperty(null); }
      finally   { setLoading(false); }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#c5a059] tracking-[8px] uppercase text-[10px] font-bold animate-pulse">Loading Property</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center gap-6 text-center px-6">
        <p className="text-2xl font-black text-[#3a2e0f]">Property Not Found</p>
        <button onClick={() => router.back()}
          className="text-xs font-bold uppercase tracking-widest border border-[#c5a059] text-[#c5a059] px-8 py-3 hover:bg-[#c5a059] hover:text-white transition-all rounded-full">
          Go Back
        </button>
      </div>
    );
  }

  const images         = property.images         ?? [];
  const basicAmenities = property.basicAmenities ?? [];
  const fullAmenities  = property.fullAmenities  ?? [];
  const activeImageUrl = images[activeImg]
    ? getCloudinaryUrl(images[activeImg].url, HERO_TRANSFORM) : "";
  const isSoldOut = property.isSoldOut ?? false;

  const TagChips = ({ items }: { items?: string[] }) => {
    if (!items?.length) return null;
    return (
      <div className="flex flex-wrap gap-2">
        {items.map(t => (
          <span key={t}
            className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#d4af3766] text-[#c5a059] bg-white/40 uppercase tracking-wide">
            {t}
          </span>
        ))}
      </div>
    );
  };

  const StatCard = ({ icon, label, value }: { icon: string; label: string; value: any }) => {
    if (value == null || value === "") return null;
    return (
      <div className="bg-[#fdf8ec]/80 border border-[#c5a05944] rounded-2xl px-4 py-3 space-y-1 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-[9px] uppercase tracking-[3px] font-bold text-[#a07830]">{label}</span>
        </div>
        <p className="text-sm font-bold text-[#2a1f08]">{value}</p>
      </div>
    );
  };

  return (
    <>
      {/*
        Navbar heights from your Navbar.tsx:
        Mobile:  h-[80px]   → pt-[80px]   + extra breathing room = pt-24 (96px)
        Desktop: h-[120px]  → pt-[120px]  + extra = pt-36 (144px)
      */}
      <main className="min-h-screen bg-transparent pb-24 pt-44 sm:pt-46">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 space-y-8">

          {/* Back button — positioned just below navbar */}
          <button
            onClick={handleBackNavigation}
            className="fixed top-[88px] sm:top-[128px] left-4 sm:left-6 md:left-10 z-50 flex items-center gap-2 text-[#c5a059] text-[10px] font-black uppercase tracking-[3px] px-4 py-2.5 bg-white/40 backdrop-blur-md border border-[#d4af3733] rounded-full hover:bg-[#d4af37] hover:text-white transition-all shadow-sm group"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
              className="transition-transform group-hover:-translate-x-1">
              <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:block">Back</span>
          </button>

          {/* ── IMAGE GALLERY ── */}
          {images.length > 0 ? (
            <div className="space-y-3">
              <div className="relative w-full h-[240px] sm:h-[340px] md:h-[420px] rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(197,160,89,0.2)] border border-[#d4af3733]">
                {activeImageUrl ? (
                  <img src={activeImageUrl} alt={property.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${isSoldOut ? "grayscale opacity-60" : ""}`} />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#fdf6e3] to-[#f5e6c0] flex items-center justify-center">
                    <span className="text-[11px] font-bold uppercase tracking-[8px] text-[#c5a059] opacity-60">Luxury Living</span>
                  </div>
                )}

                {isSoldOut && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="border-2 border-red-500/70 bg-red-500/20 backdrop-blur-sm text-red-400 text-xl font-black uppercase tracking-[0.3em] px-6 py-3 rounded rotate-[-6deg]">
                      SOLD OUT
                    </div>
                  </div>
                )}

                {!isSoldOut && (
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md border border-[#d4af3744] rounded-2xl px-4 py-2.5 text-right shadow-sm">
                    <p className="text-[9px] text-[#c5a059] uppercase tracking-[3px] font-bold mb-0.5">Total Price</p>
                    <p className="text-xl sm:text-2xl font-black text-[#c5a059] leading-none">
                      {property.callForPrice ? "Call for Price" : `₹${formatPrice(property.price ?? 0)}`}
                    </p>
                    {property.pricePerSqft && (
                      <p className="text-[9px] text-[#8a7040] mt-0.5">₹{formatPrice(property.pricePerSqft)} /sqft</p>
                    )}
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <span className="bg-[#d4af37] text-white text-[9px] font-black uppercase tracking-[2px] px-2.5 py-1.5 rounded-full shadow-md">
                    {property.type}
                  </span>
                </div>

                {images.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {activeImg + 1} / {images.length}
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImg(p => (p - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white text-lg flex items-center justify-center hover:bg-black/80 transition">‹</button>
                    <button onClick={() => setActiveImg(p => (p + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white text-lg flex items-center justify-center hover:bg-black/80 transition">›</button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1"
                  style={{ scrollbarWidth: "none" }}>
                  {images.map((img, idx) => (
                    <button key={idx} onClick={() => setActiveImg(idx)}
                      className={`flex-shrink-0 h-14 w-20 sm:h-16 sm:w-24 rounded-xl overflow-hidden border-2 transition-all
                        ${activeImg === idx
                          ? "border-[#d4af37] opacity-100 shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                          : "border-transparent opacity-50 hover:opacity-80"}`}>
                      <img src={getCloudinaryUrl(img.url, THUMB_TRANSFORM)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-40 rounded-[24px] bg-gradient-to-br from-[#fdf6e3] to-[#f5e6c0] flex items-center justify-center">
              <span className="text-[11px] font-bold uppercase tracking-[8px] text-[#c5a059] opacity-60">Luxury Living</span>
            </div>
          )}

          {/* ── TITLE ── */}
          <div>
            {isSoldOut && (
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full border border-red-500/40 bg-red-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[3px] text-red-400">Sold Out</span>
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#3a2e0f] leading-tight tracking-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#c5a059" />
                <circle cx="12" cy="9" r="2.5" fill="#fdfbf0" />
              </svg>
              <p className="text-sm font-semibold text-[#c5a059] tracking-[2px] uppercase">{property.location}</p>
            </div>
            {property.priceNote && (
              <p className="mt-1 text-xs text-[#8a7040] italic">{property.priceNote}</p>
            )}
          </div>

          <div className="h-[1px] bg-gradient-to-r from-[#d4af3755] via-[#d4af37] to-transparent" />

          {/* ── DESCRIPTION ── */}
          {property.description?.trim() && (
            <div className="space-y-2">
              <h2 className="text-[10px] font-bold uppercase tracking-[5px] text-[#c5a059]">About This Property</h2>
              <p className="text-[#5a4a2a] leading-[1.9] text-[0.9rem] font-light">{property.description}</p>
            </div>
          )}

          {/* ── DETAILS GRID ── */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[5px] text-[#c5a059] mb-4">Property Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatCard icon="🏷️" label="Type"            value={property.type} />
              <StatCard icon="🏢" label="Sub Type"        value={property.subType} />
              <StatCard icon="🛏️" label="Layout"          value={property.layoutType} />
              <StatCard icon="🛋️" label="Furnishing"      value={property.furnishing} />
              <StatCard icon="⭐" label="Amenity Tier"    value={property.amenityCategory === "FULL" ? "Full" : "Basic"} />
              <StatCard icon="📅" label="Listed"          value={new Date(property.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })} />
              <StatCard icon="🛏"  label="Bedrooms"        value={property.bedrooms} />
              <StatCard icon="🚿" label="Bathrooms"       value={property.bathrooms} />
              <StatCard icon="🛁" label="Half Baths"      value={property.halfBaths} />
              <StatCard icon="🏠" label="Total Rooms"     value={property.totalRooms} />
              <StatCard icon="📐" label="Area (sqft)"     value={property.areaSqft?.toLocaleString("en-IN")} />
              <StatCard icon="🌿" label="Lot Size"        value={property.lotSizeSqft?.toLocaleString("en-IN")} />
              <StatCard icon="🏗️" label="Floors"          value={property.floors} />
              <StatCard icon="🔢" label="Floor Level"     value={property.floorLevel} />
              <StatCard icon="🏛️" label="Year Built"      value={property.yearBuilt} />
              <StatCard icon="🔨" label="Year Remodeled"  value={property.yearRemodeled} />
            </div>
          </div>

          {/* ── BASIC AMENITIES ── */}
          {basicAmenities.length > 0 && (
            <div className="space-y-3">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af3755] to-transparent" />
              <h2 className="text-[10px] font-bold uppercase tracking-[5px] text-[#60a5fa]">🛡 Basic Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {basicAmenities.map(a => (
                  <span key={a.id}
                    className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#60a5fa]/30 text-[#60a5fa] bg-[#60a5fa]/10 uppercase tracking-wide">
                    <span>✓</span> {a.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── FULL AMENITIES ── */}
          {fullAmenities.length > 0 && (
            <div className="space-y-3">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af3755] to-transparent" />
              <h2 className="text-[10px] font-bold uppercase tracking-[5px] text-[#a78bfa]">💎 Full Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {fullAmenities.map(a => (
                  <span key={a.id}
                    className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#a78bfa]/30 text-[#a78bfa] bg-[#a78bfa]/10 uppercase tracking-wide">
                    <span>✓</span> {a.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── TAG SECTIONS ── */}
          {(property.rentPeriods?.length || property.statuses?.length ||
            property.parkingOptions?.length || property.basementOptions?.length) ? (
            <div className="space-y-4">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af3755] to-transparent" />
              {property.rentPeriods?.length ? (
                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-[5px] text-[#c5a059]">Rent Periods</h3>
                  <TagChips items={property.rentPeriods} />
                </div>
              ) : null}
              {property.statuses?.length ? (
                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-[5px] text-[#c5a059]">Status</h3>
                  <TagChips items={property.statuses} />
                </div>
              ) : null}
              {property.parkingOptions?.length ? (
                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-[5px] text-[#c5a059]">Parking</h3>
                  <TagChips items={property.parkingOptions} />
                </div>
              ) : null}
              {property.basementOptions?.length ? (
                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-[5px] text-[#c5a059]">Basement</h3>
                  <TagChips items={property.basementOptions} />
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af3755] to-transparent" />

          {/* ── CTA ── */}
          {isSoldOut ? (
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1a0a0a] via-[#1a0505]/80 to-[#200a0a] border border-red-500/20 rounded-[24px] p-7 sm:p-12 text-center space-y-4">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
              <div className="relative space-y-3">
                <p className="text-[9px] font-bold uppercase tracking-[8px] text-red-400/70">Availability</p>
                <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  This Property is<br /><span className="text-red-400">Sold Out</span>
                </h3>
                <p className="text-red-300/60 text-sm max-w-sm mx-auto leading-relaxed">
                  This property is no longer available.
                </p>
              </div>
              <button onClick={handleBackNavigation}
                className="relative inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white font-black text-sm uppercase tracking-[3px] px-8 py-3.5 rounded-full hover:bg-white/20 transition-all">
                Browse Other Properties
              </button>
            </div>
          ) : (
            <div className="relative overflow-hidden bg-gradient-to-br from-[#fffdf0] via-white/80 to-[#fdf6e3] border border-[#d4af3744] rounded-[24px] p-7 sm:p-12 text-center space-y-5">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#d4af3715] blur-3xl pointer-events-none" />
              <div className="relative space-y-3">
                <p className="text-[9px] font-bold uppercase tracking-[8px] text-[#c5a059]">Ready to Experience It?</p>
                <h3 className="text-2xl sm:text-4xl font-black text-[#3a2e0f] leading-tight">
                  Book a Personal<br /><span className="text-[#d4af37]">Site Visit</span>
                </h3>
                <p className="text-[#8a7040] text-sm max-w-sm mx-auto leading-relaxed">
                  Schedule a private walkthrough with our property advisor.
                </p>
              </div>
              <button onClick={() => setShowBooking(true)}
                className="relative inline-flex items-center gap-3 bg-[#d4af37] text-white font-black text-sm uppercase tracking-[3px] px-8 py-3.5 rounded-full hover:bg-[#c5a059] transition-all shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-0.5">
                Book a Meet
              </button>
            </div>
          )}
        </div>
      </main>

      {showBooking && property && !isSoldOut && (
        <BookingModal property={property} onClose={() => setShowBooking(false)} />
      )}

      <style jsx global>{`
        div::-webkit-scrollbar { display: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}