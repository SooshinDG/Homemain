import type { CSSProperties, ReactNode } from "react";

import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

export interface ProductListProps {
  products: ReadonlyArray<Product>;
  className?: string;
  locale?: string;
  emptyState?: ReactNode;
}

const listStyle: CSSProperties = {
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1rem",
};

const itemStyle: CSSProperties = {
  minWidth: 0,
};

export function ProductList({
  products,
  className,
  locale,
  emptyState = <p>No products available right now.</p>,
}: ProductListProps) {
  if (products.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <ul className={className} style={listStyle}>
      {products.map((product) => (
        <li key={product.id} style={itemStyle}>
          <ProductCard product={product} locale={locale} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
