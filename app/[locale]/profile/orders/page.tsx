// app/orders/page.tsx
"use client";

import { useState } from "react";
import OrdersTabs from "@/components/profile/orders/OrdersTabs";
import OrderCard from "@/components/profile/orders/OrderCard";
import { mockOrders } from "@/components/services/mockData/Orders";

export default function Page() {
  const [status, setStatus] = useState<string>("All");

//   const { data, isLoading } = useQuery<Order[]>({
//     queryKey: ["orders", status],
//     queryFn: () => (status === "All" ? getOrders() : getOrders(status as any)),
//   });
console.log(status)

  return (
    <div className="p-8 bg-[var(--color-background)] min-h-screen text-[var(--color-text)]">
                <h1 className="text-3xl font-bold mb-2 text-[var(--color-primary)]">
My Orders</h1>

      <OrdersTabs onSelect={(tab) => setStatus(tab)} />
{/* 
      {isLoading ? (
        <p>Loading...</p>
      ) : data && data.length > 0 ? (
        data.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <p className="text-[var(--color-text)]/60">No orders found.</p>
      )} */}
 <div className="flex gap-4 flex-col">
         {mockOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
 </div>
    </div>
  );
}
