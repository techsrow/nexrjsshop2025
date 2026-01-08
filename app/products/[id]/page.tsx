"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    (async () => {
      const res = await productService.getById(id as string);
      const data = res.data || res;
      setProduct(data);

      if (data?.variants?.length) {
        setSelectedVariant(data.variants[0]);
      }
    })();
  }, [id]);

  if (!product || !selectedVariant) {
    return <div className="py-32 text-center">Loading...</div>;
  }

  const price = Number(
    selectedVariant.discountPrice ?? selectedVariant.price
  );

  /* ---------------- UI ---------------- */

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT IMAGE */}
        <div>
          <div className="border rounded-xl p-4">
            <Image
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              width={500}
              height={500}
              className="mx-auto object-contain"
            />
          </div>

          {/* Thumbnails (static for now) */}
          <div className="flex gap-3 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-16 h-16 border rounded-md flex items-center justify-center"
              >
                <Image
                  src={product.imageUrl || "/placeholder.png"}
                  alt=""
                  width={60}
                  height={60}
                />
              </div>
            ))}
          </div>
          <h4 className="mt-4 mb-4 p-4"> Product Description</h4>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-4">

          {/* Breadcrumb */}
          <p className="text-sm text-gray-500">
            Home › Face-Wash › <span className="text-gray-800">{product.name}</span>
          </p>

          {/* Title */}
          <h1 className="text-2xl font-bold">{product.name}</h1>

          {/* Highlights */}
          <p className="text-gray-600">
            Removes Tan | Brightens Skin
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            ⭐ 4.8
            <span className="text-blue-600 underline cursor-pointer">
              1826 Reviews
            </span>
          </div>

          {/* Net Content */}
          <p className="text-sm text-gray-600">
            Net content: {selectedVariant.weight || selectedVariant.size}
          </p>

          {/* Price */}
          <p className="text-3xl font-bold">₹{price}</p>

          {/* SELECT SIZE */}
          <div>
            <h3 className="font-semibold mb-2">Select Size</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {product.variants.map((v: any) => {
                const vPrice = Number(v.discountPrice ?? v.price);
                const active = v.id === selectedVariant.id;

                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`border rounded-lg p-3 text-left transition ${
                      active
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <div className="font-semibold">
                      {v.weight || v.size}
                    </div>
                    <div className="text-lg font-bold">₹{vPrice}</div>
                    <div className="text-xs text-green-600">In stock</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* OFFER BOX */}
          <div className="border rounded-lg p-4 flex gap-3 items-start">
            <span className="text-blue-600 text-xl">🎁</span>
            <div>
              <p className="font-semibold">Available Offers</p>
              <p className="text-sm text-gray-600">
                Flat 20% Off + 5% Prepaid | Use code SAVE25
              </p>
            </div>
          </div>

          {/* STICKY BUY BOX */}
          <div className="border rounded-xl p-4 space-y-3 bg-gray-50">
            <p className="text-2xl font-bold">₹{price}</p>

            <p className="text-sm text-gray-600">
              {selectedVariant.weight || selectedVariant.size}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border px-3 py-1"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border px-3 py-1"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() =>
                addToCart(selectedVariant.id, quantity, {
                  name: product.name,
                  imageUrl: product.imageUrl,
                  price,
                  variant: selectedVariant,
                })
              }
              className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
