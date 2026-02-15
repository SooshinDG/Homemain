import { ProductList } from "../../features/ecommerce/product/components";
import { mockProducts } from "../../features/ecommerce/product/mock";
import type { Product } from "../../features/ecommerce/product/types";
import { HeroSection } from "./components";
import "./shoppingMallTemplate.css";

export interface ShoppingMallTemplatePageProps {
  products?: ReadonlyArray<Product>;
  className?: string;
  locale?: string;
  heroHeadline?: string;
  heroSupportingText?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
}

const DEFAULT_HEADLINE = "Build your next shopping mall storefront in hours";
const DEFAULT_SUPPORTING_TEXT =
  "A clean, modular ecommerce template page designed for fast customization and resale projects.";
const DEFAULT_CTA_LABEL = "Browse Collection";
const DEFAULT_CTA_HREF = "#products";

export function ShoppingMallTemplatePage({
  products = mockProducts,
  className,
  locale = "en-US",
  heroHeadline = DEFAULT_HEADLINE,
  heroSupportingText = DEFAULT_SUPPORTING_TEXT,
  heroPrimaryCtaLabel = DEFAULT_CTA_LABEL,
  heroPrimaryCtaHref = DEFAULT_CTA_HREF,
}: ShoppingMallTemplatePageProps) {
  return (
    <main className={["shopping-template", className].filter(Boolean).join(" ")}>
      <HeroSection
        headline={heroHeadline}
        supportingText={heroSupportingText}
        primaryCtaLabel={heroPrimaryCtaLabel}
        primaryCtaHref={heroPrimaryCtaHref}
      />

      <section id="products" className="shopping-template__products-section">
        <header className="shopping-template__section-header">
          <h2 className="shopping-template__section-title">Featured Products</h2>
          <p className="shopping-template__section-copy">
            Swap this with your own catalog feed to instantly repurpose the page for any retail
            niche.
          </p>
        </header>

        <ProductList
          products={products}
          locale={locale}
          emptyState={
            <div className="shopping-template__empty-state">
              <p>No products are available at the moment.</p>
            </div>
          }
        />
      </section>
    </main>
  );
}

export default ShoppingMallTemplatePage;
