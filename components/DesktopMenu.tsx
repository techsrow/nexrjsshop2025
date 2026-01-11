"use client";

import { useState } from "react";
import Link from "next/link";

/* ✅ DEFINE MENU DATA FIRST */
const menu = [

  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },  
  {
    title: "All Products",
    href: "/products",
    // mega: [
    //   {
    //     title: "Explore",
    //     items: [
    //       { label: "New Launches", href: "/category/face/new" },
    //       { label: "Best Sellers", href: "/category/face/best-sellers" },
    //     ],
    //   },
    //   {
    //     title: "Face",
    //     items: [
    //       { label: "Face Wash", href: "/category/face/face-wash" },
    //       { label: "Face Serum", href: "/category/face/face-serum" },
    //       { label: "Sunscreen", href: "/category/face/sunscreen" },
    //     ],
    //   },
    //   {
    //     title: "By Ingredient",
    //     items: [
    //       { label: "Vitamin C", href: "/category/face/vitamin-c" },
    //       { label: "Ubtan", href: "/category/face/ubtan" },
    //     ],
    //   },
    // ],
  },
  { title: "Hair Care", href: "/hair-care",
    // mega: [
    //   {
    //     title: "Explore",
    //     items: [
    //       { label: "New Launches", href: "/category/face/new" },
    //       { label: "Best Sellers", href: "/category/face/best-sellers" },
    //     ],
    //   },
    //   {
    //     title: "Face",
    //     items: [
    //       { label: "Face Wash", href: "/category/face/face-wash" },
    //       { label: "Face Serum", href: "/category/face/face-serum" },
    //       { label: "Sunscreen", href: "/category/face/sunscreen" },
    //     ],
    //   },
    //   {
    //     title: "By Ingredient",
    //     items: [
    //       { label: "Vitamin C", href: "/category/face/vitamin-c" },
    //       { label: "Ubtan", href: "/category/face/ubtan" },
    //     ],
    //   },
    // ],



  },
  { title: "Skin Treatments", href: "/skin-care" },
  { title: "Health Care Devices", href: "/health-care" },
  { title: "Hijama", href: "/hijama" },
  { title: "COMBOS", href: "/category/combos" },
  { title: "Blog", href: "/blog" },
  { title: "Contact Us", href: "/contact" },
 
  { title: "STORE LOCATOR", href: "/store-locator" },
];

export default function DesktopMenu() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav className="border-b relative bg-white">
      <ul className="flex justify-center gap-8 py-3 text-sm font-medium">
        {menu.map((item) => (
          <li
            key={item.title}
            className="relative"
            onMouseEnter={() => setActive(item.title)}
            onMouseLeave={() => setActive(null)}
          >
            {/* MAIN MENU LINK */}
            <Link
              href={item.href}
              className="hover:text-sky-500 transition"
            >
              {item.title}
            </Link>

            {/* MEGA MENU */}
            {/* {item.mega && active === item.title && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-screen bg-white shadow-lg  z-50 mt-4 ml-4">
                <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 p-6">
                  {item.mega.map((col) => (
                    <div key={col.title}>
                      <h4 className="font-semibold mb-3">{col.title}</h4>
                      <ul className="space-y-2 text-gray-600">
                        {col.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="hover:text-black block"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </li>
        ))}
      </ul>
    </nav>
  );
}
