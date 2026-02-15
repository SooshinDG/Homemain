import { ElementType, ReactNode } from "react";

import { Container, ContainerSize } from "./Container";
import { cn, PolymorphicProps } from "./utils";

const sectionSpacing = {
  none: "py-0",
  sm: "py-8 sm:py-10",
  md: "py-12 sm:py-16",
  lg: "py-16 sm:py-20",
  xl: "py-20 sm:py-28",
} as const;

export type SectionSpacing = keyof typeof sectionSpacing;

type SectionOwnProps = {
  children?: ReactNode;
  className?: string;
  spacing?: SectionSpacing;
  container?: boolean;
  containerSize?: ContainerSize;
  containerClassName?: string;
};

export type SectionProps<T extends ElementType = "section"> = PolymorphicProps<
  T,
  SectionOwnProps
>;

export function Section<T extends ElementType = "section">({
  as,
  children,
  className,
  spacing = "md",
  container = true,
  containerSize = "xl",
  containerClassName,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";
  const sectionContent = container ? (
    <Container size={containerSize} className={containerClassName}>
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <Component className={cn(sectionSpacing[spacing], className)} {...props}>
      {sectionContent}
    </Component>
  );
}
