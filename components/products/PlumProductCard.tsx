/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

const THEME = "#b3008f";

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

function safeImg(v: any) {
  const s = typeof v === "string" ? v.trim() : "";
  return s.length ? s : null;
}

function pickMainImage(p: Product) {
  // ✅ never return empty string
  return (
    safeImg(p.imageUrl) ||
    safeImg(p.mainImageUrl) ||
    "/placeholder.png"
  );
}

export default function PlumProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();

  const firstVariant = product.variants?.[0] || null;
  const [selected, setSelected] = useState<Variant | null>(firstVariant);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setSelected(product.variants?.[0] || null);
  }, [product.id]);

  const v = selected || product.variants?.[0] || null;

  const mrp = v ? Number(v.price) : Number(product.price);
  const sale = v ? Number(v.effectivePrice) : Number(product.discountPrice ?? product.price);
  const off = pctOff(mrp, sale);

  const badge = index % 3 === 0 ? "trending 🔥" : index % 3 === 1 ? "bestseller" : "new launch!";
  const img = pickMainImage(product);

  return (
    <div className="w-full rounded-2xl border bg-white shadow-sm overflow-hidden">
      {/* image */}
      <div className="relative h-[230px] w-full bg-white">
        <div
          className="absolute left-3 top-3 z-10 rounded-lg px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: THEME }}
        >
          {badge}
        </div>

        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <Image src={img} alt={product.name} fill className="object-contain p-4" sizes="300px" />
        </Link>

        {off > 0 ? (
          <div className="absolute bottom-0 left-0 right-0 bg-[#b3008f] py-2 text-center text-sm font-semibold text-white">
            flat {off}% off
          </div>
        ) : null}
      </div>

      <div className="p-4">
        {/* rating placeholder */}
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
                  key={`${product.id}-${x.id}`}
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
          onClick={async () => {
            if (!v?.id) return;
            setAdding(true);
            try {
              await addToCart(v.id, 1, {
                productId: product.id,
                name: product.name,
                price: Number(v.effectivePrice),
                mrp: Number(v.price),
                imageUrl: product.imageUrl || product.mainImageUrl || undefined,
                variant: {
                  size: v.size || undefined,
                  color: v.color || undefined,
                  weight: (v.weight as any) || undefined,
                },
              });

              toast.success("Added to cart 🛒", { position: "top-right", duration: 2000 });
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
