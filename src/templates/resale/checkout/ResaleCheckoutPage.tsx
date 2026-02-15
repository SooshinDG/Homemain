import type { CSSProperties, FormEvent } from "react";

import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";
import type { OrderSummaryItem, OrderSummaryProps } from "./OrderSummary";

export interface ResaleCheckoutPageProps extends Omit<OrderSummaryProps, "title"> {
  title?: string;
  subtitle?: string;
  className?: string;
  formTitle?: string;
  summaryTitle?: string;
  submitLabel?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const pageStyle: CSSProperties = {
  maxWidth: "72rem",
  margin: "0 auto",
  padding: "2rem 1rem",
  backgroundColor: "#f8fafc",
};

const headerStyle: CSSProperties = {
  marginBottom: "1.25rem",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "1.875rem",
  lineHeight: 1.1,
  fontWeight: 800,
  color: "#0f172a",
};

const subtitleStyle: CSSProperties = {
  margin: "0.5rem 0 0",
  color: "#475569",
  fontSize: "0.9375rem",
};

const summaryWrapStyle: CSSProperties = {
  width: "100%",
};

const responsiveStyles = `
.resale-checkout-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(290px, 360px);
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 920px) {
  .resale-checkout-layout {
    grid-template-columns: minmax(0, 1fr);
  }
}
`;

const DEFAULT_ITEMS: ReadonlyArray<OrderSummaryItem> = [
  {
    id: "1",
    name: "Vintage varsity jacket",
    conditionLabel: "Excellent",
    quantity: 1,
    unitPrice: 118,
  },
  {
    id: "2",
    name: "Classic canvas tote",
    conditionLabel: "Good",
    quantity: 1,
    unitPrice: 38,
  },
];

export function ResaleCheckoutPage({
  title = "Checkout",
  subtitle = "Complete your order securely and review your resale items before payment.",
  className,
  formTitle,
  summaryTitle,
  submitLabel,
  onSubmit,
  items = DEFAULT_ITEMS,
  shippingFee = 8,
  serviceFee = 4,
  discount = 0,
  currency = "USD",
  locale = "en-US",
}: ResaleCheckoutPageProps) {
  return (
    <section className={className} style={pageStyle}>
      <style>{responsiveStyles}</style>
      <header style={headerStyle}>
        <h1 style={titleStyle}>{title}</h1>
        <p style={subtitleStyle}>{subtitle}</p>
      </header>

      <div className="resale-checkout-layout">
        <CheckoutForm title={formTitle} submitLabel={submitLabel} onSubmit={onSubmit} />
        <div style={summaryWrapStyle}>
          <OrderSummary
            title={summaryTitle}
            items={items}
            shippingFee={shippingFee}
            serviceFee={serviceFee}
            discount={discount}
            currency={currency}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}
