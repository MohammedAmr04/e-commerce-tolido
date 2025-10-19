"use client";

import { useState } from "react";

import { MenuOutlined } from "@ant-design/icons";

import Cart from "@/components/ui/CartIcon";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Wishlist from "@/components/ui/WishlistIcon";
import InputSearch from "./InputSearch";
import { useDarkLightContext } from "@/components/services/context/DarkLightProvider";
import Logo from "../shared/Logo";
import HeaderNavs from "./HeaderNavs";
import AuthButton from "@/components/ui/AuthButton";

export default function Header() {
  const [open, setOpen] = useState(false);
  const isDark = useDarkLightContext().isDark;

  return (
    <header
      className={`${
        !isDark ? "bg-background" : "bg-background-alt"
      } text-[var(--color-text)]  relative shadow-md border-b border-[var(--color-border)] backdrop-blur-md transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* ===== Left Section ===== */}
        <div className=" hidden md:block">
          <InputSearch />
        </div>

        {/* ===== Center (Logo) ===== */}
        <div className="relative md:absolute md:left-1/2 transform md:-translate-x-1/2">
          <Logo />
        </div>
        <div className="block md:hidden">
          <InputSearch />
        </div>
        {/* ===== Right Section ===== */}
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-4">
            <Cart />
            <Wishlist />
            <LanguageSwitcher />
          </span>
          <AuthButton />
          {/* ===== Mobile Menu Button ===== */}
          <button
            className="md:hidden text-[var(--color-text)] hover:text-[var(--color-primary)]"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <MenuOutlined className="text-xl" />
          </button>
        </div>
      </div>

      {/* ===== Desktop Navigation ===== */}
      <div className="flex items-center justify-center">
        {" "}
        <div className="mx-auto w-fit pb-4">
          <HeaderNavs open={open} setOpen={setOpen} />
        </div>
      </div>
      {/* ===== Mobile Drawer ===== */}
    </header>
  );
}
