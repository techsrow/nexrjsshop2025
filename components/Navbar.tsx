"use client";
import Link from "next/link";
import { ShoppingCart, LogIn } from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function Navbar() {

   const { cartCount } = useCart();
  return (
    <nav className="bg-black/80 fixed w-full z-50 top-0 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gold flex items-center gap-2">
          🔥 Mystic Smoke
        </Link>

        {/* Menu */}
        <div className="hidden md:flex space-x-8 text-white text-sm font-medium">
          <Link href="/" className="hover:text-gold">Home</Link>
          <Link href="/products" className="hover:text-gold">Shop</Link>
          <Link href="/about" className="hover:text-gold">About</Link>
          <Link href="/reservations" className="hover:text-gold">Reservations</Link>
          <Link href="/contact" className="hover:text-gold">Contact</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative">
        <i className="ri-shopping-cart-2-line text-2xl"></i>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
          <Link href="/login">
            <LogIn className="w-6 h-6 hover:text-gold" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
