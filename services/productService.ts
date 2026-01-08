const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/publicproducts`;

export const productService = {
  async getAll() {
    try {
      const res = await fetch(API_URL, { cache: "no-store" });

      if (!res.ok) {
        console.error("❌ Failed to fetch products:", res.status);
        return [];
      }

      const result = await res.json();
      return result.data || [];
    } catch (err) {
      console.error("🚨 Error fetching products:", err);
      return [];
    }
  },

  async getById(id: string) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

      if (!res.ok) return null;

      const result = await res.json();
      return result.data || null;
    } catch (err) {
      console.error("🚨 Error fetching product:", err);
      return null;
    }
  },
};
