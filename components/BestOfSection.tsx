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

/**
 * 🔑 UI TAB → DB CATEGORY MAPPING
 */
const tabs = [
  { label: "Best Seller", dbValue: "BEST SELLER" },
  { label: "Hair Care", dbValue: "Hair Care" },
  { label: "Face Wash", dbValue: "Face Wash" },
  { label: "Body Care", dbValue: "Body Care" },
  { label: "Tshirt", dbValue: "Tshirt" },
];

export default function BestOfWOWSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].dbValue);
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts(activeTab);
  }, [activeTab]);

  const loadProducts = async (category: string) => {
    try {
      const res = await productService.getAll();
      const allProducts = res.data?.data || res.data || [];

      // ✅ STRICT DB CATEGORY MATCH
      const filtered = allProducts.filter(
        (p: any) => p.category === category
      );

      setProducts(filtered);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  const handleAddToCart = async (product: any) => {
    try {
      const variant = product.variants?.[0];

      if (!variant) {
        toast.error("Variant not available");
        return;
      }

      await addToCart(variant.id, 1, {
        name: product.name,
        price: variant.discountPrice ?? variant.price,
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
              key={tab.dbValue}
              onClick={() => setActiveTab(tab.dbValue)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition
                ${
                  activeTab === tab.dbValue
                    ? "bg-[#b3008f] hover:bg-[#990077] text-white"
                    : "text-gray-500 hover:text-black"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SLIDER */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found in this category.
          </p>
        ) : (
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
            {products.map((product) => {
              const variant = product.variants?.[0];
              const price =
                variant?.discountPrice ?? variant?.price ?? 0;

              return (
                <SwiperSlide key={product.id}>
                  <div className="bg-white rounded-2xl shadow hover:shadow-lg transition h-full overflow-hidden">

                    {/* IMAGE */}
                    <Link href={`/products/${product.id}`}>
                      <img
                        src={product.imageUrl || "/placeholder.png"}
                        alt={product.name}
                        className="w-full h-64 object-contain p-4"
                      />
                    </Link>

                    {/* CONTENT */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="text-lg font-bold mb-4">
                        ₹{price.toFixed(2)}
                        {variant?.discountPrice && (
                          <del className="ml-2 text-gray-500 text-sm">
                            ₹{variant.price}
                          </del>
                        )}
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
              );
            })}
          </Swiper>
        )}

      </div>
    </section>
  );
}
