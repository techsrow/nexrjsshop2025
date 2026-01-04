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

export default function HairCare() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const res = await productService.getAll();
        const all = res.data || res;

        // ✅ Only best seller products
        // const bestSellers = all.filter(
        //   (p: any) =>
        //     p.isBestSeller ||
        //     p.badge === "BEST SELLER" ||
        //     p.badge === "TRENDING"
        // );

       // setProducts(bestSellers);
        setProducts(all);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleAddToCart = async (product: any) => {
    try {
      await addToCart(product.id, 1, {
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
      });
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add");
    }
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
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
            href="/best-sellers"
            className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-md text-sm font-semibold"
          >
            VIEW ALL
          </Link>
        </div>

        {/* SLIDER */}
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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="border rounded-xl overflow-hidden bg-white h-full">

                {/* IMAGE + BADGE */}
                <div className="relative p-4">
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-md text-white
                        ${
                          product.badge === "BEST SELLER"
                            ? "bg-pink-500"
                            : product.badge === "TRENDING"
                            ? "bg-orange-500"
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
                      className="w-full h-56 object-contain"
                    />
                  </Link>
                </div>

                {/* CONTENT */}
                <div className="px-4 pb-4 text-center">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[42px]">
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
                    <span>{product.rating || "4.9"}</span>
                    <span className="text-blue-500">
                      {product.reviews || "120"} Reviews
                    </span>
                  </div>

                  <div className="mt-3 text-lg font-bold text-gray-900">
                    ₹{product.price} <del className="text-gray-500 text-sm">₹ {product.discountPrice}</del>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold"
                  >
                    ADD TO CART
                  </button>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
