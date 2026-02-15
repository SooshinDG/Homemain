export type ProductId = string;
export type ProductCategory = string;

export interface Product {
  id: ProductId;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: ProductCategory;
  createdAt?: Date;
  sku?: string;
  slug?: string;
  isActive?: boolean;
}

export interface ProductQuery {
  query?: string;
  category?: ProductCategory;
  isActive?: boolean;
  limit?: number;
  offset?: number;
}

export interface ProductRepository {
  list(input?: ProductQuery): Promise<ReadonlyArray<Product>>;
  getById(id: ProductId): Promise<Product | null>;
  getBySlug?(slug: string): Promise<Product | null>;
}

// Keep DB-facing shape explicit for future persistence integration.
export interface ProductRecord extends Omit<Product, "createdAt"> {
  createdAt: string;
}
