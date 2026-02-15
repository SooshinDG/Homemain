import type { PaginationInput, SupabaseTimestampColumns } from "../types";

export type ProductId = string;

export interface Product {
  id: ProductId;
  slug?: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  createdAt?: Date;
}

export interface ProductQuery extends PaginationInput {
  query?: string;
  category?: string;
  isActive?: boolean;
}

export interface ProductRepository {
  list(input?: ProductQuery): Promise<ReadonlyArray<Product>>;
  getById(id: ProductId): Promise<Product | null>;
  getBySlug(slug: string): Promise<Product | null>;
}

// Keep DB-facing shape explicit for future persistence integration.
export interface ProductRecord extends Omit<Product, "createdAt"> {
  createdAt: string;
}

export interface ProductSupabaseRow extends SupabaseTimestampColumns {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image_url: string;
  category: string;
  is_active: boolean;
}
