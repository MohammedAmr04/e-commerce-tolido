import HeroSection from "@/components/home/HeroSection";
import ProductSlider from "@/components/productsPage/ProductSlider";
import { products } from "./products/page";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductSlider title={"Featured Product"} products={products} />
      <WhyChooseUs />
    </div>
  );
}
