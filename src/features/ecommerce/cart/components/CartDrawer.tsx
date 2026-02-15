"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  useCartCurrency,
  useCartItems,
  useCartTotalPrice,
  useCloseCartDrawer,
  useDecreaseQuantity,
  useIncreaseQuantity,
  useIsCartDrawerOpen,
  useOpenCartDrawer,
  useRemoveFromCart,
} from "../hooks";
import { useCartStore } from "../store";

export type CartDrawerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  closeLabel?: string;
  className?: string;
  children?: ReactNode;
  checkoutHref?: string;
};

const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export function CartDrawer({
  open,
  onOpenChange,
  title = "Your cart",
  closeLabel = "Close cart drawer",
  className,
  children,
  checkoutHref = "/checkout",
}: CartDrawerProps) {
  const storeOpen = useIsCartDrawerOpen();
  const items = useCartItems();
  const totalPrice = useCartTotalPrice();
  const currency = useCartCurrency();
  const closeCartDrawer = useCloseCartDrawer();
  const openCartDrawer = useOpenCartDrawer();
  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useRemoveFromCart();
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();
  const totalItems = useCartStore((state) => state.totalItems);

  const isControlled = open !== undefined && onOpenChange !== undefined;
  const isOpen = isControlled ? open : storeOpen;
  const drawerLabel = typeof title === "string" ? title : "Cart drawer";

  const setOpen = (nextOpen: boolean): void => {
    if (isControlled && onOpenChange) {
      onOpenChange(nextOpen);
      return;
    }

    if (nextOpen) {
      openCartDrawer();
      return;
    }

    closeCartDrawer();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50" aria-label={drawerLabel} aria-modal="true" role="dialog">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />
      <aside
        className={[
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-500">{totalItems} items</p>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {children ? (
            children
          ) : items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-600">
              Your cart is empty. Add products to continue.
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.productId} className="rounded-xl border border-gray-200 bg-white p-3">
                  <div className="flex gap-3">
                    <div className="h-14 w-14 overflow-hidden rounded-md bg-gray-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatPrice(item.price, currency)} each
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-md border border-gray-300">
                          <button
                            type="button"
                            className="px-3 py-1 text-sm text-gray-700"
                            onClick={() => decreaseQuantity(item.productId)}
                          >
                            -
                          </button>
                          <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            className="px-3 py-1 text-sm text-gray-700"
                            onClick={() => increaseQuantity(item.productId)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-xs font-medium text-red-600"
                          onClick={() => removeFromCart(item.productId)}
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

        <footer className="space-y-3 border-t border-gray-200 px-5 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Total</span>
            <span className="font-semibold text-gray-900">{formatPrice(totalPrice, currency)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700"
              onClick={clearCart}
              disabled={items.length === 0}
            >
              Clear cart
            </button>
            <Link
              className="rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-medium text-white"
              href={checkoutHref}
              onClick={() => setOpen(false)}
            >
              Checkout
            </Link>
          </div>
        </footer>
      </aside>
    </div>
  );
}
