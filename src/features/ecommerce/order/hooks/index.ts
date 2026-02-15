import type { Order, OrderId, OrderQuery } from "../types";

export interface UseOrderListOptions {
  query?: OrderQuery;
}

export interface UseOrderListResult {
  orders: ReadonlyArray<Order>;
  isLoading: boolean;
  error: Error | null;
}

export type UseOrderList = (
  options?: UseOrderListOptions,
) => UseOrderListResult;

export interface UseOrderDetailsOptions {
  orderId: OrderId;
}

export interface UseOrderDetailsResult {
  order: Order | null;
  isLoading: boolean;
  error: Error | null;
}

export type UseOrderDetails = (
  options: UseOrderDetailsOptions,
) => UseOrderDetailsResult;
