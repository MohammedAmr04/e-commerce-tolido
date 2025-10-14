"use client";

import { Drawer } from "antd";
import Link from "next/link";
import { CloseOutlined } from "@ant-design/icons";
import Cart from "@/components/ui/CartIcon";
import Wishlist from "@/components/ui/WishlistIcon";
import React, { SetStateAction } from "react";
// { key: "home", label: t("home"), path: "/" },
interface item{
    key:string
    label:string
    path:string
}
interface Props{
    open:boolean
    pathname:string
    setOpen: React.Dispatch<SetStateAction<boolean>>
    navItems: item[]
}


export default function MobileDrawer({ open, setOpen, navItems, pathname }:Props) {
  return (
    <Drawer
      title={
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg text-[var(--color-primary)]">
            Menu
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="hover:text-[var(--color-primary)]"
          >
            <CloseOutlined />
          </button>
        </div>
      }
      placement="right"
      closeIcon={null}
      onClose={() => setOpen(false)}
      open={open}
      bodyStyle={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
        padding: "1rem 0",
      }}
    >
      <nav className="flex flex-col gap-4 ps-4">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.path}
            onClick={() => setOpen(false)}
            className={`block text-lg transition-colors ${
              pathname === item.path
                ? "text-[var(--color-primary)] font-semibold"
                : "hover:text-[var(--color-primary)]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Optional: Cart & Wishlist for mobile */}
      <div className="flex items-center gap-4 ps-4 pt-6 border-t border-[var(--color-border)] mt-4">
        <Cart />
        <Wishlist />
      </div>
    </Drawer>
  );
}

