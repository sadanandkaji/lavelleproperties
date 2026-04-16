"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/useCart";
import { useAuth } from "@/lib/useAuth";
import LoginModal from "./LoginModal";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { count } = useCart();
  const { user, isLoggedIn, logout, loading } = useAuth();

  const [showLogin,    setShowLogin]    = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center h-[110px] sm:h-[150px] bg-transparent border-b border-[#c5a05933]">
        <div className="w-full max-w-[1200px] flex items-center justify-center px-4 sm:px-6">
          <img
            src="/lavelleprop.svg"
            alt="Lavelle Venture"
            className="h-[100px] sm:h-[140px] w-auto object-contain"
          />
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Nav height: tall on mobile too so logo has room */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center h-[80px] sm:h-[120px] bg-transparent border-b border-[#c5a05933] transition-all duration-300 ease-in-out">
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between px-4 sm:px-6">

          {/* LEFT — Sign In / Avatar */}
          <div className="flex items-center w-[80px] sm:w-[120px]">
            {isLoggedIn && user ? (
              <div className="relative" ref={dropdownRef}>

                <button
                  onClick={() => setShowDropdown(p => !p)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 rounded-full border border-[#d4af3744] bg-white/10 backdrop-blur-md hover:bg-[#d4af3715] transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-[#d4af37] flex items-center justify-center text-black text-[11px] font-black shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest hidden sm:block max-w-[70px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                    className={`text-[#c5a059] transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}>
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-xl border border-[#d4af3733] rounded-2xl shadow-[0_10px_40px_rgba(197,160,89,0.2)] overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#d4af3722]">
                      <p className="text-[10px] text-[#c5a059] uppercase tracking-[3px] font-bold truncate">{user.name}</p>
                      <p className="text-[10px] text-[#aaa] mt-0.5 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => { setShowDropdown(false); router.push("/cart"); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold text-[#5a4a2a] uppercase tracking-widest hover:bg-[#d4af3711] transition-all"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                      My Cart
                      {count > 0 && (
                        <span className="ml-auto w-5 h-5 rounded-full bg-[#d4af37] text-black text-[9px] font-black flex items-center justify-center">
                          {count > 9 ? "9+" : count}
                        </span>
                      )}
                    </button>

                    <div className="h-[1px] bg-[#d4af3722]" />

                    <button
                      onClick={() => { logout(); setShowDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold text-red-400 uppercase tracking-widest hover:bg-red-50 transition-all"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border border-[#d4af3744] bg-white/10 backdrop-blur-md text-[#c5a059] text-[10px] sm:text-[11px] font-black uppercase tracking-widest hover:bg-[#d4af37] hover:text-white hover:border-[#d4af37] transition-all duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="hidden sm:block">Sign In</span>
              </button>
            )}
          </div>

          {/* CENTER — Logo, big on both mobile and desktop */}
          <div className="flex-1 flex justify-center">
            <img
              src="/lavelleprop.svg"
              alt="Lavelle Venture"
              onClick={() => router.push("/")}
              className="h-[100px] sm:h-[140px] w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>

          {/* RIGHT — Cart */}
          <div className="flex items-center w-[80px] sm:w-[120px] justify-end">
            <button
              onClick={() => {
                if (!isLoggedIn) { setShowLogin(true); return; }
                router.push("/cart");
              }}
              className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#d4af3744] bg-white/10 backdrop-blur-md hover:bg-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-300 hover:scale-110 active:scale-95"
              title="View Cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>

              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#d4af37] text-black text-[9px] font-black flex items-center justify-center shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          </div>

        </div>
      </nav>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => setShowLogin(false)}
        />
      )}
    </>
  );
};

export default Navbar;