/* eslint-disable @typescript-eslint/no-explicit-any */
// components/products/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

function money(v: any) {
  const n = Number(v);
  if (!Number.isFinite(n)) return "-";
  return `₹${n.toFixed(0)}`;
}

function pickImage(p: Product) {
  const img = p.image || (Array.isArray(p.images) ? p.images[0] : null);
  return img || null;
}

export default function ProductCard({ p }: { p: Product }) {
  const img = pickImage(p);

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group block rounded-2xl border bg-white hover:shadow-md transition overflow-hidden"
    >
      <div className="relative aspect-[4/3] bg-gray-50">
        {img ? (
          <Image
            src={img}
            alt={p.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="text-sm font-medium text-gray-900 line-clamp-2">{p.name}</div>

        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-base font-semibold">{money(p.price)}</div>
          {p.mrp ? (
            <div className="text-sm text-gray-400 line-through">{money(p.mrp)}</div>
          ) : null}
        </div>

        {p.shortDescription ? (
          <div className="mt-1 text-xs text-gray-500 line-clamp-2">{p.shortDescription}</div>
        ) : null}
      </div>
    </Link>
  );
}
