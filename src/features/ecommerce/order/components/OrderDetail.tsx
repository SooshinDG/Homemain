import { type Order, type OrderStatus } from "../types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short",
});

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  shipped: "Shipped",
  completed: "Completed",
};

export interface OrderDetailProps {
  order: Order | null | undefined;
}

export const OrderDetail = ({ order }: OrderDetailProps): JSX.Element => {
  if (!order) {
    return <p>Select an order to view details.</p>;
  }

  return (
    <section aria-label={`Order detail for ${order.id}`}>
      <header>
        <h2>Order {order.id}</h2>
        <p>Status: {statusLabels[order.status]}</p>
        <p>Placed: {dateFormatter.format(order.createdAt)}</p>
      </header>

      <dl>
        <dt>Customer</dt>
        <dd>{order.customerName}</dd>
        <dt>Email</dt>
        <dd>{order.email}</dd>
        <dt>Phone</dt>
        <dd>{order.phone}</dd>
        <dt>Address</dt>
        <dd>{order.address}</dd>
      </dl>

      <h3>Items</h3>
      {order.items.length === 0 ? (
        <p>No items in this order.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{currencyFormatter.format(item.unitPrice)}</td>
                <td>{currencyFormatter.format(item.quantity * item.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p>
        <strong>Total:</strong> {currencyFormatter.format(order.totalPrice)}
      </p>
    </section>
  );
};
