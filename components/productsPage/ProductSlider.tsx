"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider, KeenSliderInstance } from "keen-slider/react";
import { IProduct } from "../services/types/product";
import ProductCard from "./ProductCard";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";

interface Props {
  products: IProduct[];
  title?: string;
}

export default function ProductSlider({ products, title }: Props) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        perView: 5,
        spacing: 20,
      },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 3, spacing: 15 },
        },
        "(max-width: 768px)": {
          slides: { perView: 2, spacing: 10 },
        },
        "(max-width: 480px)": {
          slides: { perView: 1, spacing: 8 },
        },
      },
      loop: true,
      drag: true,
      mode: "free-snap",
      created(slider) {
        startAutoplay(slider);
      },
      dragStarted() {
        stopAutoplay();
      },
      animationEnded(slider) {
        startAutoplay(slider);
      },
      updated(slider) {
        startAutoplay(slider);
      },
    },
    []
  );

  const startAutoplay = (slider: KeenSliderInstance) => {
    stopAutoplay();
    timer.current = setInterval(() => {
      slider.next();
    }, 2500);
  };

  const stopAutoplay = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  return (
    <section className="w-full my-10">
      {/* Title + Controls */}
      { (
        <div className="flex justify-between items-center mb-10 px-10">
          {title && (
            <h2 className="md:text-3xl  text-2xl px-3 py-3 border-s-4 border-primary font-bold text-[var(--color-text)]">
              {title}
            </h2>
          )}
          <div className="flex justify-end items-center gap-3">
            <Button
              type="default"
              shape="circle"
              icon={<LeftOutlined />}
              className="text-[var(--color-primary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition"
              onClick={() => instanceRef.current?.prev()}
            />
            <Button
              type="default"
              shape="circle"
              icon={<RightOutlined />}
              className="text-[var(--color-primary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition"
              onClick={() => instanceRef.current?.next()}
            />
          </div>
        </div>
      )}

      {/* Slider */}
      <div
        ref={sliderRef}
        className="keen-slider "
        onMouseEnter={stopAutoplay}
        onMouseLeave={() =>
          instanceRef.current && startAutoplay(instanceRef.current)
        }
      >
        {products.map((product) => (
          <div key={product._id} className="keen-slider__slide">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
