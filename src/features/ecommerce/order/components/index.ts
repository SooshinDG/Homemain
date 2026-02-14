import type { Order, OrderId } from "../types";

export interface OrderListProps {
  orders: ReadonlyArray<Order>;
  isLoading?: boolean;
  onSelectOrder?: (orderId: OrderId) => void;
}

export interface OrderDetailProps {
  order: Order;
}
