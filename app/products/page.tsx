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
    <section className="py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => {
          const minPrice = Math.min(
            ...product.variants.map((v: any) =>
              Number(v.discountPrice ?? v.price)
            )
          );

          return (
            <div key={product.id} className="border rounded-xl p-4">
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  className="h-52 w-full object-contain"
                />
              </Link>

              <h3 className="mt-3 font-semibold">{product.name}</h3>

              <p className="text-sm text-gray-500">
                {product.variants.length} variants
              </p>

              <p className="text-lg font-bold mt-2">₹{minPrice}</p>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-sky-600 text-white py-2 rounded"
              >
                ADD TO CART
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
