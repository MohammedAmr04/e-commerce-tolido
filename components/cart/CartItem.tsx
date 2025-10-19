"use client";

import { Button } from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface CartItemProps {
  item: {
    _id: string;
    title: string;
    category: string;
    image: string;
    price: number;
    quantity: number;
  };
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const t = useTranslations("cart");
  const [quantity, setQuantity] = useState(item.quantity);

  const MIN_QTY = 1;

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange(item._id, newQty);
  };

  const handleDecrease = () => {
    if (quantity > MIN_QTY) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onQuantityChange(item._id, newQty);
    }
  };

  return (
    <div
      className="
        relative flex flex-col md:flex-row items-center justify-between
        bg-[var(--color-card)] rounded-2xl p-3 md:p-4 shadow-sm 
        hover:shadow-md hover:-translate-y-1
        transition-all duration-300 border border-[var(--color-border)]
        text-[var(--color-text)]
      "
    >
      {/* 🗑️ Delete button */}
      <Button
        danger
        type="text"
        icon={<DeleteOutlined style={{ fontSize: 18 }} />}
        onClick={() => onRemove(item._id)}
        className="!absolute top-2 right-2 text-[var(--color-danger)] hover:text-[var(--color-danger-content)]"
        aria-label={t("removeItem")}
      />

      {/* 🖼️ Product image */}
      <div className="w-[110px] h-[110px] md:w-[140px] md:h-[120px] relative rounded-xl overflow-hidden mb-3 md:mb-0 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* 🧾 Product info */}
      <div className="flex-1 text-center md:text-left md:px-4">
        <h3 className="font-semibold text-[15px] md:text-lg leading-snug line-clamp-1">
          {item.title}
        </h3>

        <p className="text-[13px] md:text-sm text-[var(--color-gray)] mt-1">
          {item.category}
        </p>

        <p className="text-[var(--color-primary)] text-base md:text-lg font-semibold mt-1">
          ${item.price.toFixed(2)}
        </p>

        {/* ➕➖ Quantity control */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 mt-2">
          <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
            <Button
              size="small"
              shape="circle"
              icon={<MinusOutlined />}
              onClick={handleDecrease}
              disabled={quantity <= MIN_QTY}
              className="!w-8 !h-8 bg-[var(--color-backgroundSoft)] text-[var(--color-text)] 
                         border-none hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
              aria-label={t("decrease")}
            />
            <span
              className="font-semibold w-6 text-center text-[var(--color-text)] text-sm md:text-base"
              aria-live="polite"
            >
              {quantity}
            </span>
            <Button
              size="small"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={handleIncrease}
              className="!w-8 !h-8 bg-[var(--color-backgroundSoft)] text-[var(--color-text)] 
                         border-none hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
              aria-label={t("increase")}
            />
          </div>

          {/* Min quantity note */}
          <div className="text-[var(--color-gray)] text-xs md:text-sm mt-1 md:mt-0">
            {t("minQuantity", { value: MIN_QTY })}
          </div>
        </div>
      </div>

      {/* 💰 Subtotal */}
      <div className="mt-3 md:mt-0 text-center md:text-right">
        <span className="font-semibold text-[var(--color-text)] text-base md:text-lg">
          ${(item.price * quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
