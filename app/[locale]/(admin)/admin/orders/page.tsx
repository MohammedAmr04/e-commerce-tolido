"use client";

import { useState } from "react";
import {
  message,
  Modal,
  Select,
  Input,
  Space,
  Tag,
  Statistic,
  Row,
  Col,
  Card,
} from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  CloseCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";

import TableLayout from "@/components/admin/layouts/TableLayout";
import {
  useOrdersAdmin,
  useUpdateOrderStatus,
} from "@/components/services/api/orders/useOrdersMutations";
import {
  Order,
  OrderAdmin,
  OrderStatus,
  PaymentStatus,
} from "@/components/services/api/orders/types";
import CustomTable from "@/components/admin/shared/CustomTable";
import { orderAdminColumns } from "@/components/admin/columns/ordersColumns";
import Image from "next/image";
import { useDarkLightContext } from "@/components/services/context/DarkLightProvider";

export default function AdminOrdersPage() {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    orderId: null as string | null,
    status: null as OrderStatus | null,
    country: null as string | null,
    userId: null as string | null,
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDark } = useDarkLightContext();
  // ✅ Fetch all orders
  const { data, isLoading } = useOrdersAdmin(queryParams);
  const updateStatusMutation = useUpdateOrderStatus();

  // ==========================================
  // VIEW ORDER DETAILS
  // ==========================================
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================
  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    updateStatusMutation.mutate(
      { id: orderId, status },
      {
        onSuccess: () => {
          message.success(`Order status updated to ${status}`);
        },
      }
    );
  };

  const handleUpdatePayment = (
    orderId: string,
    paymentStatus: PaymentStatus
  ) => {
    updateStatusMutation.mutate(
      { id: orderId, paymentStatus },
      {
        onSuccess: () => {
          message.success(`Payment status updated to ${paymentStatus}`);
        },
      }
    );
  };

  // ==========================================
  // STATISTICS
  // ==========================================
  const stats = {
    total: Object.values(data?.statistics || {}).reduce(
      (acc, curr) => acc + curr,
      0
    ),
    pending: data?.statistics.pending || 0,
    confirmed: data?.statistics.confirmed || 0,
    shipped: data?.statistics.shipped || 0,
    delivered: data?.statistics.delivered || 0,
    cancelled: data?.statistics.cancelled || 0,
  };
  return (
    <main className={`${isDark ? "bg-background" : "bg-background-alt"} `}>
      <TableLayout title="Orders Management">
        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} md={8} lg={4}>
            <Card>
              <Statistic
                title="Total Orders"
                value={stats.total}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={5}>
            <Card>
              <Statistic
                title="Pending"
                value={stats.pending}
                valueStyle={{ color: "#faad14" }}
                prefix={<CloseCircleOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={5}>
            <Card>
              <Statistic
                title="Confirmed"
                value={stats.confirmed}
                valueStyle={{ color: "#1890ff" }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={5}>
            <Card>
              <Statistic
                title="Shipped"
                value={stats.shipped}
                valueStyle={{ color: "#13c2c2" }}
                prefix={<TruckOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={5}>
            <Card>
              <Statistic
                title="Delivered"
                value={stats.delivered}
                valueStyle={{ color: "#52c41a" }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-4">
          <Input
            placeholder="Search by Order ID..."
            prefix={<SearchOutlined />}
            size="large"
            value={queryParams.orderId || ""}
            onChange={(e) => {
              console.log(e.target.value);
              setQueryParams((prev) => ({
                ...prev,
                orderId: e.target.value || null,
                page: 1,
              }));
            }}
            style={{ width: 250 }}
            allowClear
          />

          <Select
            placeholder="Filter by Status"
            value={queryParams.status}
            onChange={(value) =>
              setQueryParams((prev) => ({ ...prev, status: value, page: 1 }))
            }
            style={{ width: 180 }}
            allowClear
            size="large"
            suffixIcon={<FilterOutlined />}
            options={[
              { label: "All Statuses", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "Confirmed", value: "confirmed" },
              { label: "Shipped", value: "shipped" },
              { label: " Delivered", value: "delivered" },
            ]}
          />

          {/* <Select
          placeholder="Filter by Country"
          value={queryParams.country}
          onChange={(value) =>
            setQueryParams((prev) => ({ ...prev, country: value, page: 1 }))
          }
          style={{ width: 150 }}
          allowClear
          options={[
            { label: "All Countries", value: null },
            { label: "🇪🇬 Egypt", value: "EG" },
            { label: "🇸🇾 Syria", value: "SY" },
            { label: "🇯🇴 Jordan", value: "JO" },
          ]}
        /> */}

          <div className="ml-auto text-gray-600">
            Total:{" "}
            <span className="font-semibold">{data?.totalOrders || 0}</span>{" "}
            orders
          </div>
        </div>

        {/* Orders Table */}
        <CustomTable<OrderAdmin>
          dataSource={data?.orders || []}
          columns={orderAdminColumns(handleUpdateStatus, handleViewDetails)}
          loading={isLoading || updateStatusMutation.isPending}
          pagination={{
            current: data?.currentPage || 1,
            total: data?.totalOrders || 0,
            pageSize: queryParams.limit,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`,
            onChange: (page, pageSize) =>
              setQueryParams((prev) => ({
                ...prev,
                page,
                limit: pageSize || 10,
              })),
          }}
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <OrderItemsExpanded items={record.items} />
          //   ),
          //   rowExpandable: (record) => record.items && record.items.length > 0,
          // }}
        />

        {/* Order Details Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">
                Order Details
              </h2>
              <Tag
                color="var(--color-primary)"
                className="border-none text-[var(--color-background)] font-medium"
              >
                #{selectedOrder?.id.slice(-8).toUpperCase()}
              </Tag>
            </div>
          }
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          width={850}
          footer={null}
          className="[&_.ant-modal-content]:bg-[var(--color-backgroundSoft)] [&_.ant-modal-header]:bg-[var(--color-backgroundAlt)]"
        >
          {selectedOrder && (
            <div className="space-y-6 text-[var(--color-text)]">
              {/* Customer Info */}
              <div className="p-5 rounded-2xl bg-[var(--color-card)] shadow-sm border border-[var(--color-border)]">
                <h3 className="font-semibold mb-3 text-[var(--color-primary)]">
                  Customer Information
                </h3>
                <div className="space-y-2 text-sm">
                  {typeof selectedOrder.userId !== "string" && (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium">Name:</span>
                        <span>{selectedOrder.userId.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span>{selectedOrder.userId.email}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="p-5 rounded-2xl bg-[var(--color-card)] shadow-sm border border-[var(--color-border)]">
                <h3 className="font-semibold mb-3 text-[var(--color-primary)]">
                  Shipping Address
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Full Name:</span>
                    <span>{selectedOrder.shippingAddress.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span className="text-[var(--color-info)]">
                      {selectedOrder.shippingAddress.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Address:</span>
                    <span>
                      {selectedOrder.shippingAddress.street},{" "}
                      {selectedOrder.shippingAddress.city}
                    </span>
                  </div>
                  {selectedOrder.shippingAddress.comment && (
                    <div className="flex justify-between">
                      <span className="font-medium">Comment:</span>
                      <span>{selectedOrder.shippingAddress.comment}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-5 rounded-2xl bg-[var(--color-card)] shadow-sm border border-[var(--color-border)]">
                <h3 className="font-semibold mb-3 text-[var(--color-primary)]">
                  Order Items
                </h3>
                {/* <OrderItemsExpanded items={selectedOrder.items} /> */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.productId?._id}
                      className="flex items-center gap-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <Image
                        src={
                          item.productId?.images?.[0]?.url || "/placeholder.png"
                        }
                        alt={item.productId?.title?.en}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-[var(--color-text)] leading-tight">
                          {item.productId?.title?.en}
                        </p>
                        <p className="text-[var(--color-gray)] text-sm">
                          Qty: {item?.quantity} × $
                          {item.priceAtThatTime.toFixed(2)}
                        </p>
                        <p className="text-[var(--color-primary)] text-sm font-semibold">
                          Total: ${item?.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Management */}
              <div className="p-5 rounded-2xl bg-[var(--color-card)] shadow-sm border border-[var(--color-border)]">
                <h3 className="font-semibold mb-3 text-[var(--color-primary)]">
                  Update Status
                </h3>
                <Space direction="vertical" className="w-full">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Order Status:</span>
                    <Select
                      value={selectedOrder.status}
                      onChange={(value) =>
                        handleUpdateStatus(selectedOrder.id, value)
                      }
                      className="ms-5"
                      style={{ width: 200 }}
                      disabled={
                        selectedOrder.status === "delivered" ||
                        selectedOrder.status === "cancelled"
                      }
                      options={[
                        { label: "Pending", value: "pending" },
                        { label: "Confirmed", value: "confirmed" },
                        { label: "Shipped", value: "shipped" },
                        { label: "Delivered", value: "delivered" },
                      ]}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-medium">Payment Status:</span>
                    <Select
                      value={selectedOrder.paymentStatus}
                      onChange={(value) => {
                        handleUpdatePayment(selectedOrder.id, value);
                        setIsModalOpen(false);
                      }}
                      style={{ width: 200 }}
                      options={[
                        { label: "Unpaid", value: "unpaid" },
                        { label: "Paid", value: "paid" },
                      ]}
                    />
                  </div>
                </Space>
              </div>
            </div>
          )}
        </Modal>
      </TableLayout>
    </main>
  );
}
