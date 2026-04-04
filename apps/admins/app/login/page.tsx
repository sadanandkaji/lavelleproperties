"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, skip login page entirely
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) router.replace("/");
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      // Store session token
      localStorage.setItem("admin_token", data.token);
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] font-mono flex items-center justify-center px-4">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#555]">
              Lavelle Ventures
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            PROPERTY ADMIN
          </h1>
          <p className="mt-1 text-xs text-[#444] uppercase tracking-widest">
            Secure Access Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-[#222] bg-[#141414] p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#555]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="w-full rounded border border-[#2a2a2a] bg-[#0f0f0f] px-4 py-3 text-sm text-white placeholder-[#333] outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#555]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded border border-[#2a2a2a] bg-[#0f0f0f] px-4 py-3 text-sm text-white placeholder-[#333] outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded border border-red-500/20 bg-red-500/10 px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded bg-emerald-500 px-5 py-3 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  AUTHENTICATING...
                </>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#333] uppercase tracking-widest">
          Restricted Access — Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}