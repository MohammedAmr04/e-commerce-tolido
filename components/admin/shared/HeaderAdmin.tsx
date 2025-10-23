"use client";

import { useState } from "react";
import { Button, Drawer } from "antd";
import {
  MenuOutlined,
  ShoppingOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import AuthButton from "@/components/ui/AuthButton";
import Link from "next/link";
import Logo from "@/components/shared/shared/Logo";
import { useDarkLightContext } from "@/components/services/context/DarkLightProvider";

export default function HeaderAdmin() {
  const [open, setOpen] = useState(false);
  const { isDark } = useDarkLightContext();

  const navItems = [
    { label: "Products", icon: <ShoppingOutlined />, href: "/admin/products" },
    { label: "Orders", icon: <FileTextOutlined />, href: "/admin/orders" },
    { label: "Users", icon: <UserOutlined />, href: "/admin/users" },
  ];

  return (
    <>
      <header
        className={`${
          !isDark ? "bg-background" : "bg-background-alt"
        } text-[var(--color-text)] shadow-md border-b border-[var(--color-border)] backdrop-blur-md transition-all duration-300 sticky top-0 z-40`}
      >
        <div className="container max-h-17  mx-auto px-4 py-3 flex items-center justify-between">
          {/* ===== Left Section (Desktop: Logo + Nav) ===== */}
          <div className="flex items-center gap-8">
            <Logo isAdmin={true} />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors font-medium"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* ===== Right Section ===== */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-3">
              <LanguageSwitcher />
              <AuthButton />
            </span>

            {/* ===== Mobile Menu Button ===== */}
            <Button
              className="block md:!hidden text-[var(--color-text)] hover:text-[var(--color-primary)] p-2"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <MenuOutlined className="text-2xl" />
            </Button>
          </div>
        </div>
      </header>

      {/* ===== Mobile Drawer ===== */}
      <Drawer
        title={<Logo />}
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        className="admin-mobile-drawer"
        styles={{
          body: {
            padding: 0,
            backgroundColor: isDark
              ? "var(--color-background-alt)"
              : "var(--color-background)",
          },
          header: {
            backgroundColor: isDark
              ? "var(--color-background-alt)"
              : "var(--color-background)",
            borderBottom: "1px solid var(--color-border)",
            color: "var(--color-text)",
          },
        }}
      >
        {/* Drawer Navigation */}
        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)] space-y-3">
          <div className="w-full">
            <LanguageSwitcher />
          </div>
          <div className="w-full">
            <AuthButton />
          </div>
        </div>
      </Drawer>

      <style jsx global>{`
        .admin-mobile-drawer .ant-drawer-close {
          color: var(--color-text);
        }
        .admin-mobile-drawer .ant-drawer-close:hover {
          color: var(--color-primary);
        }
      `}</style>
    </>
  );
}
