import type {
  CurrencyCode,
  PaginationInput,
  SupabaseTimestampColumns,
  Timestamped,
} from "../types";

export type CartId = string;
export type CartItemId = string;
export type CartOwnerId = string;

export interface CartItem extends Timestamped {
  id: CartItemId;
  cartId: CartId;
  productId: string;
  sku: string;
  quantity: number;
  unitPriceCents: number;
  currencyCode: CurrencyCode;
}

export interface Cart extends Timestamped {
  id: CartId;
  ownerId: CartOwnerId;
  currencyCode: CurrencyCode;
  items: ReadonlyArray<CartItem>;
}

export interface CartPatchInput {
  productId: string;
  quantity: number;
}

export interface CartQuery extends PaginationInput {
  ownerId?: CartOwnerId;
}

export interface CartRepository {
  getById(id: CartId): Promise<Cart | null>;
  getByOwnerId(ownerId: CartOwnerId): Promise<Cart | null>;
  upsertItem(cartId: CartId, input: CartPatchInput): Promise<Cart>;
  removeItem(cartId: CartId, itemId: CartItemId): Promise<Cart>;
}

export interface CartSupabaseRow extends SupabaseTimestampColumns {
  id: string;
  owner_id: string;
  currency_code: string;
}

export interface CartItemSupabaseRow extends SupabaseTimestampColumns {
  id: string;
  cart_id: string;
  product_id: string;
  sku: string;
  quantity: number;
  unit_price_cents: number;
  currency_code: string;
}
