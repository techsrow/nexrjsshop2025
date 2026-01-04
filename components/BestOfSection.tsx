/* eslint-disable react-hooks/immutability */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

const tabs = [
  { label: "Best Seller", value: "best-seller" },
  { label: "Vaporizer", value: "vaporizer" },
  { label: "Hair Care", value: "hair-care" },
  { label: "Pot", value: "Pot" },
  { label: "Skin Treatments", value: "skin-treatments" },
];

export default function BestOfWOWSection() {
  const [activeTab, setActiveTab] = useState("vaporizer");
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts(activeTab);
  }, [activeTab]);

  const loadProducts = async (category: string) => {
    try {
      const res = await productService.getAll();
      const allProducts = res.data || res;

      // 🔹 Filter based on tab
      const filtered = allProducts.filter((p: any) => {
        const cat = p.categorySlug || p.category;
        if (category === "best-seller") {
          return p.isBestSeller || p.badge === "BEST SELLER";
        }
        return cat === category;
      });

      setProducts(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async (product: any) => {
    try {
      await addToCart(product.id, 1, {
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
      });
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-8">
          The Best Of Crescent Healthcare
        </h2>

        {/* TABS */}
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition
                ${
                  activeTab === tab.value
                    ? "bg-yellow-200 text-black"
                    : "text-gray-500 hover:text-black"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SLIDER */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white rounded-2xl shadow hover:shadow-lg transition h-full overflow-hidden">

                {/* IMAGE */}
                <div className="relative p-4">
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}

                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.imageUrl || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-64 object-contain rounded-xl"
                    />
                  </Link>
                </div>

                {/* FEATURES */}
                {product.features && (
                  <div className="px-4 flex flex-wrap gap-2">
                    {product.features.split("|").map((f: string) => (
                      <span
                        key={f}
                        className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="text-sm text-gray-600 mb-2">
                    ⭐ {product.rating || 5} ({product.reviews || 1} Reviews)
                  </div>

                  <div className="text-lg font-bold mb-4">
                    ₹{product.price} <del className="text-gray-500 text-sm">₹ {product.discountPrice}</del>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1 text-center bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg font-semibold"
                    >
                      View Product
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-semibold"
                    >
                      Add
                    </button>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
