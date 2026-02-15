import { useCallback, useEffect, useMemo, useState } from "react";

import { mockOrderRepository } from "../mock";
import { type Order, type OrderRepository } from "../types";

export interface UseOrdersOptions {
  repository?: OrderRepository;
}

export interface UseOrdersResult {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  refreshOrders: () => Promise<void>;
}

export interface UseOrderByIdOptions {
  orderId: string;
  repository?: OrderRepository;
}

export interface UseOrderByIdResult {
  order: Order | null;
  isLoading: boolean;
  error: string | null;
  refreshOrder: () => Promise<void>;
}

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return "Failed to load orders.";
};

export const useOrders = (options: UseOrdersOptions = {}): UseOrdersResult => {
  const repository = options.repository ?? mockOrderRepository;
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshOrders = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const nextOrders = await repository.listOrders();
      setOrders(nextOrders);
    } catch (unknownError) {
      setError(toErrorMessage(unknownError));
    } finally {
      setIsLoading(false);
    }
  }, [repository]);

  useEffect(() => {
    void refreshOrders();
  }, [refreshOrders]);

  return useMemo(
    () => ({
      orders,
      isLoading,
      error,
      refreshOrders,
    }),
    [error, isLoading, orders, refreshOrders],
  );
};

export const useOrderById = ({
  orderId,
  repository = mockOrderRepository,
}: UseOrderByIdOptions): UseOrderByIdResult => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshOrder = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const nextOrder = await repository.getOrderById(orderId);
      setOrder(nextOrder);
    } catch (unknownError) {
      setError(toErrorMessage(unknownError));
    } finally {
      setIsLoading(false);
    }
  }, [orderId, repository]);

  useEffect(() => {
    void refreshOrder();
  }, [refreshOrder]);

  return useMemo(
    () => ({
      order,
      isLoading,
      error,
      refreshOrder,
    }),
    [error, isLoading, order, refreshOrder],
  );
};
