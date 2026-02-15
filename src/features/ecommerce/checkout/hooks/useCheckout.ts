"use client";

import { useCallback, useMemo } from "react";
import { useCartStore } from "@/features/ecommerce/cart/store";
import { useCheckoutStore } from "../store";
import type {
  CheckoutFormValues,
  CheckoutOrder,
  OrderTotals,
  UseCheckoutConfig,
  UseCheckoutResult,
} from "../types";

const toMoney = (value: number): number => Math.round(value * 100) / 100;

const buildTotals = (subtotal: number, shippingCost: number, taxRate: number): OrderTotals => {
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

const defaultIdGenerator = (): string => `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const defaultNow = (): Date => new Date();

export const useCheckout = ({
  shippingCost = 6,
  taxRate = 0.08,
  idGenerator = defaultIdGenerator,
  now = defaultNow,
}: UseCheckoutConfig = {}): UseCheckoutResult => {
  const items = useCartStore((state) => state.items);
  const currency = useCartStore((state) => state.currency);
  const clearCart = useCartStore((state) => state.clearCart);

  const status = useCheckoutStore((state) => state.status);
  const latestOrder = useCheckoutStore((state) => state.latestOrder);
  const errorMessage = useCheckoutStore((state) => state.errorMessage);
  const setSubmitting = useCheckoutStore((state) => state.setSubmitting);
  const setSuccess = useCheckoutStore((state) => state.setSuccess);
  const setError = useCheckoutStore((state) => state.setError);
  const reset = useCheckoutStore((state) => state.reset);

  const subtotal = useMemo(() => {
    return items.reduce<number>((runningTotal, item) => runningTotal + item.price * item.quantity, 0);
  }, [items]);

  const totals = useMemo<OrderTotals>(() => {
    return buildTotals(subtotal, shippingCost, taxRate);
  }, [shippingCost, subtotal, taxRate]);

  const submitOrder = useCallback(
    async (values: CheckoutFormValues): Promise<CheckoutOrder | null> => {
      if (items.length === 0) {
        setError("Cannot place an order with an empty cart.");
        return null;
      }

      setSubmitting();

      try {
        const order: CheckoutOrder = {
          id: idGenerator(),
          createdAt: now().toISOString(),
          customer: values.customer,
          shippingAddress: values.shippingAddress,
          notes: values.notes,
          items: items.map((item) => ({ ...item })),
          currency,
          totals,
          status: "paid",
        };

        setSuccess(order);
        clearCart();
        return order;
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "We could not create your order. Please try again.";
        setError(message);
        return null;
      }
    },
    [clearCart, currency, idGenerator, items, now, setError, setSubmitting, setSuccess, totals],
  );

  const resetCheckout = useCallback((): void => {
    reset();
  }, [reset]);

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
