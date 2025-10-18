"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";

import Logo from "../shared/Logo";
import Cart from "@/components/ui/CartIcon";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Wishlist from "@/components/ui/WishlistIcon";
import MobileDrawer from "@/components/ui/MobileDrawer";
import InputSearch from "./InputSearch";

export default function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // ✅ إزالة رمز اللغة من المسار (مثل /en أو /ar)
  const pathParts = pathname.split("/").filter(Boolean);
  const currentPath = pathParts.length > 1 ? `/${pathParts[1]}` : "/";

  const navItems = [
    { key: "home", label: t("home"), path: "/" },
    { key: "products", label: t("products"), path: "/products" },
    { key: "about", label: t("about"), path: "/about" },
    { key: "contactus", label: t("contactus"), path: "/contactus" },
  ];

  return (
    <header className="bg-[var(--color-background)] text-[var(--color-text)] shadow-md border-b border-[var(--color-border)] backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* ===== Left Section ===== */}
        <div className=" hidden md:block">
          <InputSearch />
        </div>

        {/* ===== Center (Logo) ===== */}
        <div className="">
          <Logo />
        </div>

        {/* ===== Right Section ===== */}
        <div className="flex items-center gap-3">
          <Cart />
          <Wishlist />
          <LanguageSwitcher />

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
      <div className="mx-auto w-fit pb-2">
             <div className="block md:hidden">
          <InputSearch />
        </div>

        <nav aria-label="Main navigation" className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.key}
                href={item.path}
                className={`
                  relative pb-2 font-medium transition-colors duration-300 
                  ${isActive ? "text-[var(--color-primary)] font-semibold" : "hover:text-[var(--color-primary)]"}
                  group
                `}
              >
                {item.label}
                {/* Underline Animation */}
                <span
                  className={`
                    absolute bottom-0 left-0 h-[2px] bg-[var(--color-primary)] rounded-full transition-all duration-300 ease-in-out
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ===== Mobile Drawer ===== */}
      <MobileDrawer open={open} setOpen={setOpen} navItems={navItems} pathname={currentPath} />
    </header>
  );
}
