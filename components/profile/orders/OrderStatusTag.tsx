"use client";

import { Tag } from "antd";
import { IOrderStatus } from "@/components/services/types/order";

interface OrderStatusTagProps {
  status: IOrderStatus;
}

const statusConfig: Record<
  IOrderStatus,
  { color: string; label: string }
> = {
  Pending: {
    color: "orange",
    label: "Pending",
  },
  Confirmed: {
    color: "blue",
    label: "Confirmed",
  },
  Shipped: {
    color: "purple",
    label: "Shipped",
  },
  Delivered: {
    color: "green",
    label: "Delivered",
  },
  Cancelled: {
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
