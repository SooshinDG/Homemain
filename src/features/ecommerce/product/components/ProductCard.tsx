import type { ReactNode } from "react";

import { useCartStore } from "../../cart/store";

export type Product = {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  currency: string;
  imageAlt?: string;
};

export type ProductCardProps = {
  product: Product;
  actionSlot?: ReactNode;
  onAddToCart?: (product: Product) => void;
};

const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(price);
};

export const ProductCard = ({
  product,
  actionSlot,
  onAddToCart,
}: ProductCardProps) => {
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
        <img
          src={product.imageUrl}
          alt={product.imageAlt ?? product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-sm font-semibold leading-6 text-slate-900 sm:text-base">
          {product.name}
        </h3>

        <p className="mt-2 text-base font-bold text-slate-900 sm:text-lg">
          {formatPrice(product.price, product.currency)}
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
};
