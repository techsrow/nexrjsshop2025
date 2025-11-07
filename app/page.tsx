import FeaturedProducts from "@/components/FeaturedProducts";
import FlavorOfTheWeek from "@/components/FlavorOfTheWeek";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <main className="pt-20">
      <Hero />
      <FeaturedProducts />
      <FlavorOfTheWeek />
      <Newsletter />
    </main>
  );
}
