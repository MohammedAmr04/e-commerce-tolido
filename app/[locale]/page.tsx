import HeroSection from "@/components/home/HeroSection";
import ProductSlider from "@/components/productsPage/ProductSlider";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductSlider title={"Featured Product"} products={[]} />
      <WhyChooseUs />
    </div>
  );
}
