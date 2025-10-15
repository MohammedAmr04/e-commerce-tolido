"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[50vh] bg-[var(--color-primary)]/10 flex flex-col items-center justify-center text-center px-6"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
        Discover Our Products
      </h1>
      <p className="max-w-2xl text-[var(--color-text-secondary)]">
        Explore our wide range of high-quality canned and packaged foods — all crafted with care and flavor.
      </p>
    </section>
  );
}
