"use client";
import { Dropdown, MenuProps } from "antd";
import MobileDrawer from "@/components/ui/MobileDrawer";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SetStateAction } from "react";
import { useDarkLightContext } from "@/components/services/context/DarkLightProvider";
import "./style.css";
interface HeaderNavsProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function HeaderNavs({ open, setOpen }: HeaderNavsProps) {
  const t = useTranslations("common");
  const { isDark } = useDarkLightContext();
  const pathname = usePathname();

  const pathParts = pathname.split("/").filter(Boolean);
  const currentPath = pathParts.length > 1 ? `/${pathParts[1]}` : "/";

  // 🛍️ Categories
  const categories: { key: string; label: string }[] = [
    { key: "all", label: "all" },
    { key: "electronics", label: "electronics" },
    { key: "fashion", label: "fashion" },
    { key: "home", label: "homeAndKitchen" },
    { key: "sports", label: "sports" },
  ];

  // 🧭 Main Nav Items
  const navItems = [
    { key: "home", label: t("home"), path: "/" },
    {
      key: "products",
      label: t("products"),
      path: "/products",
      dropdown: true,
    },
    { key: "about", label: t("about"), path: "/about" },
    { key: "contactus", label: t("contactus"), path: "/contactus" },
  ];

  // 🪄 Dropdown Menu for Products
  const categoryMenu: MenuProps["items"] = categories.map((cat) => ({
    key: cat.key,
    label: (
      <Link
        href={`/products?category=${cat.key}`}
        className={`block py-2 px-3 rounded-md transition-colors duration-200
          ${
            isDark
              ? "text-text hover:bg-[var(--backgroundSoft)]"
              : "text-gray-700 hover:bg-gray-100"
          }`}
      >
        {cat.label}
      </Link>
    ),
  }));

  return (
    <nav
      aria-label="Main navigation "
      className="hidden md:flex items-center gap-8 relative"
    >
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        const isProducts = item.dropdown;

        const linkEl = (
          <Link
            href={item.path}
            className={`relative pb-2 font-medium transition-colors duration-300 
              ${
                isActive
                  ? "text-[var(--color-primary)] font-semibold"
                  : "hover:text-[var(--color-primary)] text-text"
              } group`}
          >
            {item.label}
            {/* Underline Animation */}
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color-primary)] rounded-full transition-all duration-300 ease-in-out
                ${isActive ? "w-full" : "w-0 group-hover:w-full"}
              `}
            />
          </Link>
        );

        return (
          <div key={item.key} className="relative">
            {isProducts ? (
              <Dropdown
                menu={{ items: categoryMenu }}
                trigger={["hover"]}
                placement="bottom"
                arrow
                overlayClassName={`rounded-xl dropCat shadow-lg border transition-colors
                  ${
                    isDark
                      ? "!bg-[var(--card)] border-[var(--backgroundSoft)]"
                      : "!bg-white border-gray-100"
                  }`}
              >
                <div className="cursor-pointer">{linkEl}</div>
              </Dropdown>
            ) : (
              linkEl
            )}
          </div>
        );
      })}

      {/* 📱 Mobile Drawer */}
      <MobileDrawer
        open={open}
        setOpen={setOpen}
        navItems={navItems}
        pathname={currentPath}
      />
    </nav>
  );
}
