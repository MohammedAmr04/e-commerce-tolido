"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { IProduct } from "../services/types/product";
import ProductCard from "./ProductCard";


interface Props {
  products: IProduct[];
}

export default function ProductsGrid({ products }: Props) {
  useEffect(() => {
    gsap.from(".product-card", {
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.3,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
