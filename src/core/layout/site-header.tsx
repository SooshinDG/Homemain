"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { PageContainer } from "@/core/layout/page-container";
import { useTheme } from "@/core/theme";
import { CartDrawer } from "@/features/ecommerce/cart/components";
import { useCartTotalItems, useOpenCartDrawer } from "@/features/ecommerce/cart/hooks";

const navigationItems = [
  { href: "/", label: "Shop" },
  { href: "/checkout", label: "Checkout" },
  { href: "/orders", label: "Orders" },
  { href: "/admin", label: "Admin" },
] as const;

const cartCountLabel = (count: number): string => {
  if (count > 99) {
    return "99+";
  }

  return String(count);
};

export function SiteHeader() {
  const pathname = usePathname();
  const totalItems = useCartTotalItems();
  const openCartDrawer = useOpenCartDrawer();
  const { availableThemes, setTheme, themeName } = useTheme();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <PageContainer className="flex h-16 items-center justify-between">
        <Link className="text-sm font-semibold tracking-tight" href="/">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "font-semibold text-foreground" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <label className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
            Theme
            <select
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
              value={themeName}
              onChange={(event) => {
                setTheme(event.target.value as typeof themeName);
              }}
            >
              {availableThemes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={openCartDrawer}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            aria-label="Open cart"
          >
            Cart
            <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-slate-900 px-1 py-0.5 text-[11px] text-white">
              {cartCountLabel(totalItems)}
            </span>
          </button>
        </div>
      </PageContainer>
      <CartDrawer />
    </header>
  );
}
