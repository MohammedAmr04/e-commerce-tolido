"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterSquareFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-section", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="transition-colors duration-500 bg-[var(--color-bg)] text-[var(--color-text)] border-t border-[var(--color-border)] mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-14 text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 place-items-center">
        {/* About Section */}
        <div className="footer-section max-w-xs">
          <h2 className="text-2xl font-semibold mb-3 transition-transform duration-300 hover:scale-105 text-[var(--color-primary)]">
            Tolido
          </h2>
          <p className="text-sm leading-relaxed opacity-90 hover:opacity-100 transition-opacity duration-300">
            {t("description")}
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <ul className="space-y-3 text-sm">
            {[
              { href: "/", label: t("home") },
              { href: "/products", label: t("products") },
              { href: "/about", label: t("about") },
              { href: "/contact", label: t("contact") },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-all duration-300 hover:text-[var(--color-primary)] font-medium rounded px-2 py-1 inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-primary)]">
            {t("contact")}
          </h3>
          <p className="text-sm opacity-90 hover:text-[var(--color-primary)] rounded px-2 py-1 transition-all duration-300">
            info@tolido.com
          </p>
          <p className="text-sm opacity-90 mt-2 hover:text-[var(--color-primary)] rounded px-2 py-1 transition-all duration-300">
            +20 100 123 4567
          </p>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-3 text-[var(--color-primary)]">
            {t("followUs")}
          </h3>
          <div className="flex items-center justify-center space-x-5 text-2xl">
            {[
              { icon: <FacebookFilled />, label: "Facebook" },
              { icon: <InstagramFilled />, label: "Instagram" },
              { icon: <TwitterSquareFilled />, label: "Twitter" },
              { icon: <LinkedinFilled />, label: "LinkedIn" },
            ].map(({ icon, label }, i) => (
              <a
                key={i}
                href="#"
                aria-label={label}
                className="transition-all duration-300 hover:text-[var(--color-primary)] hover:scale-110 p-2 rounded"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-[var(--color-border)] text-center py-5 text-sm opacity-80 hover:opacity-100 transition-opacity duration-300">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-[var(--color-primary)]">
          Tolido
        </span>
        . {t("rights")}
      </div>
    </footer>
  );
}
