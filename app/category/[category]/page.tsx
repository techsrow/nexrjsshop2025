/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CategoryProductsPage() {
  const { category } = useParams(); // 👈 category from URL
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const res = await productService.getAll();
        const allProducts = res.data || res;

        // ✅ FILTER BY CATEGORY
        const filtered = allProducts.filter((product: any) => {
          const productCategory =
            product.categorySlug || product.category;

          return (
            productCategory &&
            productCategory.toLowerCase() === String(category).toLowerCase()
          );
        });

        setProducts(filtered);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    })();
  }, [category]);

  const handleAddToCart = async (product: any) => {
    try {
      await addToCart(product.id, 1, {
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
      });
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* CATEGORY TITLE */}
        <h1 className="text-2xl font-bold mb-8 capitalize">
          {String(category).replace("-", " ")}
        </h1>

        {/* PRODUCT GRID */}
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition"
              >
                {/* IMAGE + BADGE */}
                <div className="relative p-4">
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-md text-white
                        ${
                          product.badge === "BEST SELLER"
                            ? "bg-pink-500"
                            : "bg-green-500"
                        }
                      `}
                    >
                      {product.badge}
                    </span>
                  )}

                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.imageUrl || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-52 object-contain"
                    />
                  </Link>
                </div>

                {/* CONTENT */}
                <div className="px-4 pb-5 text-center">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
                      {product.name}
                    </h3>
                  </Link>

                  {product.benefits && (
                    <p className="text-sm text-green-600 mt-2 line-clamp-2">
                      {product.benefits}
                    </p>
                  )}

                  {product.size && (
                    <p className="text-sm text-gray-600 mt-1">
                      {product.size}
                    </p>
                  )}

                  <div className="flex justify-center items-center gap-2 mt-2 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span>{product.rating || "4.7"}</span>
                    <span className="text-blue-500">
                      ✔ {product.reviews || "75"} Reviews
                    </span>
                  </div>

                  <div className="mt-3 text-lg font-bold text-gray-900">
                    ₹{product.price}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold transition"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
