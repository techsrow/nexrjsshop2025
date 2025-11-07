/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext"; // ✅ make sure you have this hook/context
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart(); // ✅ function from your CartContext

  useEffect(() => {
    productService.getAll().then(setProducts);
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };



  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category Buttons & Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap gap-2">
            <button className="px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer whitespace-nowrap bg-amber-400 text-black">
              All
            </button>
            <button className="px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer whitespace-nowrap bg-gray-800 text-gray-300 hover:bg-gray-700">
              Hookahs
            </button>
            <button className="px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer whitespace-nowrap bg-gray-800 text-gray-300 hover:bg-gray-700">
              Flavors
            </button>
            <button className="px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer whitespace-nowrap bg-gray-800 text-gray-300 hover:bg-gray-700">
              Accessories
            </button>
            <button className="px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer whitespace-nowrap bg-gray-800 text-gray-300 hover:bg-gray-700">
              Apparel
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400">Sort by:</span>
            <select className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-400 pr-8">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-product-shop="true">

          {/* Example Product Card */}

{products.map((product: any) => (

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-400/50 transition-all duration-300 group cursor-pointer">
            <div className="relative overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Premium%20glass%20hookah%20with%20elegant%20design&width=400&height=400&seq=shop-hookah-1&orientation=squarish"
                alt="Premium Glass Hookah"
                className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">NEW</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">SALE</span>
              </div>
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-amber-400 hover:text-black transition-colors cursor-pointer">
                  <i className="ri-heart-line"></i>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-amber-400 hover:text-black transition-colors cursor-pointer">
                  <i className="ri-eye-line"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-2">
                <span className="text-xs font-medium text-amber-400 uppercase tracking-wide">Hookahs</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                Premium Glass Hookah
              </h3>
              <div className="flex items-center mb-3">
                <div className="flex text-amber-400 mr-2">
                  <i className="ri-star-fill text-sm"></i>
                  <i className="ri-star-fill text-sm"></i>
                  <i className="ri-star-fill text-sm"></i>
                  <i className="ri-star-fill text-sm"></i>
                  <i className="ri-star-line text-sm"></i>
                </div>
                <span className="text-gray-400 text-sm">(124)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-amber-400">$299.99</span>
                  <span className="text-gray-500 line-through">$349.99</span>
                </div>
                <button
                  type="button"
                  className="font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 shadow-lg hover:shadow-xl px-4 py-2 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <i className="ri-shopping-cart-line mr-1"></i>Add
                </button>
              </div>
            </div>
          </div>

          {/* Repeat other products here following same structure */}

        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button
            type="button"
            className="font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-8 py-4 text-lg rounded-xl"
          >
            Load More Products
            <i className="ri-arrow-down-line ml-2"></i>
          </button>
        </div>

      </div>
    </section>
  );
};




