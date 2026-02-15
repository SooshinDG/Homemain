import { ArrowRight } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { templateCatalog } from "@/templates/catalog";

export function HomeHero() {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-medium text-muted-foreground">
          Next.js 14 • App Router • TypeScript
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Minimal starter built for template resale businesses
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Feature-first architecture with reusable layout primitives, shadcn/ui, and clean defaults
          for scalable productization.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="button">
          Publish first template
          <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="text-sm text-muted-foreground">
          {templateCatalog.length} templates currently in catalog
        </p>
      </div>
    </section>
  );
}
