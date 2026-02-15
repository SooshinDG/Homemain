import { type Order, type OrderStatus } from "../types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  shipped: "Shipped",
  completed: "Completed",
};

export interface OrderTableProps {
  orders: readonly Order[];
  selectedOrderId?: string | null;
  onSelectOrder?: (orderId: string) => void;
}

export const OrderTable = ({
  orders,
  selectedOrderId = null,
  onSelectOrder,
}: OrderTableProps): JSX.Element => {
  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Total</th>
          <th>Created</th>
          <th aria-label="actions">Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          const isSelected = selectedOrderId === order.id;

          return (
            <tr key={order.id} data-selected={isSelected}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{statusLabels[order.status]}</td>
              <td>{currencyFormatter.format(order.totalPrice)}</td>
              <td>{dateFormatter.format(order.createdAt)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    onSelectOrder?.(order.id);
                  }}
                  disabled={typeof onSelectOrder !== "function"}
                  aria-current={isSelected}
                >
                  View
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
