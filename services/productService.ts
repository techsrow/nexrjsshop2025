const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/public/PublicProducts`;

export const productService = {
  async getAll() {
    try {
      const res = await fetch(API_URL, { cache: "no-store" });

      if (!res.ok) {
        console.error("❌ Failed to fetch products:", res.status, res.statusText);
        return [];
      }

      const text = await res.text(); // Read as text first
      if (!text) {
        console.warn("⚠️ Empty response from API");
        return [];
      }

      const result = JSON.parse(text);
      return result.data || [];
    } catch (err) {
      console.error("🚨 Error fetching products:", err);
      return [];
    }
  },

  async getById(id: string) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

      if (!res.ok) {
        console.error("❌ Failed to fetch product:", res.status, res.statusText);
        return null;
      }

      const text = await res.text();
      if (!text) return null;

      const result = JSON.parse(text);
      return result.data || null;
    } catch (err) {
      console.error("🚨 Error fetching product:", err);
      return null;
    }
  },
};
