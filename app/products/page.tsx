/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { cartService } from "@/services/cartService";
import toast from "react-hot-toast";
export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const res = await productService.getAll();
        setProducts(res.data || res); // handle both wrapped/unwrapped responses
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    })();
  }, []);

const handleAddToCart = async (product: any) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await addToCart(product.id, 1);
      toast.success("✅ Added to cart!");
      // alert("✅ Added to cart!");
    } else {
      // guest cart
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = existingCart.find((p: any) => p.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        existingCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));

      alert("✅ Added to cart!");
    }
  } catch (error) {
    console.error("❌ Failed to add to cart:", error);
  }
};


  // const handleAddToCart = async (product: any) => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     if (token) {
  //       // ✅ Logged-in user → send to server
  //       await cartService.addToCart(product.id, 1);
  //       addToCart(product, 1);
  //       console.log("✅ Added to server cart");
  //     } else {
  //       // 🧠 Guest user → store in localStorage
  //       const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
  //       const existingItem = existingCart.find((p: any) => p.id === product.id);

  //       if (existingItem) {
  //         existingItem.quantity += 1;
  //       } else {
  //         existingCart.push({ ...product, quantity: 1 });
  //       }

  //       localStorage.setItem("cart", JSON.stringify(existingCart));
  //       addToCart(product, 1);
  //       console.log("🛒 Added to guest cart");
  //     }
  //   } catch (error) {
  //     console.error("❌ Failed to add to cart:", error);
  //   }
  // };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter + Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap gap-2">
            {["All", "Hookahs", "Flavors", "Accessories", "Apparel"].map((cat) => (
              <button
                key={cat}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                  cat === "All"
                    ? "bg-amber-400 text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400">Sort by:</span>
            <select className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400 pr-8">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-400/50 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-amber-400 hover:text-black transition-colors cursor-pointer">
                    <i className="ri-heart-line"></i>
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-amber-400 hover:text-black transition-colors cursor-pointer"
                  >
                    <i className="ri-eye-line"></i>
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-medium text-amber-400 uppercase tracking-wide">
                    {product.category || "Hookah"}
                  </span>
                </div>

                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-400">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="font-semibold transition-all duration-300 bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 shadow-lg px-4 py-2 text-sm rounded-md opacity-0 group-hover:opacity-100"
                  >
                    <i className="ri-shopping-cart-line mr-1"></i>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button
            type="button"
            className="font-semibold border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-8 py-4 text-lg rounded-xl transition-all"
          >
            Load More Products <i className="ri-arrow-down-line ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
