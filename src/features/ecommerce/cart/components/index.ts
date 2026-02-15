import type { Cart, CartItemId } from "../types";

export interface CartSummaryProps {
  cart: Cart;
  onCheckout?: (cartId: Cart["id"]) => void;
}

export interface CartLineItemsProps {
  cart: Cart;
  onRemoveItem?: (itemId: CartItemId) => void;
  onQuantityChange?: (itemId: CartItemId, quantity: number) => void;
}
