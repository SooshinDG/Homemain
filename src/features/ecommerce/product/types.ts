export type ProductId = string;

export type ProductCategory = string;

export interface Product {
  id: ProductId;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  createdAt: Date;
}

// Keep DB-facing shape explicit for future persistence integration.
export interface ProductRecord extends Omit<Product, "createdAt"> {
  createdAt: string;
}
