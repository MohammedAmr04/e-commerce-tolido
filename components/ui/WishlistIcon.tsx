"use client";

import { Badge } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WishlistIcon() {
  const wishlistCount = 2;
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer"
      title="Wishlist"
      onClick={() => {
        router.push("/wishlist");
        setIsActive(!isActive);
      }}
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
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-out ${
            isActive
              ? "bg-[var(--color-primary)]/70 text-black scale-105"
              : "text-[var(--color-text)] hover:bg-[var(--color-primary)]/70 hover:text-black"
          }`}
        >
          {isActive ? (
            <HeartFilled className="text-[20px] transition-transform duration-300 scale-110" />
          ) : (
            <HeartOutlined className="text-[20px] transition-transform duration-300" />
          )}
        </div>
      </Badge>
    </div>
  );
}
