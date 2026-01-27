/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";


const API_BASE = "http://localhost:6001/api";
const THEME = "#b3008f";

type Category = { id: number; name: string; slug: string };

type Variant = {
  id: number;
  weight: string | null;
  size: string | null;
  color: string | null;
  colorHex: string | null;
  price: number;
  discountPrice: number | null;
  effectivePrice: number;
  stockQuantity: number;
  sku: string;
};

type Product = {
  id: number;
  name: string;
  imageUrl: string | null;
  mainImageUrl: string | null;
  category: { id: number; name: string; slug: string } | null;
  subCategory: { id: number; name: string; slug: string } | null;
  price: number;
  discountPrice: number | null;
  variants: Variant[];
};

const INR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

const pctOff = (mrp: number, sale: number) => {
  if (!mrp || !sale || mrp <= sale) return 0;
  return Math.round(((mrp - sale) / mrp) * 100);
};

function variantLabel(v: Variant) {
  const parts = [];
  if (v.size) parts.push(v.size);
  if (v.weight) parts.push(v.weight);
  if (v.color) parts.push(v.color);
  return parts.length ? parts.join(" • ") : `Variant ${v.id}`;
}

function pickMainImage(p: Product) {
  // Your list API has imageUrl + mainImageUrl + images[], but we only need one
  return p.imageUrl || p.mainImageUrl || "/placeholder.png";
}

