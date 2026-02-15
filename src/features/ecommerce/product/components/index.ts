import type { Product, ProductId } from "../types";

export interface ProductCardProps {
  product: Product;
  onSelect?: (productId: ProductId) => void;
}

export interface ProductGridProps {
  products: ReadonlyArray<Product>;
  isLoading?: boolean;
  onSelect?: (productId: ProductId) => void;
}
