"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";

interface PropertyImage {
  id: string;
  url: string;
  isPrimary: boolean;
  order: number;
}

interface Amenity {
  id: string;
  name: string;
  propertyId: string;
}

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  pricePerSqft?: number | null;
  priceNote?: string | null;
  callForPrice?: boolean;
  isSoldOut?: boolean;
  type: string;
  subType: string;
  layoutType: string;
  furnishing: string;
  amenityCategory: "BASIC" | "FULL";
  description: string;
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
  images: PropertyImage[];
  basicAmenities?: Amenity[];
  fullAmenities?: Amenity[];
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
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", `/upload/${transform}/`);
  }
  return url;
}

// ─── Calendar ────────────────────────────────────────────────────────────────
function Calendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 3);

  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const MONTHS = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const DAYS        = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const next = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-between mb-5">
        <button onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-full border border-[#d4af3744] text-[#c5a059] hover:bg-[#d4af3722] transition-all">‹</button>
        <span className="text-sm font-bold text-[#3a2e0f] tracking-[3px] uppercase">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={next} className="w-8 h-8 flex items-center justify-center rounded-full border border-[#d4af3744] text-[#c5a059] hover:bg-[#d4af3722] transition-all">›</button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-[#c5a059] uppercase tracking-widest py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const cellDate   = new Date(viewYear, viewMonth, day);
          const isDisabled = cellDate < today || cellDate > maxDate;
          const isSelected =
            selectedDate &&
            selectedDate.getFullYear() === viewYear &&
            selectedDate.getMonth()    === viewMonth &&
            selectedDate.getDate()     === day;
          const isToday =
            today.getFullYear() === viewYear &&
            today.getMonth()    === viewMonth &&
            today.getDate()     === day;

          return (
            <button
              key={day}
              disabled={isDisabled}
              onClick={() => onSelect(cellDate)}
              className={`mx-auto w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200
                ${isDisabled ? "text-[#c5a05933] cursor-not-allowed" : "cursor-pointer"}
                ${isSelected
                  ? "bg-[#d4af37] text-white font-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : isToday && !isDisabled
                  ? "border border-[#d4af37] text-[#c5a059]"
                  : !isDisabled
                  ? "text-[#5a4a2a] hover:bg-[#d4af3722] hover:text-[#3a2e0f]"
                  : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-center text-[10px] text-[#c5a05988] uppercase tracking-widest font-bold">
        Available: Next 4 days only
      </p>
    </div>
  );
}

function TimePicker({
  selectedTime,
  onSelect,
}: {
  selectedTime: string;
  onSelect: (t: string) => void;
}) {
  const slots = [
    "09:00 AM","09:30 AM","10:00 AM","10:30 AM",
    "11:00 AM","11:30 AM","12:00 PM","12:30 PM",
    "02:00 PM","02:30 PM","03:00 PM","03:30 PM",
    "04:00 PM","04:30 PM","05:00 PM","05:30 PM",
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {slots.map(slot => (
        <button key={slot} onClick={() => onSelect(slot)}
          className={`py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-200
            ${selectedTime === slot
              ? "bg-[#d4af37] text-white shadow-[0_0_12px_rgba(212,175,55,0.3)]"
              : "border border-[#d4af3744] text-[#8a7040] hover:border-[#d4af37] hover:text-[#3a2e0f] bg-white/40"}`}>
          {slot}
        </button>
      ))}
    </div>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────
function BookingModal({ property, onClose }: BookingModalProps) {
  const [step,         setStep]         = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [form,         setForm]         = useState({ name: "", email: "", phone: "" });
  const [submitted,    setSubmitted]    = useState(false);
  const [loading,      setLoading]      = useState(false);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  // ── Single call with `properties` array (matches new booking API) ──────────
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:  form.name,
          email: form.email,
          phone: form.phone,
          date:  selectedDate
            ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
            : undefined,
          time: selectedTime,
          // Use the new multi-property format — single property in the array
          properties: [
            {
              id:           property.id,
              title:        property.title,
              location:     property.location,
              price:        property.price,
              callForPrice: property.callForPrice,
            },
          ],
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Booking failed");
      }
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

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
        <div className="bg-white border border-[#d4af3744] rounded-[30px] p-10 max-w-md w-full text-center space-y-6 shadow-[0_20px_60px_rgba(197,160,89,0.25)] animate-[fadeUp_0.4s_ease]">
          <div className="w-16 h-16 rounded-full bg-[#d4af3722] border border-[#d4af37] flex items-center justify-center mx-auto">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L19 7" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-[#3a2e0f] tracking-tight">Visit Confirmed!</h3>
          <p className="text-[#8a7040] text-sm leading-relaxed">
            Your visit to{" "}
            <span className="text-[#c5a059] font-bold">{property.title}</span> is confirmed for{" "}
            <span className="text-[#3a2e0f] font-semibold">{selectedDate ? formatDate(selectedDate) : ""}</span> at{" "}
            <span className="text-[#d4af37] font-bold">{selectedTime}</span>.
          </p>
          <p className="text-[#aaa] text-xs">A confirmation will be sent to {form.email}</p>
          <button onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#d4af37] text-white font-black tracking-widest text-sm uppercase transition-all hover:bg-[#c5a059]">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 pt-32 sm:pt-40">
      {/* Liquid glass backdrop */}
      <div className="absolute w-[90%] max-w-3xl h-[80%] rounded-[40px] bg-white/10 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#d4af37]/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 pointer-events-none" />
      </div>

      <div className="relative z-10 bg-white/70 backdrop-blur-md border border-white/40 rounded-[30px] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(197,160,89,0.2)] animate-[fadeUp_0.4s_ease]">

        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 pt-8 pb-5 border-b border-[#d4af3722]">
          <div>
            <p className="text-[9px] text-[#c5a059] uppercase tracking-[5px] font-bold mb-1">Schedule a Visit</p>
            <h2 className="text-lg font-black text-[#3a2e0f] line-clamp-1">{property.title}</h2>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#d4af3744] flex items-center justify-center text-[#c5a059] hover:bg-[#d4af3711] transition-all shrink-0 ml-3">
            ✕
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-3 px-8 py-4">
          {[{ n: 1, label: "Date & Time" }, { n: 2, label: "Your Details" }, { n: 3, label: "Confirm" }].map(({ n, label }) => (
            <React.Fragment key={n}>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all
                  ${step >= n ? "bg-[#d4af37] text-white" : "border border-[#d4af3744] text-[#c5a05966]"}`}>
                  {step > n ? "✓" : n}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest hidden sm:block
                  ${step >= n ? "text-[#c5a059]" : "text-[#c5a05966]"}`}>
                  {label}
                </span>
              </div>
              {n < 3 && <div className={`flex-1 h-[1px] ${step > n ? "bg-[#d4af37]" : "bg-[#d4af3733]"}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="px-8 pb-8">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-[#fdfbf0] border border-[#d4af3733] rounded-2xl p-5">
                <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />
              </div>
              {selectedDate && (
                <div className="space-y-3 animate-[fadeUp_0.3s_ease]">
                  <p className="text-[10px] uppercase tracking-[4px] text-[#c5a059] font-bold">Select Time</p>
                  <TimePicker selectedTime={selectedTime} onSelect={setSelectedTime} />
                </div>
              )}
              <button disabled={!canProceedStep1} onClick={() => setStep(2)}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all
                  ${canProceedStep1
                    ? "bg-[#d4af37] text-white hover:bg-[#c5a059] shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                    : "bg-[#d4af3722] text-[#c5a05966] cursor-not-allowed"}`}>
                Continue
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4 animate-[fadeUp_0.3s_ease]">
              <div className="bg-[#d4af3711] border border-[#d4af3733] rounded-2xl px-5 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d4af3722] flex items-center justify-center text-sm">📅</div>
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
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-[#fdfbf0] border border-[#d4af3744] rounded-xl px-4 py-3 text-sm text-[#3a2e0f] placeholder-[#c5a05966] focus:outline-none focus:border-[#d4af37] transition-all"
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-2xl border border-[#d4af3744] text-sm font-bold text-[#8a7040] hover:text-[#3a2e0f] hover:border-[#c5a059] transition-all">
                  Back
                </button>
                <button disabled={!canProceedStep2} onClick={() => setStep(3)}
                  className={`flex-[2] py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all
                    ${canProceedStep2
                      ? "bg-[#d4af37] text-white hover:bg-[#c5a059]"
                      : "bg-[#d4af3722] text-[#c5a05966] cursor-not-allowed"}`}>
                  Review
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5 animate-[fadeUp_0.3s_ease]">
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
                  <div key={label} className="flex items-start gap-4 px-5 py-3.5">
                    <span className="text-base mt-0.5">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] uppercase tracking-[3px] text-[#c5a05988] font-bold mb-0.5">{label}</p>
                      <p className="text-sm font-semibold text-[#3a2e0f] truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)}
                  className="flex-1 py-4 rounded-2xl border border-[#d4af3744] text-sm font-bold text-[#8a7040] hover:text-[#3a2e0f] hover:border-[#c5a059] transition-all">
                  Edit
                </button>
                <button onClick={handleSubmit} disabled={loading}
                  className="flex-[2] py-4 rounded-2xl bg-[#d4af37] text-white font-black uppercase tracking-widest text-sm hover:bg-[#c5a059] transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2">
                  {loading
                    ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Booking...</>
                    : "Confirm Visit"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
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
      } catch {
        setProperty(null);
      } finally {
        setLoading(false);
      }
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
    ? getCloudinaryUrl(images[activeImg].url, HERO_TRANSFORM)
    : "";
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
      <div className="bg-[#fdf8ec]/80 border border-[#c5a05944] rounded-2xl px-5 py-4 space-y-1 backdrop-blur-md shadow-[0_2px_12px_rgba(197,160,89,0.1)]">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-[9px] uppercase tracking-[3px] font-bold text-[#a07830]">{label}</span>
        </div>
        <p className="text-sm font-bold text-[#2a1f08]">{value}</p>
      </div>
    );
  };

  return (
    <>
      <main className="min-h-screen bg-transparent pb-24 pt-40">
        <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-8">

          {/* Back button */}
          <button
            onClick={handleBackNavigation}
            className="fixed top-24 left-6 md:left-10 z-50 flex items-center gap-2 text-[#c5a059] text-[10px] font-black uppercase tracking-[3px] px-5 py-3 bg-white/40 backdrop-blur-md border border-[#d4af3733] rounded-full hover:bg-[#d4af37] hover:text-white transition-all shadow-sm group sm:top-36"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1">
              <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>

          {/* IMAGE GALLERY */}
          {images.length > 0 ? (
            <div className="space-y-3 pt-10 sm:pt-14">
              <div className="relative w-full h-[300px] md:h-[420px] rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(197,160,89,0.2)] border border-[#d4af3733]">
                {activeImageUrl ? (
                  <img
                    src={activeImageUrl}
                    alt={property.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${isSoldOut ? "grayscale opacity-60" : ""}`}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#fdf6e3] to-[#f5e6c0] flex items-center justify-center">
                    <span className="text-[11px] font-bold uppercase tracking-[8px] text-[#c5a059] opacity-60">Luxury Living</span>
                  </div>
                )}

                {isSoldOut && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="border-2 border-red-500/70 bg-red-500/20 backdrop-blur-sm text-red-400 text-2xl font-black uppercase tracking-[0.3em] px-8 py-4 rounded rotate-[-6deg]">
                      SOLD OUT
                    </div>
                  </div>
                )}

                {!isSoldOut && (
                  <div className="absolute bottom-5 right-5 bg-white/80 backdrop-blur-md border border-[#d4af3744] rounded-2xl px-5 py-3 text-right shadow-[0_4px_20px_rgba(197,160,89,0.15)]">
                    <p className="text-[9px] text-[#c5a059] uppercase tracking-[3px] font-bold mb-0.5">Total Price</p>
                    <p className="text-2xl font-black text-[#c5a059] leading-none">
                      {property.callForPrice ? "Call for Price" : `₹${formatPrice(property.price ?? 0)}`}
                    </p>
                    {property.pricePerSqft && (
                      <p className="text-[10px] text-[#8a7040] mt-1">
                        ₹{formatPrice(property.pricePerSqft)} /sqft
                      </p>
                    )}
                  </div>
                )}

                <div className="absolute top-4 left-4">
                  <span className="bg-[#d4af37] text-white text-[10px] font-black uppercase tracking-[2px] px-3 py-1.5 rounded-full shadow-md">
                    {property.type}
                  </span>
                </div>

                {images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">
                    {activeImg + 1} / {images.length}
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg(p => (p - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white text-lg flex items-center justify-center hover:bg-black/80 transition">
                      ‹
                    </button>
                    <button
                      onClick={() => setActiveImg(p => (p + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white text-lg flex items-center justify-center hover:bg-black/80 transition">
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button key={idx} onClick={() => setActiveImg(idx)}
                      className={`flex-shrink-0 h-16 w-24 rounded-xl overflow-hidden border-2 transition-all
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
            <div className="w-full h-48 rounded-[28px] bg-gradient-to-br from-[#fdf6e3] to-[#f5e6c0] flex items-center justify-center mt-10 sm:mt-14">
              <span className="text-[11px] font-bold uppercase tracking-[8px] text-[#c5a059] opacity-60">Luxury Living</span>
            </div>
          )}

          {/* TITLE + LOCATION */}
          <div>
            {isSoldOut && (
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-red-500/40 bg-red-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[3px] text-red-400">Sold Out</span>
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-black text-[#3a2e0f] leading-tight tracking-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
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

          {/* DESCRIPTION */}
          {property.description?.trim() && (
            <div className="space-y-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[5px] text-[#c5a059]">
                About This Property
              </h2>
              <p className="text-[#5a4a2a] leading-[1.9] text-[0.95rem] font-light">
                {property.description}
              </p>
            </div>
          )}

          {/* PROPERTY DETAILS GRID */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[5px] text-[#c5a059] mb-5">
              Property Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <StatCard icon="🌿" label="Lot Size (sqft)" value={property.lotSizeSqft?.toLocaleString("en-IN")} />
              <StatCard icon="🏗️" label="Floors"          value={property.floors} />
              <StatCard icon="🔢" label="Floor Level"     value={property.floorLevel} />
              <StatCard icon="🏛️" label="Year Built"      value={property.yearBuilt} />
              <StatCard icon="🔨" label="Year Remodeled"  value={property.yearRemodeled} />
            </div>
          </div>

          {/* BASIC AMENITIES */}
          {basicAmenities.length > 0 && (
            <div className="space-y-4">
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

          {/* FULL AMENITIES */}
          {fullAmenities.length > 0 && (
            <div className="space-y-4">
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

          {/* TAG SECTIONS */}
          {(property.rentPeriods?.length || property.statuses?.length ||
            property.parkingOptions?.length || property.basementOptions?.length) ? (
            <div className="space-y-5">
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

          {/* CTA */}
          {isSoldOut ? (
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1a0a0a] via-[#1a0505]/80 to-[#200a0a] border border-red-500/20 rounded-[28px] p-8 md:p-12 text-center space-y-4 shadow-[0_10px_40px_rgba(239,68,68,0.08)]">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
              <div className="relative space-y-3">
                <p className="text-[9px] font-bold uppercase tracking-[8px] text-red-400/70">Availability</p>
                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  This Property is<br /><span className="text-red-400">Sold Out</span>
                </h3>
                <p className="text-red-300/60 text-sm max-w-sm mx-auto leading-relaxed">
                  This property is no longer available. Browse our other listings to find your perfect home.
                </p>
              </div>
              <button onClick={handleBackNavigation}
                className="relative inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white font-black text-sm uppercase tracking-[3px] px-10 py-4 rounded-full hover:bg-white/20 transition-all">
                Browse Other Properties
              </button>
            </div>
          ) : (
            <div className="relative overflow-hidden bg-gradient-to-br from-[#fffdf0] via-white/80 to-[#fdf6e3] border border-[#d4af3744] rounded-[28px] p-8 md:p-12 text-center space-y-6 shadow-[0_10px_40px_rgba(197,160,89,0.12)]">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#d4af3715] blur-3xl pointer-events-none" />
              <div className="relative space-y-3">
                <p className="text-[9px] font-bold uppercase tracking-[8px] text-[#c5a059]">Ready to Experience It?</p>
                <h3 className="text-3xl md:text-4xl font-black text-[#3a2e0f] leading-tight">
                  Book a Personal<br /><span className="text-[#d4af37]">Site Visit</span>
                </h3>
                <p className="text-[#8a7040] text-sm max-w-sm mx-auto leading-relaxed">
                  Schedule a private walkthrough with our property advisor at your preferred time.
                </p>
              </div>
              <button onClick={() => setShowBooking(true)}
                className="relative inline-flex items-center gap-3 bg-[#d4af37] text-white font-black text-sm uppercase tracking-[3px] px-10 py-4 rounded-full hover:bg-[#c5a059] transition-all shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-0.5">
                Book a Meet
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Pass full property object to modal */}
      {showBooking && property && !isSoldOut && (
        <BookingModal
          property={property}
          onClose={() => setShowBooking(false)}
        />
      )}

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}