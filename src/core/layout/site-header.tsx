import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PageContainer } from "@/core/layout/page-container";

export function SiteHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <PageContainer className="flex h-16 items-center justify-between">
        <Link className="text-sm font-semibold tracking-tight" href="/">
          {siteConfig.name}
        </Link>
        <nav className="text-sm text-muted-foreground">App Router Template</nav>
      </PageContainer>
    </header>
  );
}
