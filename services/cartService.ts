const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/cart`;

export const cartService = {
  async getCart() {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  async addToCart(variantId: number, quantity: number) {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ variantId, quantity }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }
  },

  async updateQuantity(variantId: number, quantity: number) {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/${variantId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });
  },

  async removeItem(variantId: number) {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/${variantId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async clearCart(token: string) {
    await fetch(`${API_URL}/clear`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
