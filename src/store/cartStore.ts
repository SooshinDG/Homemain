import { create } from "zustand";

export type CartItemId = string | number;

export interface CartItem {
  id: CartItemId;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: CartItemId) => void;
  updateQuantity: (id: CartItemId, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) =>
    set((state) => {
      const quantityToAdd = item.quantity ?? 1;
      const existingIndex = state.items.findIndex(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingIndex === -1) {
        return {
          items: [...state.items, { ...item, quantity: quantityToAdd }],
        };
      }

      const nextItems = [...state.items];
      nextItems[existingIndex] = {
        ...nextItems[existingIndex],
        quantity: nextItems[existingIndex].quantity + quantityToAdd,
      };

      return { items: nextItems };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.id !== id) };
      }

      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      };
    }),
  clearCart: () => set({ items: [] }),
}));
