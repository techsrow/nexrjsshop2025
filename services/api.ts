/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";

async function parseError(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { message: text || `HTTP ${res.status}` };
  }
}

const api = {
  post: async (url: string, body: any, withAuth = true) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const res = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await parseError(res);
      throw new Error(err?.message || `Failed ${res.status}`);
    }

    const data = await res.json().catch(() => ({}));
    return { data };
  },
};

export default api;
export { api }; // <-- allows both import styles