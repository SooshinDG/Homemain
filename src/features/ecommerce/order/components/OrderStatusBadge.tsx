import { ORDER_STATUS_LABELS, type OrderStatus } from "../types";

export interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps): JSX.Element => {
  return (
    <span className={`order-status-badge order-status-badge--${status}`}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
};
