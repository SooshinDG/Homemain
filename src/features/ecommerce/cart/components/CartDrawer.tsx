import { ReactNode } from "react";

export type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  closeLabel?: string;
  className?: string;
  children?: ReactNode;
};

export function CartDrawer({
  open,
  onOpenChange,
  title = "Your cart",
  closeLabel = "Close cart drawer",
  className,
  children,
}: CartDrawerProps) {
  if (!open) {
    return null;
  }

  const drawerClassName = [
    "absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const drawerLabel = typeof title === "string" ? title : "Cart drawer";

  return (
    <div className="fixed inset-0 z-50" aria-label={drawerLabel} aria-modal="true" role="dialog">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
      />
      <aside className={drawerClassName}>
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            onClick={() => onOpenChange(false)}
          >
            Close
          </button>
        </div>
        <div className="h-[calc(100%-65px)] overflow-y-auto px-5 py-4">{children}</div>
      </aside>
    </div>
  );
}
