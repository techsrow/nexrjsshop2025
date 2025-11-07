/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Cart`;

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

const cartService = {
  async getCart() {
    if (isAuthenticated()) {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return await res.json();
    } else {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
  },

  async addToCart(productId: number, quantity: number = 1) {
    if (isAuthenticated()) {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      return await res.json();
    } else {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cart.find((item: any) => item.productId === productId);
      if (existing) existing.quantity += quantity;
      else cart.push({ productId, quantity });
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
  },

  async removeFromCart(productId: number) {
    if (isAuthenticated()) {
      const res = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return await res.json();
    } else {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart = cart.filter((item: any) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
  },

  async clearCart() {
    if (isAuthenticated()) {
      await fetch(`${API_URL}/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } else {
      localStorage.removeItem("cart");
    }
  },

  async mergeGuestCart() {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (localCart.length > 0 && isAuthenticated()) {
      const res = await fetch(`${API_URL}/merge-guest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(localCart),
      });

      if (res.ok) {
        localStorage.removeItem("cart");
      }
      return await res.json();
    }
  },
};

export default cartService;
