import { HTMLAttributes, ReactNode } from "react";

import { Container, ContainerSize } from "./Container";
import { cn } from "./utils";

export type FooterProps = HTMLAttributes<HTMLElement> & {
  brand?: ReactNode;
  columns?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  containerSize?: ContainerSize;
  containerClassName?: string;
};

export function Footer({
  brand,
  columns,
  bottomLeft,
  bottomRight,
  className,
  containerSize = "xl",
  containerClassName,
  ...props
}: FooterProps) {
  const hasBottomRow = Boolean(bottomLeft || bottomRight);

  return (
    <footer
      className={cn("w-full border-t border-gray-200 bg-white text-gray-700", className)}
      {...props}
    >
      <Container size={containerSize} className={containerClassName}>
        <div className="flex flex-col gap-8 py-10 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
            <div className="max-w-md">{brand}</div>
            <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {columns}
            </div>
          </div>

          {hasBottomRow && (
            <div className="flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
              <div>{bottomLeft}</div>
              <div className="flex flex-wrap items-center gap-4">{bottomRight}</div>
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}
