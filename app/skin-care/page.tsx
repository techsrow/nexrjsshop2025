"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { getVariantPrice } from "@/utils/variantHelper";

/* ✅ NORMALIZE STRING CATEGORY */
const normalizeCategory = (value: string) =>
  value
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export default function SkinCarePage() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  /* ✅ LOAD ONLY "Skin Care" CATEGORY PRODUCTS */
  useEffect(() => {
    (async () => {
      try {
        const res = await productService.getAll();
        const all = res?.data || res || [];

        const filtered = all.filter((p: any) => {
          if (!p.category || typeof p.category !== "string") return false;

          return (
            normalizeCategory(p.category) ===
            normalizeCategory("Skin Care")
          );
        });

        console.log("Skin Care Products:", filtered);
        setProducts(filtered);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  /* ✅ ADD TO CART */
  const handleAddToCart = async (product: any) => {
    const resolved = getVariantPrice(product.variants);

    if (!resolved) {
      toast.error("Variant not available");
      return;
    }

    try {
      await addToCart(resolved.variantId, 1, {
        productId: product.id,
        name: product.name,
        price: resolved.price,
        mrp: resolved.mrp,
        imageUrl: product.imageUrl,
        variant: resolved.variant,
      });

      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Skin Care
            </h1>
            <p className="text-gray-600 mt-2 max-w-3xl text-sm">
              Discover gentle, effective skincare products crafted to nourish,
              protect, and enhance your natural glow.
            </p>
          </div>

          <Link
            href="/products"
            className="mt-4 md:mt-0 bg-[#b3008f] hover:bg-[#990077] text-white px-5 py-2 rounded-md text-sm font-semibold"
          >
            View All Products
          </Link>
        </div>

        {/* PRODUCT GRID */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No skin care products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product: any) => {
              const resolved = getVariantPrice(product.variants);
              if (!resolved) return null;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="bg-gray-50 h-40 md:h-48 flex items-center justify-center">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-32 md:h-40 object-contain"
                      />
                    </div>
                  </Link>

                  <div className="p-4 text-center">
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {product.name}
                    </h3>

                    {/* PRICE */}
                    <div className="mt-2 text-lg font-bold">
                      ₹{resolved.price}
                      {resolved.mrp && (
                        <del className="ml-2 text-sm text-gray-500">
                          ₹{resolved.mrp}
                        </del>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 w-full bg-[#b3008f] hover:bg-[#990077] text-white py-2.5 rounded-lg text-sm font-semibold"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
