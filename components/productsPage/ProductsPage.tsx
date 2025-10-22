"use client";

import HeroSection from "./HeroSection";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Product,
  useProducts,
} from "../services/api/product/useProductMutations";
import FilterValues from "../services/types/filters";
import { useState, useEffect, useCallback } from "react";
import ProductsHeader from "./ProductsHeader";
import ProductsGrid from "./ProductsGrid";
import LoadMoreButton from "./LoadMoreButton";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 🔹 Extract filters from URL
  const getFiltersFromParams = useCallback((): FilterValues => {
    const filters: FilterValues = {
      category: searchParams.get("category") || "all",
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : null,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : null,
      status: searchParams.get("status") || "all",
    };
    return filters;
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterValues>(getFiltersFromParams());
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // 🔹 Fetch products
  const { data, isFetching } = useProducts({ ...filters, page });

  // 🔹 Update filters when URL changes
  useEffect(() => {
    setFilters(getFiltersFromParams());
  }, [getFiltersFromParams]);

  // 🔹 When new data arrives, append products (for pagination)
  useEffect(() => {
    if (data?.products) {
      if (page === 1) {
        setAllProducts(data.products);
      } else {
        setAllProducts((prev) => [...prev, ...data.products]);
      }
    }
  }, [data, page]);

  // 🔹 Apply filters (and reset to page 1)
  const handleFilter = (newFilters: FilterValues | null) => {
    setFilters(newFilters || { category: "all", status: "all" });
    setPage(1);

    const query: Record<string, string> = {};
    if (newFilters?.category && newFilters.category !== "all")
      query.category = newFilters.category;
    if (newFilters?.status && newFilters.status !== "all")
      query.status = newFilters.status;
    if (newFilters?.minPrice) query.minPrice = String(newFilters.minPrice);
    if (newFilters?.maxPrice) query.maxPrice = String(newFilters.maxPrice);

    // ✅ Clean URL (no empty params)
    const search = new URLSearchParams(query).toString();
    router.push(`/products${search ? `?${search}` : ""}`, { scroll: false });
  };

  // 🔹 Load more handler
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // 🔹 Check if there are more pages
  const hasMore = data && data.page * data.count < data.total;

  if (isFetching && page === 1)
    return <p className="text-center py-20">Loading products...</p>;

  return (
    <main className="w-full min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <ProductsHeader onFilter={handleFilter} defaultFilters={filters} />
        <ProductsGrid products={allProducts} />

        {/* ✅ Load More button only appears if there are more pages */}
        {hasMore && (
          <LoadMoreButton onLoadMore={handleLoadMore} loading={isFetching} />
        )}
      </section>
    </main>
  );
}
