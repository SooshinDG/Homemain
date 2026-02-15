import { type KeyboardEvent } from "react";

import { type Order } from "../types";
import { OrderStatusBadge } from "./OrderStatusBadge";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export interface OrderTableProps {
  orders: readonly Order[];
  selectedOrderId?: string | null;
  onRowClick?: (orderId: string) => void;
  getOrderDetailPath?: (orderId: string) => string;
}

const defaultOrderPath = (orderId: string): string => {
  return `/admin/orders/${orderId}`;
};

export const OrderTable = ({
  orders,
  selectedOrderId = null,
  onRowClick,
  getOrderDetailPath = defaultOrderPath,
}: OrderTableProps): JSX.Element => {
  if (orders.length === 0) {
    return <p className="admin-orders-empty-state">No orders found.</p>;
  }

  const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, orderId: string): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onRowClick?.(orderId);
    }
  };

  return (
    <div className="admin-orders-table-wrap" role="region" aria-label="Orders table">
      <table className="admin-orders-table">
        <thead>
          <tr>
            <th scope="col">Order</th>
            <th scope="col">Customer</th>
            <th scope="col">Status</th>
            <th scope="col">Total</th>
            <th scope="col">Placed</th>
            <th scope="col" aria-label="Open order detail">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const detailPath = getOrderDetailPath(order.id);
            const isSelected = selectedOrderId === order.id;

            return (
              <tr
                key={order.id}
                className="admin-orders-table-row"
                data-selected={isSelected}
                role={onRowClick ? "button" : undefined}
                tabIndex={onRowClick ? 0 : -1}
                onClick={() => {
                  onRowClick?.(order.id);
                }}
                onKeyDown={(event) => {
                  handleRowKeyDown(event, order.id);
                }}
              >
                <td>
                  <span className="admin-orders-order-id">{order.id}</span>
                </td>
                <td>
                  <span className="admin-orders-customer-name">{order.customerName}</span>
                  <span className="admin-orders-customer-email">{order.customerEmail}</span>
                </td>
                <td>
                  <OrderStatusBadge status={order.status} />
                </td>
                <td>{currencyFormatter.format(order.totalPrice)}</td>
                <td>{dateFormatter.format(order.createdAt)}</td>
                <td>
                  <a
                    className="admin-orders-link"
                    href={detailPath}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    Open
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
