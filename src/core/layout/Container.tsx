import { ElementType, ReactNode } from "react";

import { cn, PolymorphicProps } from "./utils";

export const containerMaxWidth = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
} as const;

export type ContainerSize = keyof typeof containerMaxWidth;

const gutterSize = {
  none: "",
  sm: "px-4",
  md: "px-4 sm:px-6",
  lg: "px-4 sm:px-6 lg:px-8",
} as const;

export type ContainerGutter = keyof typeof gutterSize;

type ContainerOwnProps = {
  children?: ReactNode;
  className?: string;
  size?: ContainerSize;
  gutter?: ContainerGutter;
  centered?: boolean;
};

export type ContainerProps<T extends ElementType = "div"> = PolymorphicProps<
  T,
  ContainerOwnProps
>;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  size = "xl",
  gutter = "lg",
  centered = true,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "w-full",
        containerMaxWidth[size],
        gutterSize[gutter],
        centered && "mx-auto",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
