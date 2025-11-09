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
          <img src="/logo.png" className="logo-width"></img>
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
              <span className="absolute -top-2 -right-2 bg-gold-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {username ? (
  <div>
    Hello, {username}
    <button onClick={handleLogout}>Logout</button>
  </div>
) : (
  <Link href="/login">Login</Link>
)}


        </div>
      </div>
    </nav>
  );
}
