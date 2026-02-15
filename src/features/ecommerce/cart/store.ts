import { create } from "zustand";

import type { AddToCartProduct, CartItem, CartStore } from "./types";

const INITIAL_STATE: Pick<CartStore, "items" | "totalItems" | "totalPrice"> = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const toSafeQuantity = (quantity?: number): number => {
  if (!Number.isFinite(quantity) || quantity === undefined) {
    return 1;
  }

  return quantity > 0 ? Math.floor(quantity) : 1;
};

const buildCartItem = (product: AddToCartProduct): CartItem => ({
  productId: product.productId,
  name: product.name,
  price: product.price,
  image: product.image,
  quantity: toSafeQuantity(product.quantity),
});

const deriveTotals = (
  items: CartItem[],
): Pick<CartStore, "totalItems" | "totalPrice"> => {
  return items.reduce(
    (accumulator, item) => {
      accumulator.totalItems += item.quantity;
      accumulator.totalPrice += item.price * item.quantity;
      return accumulator;
    },
    { totalItems: 0, totalPrice: 0 },
  );
};

export const useCartStore = create<CartStore>()((set) => ({
  ...INITIAL_STATE,

  addToCart: (product) => {
    set((state) => {
      const quantityToAdd = toSafeQuantity(product.quantity);
      const existingItem = state.items.find(
        (item) => item.productId === product.productId,
      );

      const items = existingItem
        ? state.items.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item,
          )
        : [...state.items, buildCartItem({ ...product, quantity: quantityToAdd })];

      return {
        items,
        ...deriveTotals(items),
      };
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const items = state.items.filter((item) => item.productId !== productId);

      return {
        items,
        ...deriveTotals(items),
      };
    });
  },

  increaseQuantity: (productId) => {
    set((state) => {
      const items = state.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      return {
        items,
        ...deriveTotals(items),
      };
    });
  },

  decreaseQuantity: (productId) => {
    set((state) => {
      const items = state.items
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);

      return {
        items,
        ...deriveTotals(items),
      };
    });
  },

  clearCart: () => {
    set({
      ...INITIAL_STATE,
    });
  },
}));
