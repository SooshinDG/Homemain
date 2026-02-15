import { useId } from "react";
import type { CSSProperties } from "react";

export interface OrderSummaryItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  conditionLabel?: string;
}

export interface OrderSummaryProps {
  items: ReadonlyArray<OrderSummaryItem>;
  currency?: string;
  locale?: string;
  shippingFee?: number;
  serviceFee?: number;
  discount?: number;
  title?: string;
}

const cardStyle: CSSProperties = {
  border: "1px solid #e2e8f0",
  borderRadius: "1rem",
  backgroundColor: "#ffffff",
  padding: "1.25rem",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
};

const titleStyle: CSSProperties = {
  margin: "0 0 1rem",
  fontSize: "1.125rem",
  lineHeight: 1.2,
  fontWeight: 700,
  color: "#0f172a",
};

const itemListStyle: CSSProperties = {
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "grid",
  gap: "0.75rem",
};

const itemStyle: CSSProperties = {
  display: "grid",
  gap: "0.25rem",
};

const itemHeadStyle: CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "0.75rem",
};

const itemNameStyle: CSSProperties = {
  margin: 0,
  color: "#0f172a",
  fontSize: "0.9375rem",
  fontWeight: 600,
};

const itemMetaStyle: CSSProperties = {
  margin: 0,
  color: "#64748b",
  fontSize: "0.8125rem",
};

const dividerStyle: CSSProperties = {
  border: 0,
  borderTop: "1px solid #e2e8f0",
  margin: "1rem 0",
};

const totalsStyle: CSSProperties = {
  display: "grid",
  gap: "0.5rem",
};

const rowStyle: CSSProperties = {
  margin: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "0.875rem",
  color: "#334155",
};

const totalRowStyle: CSSProperties = {
  ...rowStyle,
  fontSize: "1rem",
  fontWeight: 700,
  color: "#0f172a",
};

const DEFAULT_CURRENCY = "USD";
const DEFAULT_LOCALE = "en-US";

function toMoneyLabel(value: number, currency = DEFAULT_CURRENCY, locale = DEFAULT_LOCALE): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export function OrderSummary({
  items,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
  shippingFee = 0,
  serviceFee = 0,
  discount = 0,
  title = "Order summary",
}: OrderSummaryProps) {
  const titleId = useId();
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const total = subtotal + shippingFee + serviceFee - discount;

  return (
    <aside aria-labelledby={titleId} style={cardStyle}>
      <h2 id={titleId} style={titleStyle}>
        {title}
      </h2>
      <ul style={itemListStyle}>
        {items.map((item) => (
          <li key={item.id} style={itemStyle}>
            <div style={itemHeadStyle}>
              <p style={itemNameStyle}>{item.name}</p>
              <p style={itemNameStyle}>{toMoneyLabel(item.unitPrice * item.quantity, currency, locale)}</p>
            </div>
            <p style={itemMetaStyle}>
              Qty {item.quantity}
              {item.conditionLabel ? ` · ${item.conditionLabel}` : ""}
            </p>
          </li>
        ))}
      </ul>

      <hr style={dividerStyle} />

      <div style={totalsStyle}>
        <p style={rowStyle}>
          <span>Subtotal</span>
          <span>{toMoneyLabel(subtotal, currency, locale)}</span>
        </p>
        <p style={rowStyle}>
          <span>Shipping</span>
          <span>{toMoneyLabel(shippingFee, currency, locale)}</span>
        </p>
        <p style={rowStyle}>
          <span>Service fee</span>
          <span>{toMoneyLabel(serviceFee, currency, locale)}</span>
        </p>
        {discount > 0 ? (
          <p style={rowStyle}>
            <span>Discount</span>
            <span>-{toMoneyLabel(discount, currency, locale)}</span>
          </p>
        ) : null}
        <hr style={dividerStyle} />
        <p style={totalRowStyle}>
          <span>Total</span>
          <span>{toMoneyLabel(total, currency, locale)}</span>
        </p>
      </div>
    </aside>
  );
}
