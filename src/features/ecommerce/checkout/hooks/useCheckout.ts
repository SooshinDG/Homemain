import { useCallback, useMemo, useState } from "react";

import type {
  CheckoutFormValues,
  CheckoutStatus,
  Order,
  OrderTotals,
  UseCheckoutConfig,
  UseCheckoutResult,
} from "../types";

const toMoney = (value: number): number => Math.round(value * 100) / 100;

const buildTotals = (
  subtotal: number,
  shippingCost: number,
  taxRate: number,
): OrderTotals => {
  const shipping = toMoney(shippingCost);
  const tax = toMoney(subtotal * taxRate);
  const grandTotal = toMoney(subtotal + shipping + tax);

  return {
    subtotal: toMoney(subtotal),
    shipping,
    tax,
    grandTotal,
  };
};

const defaultIdGenerator = (): string =>
  `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const defaultNow = (): Date => new Date();

export const useCheckout = ({
  useCartStore,
  orderRepository,
  shippingCost = 0,
  taxRate = 0,
  idGenerator = defaultIdGenerator,
  now = defaultNow,
}: UseCheckoutConfig): UseCheckoutResult => {
  const items = useCartStore((state) => state.items);
  const currency = useCartStore((state) => state.currency);
  const clearCart = useCartStore((state) => state.clearCart);

  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const subtotal = useMemo(
    () =>
      items.reduce<number>(
        (runningTotal, item) => runningTotal + item.price * item.quantity,
        0,
      ),
    [items],
  );

  const totals = useMemo<OrderTotals>(
    () => buildTotals(subtotal, shippingCost, taxRate),
    [shippingCost, subtotal, taxRate],
  );

  const submitOrder = useCallback(
    async (values: CheckoutFormValues): Promise<Order | null> => {
      if (items.length === 0) {
        setStatus("error");
        setErrorMessage("Cannot place an order with an empty cart.");
        return null;
      }

      setStatus("submitting");
      setErrorMessage(null);

      try {
        const newOrder = await orderRepository.createOrder({
          id: idGenerator(),
          createdAt: now().toISOString(),
          customer: values.customer,
          shippingAddress: values.shippingAddress,
          notes: values.notes,
          items,
          currency,
          totals,
        });

        setLatestOrder(newOrder);
        setStatus("success");
        clearCart();
        return newOrder;
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "We could not create your order. Please try again.";

        setStatus("error");
        setErrorMessage(message);
        return null;
      }
    },
    [clearCart, currency, idGenerator, items, now, orderRepository, totals],
  );

  const resetCheckout = useCallback((): void => {
    setStatus("idle");
    setLatestOrder(null);
    setErrorMessage(null);
  }, []);

  return {
    items,
    currency,
    totals,
    status,
    latestOrder,
    errorMessage,
    submitOrder,
    resetCheckout,
  };
};
