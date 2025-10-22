"use client";

import { useTranslations } from "next-intl";
import { Typography, Card } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import SplitText from "@/components/services/animatedComponents/SplitText";
const { Title, Paragraph } = Typography;

export default function AboutPage() {
  const t = useTranslations("about");
  const { locale } = useParams();
  const isArabic = locale === "ar";

  return (
    <div
      className="min-h-screen bg-[var(--color-background)] transition-all duration-300"
    >
      {/* 🟡 Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center">
        {/* الخلفية */}
        <Image
          src="/about.jpg"
          alt="Tolido Products"
          fill
          className="object-cover brightness-75"
          priority
        />

        {/* Overlay */}
        <div  className="absolute opacity-30 inset-0 bg-primary "></div>

        {/* النص */}
        <div className="relative z-10 text-center px-4">
 
          <SplitText
  text={t("hero.subtitle")}
  className="text-4xl font-bold  !text-white/90 text-center"
  delay={100}
  duration={0.2}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-120px"
  textAlign="center"
/>
        </div>
      </section>

      {/* 🧱 Story Section */}
      <section className="py-16 px-6 md:px-16 lg:px-24 bg-[var(--color-card)] dark:bg-[var(--color-card)]">
        <div
          className={`max-w-5xl mx-auto space-y-6 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <Title
            level={2}
            className="!text-2xl md:!text-3xl font-bold !text-[var(--color-primary)]"
          >
            {t("story.sectionTitle")}
          </Title>

          {t.raw("story.paragraphs").map((para: string, index: number) => (
            <Card
              key={index}
              className="!bg-[var(--color-card)] !my-6 !text-[var(--color-text)] border border-[var(--color-border)] shadow-sm rounded-2xl"
            >
              <Paragraph className="!text-base md:!text-lg leading-relaxed">
                {para}
              </Paragraph>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
