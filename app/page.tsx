import About from "@/components/About";
import Banner from "@/components/Banner";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import FeaturedProducts from "@/components/FeaturedProductsSlider";
import FlavorOfTheWeek from "@/components/FlavorOfTheWeek";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import VideoBanner from "@/components/VideoBanner";
import AgeGate from "@/components/AgeGate";
import HomeSlider from "@/components/HomeSlider";
import BestSellerSlider from "@/components/BestSellerSlider";
import BestOfWOWSection from "@/components/BestOfSection";
import SkinCare from "@/components/SkinCare";
import HairCare from "@/components/HairCare";
import HealthCareDevice from "@/components/HealthCareDevice";
import Hijama from "@/components/Hijama";
import DermaRoller from "@/components/DermaRoller";
import SafetyAndTestimonials from "@/components/SafetyAndTestimonials";
import ServicePaymentSection from "@/components/ServicePaymentSection";
import FeaturedProductsSlider from "@/components/FeaturedProductsSlider";

export default function HomePage() {
  return (
    <main>
       <HomeSlider />
        <BestSellerSlider />
         <BestOfWOWSection />
         <SkinCare/>
         <HairCare />
         <HealthCareDevice />
         <Hijama />
         <DermaRoller/>
        
        <FeaturedProductsSlider />
       <SafetyAndTestimonials />
        <FAQ />
        <Blog />
        <ServicePaymentSection/>
      </main>
  );
}
