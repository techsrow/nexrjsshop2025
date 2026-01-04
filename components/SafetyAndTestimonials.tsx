"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const standards = [
  {
    title: "Dermatologically Tested",
    desc: "We ensure each product is tested clinically on sensitive human skin to ensure that it is not allergenic.",
    icon: "/icons/dermatology.png",
  },
  {
    title: "FDA Approved",
    desc: "MamaEarth is FDA approved, which means we are 100% safe to be used for babies as well as mamas.",
    icon: "/icons/fda.png",
  },
  {
    title: "Made Safe Certified",
    desc: "The MADE SAFE seal means a product is literally made with safe ingredients.",
    icon: "/icons/made-safe.png",
  },
  
  
];

const testimonials = [
  {
    id: 1,
    name: "Waris Raza",
    text: "I live near the coastal region, and sun tan is a big issue here. Mamaearth Ubtan Face Wash worked very well and my skin glow improved.",
    rating: 5,
    image: "/users/u1.jpg",
  },
  {
    id: 2,
    name: "Manisha",
    text: "I have always used natural products for my baby. Mamaearth products are toxin-free and effective. Shopping experience was smooth and fast.",
    rating: 5,
    image: "/users/u2.jpg",
  },
  {
     id: 3,
    name: "Tanmay",
    text: "I was facing excessive hair fall. Onion Shampoo and Hair Serum helped a lot. I also use Ubtan Face Wash.",
    rating: 5,
    image: "/users/u3.jpg",
  },
  {
     id: 4,
    name: "Tanmay",
    text: "I was facing excessive hair fall. Onion Shampoo and Hair Serum helped a lot. I also use Ubtan Face Wash.",
    rating: 5,
    image: "/users/u3.jpg",
  },
  {
     id: 5,
    name: "Tanmay",
    text: "I was facing excessive hair fall. Onion Shampoo and Hair Serum helped a lot. I also use Ubtan Face Wash.",
    rating: 5,
    image: "/users/u3.jpg",
  },
];

export default function SafetyAndTestimonials() {
  return (
    <section className="relative py-20 overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          background: "#b3008f",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06), transparent 40%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 text-white">

        {/* SUPER SAFE STANDARDS */}
        <h2 className="text-2xl font-bold text-center mb-12">
          Super Safe Standards
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {standards.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-14 h-14 object-contain"
              />
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-white/80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TESTIMONIAL TITLE */}
        <h2 className="text-2xl font-bold text-center mb-10">
          What Our Customers Say
        </h2>

        {/* TESTIMONIAL SLIDER */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white rounded-xl p-6 h-full shadow-lg text-black">
                <p className="text-sm text-gray-700 mb-6">
                  {t.text}
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <span className="text-green-600 text-sm">
                      {"★".repeat(t.rating)}
                    </span>
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
