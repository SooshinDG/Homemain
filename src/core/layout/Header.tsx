import { HTMLAttributes, ReactNode, useState } from "react";

import { Container, ContainerSize } from "./Container";
import { cn } from "./utils";

export type HeaderCartDrawerRenderProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type HeaderCartProps = {
  totalItems: number;
  buttonLabel?: string;
  onButtonClick?: () => void;
  drawer?: (props: HeaderCartDrawerRenderProps) => ReactNode;
};
export type HeaderProps = HTMLAttributes<HTMLElement> & {
  logo?: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  mobileMenu?: ReactNode;
  cart?: HeaderCartProps;
  sticky?: boolean;
  bordered?: boolean;
  containerSize?: ContainerSize;
  containerClassName?: string;
};

type HeaderCartButtonProps = {
  totalItems: number;
  buttonLabel: string;
  onClick: () => void;
};

function CartIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <circle cx="9" cy="20" r="1.25" />
      <circle cx="18" cy="20" r="1.25" />
      <path d="M3 4h2.5l2.4 10.8h10.8l2.1-8.4H6.5" />
    </svg>
  );
}

function HeaderCartButton({ totalItems, buttonLabel, onClick }: HeaderCartButtonProps) {
  const safeTotalItems = Math.max(0, totalItems);
  const displayTotalItems = safeTotalItems > 99 ? "99+" : safeTotalItems.toString();

  return (
    <button
      type="button"
      aria-label={buttonLabel}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
      onClick={onClick}
    >
      <CartIcon />
      <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-gray-900 px-1.5 py-0.5 text-center text-[11px] font-semibold leading-none text-white">
        {displayTotalItems}
      </span>
    </button>
  );
}
export function Header({
  logo,
  navigation,
  actions,
  mobileMenu,
  cart,
  sticky = false,
  bordered = true,
  className,
  containerSize = "xl",
  containerClassName,
  ...props
}: HeaderProps) {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const handleCartButtonClick = () => {
    cart?.onButtonClick?.();
    setIsCartDrawerOpen(true);
  };

  const renderCartButton = () => {
    if (!cart) {
      return null;
    }

    return (
      <HeaderCartButton
        totalItems={cart.totalItems}
        buttonLabel={cart.buttonLabel ?? "Open cart"}
        onClick={handleCartButtonClick}
      />
    );
  };

  const mobileSlot = (
    <>
      {mobileMenu ?? actions}
      {renderCartButton()}
    </>
  );

  return (
    <>
      <header
        className={cn(
          "w-full bg-white text-gray-900",
          sticky && "sticky top-0 z-40 bg-white/95 backdrop-blur",
          bordered && "border-b border-gray-200",
          className,
        )}
        {...props}
      >
        <Container size={containerSize} className={containerClassName}>
          <div className="flex min-h-16 items-center gap-4 py-3">
            <div className="flex min-w-0 flex-1 items-center">{logo}</div>
            <nav className="hidden items-center gap-6 md:flex">{navigation}</nav>
            <div className="hidden items-center gap-3 md:flex">
              {actions}
              {renderCartButton()}
            </div>
            <div className="ml-auto flex items-center gap-3 md:hidden">{mobileSlot}</div>
          </div>
        </Container>
      </header>
      {cart?.drawer?.({
        open: isCartDrawerOpen,
        onOpenChange: setIsCartDrawerOpen,
      })}
    </>
  );
}
