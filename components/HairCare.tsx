"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Link from "next/link";
import toast from "react-hot-toast";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { getVariantPrice } from "@/utils/variantHelper";

export default function HairCare() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

   useEffect(() => {
  (async () => {
    try {
      const res = await productService.getAll();
      const all = res.data || res;

      const filtered = all.filter((p: any) =>
        p.category?.toLowerCase() === "hair care"
      );

      console.log("Filtered Products:", filtered);
      setProducts(filtered);
    } catch (e) {
      console.error(e);
    }
  })();
}, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await productService.getAll();
  //       const all = res.data?.data || res.data || [];

  //       const featured = all.filter(
  //         (p: any) =>
  //           typeof p.category === "string" &&
  //           p.category.trim().toLowerCase() === "featured products"
  //       );

  //       setProducts(featured);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   })();
  // }, []);

  if (products.length === 0) return null;

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
        price: resolved.price, // ✅ SELLING PRICE ONLY
        mrp: resolved.mrp,
        imageUrl: product.imageUrl,
        variant: resolved.variant,
      });

      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add");
    }
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
       <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">Hair Care</h2>
            <p className="text-gray-600 mt-2 max-w-3xl text-sm">
              Explore best-selling safe, natural, and 100% toxin-free baby and
              beauty products. Get amazing deals and start your toxin-free skin,
              hair, and baby care journey.
            </p>
          </div>

          <Link
            href="/products"
            className="bg-[#b3008f] hover:bg-[#990077] text-white  px-5 py-2 rounded-md text-sm font-semibold"
          >
            VIEW ALL
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => {
            const resolved = getVariantPrice(product.variants);
            if (!resolved) return null;

            return (
              <SwiperSlide key={product.id}>
                <div className="border rounded-xl bg-white h-full">
                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-56 object-contain p-4"
                    />
                  </Link>

                  <div className="px-4 pb-4 text-center">
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {product.name}
                    </h3>

                    {/* PRICE */}
                    <div className="mt-3 text-lg font-bold">
                      ₹{resolved.price}
                      {resolved.mrp && (
                        <del className="ml-2 text-sm text-gray-500">
                          ₹{resolved.mrp}
                        </del>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 w-full bg-[#b3008f] text-white py-3 rounded-lg"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
