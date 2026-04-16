"use client";

import { useEffect, useState } from "react";
import { getUser, saveUser, clearUser, type AuthUser } from "./auth";

export function useAuth() {
  const [user,    setUser]    = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setUser(getUser());
    setLoading(false);
  };

  useEffect(() => {
    refresh();
    window.addEventListener("auth-updated", refresh);
    return () => window.removeEventListener("auth-updated", refresh);
  }, []);

  const login = (u: AuthUser) => {
    saveUser(u);
    setUser(u);
  };

  const logout = () => {
    clearUser();
    setUser(null);
  };

  return {
    user,
    loading,
    isLoggedIn: user !== null,
    login,
    logout,
  };
}