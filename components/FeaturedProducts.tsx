/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { cartService } from "@/services/cartService";
import toast from "react-hot-toast";


const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await productService.getAll();
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-black text-center text-gray-400">
        Loading featured products...
      </section>
    );
  }

  return (
   <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Featured <span className="text-amber-400">Products</span>
        </h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (

              <div
                key={product.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-400/50 transition-all duration-300 group cursor-pointer"
              >

                 
                <div className="relative overflow-hidden">

                   <Link href={`/products/${product.id}`} className="block">
  <img
    src={product.imageUrl || "/placeholder.png"}
    alt={product.name}
    className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500 cursor-pointer relative z-20"
  />
</Link>


                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Wishlist Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-amber-400 hover:text-black transition-colors cursor-pointer">
                      <i className="ri-heart-line"></i>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-amber-400 uppercase tracking-wide">
                      {product.category || "Hookah"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      <Link href={`/products/${product.id}`}>
  {product.name}
                      </Link>
                  
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-400">
                      ₹{product.price?.toLocaleString() || "N/A"}
                    </span>
                    <button
                      type="button"
                      className="font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 shadow-lg hover:shadow-xl px-4 py-2 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                    >
                      <i className="ri-shopping-cart-line mr-1"></i>

                      <Link href={`/products/${product.id}`}>
  Buy Now
                      </Link>
                     
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No featured products available.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
