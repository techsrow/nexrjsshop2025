import "./globals.css";

import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import Header from "@/components/header/Header";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CatalogMenuProvider } from "@/components/header/CatalogMenuProvider";

import ToasterClient from "@/components/ToasterClient"; // ✅ client wrapper
import FloatingContactButtons from "@/components/common/FloatingContactButtons";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>

      <body className="text-dark pb-16">
        <AuthProvider>
          <CartProvider>
            {/* ✅ NO endpoints prop */}
            <CatalogMenuProvider>
              {/* HEADER */}
              <Header />

              {/* PAGE CONTENT */}
              <main>{children}</main>

              {/* CLIENT-ONLY */}
              <ToasterClient />
<FloatingContactButtons />

              <Footer />
              <MobileBottomNav />
            </CatalogMenuProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
