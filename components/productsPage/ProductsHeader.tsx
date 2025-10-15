"use client";
import { Select, InputNumber, Button } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import FilterValues from "../services/types/filters";

interface ProductsHeaderProps {
  onFilter?: (filters: FilterValues) => void;
  defaultFilters?: FilterValues;
  categories?: { label: string; value: string }[];
  statuses?: { label: string; value: string }[];
}

export default function ProductsHeader({
  onFilter,
  defaultFilters = {
    minPrice: null,
    maxPrice: null,
    status: "all",
    category: "all",
  },
  categories = [
    { label: "All", value: "all" },
    { label: "Tuna", value: "tuna" },
    { label: "Beans", value: "beans" },
    { label: "Corn", value: "corn" },
    { label: "Sauces", value: "sauces" },
  ],
  statuses = [
    { label: "All", value: "all" },
    { label: "Available", value: "available" },
    { label: "Out of Stock", value: "out-of-stock" },
    { label: "Coming Soon", value: "coming-soon" },
  ],
}: ProductsHeaderProps) {
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);

  const handleChange = (key: keyof FilterValues, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    if (onFilter) onFilter(filters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    if (onFilter) onFilter(defaultFilters);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
      <h2 className="text-2xl font-semibold">All Products</h2>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-4 bg-white/10 p-4 rounded-xl shadow-md">
        {/* Category */}
        <Select
          placeholder="Category"
          value={filters.category}
          onChange={(value) => handleChange("category", value)}
          style={{ width: 160 }}
          options={categories}
        />

        {/* Status */}
        <Select
          placeholder="Status"
          value={filters.status}
          onChange={(value) => handleChange("status", value)}
          style={{ width: 160 }}
          options={statuses}
        />

        {/* Price Range */}
        <div className="flex items-center gap-2">
          <InputNumber
            placeholder="Min"
            value={filters.minPrice}
            min={0}
            onChange={(value) => handleChange("minPrice", value)}
          />
          <span>-</span>
          <InputNumber
            placeholder="Max"
            value={filters.maxPrice}
            min={0}
            onChange={(value) => handleChange("maxPrice", value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={applyFilters}
            className="bg-[#ed6213] border-none hover:bg-[#ff7630]"
          >
            Apply
          </Button>
          <Button icon={<ReloadOutlined />} onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
