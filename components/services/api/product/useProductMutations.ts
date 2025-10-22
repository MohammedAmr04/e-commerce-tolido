// services/api/product/useProductMutations.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "./../../../../lib/axios";

// -------------------
// Types
// -------------------
export interface ProductPrice {
  basePrice: number;
  finalPrice?: number;
  discount?: number;
  currency?: string;
  stock?: number;
  sold?: number;
  amount?: number;
  country?: { code: string; name: string };
}

export interface ProductTitle {
  en: string;
  ar: string;
}

export interface Product {
  _id: string;
  title: ProductTitle;
  slug: string;
  description?: string;
  rate?: number;
  images: { url: string }[];
  image3D?: string;
  minimumOrderQuantity?: number;
  createdAt: string;
  updatedAt: string;
  finalPrice?: number;
  discount?: number;
  price?: number;
  currency?: string;
  stock?: number;
  sold?: number;
  amount?: number;
  country?: { code: string; name: string };
}

export interface ApiResponse<T> {
  status: "SUCCESS" | "FAIL" | string;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  status: "FAIL" | string;
  message: string;
}

// -------------------
// Create Product
// -------------------
export interface CreateProductData {
  title: ProductTitle;
  description?: string;
  images?: { url: string }[];
  image3D?: string;
  prices: ProductPrice[];
  minimumOrderQuantity?: number;
  rate?: number;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Product>, // Response type
    AxiosError<ErrorResponse>, // Error type
    CreateProductData // Data we send
  >({
    mutationFn: (data) => api.post("/products", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // 🔄 Refresh products list
    },
  });
}

// -------------------
// Update Product
// -------------------
export interface UpdateProductData {
  id: string;
  updates: Partial<CreateProductData>;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Product>,
    AxiosError<ErrorResponse>,
    UpdateProductData
  >({
    mutationFn: ({ id, updates }) => api.patch(`/products/${id}`, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
}

// -------------------
// Delete Product
// -------------------
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, string>({
    mutationFn: (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// -------------------
// Get Products
// -------------------
export interface GetProductsQuery {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number | null | undefined;
  maxPrice?: number | null | undefined;
  status?: string | null | undefined;
  category?: string | null;
}

export interface GetProductsResponse {
  products: Product[];
  total: number;
  page: number;
  count: number;
}

export function useProducts(queryParams?: GetProductsQuery | null | undefined) {
  return useQuery<GetProductsResponse, AxiosError<ErrorResponse>>({
    queryKey: ["products", queryParams], // object syntax
    queryFn: async () => {
      const params = new URLSearchParams(
        queryParams as Record<string, string>
      ).toString();
      const { data } = await api.get(`/products?${params}`);
      return data.data;
    },
    placeholderData: keepPreviousData,
  });
}

// Get single product
export function useProduct(slug: string) {
  return useQuery<Product, AxiosError<ErrorResponse>>({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data } = await api.get(`/products/${slug}`);
      return data.data;
    },
    enabled: !!slug,
  });
}
