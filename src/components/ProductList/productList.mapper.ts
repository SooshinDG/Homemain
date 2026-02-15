import type { Product } from "../../types/Product";
import type { ProductCardProps } from "../ProductCard";

const DEFAULT_LOCALE = "en-US";

function toPriceLabel(price: number, currency: string, locale = DEFAULT_LOCALE): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    return `${currency} ${price.toFixed(2)}`;
  }
}

export function toProductCardProps(product: Product, locale?: string): ProductCardProps {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    priceLabel: toPriceLabel(product.price, product.currency, locale),
  };
}
