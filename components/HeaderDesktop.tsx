"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import DesktopMenu from "./DesktopMenu";

export default function HeaderDesktop() {


  const [sticky, setSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cartCount } = useCart();
  const { username, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`hidden lg:block w-full z-50 ${
        sticky ? "fixed top-0 bg-white shadow-md" : "relative"
      }`}
    >
      {/* 🔴 Top Announcement Bar */}

      {!sticky && (
      <div className="ticker text-white text-sm px-6 py-2 flex justify-between">
        <span>Asia&apos;s 1st Brand with MADE SAFE Certified Products</span>
        <span>
          Valid Only Today: Flat 50% Off on Selected Products |{" "}
          <span className="font-semibold cursor-pointer">Shop Now</span>
        </span>
      </div>
 )}
      {/* 🔵 Logo + Search + Cart */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        {/* Logo */}
        <div className="text-3xl font-bold text-sky-500">
          <img src="/crescent.jpeg" width={120} />
        </div>

        {/* Search */}
        <div className="flex w-[600px]">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            {showSearch && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md border mt-1 z-50">
              {[
                "Vitamin C Face Serum",
                "Vitamin C Sunscreen",
                "Ubtan Face Wash",
                "Rice Face Wash",
              ].map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
           <input
            onFocus={() => setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            placeholder="Search for Vitamin C"
            className="w-full border rounded-md py-2 pl-10 pr-4"
          />
          </div>
          <button className="bg-sky-500 text-white px-6 rounded-r-md hover:bg-sky-600">
            Search
          </button>
        </div>

        {/* Cart + Login */}
        <div className="flex items-center gap-6 text-gray-700">
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
      </div>

      {/* ⚪ Desktop Menu */}
      <DesktopMenu />
    </header>
  );
}
