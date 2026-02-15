import type {
  CurrencyCode,
  ISODateString,
  PaginationInput,
  SupabaseTimestampColumns,
} from "../types";

export type CartId = string;
export type CartItemId = string;
export type CartOwnerId = string;

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;

  // Optional fields to support persistence-oriented cart contracts.
  id?: CartItemId;
  cartId?: CartId;
  sku?: string;
  unitPriceCents?: number;
  currencyCode?: CurrencyCode;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
}

export interface Cart {
  id: CartId;
  ownerId: CartOwnerId;
  currencyCode: CurrencyCode;
  items: ReadonlyArray<CartItem>;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
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

export type AddToCartProduct = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

export interface CartActions {
  addToCart: (product: AddToCartProduct) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

export type CartStore = CartState & CartActions;
