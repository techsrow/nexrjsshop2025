import Image from "next/image";

export default function About() {
  return (
    <>
      {/* ✅ FULL WIDTH BANNER */}
      <section className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] overflow-hidden">
        <Image
          src="/about-banner.jpeg" // ✅ place inside public folder
          alt="About Al-Saif Sheesha"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* ✅ ABOUT COMPANY SECTION */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            About Al-Saif Sheesha
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            Al-Saif Sheesha is a premium brand offering luxury herbal shisha and
            finest smoking accessories. Established with passion and detail,
            we bring a modern smoking experience rooted in tradition. Our products
            combine rich flavours, smooth smoke quality, and elegant craftsmanship —
            designed for lounges, premium cafes, and personal enjoyment.
          </p>
        </div>
      </section>

      {/* ✅ IMAGE + STORY SECTION */}
      <section className="py-16 bg-gray-100 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/about-main.jpeg"
              alt="Hookah Culture"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Our Story</h3>
            <p className="text-gray-700 leading-relaxed">
              What started as a passion for authentic hookah culture turned into a premium
              lifestyle brand. Al-Saif Sheesha offers herbal (tobacco-free, nicotine-free)
              flavours created from natural herbs and fine ingredients.
              <br /><br />
              Each product is tested for quality, flavour consistency, and smooth performance.
              Whether you're a beginner or a seasoned hookah enthusiast — we deliver 
              unmatched taste and enjoyment.
            </p>
          </div>

        </div>
      </section>

      {/* ✅ MISSION & VISION */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 text-center">

          <div className="bg-gray-800 p-10 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To provide safe, premium, herbal smoking alternatives with rich flavor and
              modern style — without tobacco, nicotine, or harmful chemicals.
            </p>
          </div>

          <div className="bg-gray-800 p-10 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              Become the most trusted herbal sheesha brand globally — delivering smooth,
              flavorful, and clean experiences enjoyed responsibly.
            </p>
          </div>

        </div>
      </section>

      {/* ✅ WHY CHOOSE US */}
      <section className="py-20 bg-gray-100 text-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Al-Saif?</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">✅ Herbal & Safe</h3>
              <p className="text-gray-700">100% herbal, nicotine-free & tobacco-free flavours.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">✅ Premium Taste</h3>
              <p className="text-gray-700">Smooth, rich flavours crafted from natural ingredients.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">✅ Luxury Experience</h3>
              <p className="text-gray-700">Designed for lounges, cafes & modern lifestyle.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">✅ Quality Tested</h3>
              <p className="text-gray-700">Every product goes through strict quality testing.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">✅ Smooth Smoke</h3>
              <p className="text-gray-700">No harshness — only smooth and enjoyable puffs.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">✅ International Standard</h3>
              <p className="text-gray-700">Meets global hygiene and safety standards.</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
