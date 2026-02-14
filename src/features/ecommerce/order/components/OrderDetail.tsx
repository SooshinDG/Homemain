import { ORDER_STATUS_LABELS, type Order, type OrderStatus } from "../types";
import { OrderStatusBadge } from "./OrderStatusBadge";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short",
});

export interface OrderDetailProps {
  order: Order | null | undefined;
  currentStatus?: OrderStatus;
  onStatusChange?: (status: OrderStatus) => void;
}

const orderStatusOptions = Object.entries(ORDER_STATUS_LABELS) as [OrderStatus, string][];

export const OrderDetail = ({
  order,
  currentStatus,
  onStatusChange,
}: OrderDetailProps): JSX.Element => {
  if (!order) {
    return <p className="admin-orders-empty-state">Order not found.</p>;
  }

  const status = currentStatus ?? order.status;

  return (
    <section className="admin-order-detail" aria-label={`Order detail for ${order.id}`}>
      <header className="admin-order-detail-header">
        <div>
          <h2 className="admin-order-detail-title">Order {order.id}</h2>
          <p className="admin-order-detail-subtitle">Placed {dateFormatter.format(order.createdAt)}</p>
        </div>
        <div className="admin-order-detail-header-actions">
          <div className="admin-order-detail-status-control">
            <label htmlFor={`admin-order-status-${order.id}`}>Order status</label>
            <select
              id={`admin-order-status-${order.id}`}
              className="admin-order-detail-status-select"
              value={status}
              onChange={(event) => {
                onStatusChange?.(event.target.value as OrderStatus);
              }}
            >
              {orderStatusOptions.map(([statusValue, label]) => (
                <option key={statusValue} value={statusValue}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <OrderStatusBadge status={status} />
        </div>
      </header>

      <div className="admin-order-detail-grid">
        <article className="admin-order-detail-card">
          <h3>Customer</h3>
          <p>{order.customerName}</p>
          <p>{order.customerEmail}</p>
          <p>{order.customerPhone}</p>
          <p>{order.shippingAddress}</p>
        </article>

        <article className="admin-order-detail-card">
          <h3>Summary</h3>
          <dl className="admin-order-detail-summary">
            <div>
              <dt>Items</dt>
              <dd>{order.items.length}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{currencyFormatter.format(order.totalPrice)}</dd>
            </div>
          </dl>
        </article>
      </div>

      <article className="admin-order-detail-card">
        <h3>Items</h3>
        <div className="admin-orders-table-wrap" role="region" aria-label="Order item table">
          <table className="admin-orders-table admin-orders-table--compact">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Qty</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{currencyFormatter.format(item.unitPrice)}</td>
                  <td>{currencyFormatter.format(item.quantity * item.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};
