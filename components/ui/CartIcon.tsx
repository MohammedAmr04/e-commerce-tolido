"use client";

import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartIcon() {
  const [cartCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer"
      title="Cart"
      onClick={() => router.push("/cart")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Badge
        count={cartCount}
        offset={[-2, 4]}
        style={{
          backgroundColor: "var(--color-primary)",
          color: "#fff",
          boxShadow: "0 0 4px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-out ${
            isHovered
              ? "bg-[var(--color-primary)]/70 text-black scale-105"
              : "text-[var(--color-text)] hover:bg-[var(--color-primary)/70] hover:text-white"
          }`}
        >
          <ShoppingCartOutlined
            className={`!text-[20px] transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        </div>
      </Badge>
    </div>
  );
}
