"use client";

import Link from "next/link";
import Image from "next/image";

type BannerItem = {
  title: string;
  subtitle?: string;
  image: string; // local (/public/..) OR full URL
  href: string;  // e.g. /products?category=skin-care-2
};

const BANNERS: BannerItem[] = [
  {
    title: "Skin Care Essentials",
    subtitle: "Best sellers for daily routine",
    image: "https://res.cloudinary.com/techsrow/image/upload/v1769444769/crescent%20health%20Care/img2_vrc3bz.png",
    href: "/products?category=skin-care-2",
  },
  {
    title: "Hair Care Picks",
    subtitle: "Strength + shine range",
    image: "https://res.cloudinary.com/techsrow/image/upload/v1769444758/crescent%20health%20Care/img1_q4mr6m.png",
    href: "/products?category=hair-care",
  },
];

export default function TwoBannerGrid() {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {BANNERS.map((b) => (
            <Link
              key={b.title}
              href={b.href}
              className="
                group relative overflow-hidden rounded-2xl
                border border-[#b3008f]/20 bg-white
                shadow-sm transition
                hover:border-[#b3008f]/50 hover:shadow-md
              "
            >
              {/* image */}
              <div className="relative h-[180px] w-full md:h-[240px]">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* overlay text */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t from-black/60 via-black/10 to-transparent
                "
              />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#b3008f]">
                  Shop Now
                </div>

                <h3 className="mt-3 text-xl font-semibold text-white md:text-2xl">
                  {b.title}
                </h3>

                {b.subtitle ? (
                  <p className="mt-1 text-sm text-white/90">{b.subtitle}</p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
