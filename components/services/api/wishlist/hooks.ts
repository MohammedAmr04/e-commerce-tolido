import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import {
  GetWishlistResponse,
  AddWishlistPayload,
  GetWishlistGuestResponse,
} from "./types";
import {
  ApiResponse,
  ErrorResponse,
  Product,
} from "../product/useProductMutations";

// ==========================================
// QUERIES
// ==========================================

/**
 * Get all wishlist items for logged-in user
 * Endpoint: GET /wishlist
 */
export function useWishlist(
  options?: Partial<UseQueryOptions<Product[], AxiosError<ErrorResponse>>>
): UseQueryResult<Product[], AxiosError<ErrorResponse>> {
  return useQuery<Product[], AxiosError<ErrorResponse>>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await api.get<GetWishlistResponse>("/wishlist");
      return data.data;
    },
    ...options,
  });
}
// ==========================================
// MUTATIONS
// ==========================================
export interface GuestWishlistPayload {
  productIds: string[];
  enabled?: boolean;
}

export function useGuestWishlist({
  productIds,
  enabled = true,
}: GuestWishlistPayload) {
  return useQuery<Product[], AxiosError<ErrorResponse>>({
    queryKey: ["wishlist-guest", productIds],
    queryFn: async () => {
      const { data } = await api.post<GetWishlistGuestResponse>(
        "/wishlist/guest",
        {
          productIds,
        }
      );
      return data.data;
    },
    enabled: enabled && productIds.length > 0,
  });
}

/**
 * Add product to wishlist
 * Endpoint: POST /wishlist
 */
export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<{ wishlistItem: unknown }>,
    AxiosError<ErrorResponse>,
    AddWishlistPayload
  >({
    mutationFn: async (payload) => {
      const { data } = await api.post("/wishlist", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

/**
 * Remove product from wishlist
 * Endpoint: DELETE /wishlist/:productId
 */
export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, AxiosError<ErrorResponse>, string>({
    mutationFn: async (productId) => {
      const { data } = await api.delete(`/wishlist/${productId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}
