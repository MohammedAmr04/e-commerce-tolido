// ==========================================
// WISHLIST TYPES

import { Product } from "../product/useProductMutations";

// ==========================================

// ==========================================
// API RESPONSES
// ==========================================
export interface GetWishlistResponse {
  count: number;
  data: Product[];
}
export interface GetWishlistGuestResponse {
  count: number;
  data: Product[];
}

export interface AddWishlistPayload {
  productId: string;
}
