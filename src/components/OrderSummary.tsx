import { useMemo } from "react";

import { useCartStore } from "../store/cartStore";

import "./OrderSummary.css";

export interface OrderSummaryProps {
  currency?: string;
  paymentButtonLabel?: string;
  onPaymentClick?: () => void;
  className?: string;
}

function getCurrencyFormatter(currency: string): Intl.NumberFormat {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    });
  } catch {
    return new Intl.NumberFormat(undefined, {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}

export function OrderSummary({
  currency = "USD",
  paymentButtonLabel = "Proceed to Payment",
  onPaymentClick,
  className = "",
}: OrderSummaryProps) {
  const items = useCartStore((state) => state.items);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const currencyFormatter = useMemo(
    () => getCurrencyFormatter(currency),
    [currency],
  );

  const formatPrice = (amount: number) => currencyFormatter.format(amount);

  return (
    <section className={`order-summary ${className}`.trim()} aria-label="Order summary">
      <header className="order-summary__header">
        <h2 className="order-summary__title">Order Summary</h2>
        <p className="order-summary__subtitle">{totalItems} item(s) in cart</p>
      </header>

      {items.length === 0 ? (
        <p className="order-summary__empty">Your cart is empty.</p>
      ) : (
        <ul className="order-summary__list">
          {items.map((item) => (
            <li className="order-summary__item" key={item.id}>
              <div className="order-summary__item-info">
                <p className="order-summary__item-name">{item.name}</p>
                <p className="order-summary__item-meta">
                  {formatPrice(item.price)} x {item.quantity}
                </p>
              </div>
              <p className="order-summary__item-total">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="order-summary__totals">
        <div className="order-summary__total-row">
          <span>Total items</span>
          <strong>{totalItems}</strong>
        </div>
        <div className="order-summary__total-row">
          <span>Total price</span>
          <strong>{formatPrice(totalPrice)}</strong>
        </div>
      </div>

      <div className="order-summary__payment">
        <button
          className="order-summary__payment-button"
          type="button"
          onClick={onPaymentClick}
          disabled={items.length === 0}
        >
          {paymentButtonLabel}
        </button>
        <p className="order-summary__payment-note">
          Payment flow placeholder: connect this button to checkout when ready.
        </p>
      </div>
    </section>
  );
}
