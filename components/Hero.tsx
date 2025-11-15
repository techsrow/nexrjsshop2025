import React from "react";

import FeaturedProducts from "./FeaturedProducts";

export default function Hero() {
  return (
    <section
      className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 px-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Experience the<br></br> <span className="gold-text-color">Art of Smoke</span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Immerse yourself in luxury at our premium hookah lounge. Discover exotic flavors,
          premium products, and an unforgettable atmosphere.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/products" className="bg-gold-400 text-white px-6 py-3 rounded-md font-semibold bg-yellow-500 transition">Rent Now</a>
          {/* <a href="/reservations" className="border border-gold text-gold px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 hover:text-black transition">Reserve a Table</a> */}
        </div>
      </div>


      
    </section>

    
  );


 
}
