/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { cartService } from "@/services/cartService";
import type { CartItem } from "@/types/cart";

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  loading: boolean;
  loadCartItems: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadCartCount();
      loadCartItems();
    }
  }, []);

  const loadCartCount = async () => {
    try {
      const res = await cartService.getCount();
      setCartCount(res.data?.totalItems || 0);
    } catch (err) {
      console.error("Cart count load failed:", err);
    }
  };

const loadCartItems = async () => {
  try {
    setLoading(true);
    const res = await cartService.getCart();

    const items = res.data?.items?.map((ci: any) => ({
      productId: ci.productId,
      name: ci.productName,
      description: ci.productDescription,
      price: ci.productDiscountPrice ?? ci.productPrice,
      imageUrl: ci.productImageUrl,
      quantity: ci.quantity
    })) || [];

    setCartItems(items);
  } finally {
    setLoading(false);
  }
};


  const addToCart = async (productId: number, quantity = 1) => {
    try {
      await cartService.addToCart(productId, quantity);
      await loadCartItems();    // ✅ add this
    await loadCartCount();
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      await cartService.updateQuantity(productId, quantity);
      await loadCartItems();
      await loadCartCount();
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await cartService.removeItem(productId);
      await loadCartItems();
      await loadCartCount();
    } catch (err) {
      console.error("Remove item failed:", err);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCartItems([]);
      setCartCount(0);
    } catch (err) {
      console.error("Clear Cart Failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        loading,
        loadCartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
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
