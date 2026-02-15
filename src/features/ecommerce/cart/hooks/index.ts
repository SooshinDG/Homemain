import type {
  Cart,
  CartId,
  CartItemId,
  CartOwnerId,
  CartPatchInput,
} from "../types";

export interface UseCartOptions {
  cartId?: CartId;
  ownerId?: CartOwnerId;
}

export interface UseCartResult {
  cart: Cart | null;
  isLoading: boolean;
  error: Error | null;
}

export type UseCart = (options?: UseCartOptions) => UseCartResult;

export interface UseCartMutationsResult {
  addOrUpdateItem: (input: CartPatchInput) => Promise<void>;
  removeItem: (itemId: CartItemId) => Promise<void>;
  isMutating: boolean;
  error: Error | null;
}

export type UseCartMutations = (cartId: CartId) => UseCartMutationsResult;
