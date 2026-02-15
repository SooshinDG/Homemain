"use client";

import { useMemo } from "react";
import { useCartStore } from "../store/useCartStore";

type CartDrawerProps = {
  title?: string;
  currency?: string;
};

const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);

export function CartDrawer({ title = "Your Cart", currency = "USD" }: CartDrawerProps) {
  const isOpen = useCartStore((state) => state.isOpen);
  const items = useCartStore((state) => state.items);
  const closeCart = useCartStore((state) => state.closeCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
        aria-label="Close cart"
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 sm:max-w-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            onClick={closeCart}
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
              Your cart is empty.
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
                >
                  <div className="flex items-start gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-md bg-slate-100" aria-hidden />
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900 sm:text-base">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {formatPrice(item.price, currency)}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-md border border-slate-300">
                          <button
                            type="button"
                            className="px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                            onClick={() => decreaseQuantity(item.id)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            -
                          </button>
                          <span className="min-w-10 px-2 text-center text-sm text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                            onClick={() => increaseQuantity(item.id)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="text-sm font-medium text-rose-600 hover:text-rose-700"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-slate-200 px-4 py-4 sm:px-6">
          <div className="mb-4 flex items-center justify-between text-sm sm:text-base">
            <span className="font-medium text-slate-700">Total</span>
            <span className="font-semibold text-slate-900">
              {formatPrice(totalPrice, currency)}
            </span>
          </div>

          <button
            type="button"
            className="w-full rounded-md border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={clearCart}
            disabled={items.length === 0}
          >
            Clear cart
          </button>
        </footer>
      </aside>
    </div>
  );
}
