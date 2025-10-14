"use client";

import Image from "next/image";
import { IProduct } from "../services/types/product";
import { useParams } from "next/navigation";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Button } from "antd";
interface IProp{
    product : IProduct
}
export default function ProductCard({ product }: IProp) {
   const {title, images, basePrice, discount, finalPrice, isFeatured} = product
  const { locale } = useParams();
  const isArabic = locale === "ar";
  const localizedTitle = title?.[isArabic ? "ar" : "en"] || "";

  const hasDiscount = discount && discount > 0;
  const imageUrl = images?.[0]?.url ;

  return (
    <div className="group relative max-w-[260px] bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* ===== Product Image ===== */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={localizedTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* ===== Sale Badge ===== */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-[#d61d16] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md">
            SALE -{discount}%
          </div>
        )}

        {/* ===== Featured Badge ===== */}
        {isFeatured && (
          <div className="absolute top-3 right-3 bg-[#f6c500] text-black text-xs font-semibold px-3 py-1 rounded-md shadow-md">
            Featured
          </div>
        )}
      </div>

      {/* ===== Product Info ===== */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-base font-semibold text-[var(--color-text)] line-clamp-1 group-hover:text-[#ed6213] transition-colors">
          {localizedTitle}
        </h3>

        <div className="flex items-center justify-between">
          {/* ===== Price Section ===== */}
          <div>
            <p className="text-lg font-semibold text-[var(--color-primary)]">
              ${finalPrice?.toFixed(2) ?? basePrice.toFixed(2)}
            </p>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                ${(basePrice || 0).toFixed(2)}
              </p>
            )}
          </div>

          {/* ===== Action Buttons ===== */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              shape="circle"
              icon={<HeartOutlined />}
              className="text-[#ed6213] hover:bg-[#ed6213]/10 border-none"
            />
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
