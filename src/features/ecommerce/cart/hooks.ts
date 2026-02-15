import { useCartStore } from "./store";
import type { AddToCartProduct, CartItem } from "./types";

export const useCartItems = (): CartItem[] =>
  useCartStore((state) => state.items);

export const useCartTotalPrice = (): number =>
  useCartStore((state) => state.totalPrice);

export const useCartTotalItems = (): number =>
  useCartStore((state) => state.totalItems);

export const useCartCurrency = (): string =>
  useCartStore((state) => state.currency);

export const useIsCartDrawerOpen = (): boolean =>
  useCartStore((state) => state.isDrawerOpen);

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

export const useSetCartCurrency = (): ((currency: string) => void) =>
  useCartStore((state) => state.setCurrency);

export const useOpenCartDrawer = (): (() => void) =>
  useCartStore((state) => state.openCartDrawer);

export const useCloseCartDrawer = (): (() => void) =>
  useCartStore((state) => state.closeCartDrawer);

export const useToggleCartDrawer = (): (() => void) =>
  useCartStore((state) => state.toggleCartDrawer);
