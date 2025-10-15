"use client";
import { Button } from "antd";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadMoreButton() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    gsap.from(buttonRef.current, {
      opacity: 1,
      y: 40,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="flex justify-center mt-12">
      <Button
        // ref={buttonRef}
        type="default"
        size="large"
        className="px-8 py-5  text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition"
      >
        More Products
      </Button>
    </div>
  );
}
