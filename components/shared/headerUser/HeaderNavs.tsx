"use client";
import MobileDrawer from "@/components/ui/MobileDrawer";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SetStateAction, useEffect, useRef, useState } from "react";
import gsap from "gsap";

function HeaderNavs({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const currentPath = pathParts.length > 1 ? `/${pathParts[1]}` : "/";

  // Categories list
  const categories = [
    { key: "all", label: "All" },
    { key: "electronics", label: "Electronics" },
    { key: "fashion", label: "Fashion" },

    { key: "home", label: "Home & Kitchen" },
    { key: "sports", label: "Sports" },
  ];

  const navItems = [
    { key: "home", label: t("home"), path: "/" },
    { key: "products", label: t("products"), path: "/products" },
    { key: "about", label: t("about"), path: "/about" },
    { key: "contactus", label: t("contactus"), path: "/contactus" },
  ];

  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // GSAP Animation for dropdown
  useEffect(() => {
    if (!dropdownRef.current) return;

    if (showCategories) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10, display: "none" },
        {
          opacity: 1,
          y: 0,
          display: "block",
          duration: 0.4,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (dropdownRef.current) dropdownRef.current.style.display = "none";
        },
      });
    }
  }, [showCategories]);

  return (
    <nav
      aria-label="Main navigation"
      className="hidden md:flex space-x-8 relative"
    >
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        const isProducts = item.key === "products";

        return (
          <div
            key={item.key}
            className="relative"
            onMouseEnter={() => isProducts && setShowCategories(true)}
            onMouseLeave={() => isProducts && setShowCategories(false)}
          >
            <Link
              href={item.path}
              className={`relative pb-2 font-medium transition-colors duration-300 
                ${
                  isActive
                    ? "text-[var(--color-primary)] font-semibold"
                    : "hover:text-[var(--color-primary)]"
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

            {/* Dropdown for products */}
            {isProducts && (
              <div
                ref={dropdownRef}
                className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-lg py-2 px-4 min-w-[180px] hidden"
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.key}
                    href={`/products?category=${cat.key}`}
                    className="block py-2 text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Mobile Drawer */}
      <MobileDrawer
        open={open}
        setOpen={setOpen}
        navItems={navItems}
        pathname={currentPath}
      />
    </nav>
  );
}

export default HeaderNavs;
