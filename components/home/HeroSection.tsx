"use client";

import Image from "next/image";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const t = useTranslations("Home");
  const router = useRouter();

  return (
    <section className="py-20 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Left Side - Text */}
        <div className="space-y-6 text-center md:text-start text-primary">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {t("heroTitle") || "Discover the Fresh Taste of Tolido"}
          </h1>
          <p className="text-lg font-medium text-text max-w-md mx-auto md:mx-0">
            {t("heroSubtitle") ||
              "Premium quality canned and packaged foods that bring authentic flavor to your table."}
          </p>
          <Button
            type="primary"
            size="large"
            className="bg-[#f6c500] text-black font-semibold border-none hover:bg-yellow-400"
            onClick={() => router.push("/products")}
          >
            {t("shopNow") || "Shop Now"}
          </Button>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/heroH.png"
            alt="Tolido Products"
            width={500}
            height={400}
            className="rounded-2xl shadow-xl object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
      </div>
    </section>
  );
}
