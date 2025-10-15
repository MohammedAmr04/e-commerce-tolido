"use client";

import { useState } from "react";
import { IProduct } from "../services/types/product";
import HeroSection from "./HeroSection";
import LoadMoreButton from "./LoadMoreButton";
import ProductsGrid from "./ProductsGrid";
import ProductsHeader from "./ProductsHeader";
import FilterValues from "../services/types/filters";


interface Props {
  products: IProduct[];
}

export default function ProductsPage({ products }: Props) {
    const [filters, setFilters] = useState<FilterValues>();

  const handleFilter = (filters: FilterValues) => {
    console.log("Applied Filters:", filters);
    setFilters(filters);
  };
  return (
    <main className="w-full min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <ProductsHeader onFilter={handleFilter}/>
        <ProductsGrid products={products} />
        <LoadMoreButton />
      </section>
    </main>
  );
}
