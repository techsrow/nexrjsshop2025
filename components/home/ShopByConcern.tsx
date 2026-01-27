"use client";

import Image from "next/image";
import Link from "next/link";

type Concern = {
  title: string;
  image: string;
  href: string;
  bg: string;
};

const CONCERNS: Concern[] = [
  {
    title: "Heart Care",
    image: "/concerns/heart.jpg",
    href: "/products?concern=heart-care",
    bg: "#f3e8ff",
  },
  {
    title: "Stomach Care",
    image: "/concerns/stomach.jpg",
    href: "/products?concern=stomach-care",
    bg: "#e6f7ec",
  },
  {
    title: "Liver Care",
    image: "/concerns/liver.jpg",
    href: "/products?concern=liver-care",
    bg: "#ffe4e6",
  },
  {
    title: "Bone, Joint & Muscle Care",
    image: "/concerns/bone.jpg",
    href: "/products?concern=bone-care",
    bg: "#fde7f3",
  },
  {
    title: "Kidney Care",
    image: "/concerns/kidney.jpg",
    href: "/products?concern=kidney-care",
    bg: "#e0f2fe",
  },
  {
    title: "Derma Care",
    image: "/concerns/derma.jpg",
    href: "/products?concern=derma-care",
    bg: "#fde2e4",
  },
  {
    title: "Respiratory Care",
    image: "/concerns/respiratory.jpg",
    href: "/products?concern=respiratory-care",
    bg: "#fff1cc",
  },
  {
    title: "Eye Care",
    image: "/concerns/eye.jpg",
    href: "/products?concern=eye-care",
    bg: "#e7f5ff",
  },
];

export default function ShopByConcern() {
  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#b3008f]">
            Shop by Concern
          </h2>
          <div className="mt-2 h-[3px] w-24 bg-[#b3008f]" />
        </div>

        {/* Cards */}
        <div
          className="
            flex gap-6
            overflow-x-auto
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            md:grid md:grid-cols-4 md:overflow-visible
          "
        >
          {CONCERNS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="
                min-w-[160px] rounded-xl  bg-white
                p-4 text-center transition
                hover:shadow-lg
              "
            >
              <div
                className="relative mx-auto h-[130px] w-full rounded-lg"
                style={{ backgroundColor: c.bg }}
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="mt-4 text-sm font-medium text-gray-800">
                {c.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
