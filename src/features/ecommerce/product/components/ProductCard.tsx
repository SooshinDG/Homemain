import type { ReactNode } from "react";
import type { Product } from "../types";

export interface ProductCardProps {
  product: Product;
  actionSlot?: ReactNode;
  locale?: string;
}

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

export function ProductCard({ product, actionSlot, locale }: ProductCardProps) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {product.category}
        </p>
        <h3 id={`product-${product.id}`} className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-5 text-slate-600">{product.description}</p>
        <p className="mt-3 text-base font-bold text-slate-900">
          {formatPrice(product.price, product.currency, locale)}
        </p>
        <div className="mt-4 min-h-10">
          {actionSlot ?? (
            <div
              aria-hidden="true"
              className="h-10 w-full rounded-md border border-dashed border-slate-300 bg-slate-50"
            />
          )}
        </div>
      </div>
    </article>
  );
}
export default ProductCard;
