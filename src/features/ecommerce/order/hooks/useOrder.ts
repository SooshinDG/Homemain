import { useCallback, useEffect, useMemo, useState } from "react";

import { mockOrderRepository } from "../mock";
import { type Order, type OrderRepository, type OrderStatus } from "../types";

export interface UseOrderOptions {
  repository?: OrderRepository;
  initialSelectedOrderId?: string | null;
}

export interface UseOrderResult {
  orders: Order[];
  selectedOrder: Order | null;
  selectedOrderId: string | null;
  isLoading: boolean;
  error: string | null;
  selectOrder: (orderId: string | null) => void;
  refreshOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return "Failed to load orders.";
};

export const useOrder = (options: UseOrderOptions = {}): UseOrderResult => {
  const repository = options.repository ?? mockOrderRepository;
  const initialSelectedOrderId = options.initialSelectedOrderId ?? null;

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(initialSelectedOrderId);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshOrders = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const nextOrders = await repository.listOrders();
      const validOrderIds = new Set(nextOrders.map((entry) => entry.id));

      setOrders(nextOrders);
      setSelectedOrderId((currentSelectedOrderId) => {
        if (currentSelectedOrderId && validOrderIds.has(currentSelectedOrderId)) {
          return currentSelectedOrderId;
        }

        if (initialSelectedOrderId && validOrderIds.has(initialSelectedOrderId)) {
          return initialSelectedOrderId;
        }

        return nextOrders[0]?.id ?? null;
      });
    } catch (unknownError) {
      setError(toErrorMessage(unknownError));
    } finally {
      setIsLoading(false);
    }
  }, [initialSelectedOrderId, repository]);

  useEffect(() => {
    void refreshOrders();
  }, [refreshOrders]);

  const selectedOrder = useMemo<Order | null>(() => {
    if (!selectedOrderId) {
      return null;
    }

    return orders.find((entry) => entry.id === selectedOrderId) ?? null;
  }, [orders, selectedOrderId]);

  const selectOrder = useCallback((orderId: string | null): void => {
    setSelectedOrderId(orderId);
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus): void => {
    setOrders((currentOrders) =>
      currentOrders.map((order) => {
        if (order.id !== orderId) {
          return order;
        }

        // Local update for now; can be replaced with repository persistence.
        return {
          ...order,
          status,
        };
      }),
    );
  }, []);

  return {
    orders,
    selectedOrder,
    selectedOrderId,
    isLoading,
    error,
    selectOrder,
    refreshOrders,
    updateOrderStatus,
  };
};
