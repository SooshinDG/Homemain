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
    return (
      <section className={className}>
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          {emptyMessage}
        </p>
      </section>
    );
  }

  return (
    <section className={["rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", className].join(" ")}>
      <h2 className="text-base font-semibold text-slate-900">Order Summary</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const lineTotal = item.price * item.quantity;

          return (
            <li key={item.productId} className="border-b border-slate-100 pb-3 last:border-none last:pb-0">
              <div className="flex items-center justify-between gap-2">
                <strong className="text-sm text-slate-900">{item.name}</strong>
                <span className="text-sm font-medium text-slate-900">
                  {formatMoney(lineTotal, currency)}
                </span>
              </div>
              <div className="text-sm text-slate-600">
                {item.quantity} x {formatMoney(item.price, currency)} ={" "}
                {formatMoney(lineTotal, currency)}
              </div>
            </li>
          );
        })}
      </ul>
      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt>Subtotal</dt>
          <dd>{formatMoney(totals.subtotal, currency)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Shipping</dt>
          <dd>{formatMoney(totals.shipping, currency)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Tax</dt>
          <dd>{formatMoney(totals.tax, currency)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base">
          <dt>Total</dt>
          <dd>
            <strong>{formatMoney(totals.grandTotal, currency)}</strong>
          </dd>
        </div>
      </dl>
    </section>
  );
};
