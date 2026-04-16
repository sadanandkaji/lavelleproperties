export interface CartProperty {
  id:              string;
  title:           string;
  location:        string;
  price:           number;
  pricePerSqft?:   number | null;
  callForPrice?:   boolean;
  type:            string;
  subType:         string;
  layoutType:      string;
  furnishing:      string;
  amenityCategory: "BASIC" | "FULL";
  bedrooms?:       number | null;
  bathrooms?:      number | null;
  areaSqft?:       number | null;
  isSoldOut?:      boolean;
  imageUrl:        string;
}

const CART_KEY = "lv_property_cart";

// ── localStorage helpers (instant UI) ─────────────────────────────────────────
export function getCart(): CartProperty[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function setCartLocal(items: CartProperty[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function isInCart(id: string): boolean {
  return getCart().some(p => p.id === id);
}

export function getCartCount(): number {
  return getCart().length;
}

// ── DB sync helpers ────────────────────────────────────────────────────────────
export async function addToCart(property: CartProperty, userEmail: string): Promise<void> {
  // 1. Instant localStorage update
  const cart = getCart();
  if (!cart.some(p => p.id === property.id)) {
    setCartLocal([...cart, property]);
  }

  // 2. Sync to DB in background
  try {
    await fetch("/api/cart", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, propertyId: property.id }),
    });
  } catch (e) {
    console.error("Cart DB sync failed:", e);
  }
}

export async function removeFromCart(id: string, userEmail: string): Promise<void> {
  // 1. Instant localStorage update
  setCartLocal(getCart().filter(p => p.id !== id));

  // 2. Sync to DB
  try {
    await fetch("/api/cart", {
      method:  "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, propertyId: id }),
    });
  } catch (e) {
    console.error("Cart DB remove failed:", e);
  }
}

export async function clearCart(userEmail: string): Promise<void> {
  // 1. Instant localStorage clear
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cart-updated"));

  // 2. Sync to DB
  try {
    await fetch("/api/cart", {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    });
  } catch (e) {
    console.error("Cart DB clear failed:", e);
  }
}

// Load cart from DB and sync into localStorage (call on login/page load)
export async function syncCartFromDB(userEmail: string): Promise<void> {
  try {
    const res  = await fetch(`/api/cart?email=${encodeURIComponent(userEmail)}`);
    const items = await res.json();
    if (!Array.isArray(items)) return;

    // Map DB CartItems → CartProperty shape
    const mapped: CartProperty[] = items
      .filter((item: any) => item.property)
      .map((item: any) => {
        const p = item.property;
        const primaryImg =
          p.images?.find((i: any) => i.isPrimary)?.url ??
          p.images?.[0]?.url ?? "";
        const TRANSFORM = "w_600,h_400,c_fill,q_auto,f_auto";
        const imageUrl = primaryImg.includes("res.cloudinary.com") && primaryImg.includes("/upload/")
          ? primaryImg.replace("/upload/", `/upload/${TRANSFORM}/`)
          : primaryImg;

        return {
          id:              p.id,
          title:           p.title,
          location:        p.location,
          price:           p.price,
          pricePerSqft:    p.pricePerSqft  ?? null,
          callForPrice:    p.callForPrice  ?? false,
          type:            p.type,
          subType:         p.subType,
          layoutType:      p.layoutType,
          furnishing:      p.furnishing,
          amenityCategory: p.amenityCategory,
          bedrooms:        p.bedrooms      ?? null,
          bathrooms:       p.bathrooms     ?? null,
          areaSqft:        p.areaSqft      ?? null,
          isSoldOut:       p.isSoldOut     ?? false,
          imageUrl,
        };
      });

    setCartLocal(mapped);
  } catch (e) {
    console.error("Cart sync from DB failed:", e);
  }
}