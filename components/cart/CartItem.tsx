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

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const t = useTranslations("cart");
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange(item._id, newQty);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onQuantityChange(item._id, newQty);
    }
  };

  return (
    <div className="relative md:flex md:flex-row items-center justify-between bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 w-full">
      {/* 🗑️ Delete button */}
      <Button
        danger
        type="text"
        icon={<DeleteOutlined style={{ fontSize: 24 }} />}
        onClick={() => onRemove(item._id)}
        className="!absolute top-3 z-10 right-3 "
      />

      {/* 🖼️ Product image */}
      <div className="max-w-[180px] mx-auto  relative w-full h-[180px]  md:h-[120px] mb-4 md:mb-0">
        <Image
          src={item.image}
          alt={item.title}
            fill
          className="rounded-xl absolute inset-0 object-cover"
        />
      </div>

      {/* 🧾 Product info */}
      <div className="text-left flex-1">
        <h3 className="font-semibold text-center md:text-left text-lg text-gray-900">{item.title}</h3>
<div className="flex mt-2 md:m-0 justify-between items-center md:block gap-4">
            <p className="text-gray-500">{item.category}</p>

        <p className="text-sm block md:hidden text-gray-500 ">{t("minQuantity", { value: 1 })}</p>

</div>
            <p className="text-orange-500 text-lg font-semibold mt-1">${item.price.toFixed(2)}</p>

        {/* ➕➖ Quantity control */}
        <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
          <Button
            shape="circle"
            icon={<MinusOutlined />}
            onClick={handleDecrease}
            disabled={quantity <= 1}
          />
          <span className="font-semibold text-gray-900 w-8 text-center">{quantity}</span>
          <Button shape="circle" icon={<PlusOutlined />} onClick={handleIncrease} />
        </div>

        {/* 💬 Min quantity info */}
        <p className="text-sm hidden md:block text-gray-500 mt-1">{t("minQuantity", { value: 1 })}</p>
      </div>

      {/* 💰 Subtotal */}
      <div className="mt-3 md:mt-0 text-center md:text-right md:ml-4">
        <span className="font-semibold text-gray-900 text-lg">
          ${(item.price * quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
