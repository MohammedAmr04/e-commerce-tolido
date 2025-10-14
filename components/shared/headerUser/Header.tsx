"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuOutlined} from "@ant-design/icons";

import Logo from "../shared/Logo";
import Cart from "@/components/ui/CartIcon";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Wishlist from "@/components/ui/WishlistIcon";
import MobileDrawer from "@/components/ui/MobileDrawer";

export default function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        <div className="flex items-center space-x-6">
          <Logo />

          {/* ===== Desktop Nav ===== */}
          <nav aria-label="Main navigation" className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                className={`transition-colors font-medium ${
                  pathname === item.path
                    ? "text-[var(--color-primary)] font-semibold"
                    : "hover:text-[var(--color-primary)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ===== Right Section ===== */}
        <div className="flex items-center gap-3">
          <Cart />
          <Wishlist />
          <LanguageSwitcher />
          <DarkModeToggle />

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

      {/* ===== Mobile Drawer ===== */}
      <MobileDrawer open={open} setOpen={setOpen} navItems={navItems} pathname={pathname} />

    </header>
  );
}
