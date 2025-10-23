export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";
export type PaymentStatus = "unpaid" | "paid";
export type PaymentMethod = "cash" | "card";
export type DeliveryType = "standard" | "express";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  city: string;
  street: string;
  comment?: string;
}

export interface OrderItem {
  productId: {
    _id: string;
    title: { en: string; ar: string };
    images: { url: string }[];
    slug: string;
  };
  quantity: number;
  priceAtThatTime: number;
  total: number;
}

// ==========================================
// USER ORDER TYPE
// ==========================================
export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryType: DeliveryType;
  shippingAddress: ShippingAddress;
  countryCode: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// ADMIN ORDER TYPE (with populated user)
// ==========================================
export interface OrderAdmin extends Omit<Order, "userId"> {
  userId: {
    _id: string;
    name: string;
    email: string;
  };
}

// ==========================================
// API RESPONSE TYPES
// ==========================================
export interface ApiResponse<T> {
  status: "SUCCESS" | "FAIL";
  message?: string;
  data?: T;
}

export interface ErrorResponse {
  status: "FAIL";
  message: string;
}

// ==========================================
// QUERY PARAMS
// ==========================================
export interface GetOrdersQuery {
  page?: number;
  limit?: number;
  status?: OrderStatus | null;
}

export interface GetOrdersAdminQuery extends GetOrdersQuery {
  country?: string | null;
  userId?: string | null;
}

export interface GetOrdersResponse {
  orders: Order[];
  totalOrders: number;
  currentPage: number;
  totalPages: number;
  count: number;
}

export interface GetOrdersAdminResponse {
  orders: OrderAdmin[];
  totalOrders?: number;
  currentPage: number;
  totalPages: number;
  count: number;
}

// ==========================================
// MUTATION PAYLOADS
// ==========================================
export interface CreateOrderPayload {
  shippingAddress: ShippingAddress;
  paymentMethod?: PaymentMethod;
  deliveryType?: DeliveryType;
}

export interface UpdateOrderStatusPayload {
  id: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
}
