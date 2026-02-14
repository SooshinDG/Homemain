import { HTMLAttributes, ReactNode } from "react";

import { Container, ContainerSize } from "./Container";
import { cn } from "./utils";

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  logo?: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  mobileMenu?: ReactNode;
  sticky?: boolean;
  bordered?: boolean;
  containerSize?: ContainerSize;
  containerClassName?: string;
};

export function Header({
  logo,
  navigation,
  actions,
  mobileMenu,
  sticky = false,
  bordered = true,
  className,
  containerSize = "xl",
  containerClassName,
  ...props
}: HeaderProps) {
  const mobileSlot = mobileMenu ?? actions;

  return (
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
          <div className="hidden items-center gap-3 md:flex">{actions}</div>
          <div className="ml-auto flex items-center md:hidden">{mobileSlot}</div>
        </div>
      </Container>
    </header>
  );
}
