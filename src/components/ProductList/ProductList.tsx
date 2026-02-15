import type { CSSProperties, ReactNode } from "react";

import type { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard";
import { toProductCardProps } from "./productList.mapper";

export interface ProductListProps {
  products: ReadonlyArray<Product>;
  columns?: number;
  locale?: string;
  className?: string;
  emptyState?: ReactNode;
}

const listStyle: CSSProperties = {
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "grid",
  gap: "1rem",
};

const listItemStyle: CSSProperties = {
  minWidth: 0,
};

export function ProductList({
  products,
  columns = 4,
  locale,
  className,
  emptyState = null,
}: ProductListProps) {
  if (products.length === 0) {
    return <>{emptyState}</>;
  }

  const productCards = products.map((product) => toProductCardProps(product, locale));

  return (
    <ul
      className={className}
      style={{ ...listStyle, gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {productCards.map((productCard) => (
        <li key={productCard.id} style={listItemStyle}>
          <ProductCard {...productCard} />
        </li>
      ))}
    </ul>
  );
}
