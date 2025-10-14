"use client";

import { Dropdown, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const [selected, setSelected] = useState("en");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const locale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];
    setSelected(locale || "en");
  }, []);

  const changeLocale = (value:string) => {
    document.cookie = `locale=${value}; path=/`;
    setSelected(value);
    if (value === "ar") {
      router.push(pathname.replace("/en", "/ar"));
    } else {
      router.push(pathname.replace("/ar", "/en"));
    }
    router.refresh();
  };

  const items: MenuProps["items"] = [
    {
      key: "en",
      label: (
        <button
          onClick={() => changeLocale("en")}
          className={`w-full text-left transition-colors ${
            selected === "en"
              ? "text-[var(--color-primary)] font-semibold"
              : "hover:text-[var(--color-primary)]"
          }`}
        >
          English
        </button>
      ),
    },
    {
      key: "ar",
      label: (
        <button
          onClick={() => changeLocale("ar")}
          className={`w-full text-left transition-colors ${
            selected === "ar"
              ? "text-[var(--color-primary)] font-semibold"
              : "hover:text-[var(--color-primary)]"
          }`}
        >
          العربية
        </button>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={["click"]}
      overlayClassName="rounded-xl shadow-lg"
    >
      <button
        aria-label="Change language"
        className="flex items-center gap-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors font-medium"
      >
        <Globe size={18} />
        <span className="capitalize">
          {selected === "en" ? "English" : "العربية"}
        </span>
      </button>
    </Dropdown>
  );
}
