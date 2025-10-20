"use client";

import { Avatar, Menu, Typography, Layout, Tabs } from "antd";
import {
  SettingOutlined,
  HeartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Sider, Content } = Layout;
const { Text } = Typography;

const tabs = [
  { key: "settings", label: "Settings", icon: <SettingOutlined /> },
  { key: "orders", label: "Orders", icon: <ShoppingOutlined /> },
  { key: "wishlist", label: "Wishlist", icon: <HeartOutlined /> },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const currentTab = pathname.split("/").pop() || "settings";

  // Redirect default /profile to /profile/settings
  useEffect(() => {
    if (pathname === "/profile") {
      router.replace("/profile/settings");
    }
  }, [pathname, router]);

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="min-h-screen h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* ===== Desktop Sidebar ===== */}
      {!isMobile && (
        <Sider
          width={250}
          className="!bg-[var(--color-card)] border-r border-[var(--color-border)] flex flex-col items-center py-8"
        >
          {/* Avatar */}
          <div className="flex justify-center items-center">
            <Avatar
              src="/1.jpg"
              size={100}
              style={{
                border: `2px solid var(--color-border)`,
                marginBottom: "1rem",
              }}
            />
          </div>
          {/* Email */}
          <Text className="block min-w-[200px] text-center !text-lg text-[var(--color-text)] mb-6">
            user@example.com
          </Text>

          {/* Menu Tabs */}
          <Menu
            mode="inline"
            selectedKeys={[currentTab]}
            className="w-full !bg-transparent !border-none"
            onClick={(e) => router.push(`/profile/${e.key}`)}
            items={tabs.map((tab) => ({
              key: tab.key,
              label: tab.label,
              icon: tab.icon,
              className:
                currentTab === tab.key
                  ? "!bg-[var(--color-primary)] !text-white font-medium"
                  : "hover:!bg-[var(--color-border)] !text-[var(--color-text)]",
            }))}
          />
        </Sider>
      )}

      {/* ===== Mobile Header ===== */}
      {isMobile && (
        <div className="w-full bg-[var(--color-card)] border-b border-[var(--color-border)] p-4 pb-0 flex flex-col items-center gap-3 sticky top-0 z-20">
          <div className="flex  items-center gap-3">
            <Avatar
              src="/1.jpg"
              size={64}
              style={{
                border: `2px solid var(--color-border)`,
              }}
            />
            <Text className="text-[var(--color-text)] font-medium">
              user@example.com
            </Text>
          </div>

          {/* Tabs for navigation */}
          <Tabs
            activeKey={currentTab}
            onChange={(key) => router.push(`/profile/${key}`)}
            centered
            items={tabs.map((tab) => ({
              key: tab.key,
              label: (
                <span className="flex items-center gap-1">
                  {tab.icon}
                  {tab.label}
                </span>
              ),
            }))}
          />
        </div>
      )}

      {/* ===== Main content ===== */}
      <Content className="flex-1 overflow-y-auto  custom-scrollbar ">
        {children}
      </Content>
    </Layout>
  );
}
