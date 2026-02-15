import { useCartStore } from "./store";
import type { AddToCartProduct, CartItem } from "./types";

export const useCartItems = (): CartItem[] =>
  useCartStore((state) => state.items);

export const useCartTotalPrice = (): number =>
  useCartStore((state) => state.totalPrice);

export const useCartTotalItems = (): number =>
  useCartStore((state) => state.totalItems);

export const useAddToCart = (): ((product: AddToCartProduct) => void) =>
  useCartStore((state) => state.addToCart);

export const useRemoveFromCart = (): ((productId: string) => void) =>
  useCartStore((state) => state.removeFromCart);

export const useIncreaseQuantity = (): ((productId: string) => void) =>
  useCartStore((state) => state.increaseQuantity);

export const useDecreaseQuantity = (): ((productId: string) => void) =>
  useCartStore((state) => state.decreaseQuantity);

export const useClearCart = (): (() => void) =>
  useCartStore((state) => state.clearCart);
