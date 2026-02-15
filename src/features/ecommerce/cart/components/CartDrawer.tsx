import type { CartItem } from "../types";

export interface CartDrawerProps {
  open: boolean;
  items: ReadonlyArray<CartItem>;
  totalPrice: number;
  onClose: () => void;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const formatPrice = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export function CartDrawer({
  open,
  items,
  totalPrice,
  onClose,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/40"
        aria-label="Close cart drawer"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h3 className="text-base font-semibold text-slate-900">Cart</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
          >
            Close
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              Cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <article key={item.productId} className="rounded-lg border border-slate-200 p-3">
                <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                <p className="mt-1 text-sm text-slate-600">{formatPrice(item.price)}</p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-md border border-slate-300">
                    <button
                      type="button"
                      onClick={() => {
                        onDecreaseQuantity(item.productId);
                      }}
                      className="px-2 py-1 text-sm"
                    >
                      -
                    </button>
                    <span className="min-w-10 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => {
                        onIncreaseQuantity(item.productId);
                      }}
                      className="px-2 py-1 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-rose-600"
                    onClick={() => {
                      onRemoveItem(item.productId);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <footer className="space-y-3 border-t border-slate-200 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-600">Total</span>
            <span className="text-base font-semibold text-slate-900">{formatPrice(totalPrice)}</span>
          </div>
          <button
            type="button"
            onClick={onClearCart}
            disabled={items.length === 0}
            className="w-full rounded-md border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear cart
          </button>
        </footer>
      </aside>
    </div>
  );
}
