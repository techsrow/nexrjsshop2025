/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { cartService } from "@/services/cartService";
import { useAuth } from "./AuthContext";

/* ---------------- TYPES ---------------- */

type CartItem = {
  variantId: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  variant?: {
    size?: string;
    color?: string;
    weight?: string;
  };
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (variantId: number, quantity?: number, meta?: Partial<CartItem>) => Promise<void>;
  updateQuantity: (variantId: number, quantity: number) => Promise<void>;
  removeItem: (variantId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCartItems: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);
const LS_KEY = "guestCart";

/* ---------------- PROVIDER ---------------- */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  /* ---------- Guest helpers ---------- */

  const readGuest = (): CartItem[] => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const writeGuest = (items: CartItem[]) => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  };

  /* ---------- Load cart ---------- */

  const loadCartItems = async () => {
    // 🔹 GUEST
    if (!token) {
      const guest = readGuest();
      setCartItems(guest);
      setCartCount(
        guest.reduce((sum, i) => sum + (i.quantity || 0), 0)
      );
      return;
    }

    // 🔹 LOGGED IN
    const res = await cartService.getCart();

    const items: CartItem[] =
      res.data?.items?.map((ci: any) => ({
        variantId: ci.variantId,
        productId: ci.productId,
        name: ci.productName,
        imageUrl: ci.productImageUrl,
        price: Number(ci.variant.discountPrice ?? ci.variant.price),
        quantity: Number(ci.quantity),
        variant: {
          size: ci.variant.size,
          color: ci.variant.color,
          weight: ci.variant.weight,
        },
      })) || [];

    setCartItems(items);
    setCartCount(items.reduce((sum, i) => sum + i.quantity, 0));
  };

  /* ---------- Add to cart ---------- */

  const addToCart = async (
    variantId: number,
    quantity = 1,
    meta?: Partial<CartItem>
  ) => {
    // 🔹 GUEST
    if (!token) {
      const guest = readGuest();
      const found = guest.find((i) => i.variantId === variantId);

      if (found) {
        found.quantity += quantity;
      } else {
        guest.push({
          variantId,
          productId: meta?.productId || 0,
          name: meta?.name || "",
          price: meta?.price || 0,
          imageUrl: meta?.imageUrl,
          quantity,
          variant: meta?.variant,
        });
      }

      writeGuest(guest);
      await loadCartItems();
      return;
    }

    // 🔹 LOGGED IN
    await cartService.addToCart(variantId, quantity);
    await loadCartItems();
  };

  /* ---------- Update quantity ---------- */

  const updateQuantity = async (variantId: number, quantity: number) => {
    if (!token) {
      const guest = readGuest().map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i
      );
      writeGuest(guest);
      await loadCartItems();
      return;
    }

    await cartService.updateQuantity(variantId, quantity);
    await loadCartItems();
  };

  /* ---------- Remove item ---------- */

  const removeItem = async (variantId: number) => {
    if (!token) {
      const guest = readGuest().filter((i) => i.variantId !== variantId);
      writeGuest(guest);
      await loadCartItems();
      return;
    }

    await cartService.removeItem(variantId);
    await loadCartItems();
  };

  /* ---------- Clear cart ---------- */

  const clearCart = async () => {
    if (!token) {
      writeGuest([]);
      setCartItems([]);
      setCartCount(0);
      return;
    }

    await cartService.clearCart(token);
    setCartItems([]);
    setCartCount(0);
  };

  /* ---------- Effects ---------- */

  useEffect(() => {
    loadCartItems();
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        loadCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* ---------------- HOOK ---------------- */

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
