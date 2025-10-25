// services/api/product/types.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/axios";
// ==========================================
// SHARED TYPES
// ==========================================
export interface ProductTitle {
  en: string;
  ar: string;
}

export interface ProductDescription {
  en?: string;
  ar?: string;
}

export interface ProductCategory {
  en: string;
  ar: string;
}

export interface Country {
  code: string;
  name?: string;
}

export type StockStatus = "stock" | "unStock";

// ==========================================
// ADMIN TYPES (Multiple Prices per Country)
// ==========================================
export interface ProductPrice {
  basePrice: number;
  finalPrice: number;
  discount?: number;
  currency: string;
  stock?: StockStatus;
  sold?: number;
  amount: number;
  country: Country;
}

export interface ProductAdmin {
  id: string;
  title: ProductTitle;
  slug: string;
  category?: ProductCategory;
  description?: ProductDescription;
  images: { url: string }[];
  image3D?: string;
  minimumOrderQuantity?: number;
  prices: ProductPrice[]; // ✅ Multiple prices
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// USER TYPES (Single Price for User's Country)
// ==========================================
export interface Product {
  id: string;
  _id: string;
  title: ProductTitle;
  slug: string;
  category?: ProductCategory;
  description?: ProductDescription;
  images: { url: string }[];
  image3D?: string;
  minimumOrderQuantity?: number;

  // ✅ Flattened single price (based on user's country from header)
  price: number; // basePrice
  finalPrice: number;
  discount?: number;
  currency: string;
  stock: StockStatus;
  sold: number;
  amount: number;
  country: Country;

  createdAt: string;
  updatedAt: string;
}

// ==========================================
// API RESPONSE TYPES
// ==========================================
export interface ApiResponse<T> {
  status: "SUCCESS" | "FAIL";
  message: string;
  data?: T;
}

export interface ErrorResponse {
  status: "FAIL";
  message: string;
  errors?: Record<string, string[]>;
}

// ==========================================
// QUERY PARAMS
// ==========================================
export interface GetProductsAdminQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string | null;
  sort?: "createdAt" | "updatedAt" | "title";
  order?: "asc" | "desc";
}

export interface GetProductsQuery {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  category?: string | null;
  stock?: StockStatus | null;
  sort?: "price" | "createdAt" | "title" | "sold";
  order?: "asc" | "desc";
}

export interface GetProductsAdminResponse {
  products: ProductAdmin[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==========================================
// MUTATION PAYLOADS
// ==========================================
export interface CreateProductPayload {
  title: ProductTitle;
  category?: ProductCategory;
  description?: ProductDescription;
  images: { url: string }[];
  image3D?: string;
  prices: Omit<ProductPrice, "sold">[]; // Admin creates without sold/amount
  minimumOrderQuantity?: number;
}

export interface UpdateProductPayload {
  id: string;
  updates: Partial<CreateProductPayload>;
}

// services/api/product/hooks.ts

// ==========================================
// ADMIN QUERIES
// ==========================================

/**
 * Get all products with all prices (Admin only)
 * Endpoint: GET /admin/products
 */
export function useProductsAdmin(queryParams?: GetProductsAdminQuery) {
  return useQuery<GetProductsAdminResponse, AxiosError<ErrorResponse>>({
    queryKey: ["products-admin", queryParams],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (queryParams?.page) params.append("page", String(queryParams.page));
      if (queryParams?.limit) params.append("limit", String(queryParams.limit));
      if (queryParams?.search) params.append("search", queryParams.search);
      if (queryParams?.category)
        params.append("category", queryParams.category);
      if (queryParams?.sort) params.append("sort", queryParams.sort);
      if (queryParams?.order) params.append("order", queryParams.order);

      const { data } = await api.get(`/products/admin?${params.toString()}`);
      return data.data;
    },
    placeholderData: keepPreviousData,
  });
}

/**
 * Get single product with all prices (Admin only)
 * Endpoint: GET /admin/products/:id
 */
export function useProductAdmin(id: string, enabled: boolean = true) {
  return useQuery<ProductAdmin, AxiosError<ErrorResponse>>({
    queryKey: ["product-admin", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/products/${id}`);
      return data.data;
    },
    enabled: !!id && enabled,
  });
}

// ==========================================
// USER QUERIES (Public)
// ==========================================

/**
 * Get products with single price based on user's country (from header)
 * Endpoint: GET /products
 * Header: x-country-code or countryCode
 */
export function useProducts(queryParams?: GetProductsQuery) {
  return useQuery<GetProductsResponse, AxiosError<ErrorResponse>>({
    queryKey: ["products", queryParams],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (queryParams?.page) params.append("page", String(queryParams.page));
      if (queryParams?.limit) params.append("limit", String(queryParams.limit));
      if (queryParams?.search) params.append("search", queryParams.search);
      if (queryParams?.minPrice)
        params.append("minPrice", String(queryParams.minPrice));
      if (queryParams?.maxPrice)
        params.append("maxPrice", String(queryParams.maxPrice));
      if (queryParams?.category)
        params.append("category", queryParams.category);
      if (queryParams?.stock) params.append("stock", queryParams.stock);
      if (queryParams?.sort) params.append("sort", queryParams.sort);
      if (queryParams?.order) params.append("order", queryParams.order);

      const { data } = await api.get(`/products?${params.toString()}`);
      return data.data;
    },
    placeholderData: keepPreviousData,
  });
}

/**
 * Get single product with price based on user's country (from header)
 * Endpoint: GET /products/:slug
 * Header: x-country-code or countryCode
 */
export function useProduct(slug: string, enabled: boolean = true) {
  return useQuery<Product, AxiosError<ErrorResponse>>({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await api.get(`/products/${slug}`);
      return data.data;
    },
    enabled: !!slug && enabled,
  });
}

// ==========================================
// ADMIN MUTATIONS
// ==========================================

/**
 * Create new product (Admin only)
 * Endpoint: POST /admin/products
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ProductAdmin>,
    AxiosError<ErrorResponse>,
    CreateProductPayload
  >({
    mutationFn: async (data) => {
      const response = await api.post("/products", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate admin products list
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
      // Invalidate user products list (in case admin is testing)
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/**
 * Update existing product (Admin only)
 * Endpoint: PATCH /admin/products/:id
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ProductAdmin>,
    AxiosError<ErrorResponse>,
    UpdateProductPayload
  >({
    mutationFn: async ({ id, updates }) => {
      const response = await api.patch(`/products/${id}`, updates);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate admin lists
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
      queryClient.invalidateQueries({
        queryKey: ["product-admin", variables.id],
      });
      // Invalidate user lists
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}

/**
 * Delete product (Admin only)
 * Endpoint: DELETE /admin/products/:id
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, AxiosError<ErrorResponse>, string>({
    mutationFn: async (id) => {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
