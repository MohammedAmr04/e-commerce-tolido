"use client";

import { Badge } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function WishlistIcon() {
  const wishlistCount=2
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onClick={() => setIsActive(!isActive)}
      title="Wishlist"
    >
      <Badge
        count={wishlistCount}
        offset={[-2, 4]}
        style={{
          backgroundColor: "var(--color-primary)",
          color: "#fff",
          boxShadow: "0 0 4px rgba(0,0,0,0.15)",
        }}
      >
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 cursor-pointer ${
            isActive
              ? "bg-[var(--color-primary)] text-white scale-105"
              : "hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-text)]"
          }`}
        >
          {isActive ? (
            <HeartFilled className="text-lg transition-transform duration-200 scale-110" />
          ) : (
            <HeartOutlined className="text-lg transition-transform duration-200" />
          )}
        </div>
      </Badge>
    </div>
  );
}
