/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FiltersSidebar from "@/components/products/FiltersSidebar";
import ProductsGrid from "@/components/products/ProductsGrid";
import Pagination from "@/components/products/Pagination";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6001/api";
const THEME = "#b3008f";

type ProductListResponse = {
  success: boolean;
  data: any[]; // your API returns array
  pagination?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

export default function ProductsPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    totalItems: 0,
    totalPages: 1,
  });

  // mobile sheets
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const category = sp.get("category") || "";
  const subCategory = sp.get("subCategory") || "";
  const q = sp.get("q") || "";
  const minPrice = sp.get("minPrice") || "";
  const maxPrice = sp.get("maxPrice") || "";
  const sort = sp.get("sort") || "newest";
  const page = Number(sp.get("page") || "1");
  const limit = Number(sp.get("limit") || "15");

  const queryObj = useMemo(() => {
    const obj: Record<string, string> = {};
    if (category) obj.category = category;
    if (subCategory) obj.subCategory = subCategory;
    if (q) obj.q = q;
    if (minPrice) obj.minPrice = minPrice;
    if (maxPrice) obj.maxPrice = maxPrice;
    if (sort) obj.sort = sort;
    obj.page = String(page);
    obj.limit = String(limit);
    return obj;
  }, [category, subCategory, q, minPrice, maxPrice, sort, page, limit]);

  function pushQuery(next: Record<string, string | number | null | undefined>) {
    const merged: Record<string, string> = { ...queryObj };

    Object.entries(next).forEach(([k, v]) => {
      if (v === null || v === undefined || v === "") delete merged[k];
      else merged[k] = String(v);
    });

    const qs = new URLSearchParams(merged).toString();
    router.push(`/products?${qs}`);
  }

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        setLoading(true);
        const url = new URL(`${API_BASE}/publicproducts`);
        Object.entries(queryObj).forEach(([k, v]) => url.searchParams.set(k, v));

        const res = await fetch(url.toString(), { cache: "no-store" });
        const json: ProductListResponse = await res.json();

        if (!alive) return;

        if (json?.success) {
          setItems(Array.isArray(json.data) ? json.data : []);
          setPagination(json.pagination || { page: 1, limit: 15, totalItems: 0, totalPages: 1 });
        } else {
          setItems([]);
          setPagination({ page: 1, limit: 15, totalItems: 0, totalPages: 1 });
        }
      } catch (e) {
        console.error(e);
        if (!alive) return;
        setItems([]);
        setPagination({ page: 1, limit: 15, totalItems: 0, totalPages: 1 });
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [queryObj]);

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <div className="mx-auto max-w-7xl px-3 md:px-6 py-4 md:py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{pagination.totalItems}</span> Products
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="text-sm text-gray-600">Sort by:</div>
            <select
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#b3008f]/30"
              value={sort}
              onChange={(e) => pushQuery({ sort: e.target.value, page: 1 })}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* MOBILE filter/sort bar like screenshot */}
        <div className="md:hidden sticky top-[64px] z-30 -mx-3 px-3">
          <div className="bg-[#5b1670] text-white rounded-xl shadow-md px-3 py-3 flex items-center justify-between">
            <button
              onClick={() => setOpenFilter(true)}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <span>⚙</span> Filter
            </button>
            <div className="w-px h-5 bg-white/30" />
            <button
              onClick={() => setOpenSort(true)}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              <span>⇅</span> Sort
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 mt-4">
          {/* Desktop Sidebar only */}
          <div className="hidden lg:block">
            <FiltersSidebar
              apiBase={API_BASE}
              activeCategory={category}
              activeSubCategory={subCategory}
              q={q}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onApply={(next) => pushQuery({ ...next, page: 1 })}
              onClear={() => router.push("/products")}
              variant="desktop"
            />
          </div>

          {/* Products */}
          <div>
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[340px] rounded-2xl bg-white border border-gray-100 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <ProductsGrid items={items as any} />
            )}

            <div className="mt-6">
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onChange={(p) => pushQuery({ page: p })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FILTER SHEET */}
      {openFilter ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenFilter(false)} />
          <div className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl p-4 max-h-[82vh] overflow-auto">
            <div className="h-1.5 w-16 bg-gray-200 rounded-full mx-auto mb-3" />
            <FiltersSidebar
              apiBase={API_BASE}
              activeCategory={category}
              activeSubCategory={subCategory}
              q={q}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onApply={(next) => pushQuery({ ...next, page: 1 })}
              onClear={() => router.push("/products")}
              variant="mobile"
              onClose={() => setOpenFilter(false)}
            />
          </div>
        </div>
      ) : null}

      {/* MOBILE SORT SHEET */}
      {openSort ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenSort(false)} />
          <div className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl p-4">
            <div className="h-1.5 w-16 bg-gray-200 rounded-full mx-auto mb-3" />
            <div className="text-base font-semibold text-gray-900 mb-4">Sort</div>

            {[
              { label: "Newest", value: "newest" },
              { label: "Price: Low to High", value: "price_asc" },
              { label: "Price: High to Low", value: "price_desc" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  pushQuery({ sort: opt.value, page: 1 });
                  setOpenSort(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl border mb-2"
                style={{
                  borderColor: sort === opt.value ? THEME : "#e5e7eb",
                  background: sort === opt.value ? "#fdf2fb" : "white",
                  color: sort === opt.value ? THEME : "#111827",
                  fontWeight: sort === opt.value ? 700 : 500,
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
