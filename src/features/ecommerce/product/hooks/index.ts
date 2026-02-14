import type { Product, ProductId, ProductQuery } from "../types";

export interface UseProductListOptions {
  query?: ProductQuery;
}

export interface UseProductListResult {
  products: ReadonlyArray<Product>;
  isLoading: boolean;
  error: Error | null;
}

export type UseProductList = (
  options?: UseProductListOptions,
) => UseProductListResult;

export interface UseProductDetailsOptions {
  productId: ProductId;
}

export interface UseProductDetailsResult {
  product: Product | null;
  isLoading: boolean;
  error: Error | null;
}

export type UseProductDetails = (
  options: UseProductDetailsOptions,
) => UseProductDetailsResult;
