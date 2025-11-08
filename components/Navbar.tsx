"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { username, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-black/80 fixed w-full z-50 top-0 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-bold text-gold">
          🔥 Mystic Smoke
        </Link>

        <div className="hidden md:flex space-x-8 text-white text-sm font-medium">
          <Link href="/" className="hover:text-gold">Home</Link>
          <Link href="/products" className="hover:text-gold">Shop</Link>
          <Link href="/about" className="hover:text-gold">About</Link>
          <Link href="/reservations" className="hover:text-gold">Reservations</Link>
          <Link href="/contact" className="hover:text-gold">Contact</Link>
        </div>

        <div className="flex items-center gap-6">
          
          <Link href="/cart" className="relative">
            <i className="ri-shopping-cart-2-line text-2xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* ✅ If logged in, show username + logout */}
          {username ? (
            <div className="flex items-center gap-4">
              <span className="text-amber-400 font-semibold">
                Hello, {username}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <span className="hover:text-gold">Login</span>
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}
