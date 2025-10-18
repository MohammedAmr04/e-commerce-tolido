"use client";

import React, { useEffect, useMemo, useState } from "react";

export type ITheme = "light" | "dark" | "system";

export const DarkLightContext = React.createContext({
  theme: "light" as ITheme,
  setTheme: () => {},
  isDark: false,
} as {
  theme: ITheme;
  setTheme: React.Dispatch<React.SetStateAction<ITheme>>;
  isDark: boolean;
});

export const DarkLightProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ITheme>(() => {
    // ✅ اقرأ من localStorage أول ما الصفحة تفتح (قبل أي Render)
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as ITheme) || "light";
    }
    return "light";
  });

  const [mounted, setMounted] = useState(false);

  // ✅ بعد ما يركّب الكومبوننت، اعتبره جاهز
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ خزّن أي تغيير في localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  // ✅ احسب هل الوضع داكن ولا لأ
  const isDark = useMemo(() => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return theme === "dark";
  }, [theme]);

  // ✅ لو النظام اتغير (في حالة system)
  useEffect(() => {
    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => setTheme("system");
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, [theme]);

  if (!mounted) return null; // لتجنب flicker

  return (
    <DarkLightContext.Provider
      value={{
        theme,
        setTheme,
        isDark,
      }}
    >
      {children}
    </DarkLightContext.Provider>
  );
};

export const useDarkLightContext = () => {
  const context = React.useContext(DarkLightContext);

  if (!context) {
    throw new Error(
      "useDarkLightContext must be used within a DarkLightProvider"
    );
  }

  return context;
};
