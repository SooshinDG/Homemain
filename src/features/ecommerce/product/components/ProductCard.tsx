import type { ReactNode } from "react";
import type { Product } from "../types";
import { useCartStore } from "../../cart/store";

export interface ProductCardProps {
  product: Product;
  actionSlot?: ReactNode;
  locale?: string;
  onAddToCart?: (product: Product) => void;
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

export function ProductCard({
  product,
  actionSlot,
  locale,
  onAddToCart,
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      productId: String(product.id),
      name: product.name,
      price: product.price,
      image: product.imageUrl,
    });
    onAddToCart?.(product);
  };

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        {/* Keeping img here avoids coupling this shared feature module to Next Image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <button
              type="button"
              onClick={handleAddToCart}
              className="h-10 w-full rounded-md bg-slate-900 px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
export default ProductCard;
