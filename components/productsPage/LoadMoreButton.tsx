"use client";
import { Button, Spin } from "antd";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  loading?: boolean;
}

export default function LoadMoreButton({
  onLoadMore,
  loading = false,
}: LoadMoreButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div className="flex justify-center mt-12">
      <Button
        ref={buttonRef}
        type="default"
        size="large"
        disabled={loading}
        onClick={onLoadMore}
        className="px-8 py-5 text-[var(--color-primary)] border-[var(--color-primary)]
                   hover:bg-[var(--color-primary)] hover:text-white transition"
      >
        {loading ? <Spin size="small" /> : "More Products"}
      </Button>
    </div>
  );
}
