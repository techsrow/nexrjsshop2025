import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Mystic Smoke",
  description: "Experience the Art of Smoke",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <CartProvider>

             {children}
        </CartProvider>
     
        <Footer />
      </body>
    </html>
  );
}
