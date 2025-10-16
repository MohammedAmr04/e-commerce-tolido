"use client";

import { Card, Button } from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Image from "next/image";
import { IOrder } from "@/components/services/types/order";
import OrderStatusTag from "./OrderStatusTag";

interface OrderCardProps {
  order: IOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Card
      className="bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text)] rounded-2xl shadow-sm p-4 mb-5"
      classNames={{ body: "p-4" }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            Order #{order.id}
          </h3>
          <div className="flex items-center gap-2 mt-1 md:hidden">
            {/* status + price for mobile */}
            <OrderStatusTag status={order.status} />
            <p className="text-primary font-bold">
              ${order.totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Desktop view for price + status */}
        <div className="hidden md:flex items-center gap-3">
          <OrderStatusTag status={order.status} />
          <p className="text-primary font-bold text-lg">
            ${order.totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-6 text-sm mb-4 text-[var(--color-text)]/70">
        <span className="flex items-center gap-2">
          <CalendarOutlined /> {order.date}
        </span>
      </div>

      {/* Products */}
      <div className="flex flex-wrap gap-6 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 w-[200px]">
            <Image
              src={item.image}
              alt={item.title}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
            <div>
              <p className="font-medium text-[var(--color-text)]">{item.title}</p>
              <p className="text-[var(--color-text)]/60 text-sm">
                Qty: {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-t border-[var(--color-border)] pt-3 mt-2 gap-3">
        <span className="flex items-center gap-2 text-[var(--color-text)]/70">
          <EnvironmentOutlined /> {order.address}
        </span>
        <Button
          type="primary"
          className=" !border-none px-6 font-medium w-full md:w-auto"
        >
          Track Order
        </Button>
      </div>
    </Card>
  );
}
