import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white">
        <AuthProvider>
          <CartProvider>
            <Navbar /> {/* ✅ Moved inside AuthProvider */}
            {children}
            <Toaster />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
