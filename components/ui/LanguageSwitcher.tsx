"use client";

import { Dropdown, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import gsap from "gsap";

export default function LanguageSwitcher() {
  const [selected, setSelected] = useState("en");
  const router = useRouter();
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);

  // ✅ قراءة اللغة من الكوكي أول مرة
  useEffect(() => {
    const locale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];
    setSelected(locale || "en");
  }, []);

  // ✅ تغيير اللغة مع الحفاظ على الثيم
  const changeLocale = (value: string) => {
    document.cookie = `locale=${value}; path=/`;
    const currentTheme = localStorage.getItem("theme"); // نحفظ الثيم الحالي
    setSelected(value);

    if (value === "ar") {
      router.push(pathname.replace("/en", "/ar"));
    } else {
      router.push(pathname.replace("/ar", "/en"));
    }

    // نرجع الثيم بعد التحويل عشان ما يروحش
    if (currentTheme) {
      localStorage.setItem("theme", currentTheme);
      document.documentElement.setAttribute("data-theme", currentTheme);
    }

    router.refresh();
  };

  // ✅ أنيميشن بالـ GSAP
  const handleHover = () => {
    gsap.to(btnRef.current, { scale: 1.05, duration: 0.2, ease: "power1.out" });
  };

  const handleLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.2, ease: "power1.out" });
  };

  // ✅ عناصر القائمة
  const items: MenuProps["items"] = [
    {
      key: "en",
      label: (
        <button
          onClick={() => changeLocale("en")}
          className={`w-full text-left rounded-md px-3 py-2 transition-colors ${
            selected === "en"
              ? "text-[var(--color-primary)] font-semibold bg-[var(--color-bg-light)]"
              : "hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)]"
          }`}
        >
          🇬🇧 English
        </button>
      ),
    },
    {
      key: "ar",
      label: (
        <button
          onClick={() => changeLocale("ar")}
          className={`w-full text-left rounded-md px-3 py-2 transition-colors ${
            selected === "ar"
              ? "text-[var(--color-primary)] font-semibold bg-[var(--color-bg-light)]"
              : "hover:bg-[var(--color-bg-light)] hover:text-[var(--color-primary)]"
          }`}
        >
          🇪🇬 العربية
        </button>
      ),
    },
  ];

  // ✅ الزرار الرئيسي
  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={["click"]}
      overlayClassName="rounded-xl shadow-xl p-1 bg-[var(--color-bg-card)] backdrop-blur-sm"
    >
      <button
        ref={btnRef}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        aria-label="Change language"
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-[var(--color-border)] 
        text-[var(--color-text)] hover:text-[var(--color-primary)] 
        hover:border-[var(--color-primary)] transition-colors font-medium shadow-sm bg-[var(--color-bg)]"
      >
        <Globe size={18} />
        <span>{selected === "en" ? "English" : "العربية"}</span>
        <ChevronDown size={16} className="opacity-70" />
      </button>
    </Dropdown>
  );
}
