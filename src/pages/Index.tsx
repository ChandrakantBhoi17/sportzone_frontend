import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import ShopByCategory from "@/components/ShopByCategory";
import DailyWearSection from "@/components/DailyWearSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <FeaturedCategories />
    <ShopByCategory />
    <DailyWearSection />
    <WhyChooseUs />
    <FAQSection />
    <Footer />
  </div>
);

export default Index;
