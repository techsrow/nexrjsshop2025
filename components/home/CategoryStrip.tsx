/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
};

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
    <rect width='100%' height='100%' fill='#f3f4f6'/>
    <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle'
      font-family='Arial' font-size='14' fill='#6b7280'>No Image</text>
  </svg>`);

export default function CategoryStrip() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:6001/api/categories", {
          cache: "no-store",
        });
        const json = await res.json();
        setCats(Array.isArray(json?.data) ? json.data : []);
      } catch (e) {
        console.log("❌ categories fetch error", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className="
            flex items-start gap-10 py-10
            overflow-x-auto overflow-y-hidden
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            md:justify-center md:overflow-x-visible
          "
        >
          {loading ? (
            <div className="text-sm text-gray-500">Loading categories...</div>
          ) : (
            cats.map((c, i) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="flex shrink-0 flex-col items-center"
              >
                {/* Circle */}
                <div
                  className="
                    relative h-[108px] w-[108px] rounded-full
                    bg-gradient-to-b from-[#d100a7] to-[#7a0060]
                    shadow-[0_12px_30px_rgba(179,0,143,0.35)]
                    flex items-center justify-center
                    md:h-[128px] md:w-[128px]
                  "
                >
                  <div className="relative h-[74px] w-[74px] md:h-[86px] md:w-[86px]">
                    <Image
                      src={c.imageUrl || FALLBACK}
                      alt={c.name}
                      fill
                      className="object-cover rounded-full"
                      sizes="96px"
                      priority={i < 6}
                      // unoptimized // enable only if needed
                    />
                  </div>
                </div>

                {/* Label */}
                <div className="mt-5 text-center text-[18px] font-medium text-[#b3008f]">
                  {c.name}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
