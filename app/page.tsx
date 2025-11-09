import About from "@/components/About";
import Banner from "@/components/Banner";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import FeaturedProducts from "@/components/FeaturedProducts";
import FlavorOfTheWeek from "@/components/FlavorOfTheWeek";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import VideoBanner from "@/components/VideoBanner";

export default function HomePage() {
  return (
    <main className="pt-20">
      <Hero />
      <About />
      <FeaturedProducts />
      <Banner />
      <FlavorOfTheWeek />
      <VideoBanner />
      <FAQ />
      <Blog />
      <Newsletter />
    </main>
  );
}
