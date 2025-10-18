"use client";

import { FloatButton } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useDarkLightContext } from "../services/context/DarkLightProvider";

export default function DarkModeToggle() {
  const { setTheme, isDark } = useDarkLightContext();

  return (
    <FloatButton
      type="primary"
      icon={isDark ? <SunOutlined /> : <MoonOutlined />}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        right: 24, // المسافة من اليمين
        bottom: 24, // المسافة من الأسفل
      }}
      tooltip={<span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
    />
  );
}
