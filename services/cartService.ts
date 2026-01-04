const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/cart`;

export const cartService = {
  async getCart() {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("❌ Failed GET CART:", data);
      throw new Error(data?.message || `Failed to fetch cart: ${res.status}`);
    }
    return data; // ⬅ returns { success, data: { items, summary } }
  },

  async addToCart(productId: number, quantity = 1) {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({ productId, quantity }),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    console.error("❌ AddToCart Error Backend:", data);
    throw new Error(data?.message || `Failed to add to cart: ${res.status}`);
  }

  return data;
},


  async updateQuantity(productId: number, quantity: number) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ quantity }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("❌ Update failed:", data);
      throw new Error(data?.message || `Failed to update quantity`);
    }

    return data;
  },

  async removeItem(productId: number) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("❌ Remove item error:", data);
      throw new Error(data?.message || `Failed to remove item`);
    }

    return data;
  },

  async getCount() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/count`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) throw new Error(`Failed to get count`);

    return data; // ✅ returns { success, data: { totalItems } }
  },

  // async clearCart() {
  //   const token = localStorage.getItem("token");
  //   const res = await fetch(`${API_URL}/clear`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: token ? `Bearer ${token}` : "",
  //     },
  //   });

  //   const data = await res.json().catch(() => null);

  //   if (!res.ok) {
  //     console.error("❌ Clear Cart Backend:", data);
  //     throw new Error(data?.message || "Failed to clear cart");
  //   }

  //   return data;
  // }

//   async clearCart(storedToken?: string) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error("Missing token");
//   }

//   const res = await fetch(`${API_URL}/clear`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`, //✅ ALWAYS
//     },
//   });

//   const data = await res.json().catch(() => null);

//   if (!res.ok) {
//     console.error("❌ Clear Cart Backend:", data);
//     throw new Error(data?.message || "Failed to clear cart");
//   }

//   return data;
// }
async clearCart(token?: string) {
  const finalToken = token || localStorage.getItem("token");

  if (!finalToken) {
    throw new Error("Missing token");
  }

  const res = await fetch(`${API_URL}/clear`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${finalToken}`,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("❌ Clear Cart Backend:", data);
    throw new Error(data?.message || "Failed to clear cart");
  }

  return data;
}


};
