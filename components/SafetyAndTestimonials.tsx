"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const standards = [
  {
    title: "Make in India",
    desc: "Proudly made in India, delivering quality healthcare products crafted with care, innovation, and reliability.",
    icon: "https://res.cloudinary.com/techsrow/image/upload/v1768117813/crescent%20health%20Care/End%20icons/Untitled%20design/make-in-india_pdrxeo.png",
  },
  {
    title: "High Quality",
    desc: "High quality products crafted with precision, reliability, safety standards, and trusted performance for everyday wellness.",
    icon: "https://res.cloudinary.com/techsrow/image/upload/v1768117813/crescent%20health%20Care/End%20icons/Untitled%20design/5_efnfer.png",
  },
  {
    title: "ABS Material",
    desc: "High quality ABS material ensures durability, strength, lightweight performance, and long-lasting reliable use every day.",
    icon: "https://res.cloudinary.com/techsrow/image/upload/v1768117812/crescent%20health%20Care/End%20icons/Untitled%20design/1_esv4wr.png",
  },
    {
    title: "ISI Certified",
    desc: "ISI certified products guarantee safety, quality standards, and compliance with trusted Indian manufacturing regulations.",
    icon: "https://res.cloudinary.com/techsrow/image/upload/v1768117813/crescent%20health%20Care/End%20icons/Untitled%20design/2_qg7bpe.png",
  },

  {
    title: "Made Safe Certified",
    desc: "The MADE SAFE seal means a product is literally made with safe ingredients.",
    icon: "https://res.cloudinary.com/techsrow/image/upload/v1768117812/crescent%20health%20Care/End%20icons/Untitled%20design/3_vcmlst.png",
  },

   {
    title: "Certified Protection",
    desc: "Certified protection ensures products meet safety benchmarks and provide dependable usage confidence..",
    icon: "https://res.cloudinary.com/techsrow/image/upload/v1768117812/crescent%20health%20Care/End%20icons/Untitled%20design/4_wig79z.png",
  },
  
  
  
];

const testimonials = [
  {
    id: 1,
    name: "Waris Raza",
    text: "I live near the coastal region, and sun tan is a big issue here. Mamaearth Ubtan Face Wash worked very well and my skin glow improved.",
    rating: 5,
    image: "https://res.cloudinary.com/techsrow/image/upload/v1768028646/crescent%20health%20Care/856a7452-6ce9-440c-bcf7-7e273c62fc24._CR0_0_387_387_SX48__cbhvwy.jpg",
  },
  {
    id: 2,
    name: "Manisha",
    text: "I have always used natural products for my baby. Mamaearth products are toxin-free and effective. Shopping experience was smooth and fast.",
    rating: 5,
    image: "https://res.cloudinary.com/techsrow/image/upload/v1768028646/crescent%20health%20Care/a92c6ccd-390d-4d80-b409-0165013b050f._CR62_0_375_375_SX48__ygh6iz.jpg",
  },
  {
     id: 3,
    name: "Tanmay",
    text: "I was facing excessive hair fall. Onion Shampoo and Hair Serum helped a lot. I also use Ubtan Face Wash.",
    rating: 5,
    image: "https://res.cloudinary.com/techsrow/image/upload/v1768028646/crescent%20health%20Care/dc4d5995-3467-4dd6-81af-61c039d47cd5._CR0_0_500_500_SX48__bruw3i.jpg",
  },
  {
     id: 4,
    name: "Tanmay",
    text: "I was facing excessive hair fall. Onion Shampoo and Hair Serum helped a lot. I also use Ubtan Face Wash.",
    rating: 5,
    image: "https://res.cloudinary.com/techsrow/image/upload/v1768028646/crescent%20health%20Care/330ec3c4-6844-4a39-b3ee-99148d7e536f._CR0_0.0_333_333_SX48__x6cvmo.jpg",
  },
  {
     id: 5,
    name: "Tanmay",
    text: "I was facing excessive hair fall. Onion Shampoo and Hair Serum helped a lot. I also use Ubtan Face Wash.",
    rating: 5,
    image: "https://res.cloudinary.com/techsrow/image/upload/v1768028955/crescent%20health%20Care/04cfe734-a118-4a66-8959-ef138e063448._CR0_0_500_500_SX48__u0ct3p.jpg",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 ">
          {standards.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 bg-[#691d5a] backdrop-blur-md rounded-xl p-6"
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
