import { ColumnsType } from "antd/es/table";
import { Button, Tag, Tooltip, Select, Space } from "antd";
import { Eye } from "lucide-react";
import {
  OrderAdmin,
  OrderStatus,
} from "@/components/services/api/orders/types";

const orderStatusColors: Record<OrderStatus, string> = {
  pending: "gold",
  confirmed: "blue",
  shipped: "purple",
  delivered: "green",
  cancelled: "red",
};

export const orderAdminColumns = (
  handleStatusChange?: (id: string, status: OrderStatus) => void,
  handleView?: (order: OrderAdmin) => void
): ColumnsType<OrderAdmin> => [
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id",
    render: (id: string) => (
      <Tooltip title={id}>
        <span className="font-medium">{id.slice(0, 8)}...</span>
      </Tooltip>
    ),
  },
  {
    title: "Customer",
    dataIndex: "userId",
    key: "user",
    render: (user: OrderAdmin["userId"], record) => (
      <div>
        <div className="font-medium">{user?.name || "Unknown"}</div>
        <div className="text-gray-500 text-xs">{user?.email}</div>
        <div className="text-gray-400 text-xs">
          {record.shippingAddress?.phone || "N/A"}
        </div>
      </div>
    ),
  },
  {
    title: "Total",
    dataIndex: "totalAmount",
    key: "totalAmount",
    align: "center",
    render: (amount: number) => (
      <span className="font-semibold">${amount.toFixed(2)}</span>
    ),
  },
  {
    title: "Payment",
    key: "payment",
    render: (_, record) => (
      <Tag color={record.paymentStatus === "paid" ? "green" : "red"}>
        {record.paymentStatus.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Shipping Address",
    // dataIndex: ["shippingAddress", "city"],
    key: "shippingAddress",
    render(_, record) {
      return (
        <div>
          <span>{record.countryCode} - </span>
          <span>{record.shippingAddress.city}</span>
          <div>{record.shippingAddress.street}</div>
        </div>
      );
    },
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: OrderStatus, record) => (
      <Select
        value={status}
        className={`status-select status-${status}`}
        style={{
          width: 160,
          borderColor: orderStatusColors[status],
        }}
        onChange={(value) => handleStatusChange?.(record.id, value)}
        options={[
          { value: "pending", label: "Pending" },
          { value: "confirmed", label: "Confirmed" },
          { value: "shipped", label: " Shipped" },
          { value: "delivered", label: "Delivered" },
          { value: "cancelled", label: "Cancelled" },
        ]}
      />
    ),
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => {
      if (!date) return "—";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },

  {
    title: "Actions",
    key: "actions",
    fixed: "right",
    width: 80,
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="View Details">
          <Button
            type="text"
            size="small"
            icon={<Eye size={24} className="text-gray-500" />}
            onClick={() => handleView?.(record)}
          />
        </Tooltip>
      </Space>
    ),
  },
];
