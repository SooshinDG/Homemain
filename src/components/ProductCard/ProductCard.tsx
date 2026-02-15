import type { CSSProperties } from "react";

export interface ProductCardProps {
  id: string;
  name: string;
  priceLabel: string;
  description?: string;
  imageUrl?: string;
}

const cardStyle: CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: "0.75rem",
  overflow: "hidden",
  backgroundColor: "#ffffff",
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
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "0.875rem 1rem 1rem",
  height: "100%",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  fontWeight: 600,
  color: "#111827",
};

const priceStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#111827",
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.875rem",
  color: "#4b5563",
  lineHeight: 1.5,
};

export function ProductCard({
  id,
  name,
  priceLabel,
  description,
  imageUrl,
}: ProductCardProps) {
  return (
    <article aria-labelledby={`product-${id}`} style={cardStyle}>
      {imageUrl ? (
        // This package-level component intentionally remains framework-agnostic.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={name} loading="lazy" style={imageStyle} />
      ) : null}
      <div style={bodyStyle}>
        <h3 id={`product-${id}`} style={titleStyle}>
          {name}
        </h3>
        <p style={priceStyle}>{priceLabel}</p>
        {description ? <p style={descriptionStyle}>{description}</p> : null}
      </div>
    </article>
  );
}
