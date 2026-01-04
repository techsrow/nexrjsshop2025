/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { cartService } from "@/services/cartService";
import { useAuth } from "@/context/AuthContext";
import { promises } from "dns";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};

type CartContextType = {
  cartCount: number;
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (productId: number, quantity?: number, productData?: Partial<CartItem>) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCartItems: () => Promise<void>;
   refreshCartCount: () => Promise<void>;
};

const LS_KEY = "guestCart";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth(); // must be client-only hook
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // ------- localStorage helpers -------
  const readGuest = (): CartItem[] => {
    try {
      if (typeof window === "undefined") return [];
      return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    } catch {
      return [];
    }
  };
  const writeGuest = (items: CartItem[]) => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
    // notify other listeners in this tab
    window.dispatchEvent(new CustomEvent("guestCartUpdated"));
  };

  // ------- sync helpers -------
  const syncStateFromGuest = () => {
    const guest = readGuest();
    setCartItems(guest);
    setCartCount(guest.reduce((s, it) => s + it.quantity, 0));
  };

  const syncStateFromServer = async () => {
    try {
      setLoading(true);
      const res = await cartService.getCart();
      const items =
        res.data?.items?.map((ci: any) => ({
          productId: ci.productId,
          name: ci.productName,
          price: ci.productPrice,
          imageUrl: ci.productImageUrl,
          quantity: ci.quantity,
        })) || [];
      setCartItems(items);
      // setCartCount(items.reduce((s, it) => s + it.quantity, 0));
      setCartCount(
  items.reduce((s: number, it: { quantity: number }) => s + it.quantity, 0)
);

    } catch (err) {
      // fallback to guest if server fails
      syncStateFromGuest();
    } finally {
      setLoading(false);
    }
  };

  // ------- public API -------
  const loadCartItems = async () => {
    if (!token) {
      syncStateFromGuest();
    } else {
      await syncStateFromServer();
    }
  };

  const addToCart = async (productId: number, quantity = 1, productData?: any) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      // Logged-in → Send to API cart
      await cartService.addToCart(productId, quantity);
      await loadCartItems();
      await refreshCartCount();

    } else {
      // Guest → Save FULL DETAILS to localStorage
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

      const existing = guestCart.find((item: any) => item.productId === productId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        guestCart.push({
          productId,
          quantity,
          ...productData, // name, price, imageUrl stored!
        });
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      setCartItems(guestCart);
      setCartCount(guestCart.reduce((sum: number, i: any) => sum + i.quantity, 0));
    }
  } catch (err) {
    console.error("Add to cart failed:", err);
  }
};

  // const addToCart = async (productId: number, quantity = 1, productData?: Partial<CartItem>) => {
  //   if (!token) {
  //     // guest flow
  //     const guest = readGuest();
  //     const found = guest.find((g) => g.productId === productId);
  //     if (found) {
  //       found.quantity += quantity;
  //     } else {
  //       guest.push({
  //         productId,
  //         name: productData?.name || "",
  //         price: productData?.price ?? 0,
  //         imageUrl: productData?.imageUrl,
  //         quantity,
  //       });
  //     }
  //     writeGuest(guest);
  //     syncStateFromGuest();
  //     return;
  //   }

  //   // logged-in flow - call backend
  //   await cartService.addToCart(productId, quantity);
  //   await syncStateFromServer();
  // };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!token) {
      const guest = readGuest();
      const it = guest.find((g) => g.productId === productId);
      if (it) it.quantity = quantity;
      writeGuest(guest);
      syncStateFromGuest();
      return;
    }

    await cartService.updateQuantity(productId, quantity);
    await syncStateFromServer();
  };

  const removeItem = async (productId: number) => {
    if (!token) {
      const guest = readGuest().filter((g) => g.productId !== productId);
      writeGuest(guest);
      syncStateFromGuest();
      return;
    }

    await cartService.removeItem(productId);
    await syncStateFromServer();
  };

// const clearCart = async () => {
//   const storedToken = localStorage.getItem("token");  //✅ REAL TOKEN SOURCE

//   if (!storedToken) {
//     writeGuest([]);
//     syncStateFromGuest();
//     return;
//   }

//   try {
//     await cartService.clearCart();
//     setCartItems([]);
//     setCartCount(0); // ✅ UI updates instantly
//   } catch (error) {
//     console.error("Clear cart error:", error);
//   }
// };


  // const clearCart = async () => {
  //   if (!token) {
  //     writeGuest([]);
  //     syncStateFromGuest();
  //     return;
  //   }

  //   await cartService.clearCart();
  //   await syncStateFromServer();
  // };


  const clearCart = async () => {
  const storedToken = localStorage.getItem("token"); // ✅ always correct

  if (!storedToken) {
    writeGuest([]);
    setCartItems([]);
    setCartCount(0);
    return;
  }

  try {
    await cartService.clearCart(storedToken); // pass token directly

    // instantly wipe UI
    setCartItems([]);
    setCartCount(0);
  } catch (error) {
    console.error("Clear cart failed:", error);
  }
};


  // ------- merge guest cart on login -------
  useEffect(() => {
    const mergeGuest = async () => {
      if (!token) return;
      const guest = readGuest();
      if (!guest.length) {
        await syncStateFromServer();
        return;
      }

      // merge items one-by-one, backend should upsert as you have implemented
      for (const it of guest) {
        try {
          await cartService.addToCart(it.productId, it.quantity);
        } catch (err) {
          console.warn("Merge item failed", err);
        }
      }
      // remove guest cart and reload from server
      localStorage.removeItem(LS_KEY);
      await syncStateFromServer();
    };

    mergeGuest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ------- storage event listener (other tabs) & internal custom event -------
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY) {
        syncStateFromGuest();
      }
    };
    const onCustom = () => syncStateFromGuest();

    window.addEventListener("storage", onStorage);
    window.addEventListener("guestCartUpdated", onCustom as EventListener);

    // initial load
    loadCartItems();

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("guestCartUpdated", onCustom as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshCartCount = async () => {
  try {
    if (token) {
      const res = await cartService.getCart();
      const items =
        res.data?.items?.map((ci: any) => ({
          productId: ci.productId,
          name: ci.productName,
          price: ci.productPrice,
          imageUrl: ci.productImageUrl,
          quantity: ci.quantity,
        })) || [];

      setCartCount(items.reduce((s: number, it: any) => s + it.quantity, 0));
    } else {
      const guest = readGuest();
      setCartCount(guest.reduce((s: number, it: any) => s + it.quantity, 0));
    }
  } catch (err) {
    console.error("Failed to refresh cart count:", err);
  }
};


  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        loadCartItems,
        refreshCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
