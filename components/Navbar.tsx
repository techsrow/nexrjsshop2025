"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { cartCount } = useCart();
  const { username, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
 


  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-black/80 fixed w-full z-50 top-0 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gold">
          <img src="/logo.png" className="logo-width" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white text-sm font-medium">
          <Link href="/" className="hover:text-gold">Home</Link>
          <Link href="/products" className="hover:text-gold">Shop</Link>
          <Link href="/about" className="hover:text-gold">About</Link>
          {/* <Link href="/reservations" className="hover:text-gold">Reservations</Link> */}
          <Link href="/contact" className="hover:text-gold">Contact</Link>
        </div>

        {/* Right Icons / Auth / Cart */}
        <div className="hidden md:flex items-center gap-6 text-white ">
          <Link href="/cart" className="relative">
            <i className="ri-shopping-cart-2-line text-2xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-gold text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
  {cartCount}
</span>

            )}
          </Link>

          {username ? (
            <div className="flex gap-3 items-center">
              <span>Hello, {username}</span>
              <button onClick={handleLogout} className="text-gold hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="hover:text-gold">Login</Link>
              <Link href="/signup" className="hover:text-gold">Register</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 text-white py-4 px-6 space-y-6 border-t border-gray-700">

          <Link href="/" onClick={() => setMobileOpen(false)} className="block hover:text-gold">Home</Link>
          <Link href="/products" onClick={() => setMobileOpen(false)} className="block hover:text-gold">Shop</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} className="block hover:text-gold">About</Link>
          <Link href="/reservations" onClick={() => setMobileOpen(false)} className="block hover:text-gold">Reservations</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="block hover:text-gold">Contact</Link>

          {/* Cart */}
          <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 hover:text-gold">
            <i className="ri-shopping-cart-2-line text-xl"></i>
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>

          {/* Auth */}
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
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="hover:text-gold">
                Login
              </Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)} className="hover:text-gold">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
