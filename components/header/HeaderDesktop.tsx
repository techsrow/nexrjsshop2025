"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import DesktopMenu from "./DesktopMenu";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function HeaderDesktop() {
  const [sticky, setSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const { cartCount } = useCart();
  const { username, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // keep input in sync if user navigates to /products?q=...
  const initialQ = searchParams.get("q") || "";
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // update input when URL changes (e.g., user clicks a suggestion)
    setQ(initialQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQ]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const suggestions = useMemo(
    () => ["Vitamin C Face Serum", "Vitamin C Sunscreen", "Ubtan Face Wash", "Rice Face Wash"],
    []
  );

  const goSearch = (text: string) => {
    const query = (text || "").trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goSearch(q);
    // close dropdown after submit
    setShowSearch(false);
  };

  return (
    <header className={`hidden lg:block w-full z-50 ${sticky ? "fixed top-0 bg-white shadow-md" : "relative"}`}>
      {/* Top offer bar (same style as screenshot) */}
      {!sticky && (
        <div className="brand-bg text-white text-sm px-6 py-2 flex items-center justify-center">
          <span className="font-medium">✨ flat 26% off | use code: FLAT26 at checkout ✨</span>
        </div>
      )}

      {/* Logo + Search + Icons row */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <img src="/crescent.jpeg" alt="Crescent" className="h-10 w-auto" />
          </Link>

          {/* Search */}
          <div className="flex-1">
            <div className="relative max-w-[780px] mx-auto">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400" />

              <form onSubmit={onSubmit}>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onFocus={() => setShowSearch(true)}
                  onBlur={() => setTimeout(() => setShowSearch(false), 120)}
                  placeholder="Search For"
                  className="w-full h-11 rounded-full border border-brand/40 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </form>

              {/* Suggestion dropdown */}
              {showSearch && (
                <div className="absolute left-0 right-0 top-[48px] bg-white border shadow-md rounded-xl overflow-hidden z-50">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()} // prevent input blur before click
                      onClick={() => {
                        setQ(s);
                        goSearch(s);
                      }}
                      className="w-full text-left block px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5 text-brand">
            {/* Account */}
            {username ? (
              <div className="flex items-center gap-3">
                <Link href="/account" className="inline-flex items-center gap-2 hover:opacity-90">
                  <FiUser className="text-xl" />
                  <span className="text-sm">Hi, {username}</span>
                </Link>
                <button onClick={handleLogout} className="text-sm underline hover:opacity-90">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="inline-flex items-center gap-2 hover:opacity-90">
                <FiUser className="text-xl" />
                <span className="text-sm">Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative hover:opacity-90">
              <FiShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 brand-bg text-white text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop menu row */}
        <DesktopMenu />
      </div>
    </header>
  );
}
