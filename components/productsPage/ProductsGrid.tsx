"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ProductCard from "./ProductCard";
import { Product } from "../services/api/product/useProductMutations";
import { Empty } from "antd";

interface Props {
  products: Product[];
}

export default function ProductsGrid({ products }: Props) {
  useEffect(() => {
    if (products.length > 0) {
      gsap.from(".product-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
        ease: "power3.out",
      });
    }
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <Empty description="No products found" />
      </div>
    );
  }

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
