import type { Product, ProductId } from "../types";

export { ProductCard } from "./ProductCard";
export type { ProductCardProps } from "./ProductCard";
export { ProductList } from "./ProductList";
export type { ProductListProps } from "./ProductList";

export interface ProductGridProps {
  products: ReadonlyArray<Product>;
  isLoading?: boolean;
  onSelect?: (productId: ProductId) => void;
}
