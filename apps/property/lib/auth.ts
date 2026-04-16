export interface AuthUser {
  id:    string;
  name:  string;
  email: string;
  phone: string;
}

const AUTH_KEY = "lv_user";

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: AuthUser): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("auth-updated"));
}

export function clearUser(): void {
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("auth-updated"));
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}