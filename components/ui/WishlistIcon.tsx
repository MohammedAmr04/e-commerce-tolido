"use client";

import { Badge } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useWishlistContext } from "../services/context/WishlistProvider";

export default function WishlistIcon() {
  const { wishlistCount } = useWishlistContext();
  const router = useRouter();

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer"
      title="Wishlist"
      onClick={() => router.push("/wishlist")}
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
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-out text-[var(--color-text)] hover:bg-[var(--color-primary)]/70 hover:text-black"
        >
          <HeartOutlined className="text-[20px] transition-transform duration-300" />
        </div>
      </Badge>
    </div>
  );
}
