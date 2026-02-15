import type { Product, ProductId } from "../types";

export { ProductCard } from "./ProductCard";
export type { ProductCardProps } from "./ProductCard";
export interface ProductGridProps {
  products: ReadonlyArray<Product>;
  isLoading?: boolean;
  onSelect?: (productId: ProductId) => void;
}
