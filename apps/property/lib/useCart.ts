"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getCart, addToCart, removeFromCart, clearCart,
  isInCart, syncCartFromDB, type CartProperty,
} from "./cart";
import { useAuth } from "./useAuth";

export function useCart() {
  const { user } = useAuth();
  const [cart,  setCart]  = useState<CartProperty[]>([]);
  const [count, setCount] = useState(0);

  const refresh = useCallback(() => {
    const c = getCart();
    setCart(c);
    setCount(c.length);
  }, []);

  // Listen for localStorage changes
  useEffect(() => {
    refresh();
    window.addEventListener("cart-updated", refresh);
    return () => window.removeEventListener("cart-updated", refresh);
  }, [refresh]);

  // When user logs in — sync their DB cart into localStorage
  useEffect(() => {
    if (user?.email) {
      syncCartFromDB(user.email).then(refresh);
    }
  }, [user?.email]);

  const add = useCallback(async (property: CartProperty) => {
    if (!user?.email) return;
    await addToCart(property, user.email);
    refresh();
  }, [user?.email, refresh]);

  const remove = useCallback(async (id: string) => {
    if (!user?.email) return;
    await removeFromCart(id, user.email);
    refresh();
  }, [user?.email, refresh]);

  const clear = useCallback(async () => {
    if (!user?.email) return;
    await clearCart(user.email);
    refresh();
  }, [user?.email, refresh]);

  return {
    cart,
    count,
    add,
    remove,
    clear,
    isInCart,
    refresh,
  };
}