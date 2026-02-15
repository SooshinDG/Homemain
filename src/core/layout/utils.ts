import { ComponentPropsWithoutRef, ElementType } from "react";

export type ClassValue = string | false | null | undefined;

export function cn(...classValues: ClassValue[]): string {
  return classValues.filter(Boolean).join(" ");
}

export type PolymorphicProps<
  T extends ElementType,
  Props extends object = Record<string, never>,
> = Props &
  Omit<ComponentPropsWithoutRef<T>, keyof Props | "as"> & {
    as?: T;
  };
