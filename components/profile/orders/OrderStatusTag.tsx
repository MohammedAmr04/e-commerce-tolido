"use client";

import { Tag } from "antd";
import { OrderStatus } from "@/components/services/api/orders/types";

interface OrderStatusTagProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { color: string; label: string }> = {
  pending: {
    color: "orange",
    label: "Pending",
  },
  confirmed: {
    color: "blue",
    label: "Confirmed",
  },
  shipped: {
    color: "purple",
    label: "Shipped",
  },
  delivered: {
    color: "green",
    label: "Delivered",
  },
  cancelled: {
    color: "red",
    label: "Cancelled",
  },
};

export default function OrderStatusTag({ status }: OrderStatusTagProps) {
  const config = statusConfig[status];

  return (
    <Tag
      color={config.color}
      className="px-4 py-3 font-medium  rounded-full text-sm flex items-center gap-2"
    >
      {config.label}
    </Tag>
  );
}
