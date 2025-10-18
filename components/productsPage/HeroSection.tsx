"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import SearchBar from "../shared/headerUser/InputSearch";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    });
  
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* ✅ الخلفية */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/heroP.png" // الصورة الكبيرة اللي عايزها كـ background
          alt="Our Products"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" /> {/* overlay لتعتيم الخلفية شوية */}
      </div>

      {/* ✅ المحتوى */}
      <h1 className="text-4xl md:text-5xl  font-bold text-white mb-10 drop-shadow-lg">
        Discover Our Products
      </h1>


      {/* ✅ Search Input */}
      <div  className="w-full max-w-md">
        <SearchBar size="large" />
      </div>
    </section>
  );
}
