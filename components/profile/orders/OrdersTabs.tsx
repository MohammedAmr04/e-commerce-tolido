// components/orders/OrdersTabs.tsx
"use client";

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";
import "./styles.css"
const tabItems: TabsProps["items"] = [
  { key: "All", label: "All" },
  { key: "Pending", label: "Pending" },
  { key: "Confirmed", label: "Confirmed" },
  { key: "Shipped", label: "Shipped" },
  { key: "Delivered", label: "Delivered" },
  { key: "Cancelled", label: "Cancelled" },
];

interface OrdersTabsProps {
  onSelect: (tab: string) => void;
}

export default function OrdersTabs({ onSelect }: OrdersTabsProps) {
  const [activeKey, setActiveKey] = useState("All");

  const handleChange = (key: string) => {
    setActiveKey(key);
    onSelect(key);
  };

  return (
    <Tabs
      activeKey={activeKey}
      onChange={handleChange}
      items={tabItems}
      className="!text-[var(--color-text)] font-medium !text-lg md:!text-2xl"
      tabBarStyle={{
        borderBottom: "1px solid var(--color-border)",
        marginBottom: "1.5rem",
      }}
      moreIcon={null}
      animated={{ inkBar: true, tabPane: true }}
      tabBarGutter={24}
      rootClassName="custom-tabs"
    />
  );
}
