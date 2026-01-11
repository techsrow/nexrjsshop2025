"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiGrid,
  FiTag,
  FiUser,
  FiDownload,
} from "react-icons/fi";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const activeClass = (path: string) =>
    pathname === path ? "text-[#b3008f]" : "text-gray-500";

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
      <div className="flex justify-around items-center py-2">
        <Link href="/" className="flex flex-col items-center text-xs">
          <FiHome className={`text-xl ${activeClass("/")}`} />
          <span className={activeClass("/")}>Home</span>
        </Link>

        <Link href="/categories" className="flex flex-col items-center text-xs">
          <FiGrid className={`text-xl ${activeClass("/categories")}`} />
          <span className={activeClass("/categories")}>Categories</span>
        </Link>

        <Link href="/offers" className="flex flex-col items-center text-xs">
          <FiTag className={`text-xl ${activeClass("/offers")}`} />
          <span className={activeClass("/offers")}>Offers</span>
        </Link>

        <Link href="/profile" className="flex flex-col items-center text-xs">
          <FiUser className={`text-xl ${activeClass("/profile")}`} />
          <span className={activeClass("/profile")}>Profile</span>
        </Link>

        <Link href="/get-app" className="flex flex-col items-center text-xs">
          <FiDownload className="text-xl text-gray-500" />
          <span className="text-gray-500">Get App</span>
        </Link>
      </div>
    </nav>
  );
}
