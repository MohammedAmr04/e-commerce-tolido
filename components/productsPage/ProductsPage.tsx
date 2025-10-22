"use client";

import HeroSection from "./HeroSection";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ Next 15
import { useProducts } from "../services/api/product/useProductMutations";
import FilterValues from "../services/types/filters";
import { useState, useEffect, useCallback } from "react";
import ProductsHeader from "./ProductsHeader";
import ProductsGrid from "./ProductsGrid";
import LoadMoreButton from "./LoadMoreButton";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getFiltersFromParams = useCallback((): FilterValues => {
    const filters: FilterValues = {
      ...(searchParams.get("category") && {
        category: searchParams.get("category"),
      }),
      ...(searchParams.get("minPrice") && {
        minPrice: Number(searchParams.get("minPrice")),
      }),
      ...(searchParams.get("maxPrice") && {
        maxPrice: Number(searchParams.get("maxPrice")),
      }),
    };
    return filters;
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterValues | null>(
    getFiltersFromParams()
  );

  useEffect(() => {
    setFilters(getFiltersFromParams());
  }, [getFiltersFromParams]);

  const { data, isFetching } = useProducts(filters);

  const handleFilter = (newFilters: FilterValues | null) => {
    setFilters(newFilters);

    const query: Record<string, string> = {};
    if (newFilters?.category !== undefined)
      query.category = String(newFilters.category);
    if (newFilters?.minPrice !== undefined)
      query.minPrice = String(newFilters.minPrice);
    if (newFilters?.maxPrice !== undefined)
      query.maxPrice = String(newFilters.maxPrice);

    router.push(
      `/products?${new URLSearchParams(query).toString()}`,
      { scroll: false } // حفظ scroll position
    );
  };

  if (isFetching)
    return <p className="text-center py-20">Loading products...</p>;

  return (
    <main className="w-full min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <ProductsHeader onFilter={handleFilter} defaultFilters={filters} />
        <ProductsGrid products={data?.products || []} />
        <LoadMoreButton />
      </section>
    </main>
  );
}
