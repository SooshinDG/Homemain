"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/core/theme";

type ProvidersProps = Readonly<{
  children: ReactNode;
}>;

export function Providers({ children }: ProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
