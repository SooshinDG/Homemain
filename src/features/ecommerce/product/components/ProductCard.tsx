import type { CSSProperties } from "react";

import type { Product } from "../types";

export interface ProductCardProps {
  product: Product;
  locale?: string;
}

const cardStyle: CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  backgroundColor: "#ffffff",
  overflow: "hidden",
  boxShadow: "0 6px 18px rgba(17, 24, 39, 0.08)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const imageStyle: CSSProperties = {
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
  backgroundColor: "#f3f4f6",
};

const bodyStyle: CSSProperties = {
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  height: "100%",
};

const categoryStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "#475569",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const nameStyle: CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  fontWeight: 700,
  color: "#0f172a",
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.9rem",
  lineHeight: 1.5,
  color: "#334155",
  flexGrow: 1,
};

const priceStyle: CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  fontWeight: 700,
  color: "#111827",
};

function formatPrice(price: number, currency: string, locale?: string): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    return `${currency} ${price.toFixed(2)}`;
  }
}

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <article aria-labelledby={`product-${product.id}`} style={cardStyle}>
      <img src={product.imageUrl} alt={product.name} loading="lazy" style={imageStyle} />
      <div style={bodyStyle}>
        <p style={categoryStyle}>{product.category}</p>
        <h3 id={`product-${product.id}`} style={nameStyle}>
          {product.name}
        </h3>
        <p style={descriptionStyle}>{product.description}</p>
        <p style={priceStyle}>{formatPrice(product.price, product.currency, locale)}</p>
      </div>
    </article>
  );
}

export default ProductCard;
