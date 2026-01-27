/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiMenu,
  FiShoppingCart,
  FiX,
  FiChevronRight,
  FiChevronDown,
  FiSearch,
  FiTrash2,
  FiUser
} from "react-icons/fi";


import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import type { MenuItem } from "./menuData";
import { useCatalogMenu } from "./CatalogMenuProvider";
import { useRouter, useSearchParams } from "next/navigation";

export default function HeaderMobile({ items }: { items?: MenuItem[] }) {
  const { menu } = useCatalogMenu();
  const data = items?.length ? items : menu;

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const { cartItems, cartCount } = useCart();
  const { username, logout } = useAuth();

  const router = useRouter();
  const sp = useSearchParams();

  const initialQ = sp.get("q") || "";
  const [q, setQ] = useState(initialQ);

  const subtotal = useMemo(
    () => cartItems.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0),
    [cartItems]
  );

  const closeAll = () => {
    setMenuOpen(false);
    setCartOpen(false);
    setOpenKey(null);
  };

  const toggle = (key: string) => setOpenKey((prev) => (prev === key ? null : key));

  const goSearch = (text: string) => {
    const query = (text || "").trim();
    closeAll(); // close drawers if open
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  };

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    goSearch(q);
  };


  const uniqueCartItems = Array.from(
  new Map(
    cartItems.map((item: any) => [
      `${item.productId}-${item.variantId}`,
      item,
    ])
  ).values()
);


  return (
    <>
      {/* Top promo bar */}
      <div className="lg:hidden brand-bg text-white text-xs py-2 text-center sticky top-0 z-[60]">
        ✨ flat 26% off | use code: FLAT26 at checkout ✨
      </div>

      {/* Mobile header */}
      <header className="lg:hidden sticky top-[28px] z-50 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <FiMenu className="text-2xl text-brand" />
          </button>

          <Link href="/" onClick={closeAll} className="font-bold text-brand">
            <img src="/crescent.jpeg" alt="Crescent" className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-3">
  {/* Login / User */}
  {username ? (
    <Link
      href="/account"
      onClick={closeAll}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white"
      style={{ backgroundColor: "#b3008f" }}
    >
      <FiUser className="text-sm" />
      {username}
    </Link>
  ) : (
    <Link
      href="/login"
      onClick={closeAll}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white"
      style={{ backgroundColor: "#b3008f" }}
    >
      <FiUser className="text-sm" />
      Login / Register
    </Link>
  )}

  {/* Cart */}
  <button
    onClick={() => setCartOpen(true)}
    className="relative"
    aria-label="Open cart"
  >
    <FiShoppingCart className="text-xl text-brand" />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-brand text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
        {cartCount}
      </span>
    )}
  </button>
</div>

        </div>

        {/* Search bar */}
        <div className="px-4 pb-3">
          <form onSubmit={onSubmitSearch} className="relative">
            <FiSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search For"
              className="w-full rounded-full bg-[#f6e7f2] border border-brand/30 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/25"
            />
          </form>
        </div>
      </header>

      {/* Overlay */}
      {(menuOpen || cartOpen) && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={closeAll} />
      )}

      {/* Left menu drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="bg-brand text-white p-4 flex justify-between items-center">
          <div>
            <p className="text-sm">{username ? `Hi ${username}` : "Hi Guest"}</p>
            {username ? (
              <button
                onClick={() => {
                  logout();
                  closeAll();
                }}
                className="underline text-sm font-semibold"
              >
                Logout →
              </button>
            ) : (
              <Link
                href="/login"
                onClick={closeAll}
                className="underline text-sm font-semibold"
              >
                Login →
              </Link>
            )}
          </div>
          <FiX className="text-xl cursor-pointer" onClick={closeAll} />
        </div>

        {/* Menu list */}
        <div className="divide-y">
          {data.map((item) => {
            const hasChildren = !!item.children?.length;

            return (
              <div key={item.label}>
                <button
                  className="w-full p-4 flex justify-between items-center font-medium hover:bg-gray-50"
                  onClick={() => (hasChildren ? toggle(item.label) : closeAll())}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex-1 text-left capitalize"
                      onClick={(e) => {
                        if (hasChildren) e.preventDefault();
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="flex-1 text-left capitalize">{item.label}</span>
                  )}

                  {hasChildren ? (
                    <FiChevronDown
                      className={`transition ${openKey === item.label ? "rotate-180" : ""}`}
                    />
                  ) : (
                    <FiChevronRight className="opacity-60" />
                  )}
                </button>

                {hasChildren && openKey === item.label && (
                  <div className="bg-[#faf7fb]">
                    {item.children!.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={closeAll}
                        className="block px-6 py-3 text-sm text-brand hover:bg-[#f1d7ea] capitalize"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Right cart drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-brand text-white px-4 py-4 flex justify-between items-center">
          <h3 className="font-semibold">My Cart ({cartCount})</h3>
          <FiX className="text-xl cursor-pointer" onClick={closeAll} />
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-260px)]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty</p>
          ) : (
//             cartItems.map((item: any) => (
//               // <div key={item.variantId} className="border rounded-xl p-3 flex gap-3">
//               <div
//   key={`${item.productId}-${item.variantId}`}
//   className="border rounded-xl p-3 flex gap-3"
// >
uniqueCartItems.map((item: any) => (
  <div
    key={`${item.productId}-${item.variantId}`}
    className="border rounded-xl p-3 flex gap-3"
  >


                <img src={item.imageUrl} className="w-16 h-16 rounded border object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                  <p className="text-sm font-semibold text-brand">₹{item.price}</p>

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

          <div className="border-t pt-4 text-sm">
            <p className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold">₹{subtotal}</span>
            </p>
          </div>
        </div>

        <div className="p-4 border-t">
          <Link
            href="/checkout"
            onClick={closeAll}
            className="block bg-brand text-white py-3 rounded-full text-center font-semibold hover:bg-brandDark transition"
          >
            Checkout ₹{subtotal}
          </Link>
        </div>
      </aside>
    </>
  );
}
