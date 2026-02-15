"use client";

import { useRouter } from "next/navigation";
import { CheckoutForm, OrderSummary, useCheckout } from "@/features/ecommerce/checkout";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, currency, totals, status, errorMessage, submitOrder } = useCheckout();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
        <p className="text-sm text-muted-foreground">
          Complete your order with globally shared cart and checkout state.
        </p>
      </div>

      {errorMessage ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <CheckoutForm
          isSubmitting={status === "submitting"}
          createOrder={async (values) => {
            const order = await submitOrder(values);

            if (!order) {
              return;
            }

            router.push(`/orders/success?orderId=${encodeURIComponent(order.id)}`);
          }}
        />

        <OrderSummary items={items} currency={currency} totals={totals} />
      </div>
    </section>
  );
}
