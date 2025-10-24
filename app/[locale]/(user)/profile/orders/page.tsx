// app/orders/page.tsx
"use client";

import { useState } from "react";
import OrdersTabs from "@/components/profile/orders/OrdersTabs";
import OrderCard from "@/components/profile/orders/OrderCard";
import {
  useMyOrders,
  useCancelOrder,
} from "@/components/services/api/orders/useOrdersMutations";
import { OrderStatus } from "@/components/services/api/orders/types";
import { message } from "antd";

export default function Page() {
  const [status, setStatus] = useState<string>("All");
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading } = useMyOrders({
    status: status === "All" ? null : (status.toLowerCase() as OrderStatus),
  });

  const cancelOrderMutation = useCancelOrder();

  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrderMutation.mutateAsync(orderId);
      messageApi.success("Order cancelled successfully");
    } catch {
      messageApi.error("Failed to cancel order");
    }
  };

  return (
    <div className="p-8 bg-[var(--color-background)] min-h-screen text-[var(--color-text)]">
      {contextHolder}
      <h1 className="text-3xl font-bold mb-2 text-[var(--color-primary)]">
        My Orders
      </h1>

      <OrdersTabs onSelect={(tab) => setStatus(tab)} />

      <div className="flex gap-4 flex-col">
        {isLoading ? (
          <p>Loading...</p>
        ) : data?.orders && data.orders.length > 0 ? (
          data.orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onCancel={() => handleCancelOrder(order.id)}
            />
          ))
        ) : (
          <p className="text-[var(--color-text)]/60">No orders found.</p>
        )}
      </div>
    </div>
  );
}
