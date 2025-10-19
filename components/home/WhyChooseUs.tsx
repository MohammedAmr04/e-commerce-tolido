"use client";

import {
  CheckCircleOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";

export default function WhyChooseUs() {
  const t = useTranslations("Home.whyChoose");

  const features = [
    {
      icon: (
        <TrophyOutlined className="text-4xl text-[var(--color-secondary)]" />
      ),
      key: "premium",
    },
    {
      icon: (
        <CheckCircleOutlined className="text-4xl text-[var(--color-secondary)]" />
      ),
      key: "trusted",
    },
    {
      icon: (
        <ClockCircleOutlined className="text-4xl text-[var(--color-secondary)]" />
      ),
      key: "longLife",
    },
    {
      icon: (
        <ShoppingOutlined className="text-4xl text-[var(--color-secondary)]" />
      ),
      key: "available",
    },
  ];

  return (
    <section className="py-20 bg-[var(--color-backgroundSoft)] transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-12">
          {t("title", { defaultValue: "Why Choose Tolido" })}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="
                group relative bg-[var(--color-card)] text-[var(--color-text)]
                border border-[var(--color-border)]
                rounded-2xl p-8 shadow-md
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
                overflow-hidden
              "
            >
              {/* خطوط ديكورية */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500"></div>

              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                {t(`${item.key}Title`)}
              </h3>
              <p className="text-[var(--color-gray)] dark:text-[var(--color-text)] text-sm">
                {t(`${item.key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
