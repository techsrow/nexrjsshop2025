/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import toast from "react-hot-toast";

const getCheapestVariant = (variants: any[]) => {
  return [...variants]
    .filter(v => v.stockQuantity > 0)
    .sort((a, b) => {
      const pa = Number(a.discountPrice ?? a.price);
      const pb = Number(b.discountPrice ?? b.price);
      return pa - pb;
    })[0];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    (async () => {
      const data = await productService.getAll();
      setProducts(data);
    })();
  }, []);

  const handleAddToCart = async (product: any) => {
    if (!product.variants?.length) {
      toast.error("Product unavailable");
      return;
    }

    const variant = getCheapestVariant(product.variants);

    if (!variant) {
      toast.error("Out of stock");
      return;
    }

    await addToCart(variant.id, 1, {
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: Number(variant.discountPrice ?? variant.price),
      variant: {
        size: variant.size,
        color: variant.color,
        weight: variant.weight,
      },
    });

    toast.success("Added to cart");
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Products
        </h1>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => {
            const minPrice = Math.min(
              ...product.variants.map((v: any) =>
                Number(v.discountPrice ?? v.price)
              )
            );

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group"
              >
                {/* IMAGE */}
                <Link href={`/products/${product.id}`}>
                  <div className="relative bg-gray-50 h-36 md:h-44 flex items-center justify-center">
                    <img
                      src={product.imageUrl || "/placeholder.png"}
                      alt={product.name}
                      className="h-32 md:h-36 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {product.variants.length} variants available
                  </p>

                  <p className="text-lg font-bold text-gray-900 mt-2">
                    ₹{minPrice}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full bg-[#b3008f] hover:bg-[#990077] text-white py-2.5 rounded-lg text-sm font-semibold transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
