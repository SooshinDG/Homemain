import type {
  CurrencyCode,
  PaginationInput,
  SupabaseTimestampColumns,
  Timestamped,
} from "../types";

export type ProductId = string;
export type ProductSku = string;

export interface Product extends Timestamped {
  id: ProductId;
  sku: ProductSku;
  slug: string;
  name: string;
  description: string | null;
  priceCents: number;
  currencyCode: CurrencyCode;
  imageUrl: string | null;
  isActive: boolean;
}

export interface ProductQuery extends PaginationInput {
  query?: string;
  isActive?: boolean;
}

export interface ProductRepository {
  list(input?: ProductQuery): Promise<ReadonlyArray<Product>>;
  getById(id: ProductId): Promise<Product | null>;
  getBySlug(slug: string): Promise<Product | null>;
}

export interface ProductSupabaseRow extends SupabaseTimestampColumns {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string | null;
  price_cents: number;
  currency_code: string;
  image_url: string | null;
  is_active: boolean;
}
