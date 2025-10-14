// src/types/product.ts

export interface ProductTitle {
    en: string;
    ar: string;
  }
  
  export interface ProductDescription {
    en?: string;
    ar?: string;
  }
  
  export interface ProductImage {
    url: string;
  }
  
  export interface ProductPrice {
    country: {
      code: string; // e.g., "EG", "US"
    };
    currency?: string;
    basePrice: number;
    discount?: number;
    finalPrice?: number;
    sold?: number;
    amount?: number;
    stock?: "stock" | "unStock";
  }
  
  export interface ProductRate {
    average: number;
    count: number;
  }
  
  export interface IProduct {
    _id: string;
    title: ProductTitle;
    description?: ProductDescription;
    slug: string;
    images: ProductImage[];
    minimumOrderQuantity: number;
    createdAt?: string;
    updatedAt?: string;
    image3D?: string | null;
    
    country: {
        code: string; // e.g., "EG", "US"
      };
      currency?: string;
      basePrice: number;
      discount?: number;
      finalPrice?: number;
      sold?: number;
      amount?: number;
      stock?: "stock" | "unStock";
         isFeatured: boolean;

  }
  