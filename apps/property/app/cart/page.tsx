"use client";

import React, { useState, useEffect , useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/useCart";
import { useAuth } from "@/lib/useAuth";
import { formatPrice } from "@/lib/formatPrice";
import { type CartProperty } from "@/lib/cart";
import LoginModal from "@/app/components/LoginModal";

// ─── Cart Booking Modal ────────────────────────────────────────────────────────
// ─── Cart Booking Modal ────────────────────────────────────────────────────────
function CartBookingModal({
  selectedProperties,
  onClose,
  onSuccess,
}: {
  selectedProperties: CartProperty[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { user } = useAuth();

  const [step,         setStep]         = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [form,         setForm]         = useState({ name: "", email: "", phone: "" });
  const [submitted,    setSubmitted]    = useState(false);
  const [loading,      setLoading]      = useState(false);

  const dateScrollRef = useRef<HTMLDivElement>(null);
  const timeScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, phone: user.phone });
  }, [user]);

  // ── Generate next 4 available dates ────────────────────────────────────────
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableDates: Date[] = Array.from({ length: 4 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const DAY_SHORT  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // ── Time slots ──────────────────────────────────────────────────────────────
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
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:  form.name,
          email: form.email,
          phone: form.phone,
          date:  selectedDate
            ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
            : undefined,
          time:       selectedTime,
          properties: selectedProperties.map(p => ({
            id:           p.id,
            title:        p.title,
            location:     p.location,
            price:        p.price,
            callForPrice: p.callForPrice,
          })),
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
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

  // ── Success screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white border border-[#d4af3744] rounded-[30px] p-10 max-w-md w-full text-center space-y-6 shadow-[0_20px_60px_rgba(197,160,89,0.25)]">
          <div className="w-16 h-16 rounded-full bg-[#d4af3722] border border-[#d4af37] flex items-center justify-center mx-auto">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L19 7" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-[#3a2e0f]">All Visits Booked!</h3>
          <p className="text-[#8a7040] text-sm leading-relaxed">
            <span className="text-[#c5a059] font-bold">{selectedProperties.length} {selectedProperties.length === 1 ? "visit" : "visits"}</span> confirmed for{" "}
            <span className="text-[#3a2e0f] font-semibold">{selectedDate ? formatDate(selectedDate) : ""}</span> at{" "}
            <span className="text-[#d4af37] font-bold">{selectedTime}</span>.
          </p>
          <div className="space-y-1.5 text-left max-h-40 overflow-y-auto">
            {selectedProperties.map(p => (
              <div key={p.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#fdf8ec] border border-[#d4af3733]">
                <span className="text-[#d4af37] text-xs shrink-0">✓</span>
                <span className="text-[11px] font-bold text-[#3a2e0f] truncate">{p.title}</span>
              </div>
            ))}
          </div>
          <p className="text-[#aaa] text-xs">Confirmations sent to {form.email}</p>
          <button onClick={() => { onSuccess(); onClose(); }}
            className="w-full py-3 rounded-2xl bg-[#d4af37] text-white font-black tracking-widest text-sm uppercase hover:bg-[#c5a059] transition-all">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Glass backdrop */}
      <div className="absolute w-[90%] max-w-3xl h-[85%] rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#d4af37]/20 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-md border border-white/40 rounded-[30px] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(197,160,89,0.2)]">

        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#d4af3722]">
          <div>
            <p className="text-[9px] text-[#c5a059] uppercase tracking-[5px] font-bold mb-0.5">Book Site Visits</p>
            <h2 className="text-base font-black text-[#3a2e0f]">
              {selectedProperties.length} {selectedProperties.length === 1 ? "Property" : "Properties"}
            </h2>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#d4af3744] flex items-center justify-center text-[#c5a059] hover:bg-[#d4af3711] transition-all text-sm">
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

        <div className="px-6 pb-6">

          {/* ── STEP 1 — Date & Time scroll pickers ─────────────────────────── */}
          {step === 1 && (
            <div className="space-y-4">

              {/* Date scroll picker */}
              <div>
                <p className="text-[9px] uppercase tracking-[4px] text-[#c5a059] font-bold mb-2.5">Select Date</p>
                <div
                  ref={dateScrollRef}
                  className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {availableDates.map((d, i) => {
                    const isSelected =
                      selectedDate &&
                      selectedDate.getFullYear() === d.getFullYear() &&
                      selectedDate.getMonth()    === d.getMonth()    &&
                      selectedDate.getDate()     === d.getDate();
                    const isToday = i === 0;

                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(d)}
                        className={`flex-shrink-0 snap-start flex flex-col items-center justify-center w-[72px] h-[80px] rounded-2xl border-[1.5px] transition-all duration-200
                          ${isSelected
                            ? "bg-[#d4af37] border-[#d4af37] text-white shadow-[0_0_16px_rgba(212,175,55,0.4)]"
                            : "bg-[#fdfbf0] border-[#d4af3733] text-[#3a2e0f] hover:border-[#d4af37]"}`}
                      >
                        <span className={`text-[9px] font-bold uppercase tracking-widest mb-1
                          ${isSelected ? "text-white/70" : isToday ? "text-[#c5a059]" : "text-[#aaa]"}`}>
                          {isToday ? "Today" : DAY_SHORT[d.getDay()]}
                        </span>
                        <span className="text-2xl font-black leading-none">{d.getDate()}</span>
                        <span className={`text-[9px] font-bold mt-0.5
                          ${isSelected ? "text-white/70" : "text-[#aaa]"}`}>
                          {MONTH_SHORT[d.getMonth()]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time scroll picker */}
              <div>
                <p className="text-[9px] uppercase tracking-[4px] text-[#c5a059] font-bold mb-2.5">Select Time</p>
                <div
                  ref={timeScrollRef}
                  className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {slots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`flex-shrink-0 snap-start px-4 py-3 rounded-2xl border-[1.5px] text-[11px] font-black tracking-wide transition-all duration-200 whitespace-nowrap
                        ${selectedTime === slot
                          ? "bg-[#d4af37] border-[#d4af37] text-white shadow-[0_0_12px_rgba(212,175,55,0.35)]"
                          : "bg-[#fdfbf0] border-[#d4af3733] text-[#8a7040] hover:border-[#d4af37] hover:text-[#3a2e0f]"}`}
                    >
                      {slot}
                    </button>
                  ))}
                  {/* Trailing spacer */}
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
                        : <span className="text-[#c5a05966]">No date selected</span>}
                    </p>
                    <p className="text-[10px] text-[#c5a059] font-semibold">
                      {selectedTime || <span className="text-[#c5a05966]">No time selected</span>}
                    </p>
                  </div>
                  {selectedDate && selectedTime && (
                    <div className="w-5 h-5 rounded-full bg-[#d4af37] flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              <button
                disabled={!canProceedStep1}
                onClick={() => setStep(2)}
                className={`w-full py-3.5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all
                  ${canProceedStep1
                    ? "bg-[#d4af37] text-white hover:bg-[#c5a059] shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    : "bg-[#d4af3722] text-[#c5a05966] cursor-not-allowed"}`}>
                Continue
              </button>
            </div>
          )}

          {/* ── STEP 2 — Details ─────────────────────────────────────────────── */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Date + time recap */}
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
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-[#fdfbf0] border border-[#d4af3744] rounded-xl px-4 py-3 text-sm text-[#3a2e0f] placeholder-[#c5a05966] focus:outline-none focus:border-[#d4af37] transition-all"
                  />
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

          {/* ── STEP 3 — Confirm ─────────────────────────────────────────────── */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-[#fdfbf0] border border-[#d4af3733] rounded-2xl divide-y divide-[#d4af3722]">
                {[
                  { icon: "📅", label: "Date",  value: selectedDate ? formatDate(selectedDate) : "" },
                  { icon: "🕐", label: "Time",  value: selectedTime  },
                  { icon: "👤", label: "Name",  value: form.name     },
                  { icon: "📧", label: "Email", value: form.email    },
                  { icon: "📞", label: "Phone", value: form.phone    },
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

              {/* Properties list */}
              <div>
                <p className="text-[9px] uppercase tracking-[4px] font-bold text-[#c5a059] mb-2">
                  Properties ({selectedProperties.length})
                </p>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {selectedProperties.map(p => (
                    <div key={p.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#fdfbf0] border border-[#d4af3733]">
                      <span className="text-[#d4af37] text-xs font-black shrink-0">✓</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-[#3a2e0f] truncate">{p.title}</p>
                        <p className="text-[10px] text-[#c5a059] truncate">{p.location}</p>
                      </div>
                      <span className="text-[10px] font-black text-[#d4af37] shrink-0">
                        {p.callForPrice ? "Call" : `₹${formatPrice(p.price)}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)}
                  className="flex-1 py-3.5 rounded-2xl border border-[#d4af3744] text-sm font-bold text-[#8a7040] hover:text-[#3a2e0f] hover:border-[#c5a059] transition-all">
                  Edit
                </button>
                <button onClick={handleSubmit} disabled={loading}
                  className="flex-[2] py-3.5 rounded-2xl bg-[#d4af37] text-white font-black uppercase tracking-widest text-sm hover:bg-[#c5a059] transition-all shadow-[0_0_24px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2">
                  {loading
                    ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Booking...</>
                    : `Confirm ${selectedProperties.length} Visit${selectedProperties.length > 1 ? "s" : ""}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

// ─── Cart Page ─────────────────────────────────────────────────────────────────
export default function CartPage() {
  const router                            = useRouter();
const { cart, remove: removeFromCart, clear: clearCart } = useCart(); 
 const { user, isLoggedIn, loading: authLoading } = useAuth();

  const [selectedIds,      setSelectedIds]      = useState<Set<string>>(new Set());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLogin,        setShowLogin]        = useState(false);

  // Auto-select all non-sold-out on cart load
  useEffect(() => {
    if (isLoggedIn) {
      setSelectedIds(new Set(cart.filter(p => !p.isSoldOut).map(p => p.id)));
    }
  }, [cart.length, isLoggedIn]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedProperties = cart.filter(p => selectedIds.has(p.id));

  // ── Auth loading ───────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#fdf8f0] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <>
        <main className="min-h-screen bg-[#fdf8f0] flex flex-col items-center justify-center gap-6 px-6 pt-32">
          <div className="text-center space-y-5 max-w-sm">
            {/* Lock icon */}
            <div className="w-24 h-24 rounded-full border border-[#d4af3744] bg-white flex items-center justify-center mx-auto shadow-[0_4px_20px_rgba(197,160,89,0.15)]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[6px] text-[#c5a059] mb-2">Lavelle Venture</p>
              <h1 className="text-2xl font-black text-[#3a2e0f]">Sign in to view your cart</h1>
              <p className="mt-2 text-[#8a7040] text-sm leading-relaxed">
                Save properties, manage your wishlist, and book site visits — all in one place.
              </p>
            </div>
            <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            <button
              onClick={() => setShowLogin(true)}
              className="w-full py-4 rounded-full bg-[#d4af37] text-white font-black text-sm uppercase tracking-widest hover:bg-[#c5a059] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)]">
              Sign In
            </button>
            <button
              onClick={() => router.back()}
              className="text-[11px] text-[#aaa] hover:text-[#c5a059] uppercase tracking-widest font-bold transition-all">
              ← Go Back
            </button>
          </div>
        </main>

        {showLogin && (
          <LoginModal
            reason="Sign in to access your saved properties"
            onClose={() => setShowLogin(false)}
            onSuccess={() => setShowLogin(false)}
          />
        )}
        <style jsx global>{`body { background-color: #fdf8f0; }`}</style>
      </>
    );
  }

  // ── Empty cart ─────────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#fdf8f0] flex flex-col items-center justify-center gap-6 px-6 pt-32">
        <div className="text-center space-y-5 max-w-sm">
          <div className="w-24 h-24 rounded-full border border-[#d4af3744] bg-white flex items-center justify-center mx-auto shadow-[0_4px_20px_rgba(197,160,89,0.15)]">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[6px] text-[#c5a059] mb-2">
              Hello, {user?.name.split(" ")[0]}
            </p>
            <h1 className="text-2xl font-black text-[#3a2e0f]">Your cart is empty</h1>
            <p className="mt-2 text-[#8a7040] text-sm leading-relaxed">
              Browse our curated listings and add properties to your cart to book site visits.
            </p>
          </div>
          <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          <button
            onClick={() => router.back()}
            className="w-full py-4 rounded-full bg-[#d4af37] text-white font-black text-sm uppercase tracking-widest hover:bg-[#c5a059] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            Browse Properties
          </button>
        </div>
        <style jsx global>{`body { background-color: #fdf8f0; }`}</style>
      </main>
    );
  }

  // ── Cart with items ────────────────────────────────────────────────────────
  return (
    <>
      <main className="min-h-screen bg-[#fdf8f0] pt-42 pb-36 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            
            <h1 className="mt-2 text-3xl font-black text-[#3a2e0f]">Saved Properties</h1>
            <div className="mt-3 mx-auto h-[1px] w-16 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
            <p className="mt-3 text-[#888] text-xs uppercase tracking-[4px] font-bold">
              {cart.length} {cart.length === 1 ? "property" : "properties"} · Select to book visits
            </p>
            {user && (
              <p className="mt-1 text-[11px] text-[#c5a059] font-bold">
                Welcome back, {user.name.split(" ")[0]} 👋
              </p>
            )}
          </div>

          {/* Select all / Clear all */}
          <div className="flex items-center justify-between mb-5 px-1">
            <button
              onClick={() => {
                const allIds = new Set(cart.filter(p => !p.isSoldOut).map(p => p.id));
                setSelectedIds(selectedIds.size === allIds.size ? new Set() : allIds);
              }}
              className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest hover:text-[#d4af37] transition-all">
              {selectedIds.size === cart.filter(p => !p.isSoldOut).length ? "Deselect All" : "Select All"}
            </button>
            <button
              onClick={() => { clearCart(); setSelectedIds(new Set()); }}
              className="text-[10px] font-bold text-[#bbb] uppercase tracking-widest hover:text-red-400 transition-all">
              Clear Cart
            </button>
          </div>

          {/* Cart items */}
          <div className="space-y-4">
            {cart.map(prop => {
              const isSelected = selectedIds.has(prop.id);

              return (
                <div
                  key={prop.id}
                  onClick={() => { if (!prop.isSoldOut) toggleSelect(prop.id); }}
                  className={`relative flex gap-0 rounded-[20px] border overflow-hidden transition-all duration-300
                    ${prop.isSoldOut
                      ? "opacity-50 grayscale border-[#e8dfc8] bg-white cursor-not-allowed"
                      : isSelected
                      ? "border-[#d4af37] bg-white shadow-[0_0_0_2px_rgba(212,175,55,0.2),0_4px_20px_rgba(197,160,89,0.15)] cursor-pointer"
                      : "border-[#e8dfc8] bg-white hover:border-[#d4af3799] cursor-pointer shadow-[0_2px_10px_rgba(197,160,89,0.08)]"}`}
                >
                  {/* Left selection stripe */}
                  <div className={`w-1 flex-shrink-0 transition-all duration-300 ${isSelected && !prop.isSoldOut ? "bg-[#d4af37]" : "bg-transparent"}`} />

                  <div className="flex flex-1 gap-4 p-4">
                    {/* Checkbox */}
                    {!prop.isSoldOut && (
                      <div className={`self-start mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                        ${isSelected ? "bg-[#d4af37] border-[#d4af37]" : "bg-transparent border-[#d4af3766]"}`}>
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    )}

                    {/* Image */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden bg-[#f5ede0]">
                      {prop.imageUrl ? (
                        <img src={prop.imageUrl} alt={prop.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[8px] text-[#c5a059] uppercase tracking-widest font-bold text-center px-1">Luxury</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-[#f0f9ff] border border-[#60a5fa]/30 text-[#60a5fa] uppercase tracking-widest">
                          {prop.type}
                        </span>
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-[#f0fdf4] border border-emerald-200 text-emerald-600 uppercase tracking-widest">
                          {prop.layoutType?.replace(/^BHK(\d+)(?:_(\d+))?(P)?$/, (_, n, dec, plus) =>
                            `${n}${dec ? `.${dec}` : ""}${plus ? "+" : ""} BHK`
                          )}
                        </span>
                        {prop.isSoldOut && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-500 uppercase tracking-widest">
                            Sold Out
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-black text-[#3a2e0f] leading-tight line-clamp-1">{prop.title}</h3>
                      <p className="text-[11px] text-[#c5a059] font-semibold mt-0.5 truncate">📍 {prop.location}</p>

                      <div className="flex items-center gap-2 mt-1 text-[10px] text-[#aaa]">
                        {prop.bedrooms  != null && <span>🛏 {prop.bedrooms}</span>}
                        {prop.bathrooms != null && <span>🚿 {prop.bathrooms}</span>}
                        {prop.areaSqft  != null && <span>📐 {prop.areaSqft.toLocaleString("en-IN")} sqft</span>}
                      </div>

                      {/* Price */}
                      <div className="mt-2">
                        <span className="text-lg font-black text-[#d4af37]">
                          {prop.callForPrice ? "Call for Price" : `₹${formatPrice(prop.price)}`}
                        </span>
                        {prop.pricePerSqft && (
                          <span className="ml-2 text-[10px] text-[#bbb]">₹{formatPrice(prop.pricePerSqft)}/sqft</span>
                        )}
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={e => { e.stopPropagation(); removeFromCart(prop.id); }}
                      className="self-start p-1.5 rounded-full border border-[#e8dfc8] text-[#ccc] hover:text-red-400 hover:border-red-200 transition-all"
                      title="Remove from cart"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating Book Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-4 bg-[#3a2e0f]/95 backdrop-blur-xl border border-[#d4af3744] rounded-full px-6 py-3 shadow-[0_8px_40px_rgba(58,46,15,0.4)]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#d4af37] flex items-center justify-center text-black text-[10px] font-black">
                {selectedIds.size}
              </div>
              <span className="text-white text-[11px] font-bold uppercase tracking-widest hidden sm:block">
                {selectedIds.size === 1 ? "Property" : "Properties"} Selected
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/20" />
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-[10px] font-bold text-[#888] hover:text-red-400 uppercase tracking-widest transition-all">
              Clear
            </button>
            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-[#d4af37] text-black text-[11px] font-black uppercase tracking-widest px-5 py-2 rounded-full hover:bg-[#c5a059] hover:text-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              Book Visit{selectedIds.size > 1 ? "s" : ""}
            </button>
          </div>
        </div>
      )}

      {showBookingModal && selectedProperties.length > 0 && (
        <CartBookingModal
          selectedProperties={selectedProperties}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => {
            setSelectedIds(new Set());
            clearCart();
          }}
        />
      )}

      <style jsx global>{`
        body { background-color: #fdf8f0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}