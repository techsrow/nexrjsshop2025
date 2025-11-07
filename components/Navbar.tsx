"use client";
import Link from "next/link";
import { ShoppingCart, LogIn } from "lucide-react";

export default function Navbar() {
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
            <ShoppingCart className="w-6 h-6 hover:text-gold" />
            <span className="absolute -top-2 -right-2 bg-gold text-black text-xs rounded-full px-1">0</span>
          </Link>
          <Link href="/login">
            <LogIn className="w-6 h-6 hover:text-gold" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
