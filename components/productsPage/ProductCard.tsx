"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { Product } from "../services/api/product/useProductMutations";
import { useWishlistContext } from "../services/context/WishlistProvider";

interface IProp {
  product: Product;
}

export default function ProductCard({ product }: IProp) {
  const { id, title, images, price, discount, finalPrice } = product;
  const { locale } = useParams();
  const [hovered, setHovered] = useState(false);
  const { wishlistIds, handleAdd, handleRemove } = useWishlistContext();
  const isArabic = locale === "ar";
  const localizedTitle = title?.[isArabic ? "ar" : "en"] || "";
  const hasDiscount = discount && discount > 0;
  const imageUrl = images?.[0]?.url;
  function handleAddRemove(id: string) {
    if (wishlistIds.includes(id)) {
      handleRemove(id);
    } else {
      handleAdd(id);
    }
  }
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group mx-auto relative max-w-[260px] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* ===== Product Image / GIF ===== */}
      <div className="relative w-full h-64 overflow-hidden">
        {/* الصورة الأساسية */}
        <Image
          src={imageUrl}
          alt={localizedTitle}
          fill
          className={`object-cover transition-opacity duration-500 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* الصورة المتحركة (GIF) */}
        <Image
          src={product.image3D || "/placeholder.png"}
          alt="product animation"
          fill
          unoptimized
          className={`object-cover transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ===== Sale Badge ===== */}
        {hasDiscount && (
          <div className="absolute z-50 top-3 left-3 bg-[#d61d16] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
            SALE -{discount}%
          </div>
        )}

        {/* ===== Favorite Button ===== */}
        <div className="flex absolute top-3 z-50 right-3 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            shape="circle"
            icon={
              wishlistIds.includes(product.id) ? (
                <HeartFilled />
              ) : (
                <HeartOutlined />
              )
            }
            className={`${
              wishlistIds.includes(product.id)
                ? "text-[#ed6213] bg-[#ed6213]/10"
                : "text-[#ed6213] hover:bg-[#ed6213]/10"
            } border-none`}
            onClick={(e) => {
              e.preventDefault();
              handleAddRemove(id);
            }}
          />
        </div>
      </div>

      {/* ===== Product Info ===== */}
      <div className="p-4 flex flex-col bg-[var(--color-card)] gap-2">
        <h3 className="text-base font-semibold text-[var(--color-text)] line-clamp-1 group-hover:text-secondary transition-colors">
          {localizedTitle}
        </h3>

        <div className="flex items-center justify-between">
          {/* ===== Price Section ===== */}
          <div>
            <p className="text-lg font-semibold text-[var(--color-primary)]">
              ${finalPrice?.toFixed(2) ?? price?.toFixed(2)}
            </p>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                ${(price || 0).toFixed(2)}
              </p>
            )}
          </div>

          {/* ===== Action Buttons ===== */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              shape="circle"
              icon={<ShoppingCartOutlined />}
              className="text-[#d61d16] hover:bg-[#d61d16]/10 border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
