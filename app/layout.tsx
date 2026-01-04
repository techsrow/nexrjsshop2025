"use client";

import Footer from "@/components/Footer";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import AgeGate from "@/components/AgeGate";
import HeaderDesktop from "@/components/HeaderDesktop";
import HeaderMobile from "@/components/HeaderMobile";

export default function RootLayout({ children }: { children: React.ReactNode }) {


  
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className="text-dark">
        
        <AuthProvider>
          <CartProvider>
          
{/* Desktop */}
        <div className="hidden lg:block">
          <HeaderDesktop />
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <HeaderMobile />
        </div>
        
        
            {children}
            <Toaster />
            <Footer />
          </CartProvider>
        </AuthProvider>
        
      </body>
    </html>
  );
}
