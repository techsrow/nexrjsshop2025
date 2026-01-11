/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiShoppingCart,
  FiX,
  FiChevronDown,
  FiTrash2,
  FiSearch,
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function HeaderMobile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const { cartItems, cartCount } = useCart();

  const subtotal = cartItems.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0
  );

  const closeAll = () => {
    setMenuOpen(false);
    setCartOpen(false);
    setActive(null);
  };

  return (
    <>
      {/* ================= TOP HEADER ================= */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#b3008f]">
        <div className="flex items-center justify-between px-4 py-3 text-white">
          <FiMenu className="text-2xl" onClick={() => setMenuOpen(true)} />

          <Link href="/" className="text-lg font-bold" onClick={closeAll}>
            BuyWOW
          </Link>

          <button onClick={() => setCartOpen(true)} className="relative">
            <FiShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-white text-[#b3008f] text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* SEARCH */}
        <div className="px-4 pb-3">
          <div className="relative">
            <FiSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              placeholder="Search products"
              className="w-full rounded-full bg-white py-2 pl-10 pr-4 text-sm focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* ================= OVERLAY ================= */}
      {(menuOpen || cartOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeAll}
        />
      )}

      {/* ================= MENU SLIDER ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-[#faf9f4] z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* MENU HEADER */}
        <div className="bg-[#b3008f] text-white p-4 flex justify-between items-center">
          <div>
            <p className="text-sm">Hi Guest</p>
            <Link href="/login" onClick={closeAll} className="underline text-sm font-semibold">
              Login →
            </Link>
          </div>
          <FiX className="text-xl cursor-pointer" onClick={closeAll} />
        </div>

        {/* MENU LIST */}
        <div className="divide-y">
          {[
            { label: "Skin", href: "/category/skin" },
            { label: "Hair", href: "/category/hair" },
            { label: "Bath & Body", href: "/category/bath-body" },
            { label: "Kids", href: "/category/kids" },
            { label: "Nutrition", href: "/category/nutrition" },
            { label: "Combos", href: "/category/combos" },
            { label: "Ingredients", href: "/category/ingredients" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeAll}
              className="p-4 flex justify-between items-center font-medium hover:bg-gray-100"
            >
              <span>{item.label}</span>
              <FiChevronDown />
            </Link>
          ))}

          {[
            { label: "New Launch", href: "/new-launch" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Blogs", href: "/blogs" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeAll}
              className="p-4 block font-medium hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </aside>

      {/* ================= CART SLIDER ================= */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* CART HEADER */}
        <div className="bg-[#b3008f] text-white px-4 py-4 flex justify-between items-center">
          <h3 className="font-semibold">My Cart ({cartCount})</h3>
          <FiX className="text-xl cursor-pointer" onClick={closeAll} />
        </div>

        {/* CART ITEMS */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-260px)]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty</p>
          ) : (
            cartItems.map((item: any) => (
              <div key={item.variantId} className="border rounded-xl p-3 flex gap-3">
                <img src={item.imageUrl} className="w-16 h-16 rounded border" />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                  <p className="text-sm font-semibold text-[#b3008f]">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border rounded">
                      <button className="px-2">-</button>
                      <span className="px-2">{item.quantity}</span>
                      <button className="px-2">+</button>
                    </div>
                    <FiTrash2 className="text-gray-400" />
                  </div>
                </div>
              </div>
            ))
          )}

          {/* SUMMARY */}
          <div className="border-t pt-4 text-sm">
            <p className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold">₹{subtotal}</span>
            </p>
          </div>
        </div>

        {/* CHECKOUT */}
        <div className="p-4 border-t">
          <Link
            href="/checkout"
            onClick={closeAll}
            className="block bg-[#b3008f] text-white py-3 rounded-full text-center font-semibold"
          >
            Checkout ₹{subtotal}
          </Link>
        </div>
      </aside>
    </>
  );
}