export default function BestSellingSection() {
  const { addToCart } = useCart();

  const [cats, setCats] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);

        const [cRes, pRes] = await Promise.all([
          fetch(`${API_BASE}/categories`, { cache: "no-store" }),
          fetch(`${API_BASE}/publicproducts`, { cache: "no-store" }),
        ]);

        const cJson = await cRes.json();
        const pJson = await pRes.json();

        const cList = Array.isArray(cJson?.data) ? cJson.data : [];
        const pList = Array.isArray(pJson?.data) ? pJson.data : [];

        if (!alive) return;

        setCats(cList);
        setProducts(pList);

        setActive("ALL");
      } catch (e) {
        console.log("❌ BestSellingSection load error", e);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const tabs = useMemo(() => {
    return [{ name: "All", slug: "ALL" }, ...cats.map((c) => ({ name: c.name, slug: c.slug }))];
  }, [cats]);

  const filtered = useMemo(() => {
    if (active === "ALL") return products;
    return products.filter((p) => p?.category?.slug === active);
  }, [products, active]);

  const scrollByCards = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Tabs (dynamic) */}
        <div className="flex flex-wrap justify-center gap-5">
          {tabs.map((t) => {
            const isActive = active === t.slug;
            return (
              <button
                key={t.slug}
                onClick={() => setActive(t.slug)}
                className="rounded-full px-8 py-3 text-base font-semibold shadow-sm transition"
                style={
                  isActive
                    ? { backgroundColor: THEME, color: "white" }
                    : { backgroundColor: "white", border: `1px solid ${THEME}33`, color: "#6b1b66" }
                }
              >
                {t.name.toLowerCase()}
              </button>
            );
          })}
        </div>

        {/* Slider */}
        <div className="relative mt-8">
          {/* arrows */}
          <button
            type="button"
            onClick={() => scrollByCards("left")}
            className="hidden md:flex absolute right-14 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full text-white shadow-lg"
            style={{ backgroundColor: THEME }}
            aria-label="Scroll left"
          >
            <FiChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full text-white shadow-lg"
            style={{ backgroundColor: THEME }}
            aria-label="Scroll right"
          >
            <FiChevronRight size={22} />
          </button>

          <div
            ref={scrollerRef}
            className="
              flex gap-6 overflow-x-auto pb-2
              [-ms-overflow-style:none] [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              scroll-smooth
            "
          >
            {loading ? (
              <div className="py-10 text-sm text-gray-500">Loading products...</div>
            ) : filtered.length === 0 ? (
              <div className="py-10 text-sm text-gray-500">No products found for this category.</div>
            ) : (
              filtered.slice(0, 12).map((p, idx) => (
                <ProductCard
                  key={String(p.id)} // ✅ FIXED UNIQUE KEY
                  product={p}
                  index={idx}
                  onAdd={async (variant: Variant, qty: number) => {
                    // ✅ Guard: variant must exist
                    if (!variant?.id) return;

                    await addToCart(variant.id, qty, {
                      productId: p.id,
                      name: p.name,
                      price: Number(variant.effectivePrice),
                      mrp: Number(variant.price),
                      imageUrl: p.imageUrl || p.mainImageUrl || undefined,
                      variant: {
                        size: variant.size || undefined,
                        color: variant.color || undefined,
                        weight: (variant.weight as any) || undefined,
                      },
                    });
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  onAdd,
}: {
  product: Product;
  index: number;
  onAdd: (variant: Variant, qty: number) => Promise<void>;
}) {
  // default variant
  const firstVariant = product.variants?.[0] || null;
  const [selected, setSelected] = useState<Variant | null>(firstVariant);
  const [adding, setAdding] = useState(false);

  // reset when product changes
  useEffect(() => {
    setSelected(product.variants?.[0] || null);
  }, [product.id]);

  const v = selected || product.variants?.[0] || null;

  // pricing from variant (best selling behavior)
  const mrp = v ? Number(v.price) : Number(product.price);
  const sale = v ? Number(v.effectivePrice) : Number(product.discountPrice ?? product.price);
  const off = pctOff(mrp, sale);

  // badge (optional)
  const badge = index % 3 === 0 ? "trending 🔥" : index % 3 === 1 ? "bestseller" : "new launch!";

  const img = pickMainImage(product);

  return (
    <div className="w-[300px] shrink-0 rounded-2xl border bg-white shadow-sm overflow-hidden">
      {/* image */}
      <div className="relative h-[230px] w-full bg-white">
        {/* top left badge */}
        <div
          className="absolute left-3 top-3 z-10 rounded-lg px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: THEME }}
        >
          {badge}
        </div>

        {/* click -> product details (IMPORTANT: create app/product/[id]/page.tsx ) */}
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <Image
            src={img}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="300px"
          />
        </Link>

        {/* discount ribbon */}
        {off > 0 ? (
          <div className="absolute bottom-0 left-0 right-0 bg-[#b3008f] py-2 text-center text-sm font-semibold text-white">
            flat {off}% off
          </div>
        ) : null}
      </div>

      <div className="p-4">
        {/* rating placeholder (not in API yet) */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500">★</span>
          <span className="font-semibold">4.5</span>
          <span className="text-gray-500">reviews</span>
        </div>

        {/* title */}
        <div className="mt-3 text-[16px] font-semibold text-[#6b1b66] leading-snug line-clamp-2">
          {product.name}
        </div>

        {/* variants pills */}
        {Array.isArray(product.variants) && product.variants.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.variants.slice(0, 2).map((x) => {
              const isActive = v?.id === x.id;

              return (
                <button
                  key={`${product.id}-${x.id}`} // ✅ FIXED UNIQUE KEY ALWAYS
                  onClick={() => setSelected(x)}
                  className="rounded-full px-4 py-2 text-xs font-semibold transition"
                  style={
                    isActive
                      ? { backgroundColor: THEME, color: "white" }
                      : { border: `1px solid ${THEME}55`, color: THEME, backgroundColor: "white" }
                  }
                >
                  {variantLabel(x)}
                </button>
              );
            })}

            {product.variants.length > 2 ? (
              <span className="self-center text-xs font-semibold text-[#6b1b66]">
                +{product.variants.length - 2}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="mt-3 text-xs text-gray-500">No variants</div>
        )}

        {/* price */}
        <div className="mt-4">
          <div className="text-lg font-bold text-black">{INR(sale)}</div>
          {mrp > sale ? (
            <div className="text-sm text-gray-500">
              <span className="line-through">{INR(mrp)}</span>
              <span className="ml-2 font-semibold" style={{ color: THEME }}>
                {off}% off
              </span>
            </div>
          ) : null}
        </div>

        {/* add to cart */}
        <button
          disabled={!v || adding || (v?.stockQuantity ?? 0) <= 0}
          // onClick={async () => {
          //   if (!v?.id) return;

          //   setAdding(true);
          //   try {
          //     await onAdd(v, 1);
          //   } catch (e) {
          //     console.log("❌ addToCart failed", e);
          //   } finally {
          //     setAdding(false);
          //   }
          // }}

          onClick={async () => {
  if (!v?.id) return;

  setAdding(true);
  try {
    await onAdd(v, 1);

    toast.success("Added to cart 🛒", {
      position: "top-right",
      duration: 2000,
    });
  } catch (e) {
    toast.error("Failed to add to cart");
    console.log("❌ addToCart failed", e);
  } finally {
    setAdding(false);
  }
}}

          className="mt-5 w-full rounded-xl py-3 text-base font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: THEME }}
        >
          {!v ? "select a variant" : (v.stockQuantity ?? 0) <= 0 ? "out of stock" : adding ? "adding..." : "add to cart"}
        </button>
      </div>
    </div>
  );
}
