"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

/* MOBILE MENU DATA */
const mobileMenu = [
  {
    title: "FACE",
    href: "/category/face",
    children: [
      { label: "Face Wash", href: "/category/face/face-wash" },
      { label: "Face Serum", href: "/category/face/face-serum" },
      { label: "Sunscreen", href: "/category/face/sunscreen" },
      { label: "Vitamin C", href: "/category/face/vitamin-c" },
    ],
  },
  {
    title: "HAIR",
    href: "/category/hair",
    children: [
      { label: "Shampoo", href: "/category/hair/shampoo" },
      { label: "Hair Oil", href: "/category/hair/hair-oil" },
    ],
  },
  { title: "MAKEUP", href: "/category/makeup" },
  { title: "BODY", href: "/category/body" },
  { title: "BABY", href: "/category/baby" },
  { title: "COMBOS", href: "/category/combos" },
  { title: "NEW LAUNCHES", href: "/category/new-launches" },
  { title: "BLOG", href: "/blog" },
];

export default function HeaderMobile() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const toggle = (title: string) =>
    setActive(active === title ? null : title);
  const { cartCount } = useCart();
  const { username, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
 


  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* 🔹 MOBILE TOP BAR */}
      <header className="lg:hidden sticky top-0 z-50 bg-white shadow">
        <div className="flex items-center justify-between px-4 py-3">
          <FiMenu
            className="text-2xl cursor-pointer"
            onClick={() => setOpen(true)}
          />

          <Link href="/" className="text-xl font-bold text-sky-500">
            mama<span className="text-green-500">earth</span>
          </Link>

           <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 hover:text-gold">
            <i className="ri-shopping-cart-2-line text-xl"></i>
             {cartCount > 0 && `(${cartCount})`}
          </Link>
          {username ? (
            <div className="flex flex-col gap-3">
              <span>Hello, {username}</span>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="text-gold underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="hover:text-gold">
               <i className="ri-lock-line text-xl"></i>

              </Link>
              {/* <Link href="/signup" onClick={() => setMobileOpen(false)} className="hover:text-gold">
                Register
              </Link> */}
            </div>
          )}
        </div>

        {/* 🔍 SEARCH BAR */}
        <div className="px-4 pb-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              className="w-full border rounded-full py-2 pl-10 pr-4 text-sm"
              placeholder="Search products"
            />
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* 🔹 SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="font-semibold">Menu</span>
          <FiX
            className="text-xl cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Menu Items */}
        <nav className="overflow-y-auto h-[calc(100vh-64px)] px-3">
          {mobileMenu.map((item) => (
            <div key={item.title} className="border-b">
              <div
                className="flex items-center justify-between py-3"
                onClick={() => item.children && toggle(item.title)}
              >
                <Link
                  href={item.href}
                  className="font-medium"
                  onClick={() => !item.children && setOpen(false)}
                >
                  {item.title}
                </Link>

                {item.children && (
                  <FiChevronDown
                    className={`transition ${
                      active === item.title ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {/* SUB MENU */}
              {item.children && active === item.title && (
                <div className="pl-4 pb-3 space-y-2 text-sm text-gray-600">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setOpen(false)}
                      className="block hover:text-black"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
