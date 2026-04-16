"use client";

import React, { useState, useEffect } from "react";
import { saveUser, type AuthUser } from "@/lib/auth";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
  reason?: string;
}

export default function LoginModal({ onClose, onSuccess, reason }: LoginModalProps) {
  const [form,    setForm]    = useState({ name: "", email: "", phone: "" });
  const [errors,  setErrors]  = useState<Partial<Record<keyof typeof form, string>>>({});
  const [apiError,setApiError]= useState("");
  const [loading, setLoading] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof typeof form, string>> = {};

    if (!form.name.trim())
      errs.name = "Name is required";

    if (!form.email.trim())
      errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Enter a valid email address";

    if (!form.phone.trim())
      errs.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim().replace(/\s/g, "")))
      errs.phone = "Enter a valid 10-digit Indian mobile number";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:  form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim().replace(/\s/g, ""),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Something went wrong. Please try again.");
        return;
      }

      // Save to localStorage and notify
      const user: AuthUser = {
        id:    data.id,
        name:  data.name,
        email: data.email,
        phone: data.phone,
      };
      saveUser(user);
      onSuccess(user);

    } catch (err) {
      console.error("Login error:", err);
      setApiError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name",  label: "Full Name",     type: "text",  placeholder: "Your full name",       icon: "👤" },
    { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com",      icon: "📧" },
    { key: "phone", label: "Mobile Number", type: "tel",   placeholder: "10-digit mobile no.",  icon: "📞" },
  ] as const;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Ambient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#d4af37]/8 blur-[120px] pointer-events-none" />

      <div
        className="relative z-10 w-full max-w-md animate-[loginSlideUp_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Card */}
        <div className="bg-white/92 backdrop-blur-2xl border border-[#d4af3733] rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(212,175,55,0.08)]">

          {/* Gold top bar */}
          <div className="h-[3px] w-full bg-gradient-to-r from-[#c5a059] via-[#f0d060] to-[#c5a059]" />

          <div className="px-8 pt-8 pb-9">

            {/* Header row */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#d4af37] to-[#c5a059] flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[5px] text-[#c5a059]">
                    Lavelle Venture
                  </span>
                </div>
                <h2 className="text-[1.6rem] font-black text-[#2a1f08] tracking-tight leading-tight">
                  Welcome
                </h2>
                <p className="mt-1.5 text-[12px] text-[#8a7040] leading-relaxed max-w-[240px]">
                  {reason ?? "Sign in to save properties and book visits"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-[#d4af3733] flex items-center justify-center text-[#c5a059] hover:bg-[#d4af3711] hover:border-[#d4af3766] transition-all shrink-0 mt-0.5"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af3733] to-transparent mb-6" />

            {/* API error banner */}
            {apiError && (
              <div className="mb-4 flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
                <span className="text-red-500 text-sm mt-0.5">⚠</span>
                <p className="text-xs text-red-600 font-semibold leading-relaxed">{apiError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(({ key, label, type, placeholder, icon }) => (
                <div key={key}>
                  <label className="block text-[10px] font-black uppercase tracking-[3px] text-[#8a7040] mb-1.5">
                    {label}
                  </label>
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm pointer-events-none select-none">
                      {icon}
                    </span>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={e => {
                        setForm(f => ({ ...f, [key]: e.target.value }));
                        setErrors(er => ({ ...er, [key]: undefined }));
                        setApiError("");
                      }}
                      placeholder={placeholder}
                      autoComplete={key === "email" ? "email" : key === "name" ? "name" : "tel"}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-[13px] text-[#2a1f08] placeholder-[#c5a05955] bg-[#fdfbf4] focus:outline-none focus:bg-white transition-all
                        ${errors[key]
                          ? "border-red-400 focus:border-red-400"
                          : "border-[#e8dfc8] focus:border-[#d4af37] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)]"}`}
                    />
                  </div>
                  {errors[key] && (
                    <p className="mt-1.5 text-[10px] text-red-500 font-bold uppercase tracking-wide flex items-center gap-1">
                      <span>⚠</span> {errors[key]}
                    </p>
                  )}
                </div>
              ))}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-[14px] rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-white font-black text-[12px] uppercase tracking-[3px] hover:from-[#c5a059] hover:to-[#b8860b] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.5)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2.5 active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Continue
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="mt-5 text-center text-[10px] text-[#bbb] leading-relaxed">
              By continuing you agree to receive booking confirmations at your email & phone.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes loginSlideUp {
          from {
            opacity: 0;
            transform: translateY(32px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}