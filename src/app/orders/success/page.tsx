"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useClearCart } from "@/features/ecommerce/cart/hooks";
import { useCheckoutStore } from "@/features/ecommerce/checkout/store";

const money = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const clearCart = useClearCart();
  const latestOrder = useCheckoutStore((state) => state.latestOrder);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const orderId = searchParams.get("orderId") ?? latestOrder?.id ?? "N/A";
  const createdAt = latestOrder?.createdAt
    ? new Date(latestOrder.createdAt).toLocaleString()
    : new Date().toLocaleString();
  const currency = latestOrder?.currency ?? "USD";

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
        Order Confirmed
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Thank you for your purchase!</h1>
      <p className="mt-2 text-sm text-slate-600">
        Your payment was successful and your order is being prepared.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Order number</p>
          <p className="mt-1 text-sm font-semibold">{orderId}</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Order date</p>
          <p className="mt-1 text-sm font-semibold">{createdAt}</p>
        </div>
      </div>

      {latestOrder ? (
        <>
          <h2 className="mt-6 text-lg font-semibold">Order summary</h2>
          <ul className="mt-3 space-y-2">
            {latestOrder.items.map((item) => (
              <li
                key={item.productId}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <strong>{money(item.price * item.quantity, currency)}</strong>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt>Subtotal</dt>
              <dd>{money(latestOrder.totals.subtotal, currency)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Shipping</dt>
              <dd>{money(latestOrder.totals.shipping, currency)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Tax</dt>
              <dd>{money(latestOrder.totals.tax, currency)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>{money(latestOrder.totals.grandTotal, currency)}</dd>
            </div>
          </dl>
        </>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Continue shopping
        </Link>
        <Link
          href="/orders"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          View orders
        </Link>
      </div>
    </section>
  );
}
