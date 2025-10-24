// services/api/order/hooks.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import {
  Order,
  OrderAdmin,
  GetOrdersQuery,
  GetOrdersAdminQuery,
  GetOrdersResponse,
  GetOrdersAdminResponse,
  CreateOrderPayload,
  UpdateOrderStatusPayload,
  ApiResponse,
  ErrorResponse,
} from "./types";

// ==========================================
// USER QUERIES
// ==========================================

/**
 * Get user's orders (filtered by country from header)
 * Endpoint: GET /orders/my-orders
 */
export function useMyOrders(queryParams?: GetOrdersQuery) {
  return useQuery<GetOrdersResponse, AxiosError<ErrorResponse>>({
    queryKey: ["my-orders", queryParams],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (queryParams?.page) params.append("page", String(queryParams.page));
      if (queryParams?.limit) params.append("limit", String(queryParams.limit));
      if (queryParams?.status) params.append("status", queryParams.status);

      const { data } = await api.get(`/orders/my-orders?${params.toString()}`);
      return data.data;
    },
    placeholderData: keepPreviousData,
  });
}

/**
 * Get single order
 * Endpoint: GET /orders/:id
 */
export function useOrder(id: string, enabled: boolean = true) {
  return useQuery<Order, AxiosError<ErrorResponse>>({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data } = await api.get(`/orders/${id}`);
      return data.data;
    },
    enabled: !!id && enabled,
  });
}

// ==========================================
// ADMIN QUERIES
// ==========================================

/**
 * Get all orders (Admin only)
 * Endpoint: GET /orders
 */
export function useOrdersAdmin(queryParams?: GetOrdersAdminQuery) {
  return useQuery<GetOrdersAdminResponse, AxiosError<ErrorResponse>>({
    queryKey: ["orders-admin", queryParams],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (queryParams?.page) params.append("page", String(queryParams.page));
      if (queryParams?.limit) params.append("limit", String(queryParams.limit));
      if (queryParams?.status) params.append("status", queryParams.status);
      if (queryParams?.country) params.append("country", queryParams.country);
      if (queryParams?.userId) params.append("userId", queryParams.userId);
      if (queryParams?.orderId) params.append("orderId", queryParams.orderId);

      const { data } = await api.get(`/orders?${params.toString()}`);
      return data.data;
    },
    placeholderData: keepPreviousData,
  });
}

/**
 * Get single order (Admin)
 * Endpoint: GET /orders/:id
 */
export function useOrderAdmin(id: string, enabled: boolean = true) {
  return useQuery<OrderAdmin, AxiosError<ErrorResponse>>({
    queryKey: ["order-admin", id],
    queryFn: async () => {
      const { data } = await api.get(`/orders/${id}`);
      return data.data;
    },
    enabled: !!id && enabled,
  });
}

// ==========================================
// USER MUTATIONS
// ==========================================

/**
 * Create new order
 * Endpoint: POST /orders
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<{ order: Order }>,
    AxiosError<ErrorResponse>,
    CreateOrderPayload
  >({
    mutationFn: async (data) => {
      const response = await api.post("/orders", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

/**
 * Cancel order (User can only cancel pending orders)
 * Endpoint: PATCH /orders/cancel/:id
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, AxiosError<ErrorResponse>, string>({
    mutationFn: async (orderId) => {
      const response = await api.patch(`/orders/cancel/${orderId}`);
      return response.data;
    },
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders-admin"] });
    },
  });
}

// ==========================================
// ADMIN MUTATIONS
// ==========================================

/**
 * Update order status (Admin only)
 * Endpoint: PATCH /orders/:id
 *
 * ✅ Admin can update status & paymentStatus
 * ❌ Admin CANNOT delete orders
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<{ order: OrderAdmin }>,
    AxiosError<ErrorResponse>,
    UpdateOrderStatusPayload
  >({
    mutationFn: async ({ id, status, paymentStatus }) => {
      const response = await api.patch(`/orders/${id}`, {
        status,
        paymentStatus,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders-admin"] });
      queryClient.invalidateQueries({
        queryKey: ["order-admin", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
}

// ==========================================
// STATISTICS (Admin)
// ==========================================

export interface OrderStatistics {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  ordersByCountry: { country: string; count: number; revenue: number }[];
}

export function useOrderStatistics() {
  return useQuery<OrderStatistics, AxiosError<ErrorResponse>>({
    queryKey: ["order-statistics"],
    queryFn: async () => {
      const { data } = await api.get("/orders/statistics");
      return data.data;
    },
  });
}
