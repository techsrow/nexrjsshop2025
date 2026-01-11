"use client";

import Footer from "@/components/Footer";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import AgeGate from "@/components/AgeGate";
import HeaderDesktop from "@/components/HeaderDesktop";
import HeaderMobile from "@/components/HeaderMobile";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>

      {/* 👇 pb-16 REQUIRED for bottom nav */}
      <body className="text-dark pb-16">
        <AuthProvider>
          <CartProvider>

            {/* Desktop Header */}
            <div className="hidden lg:block">
              <HeaderDesktop />
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden">
              <HeaderMobile />
            </div>

            {/* PAGE CONTENT */}
            <main>{children}</main>

            <Toaster />
            <Footer />

            {/* MOBILE BOTTOM NAV */}
            <MobileBottomNav />

          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
