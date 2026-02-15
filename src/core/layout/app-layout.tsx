import { PageContainer } from "@/core/layout/page-container";
import { SiteHeader } from "@/core/layout/site-header";

type AppLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="py-12">
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  );
}
