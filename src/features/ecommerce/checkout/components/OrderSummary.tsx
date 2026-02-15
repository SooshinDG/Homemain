import type { CartItem, OrderTotals } from "../types";

export interface OrderSummaryProps {
  readonly items: ReadonlyArray<CartItem>;
  readonly currency: string;
  readonly totals: OrderTotals;
  readonly emptyMessage?: string;
  readonly className?: string;
}

const formatMoney = (value: number, currency: string): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
};

export const OrderSummary = ({
  items,
  currency,
  totals,
  emptyMessage = "Your cart is currently empty.",
  className,
}: OrderSummaryProps): JSX.Element => {
  if (items.length === 0) {
    return <section className={className}>{emptyMessage}</section>;
  }

  return (
    <section className={className}>
      <h2>Order Summary</h2>
      <ul>
        {items.map((item) => {
          const lineTotal = item.price * item.quantity;

          return (
            <li key={item.id}>
              <div>
                <strong>{item.title}</strong>
                {item.sku ? <small> (SKU: {item.sku})</small> : null}
              </div>
              <div>
                {item.quantity} x {formatMoney(item.price, currency)} ={" "}
                {formatMoney(lineTotal, currency)}
              </div>
            </li>
          );
        })}
      </ul>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatMoney(totals.subtotal, currency)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{formatMoney(totals.shipping, currency)}</dd>
        </div>
        <div>
          <dt>Tax</dt>
          <dd>{formatMoney(totals.tax, currency)}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>
            <strong>{formatMoney(totals.grandTotal, currency)}</strong>
          </dd>
        </div>
      </dl>
    </section>
  );
};
