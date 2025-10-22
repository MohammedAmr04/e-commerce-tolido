import { useTranslations } from "next-intl";

import ContactForm from "@/components/contactus/ContactForm";
import TolidoMap from "@/components/contactus/TolidoMap";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-all duration-300">
      {/* 🗺️ Map Section */}
      <section className="py-12 px-4 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">
          {t("map.title")}
        </h2>

        <p className="text-[var(--color-text)] opacity-80 text-xl font-medium max-w-2xl mx-auto mb-8">
          {t("map.subtitle")}
        </p>

        <div className="w-full h-[60vh] rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)]">
          <TolidoMap />
        </div>
      </section>

      {/* 💬 Contact Form Section */}
      <section className="py-16 px-4 md:px-16 bg-[var(--color-background-alt)]">
        <ContactForm />
      </section>
    </div>
  );
}
