import { HomeHero } from "@/features/home/components/home-hero";
import { ProductCard } from "@/features/ecommerce/product/components/ProductCard";
import { mockProducts } from "@/features/ecommerce/product/mock";

export default function HomePage() {
  const products = mockProducts.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    currency: "USD",
    imageAlt: product.name,
  }));

  return (
    <div className="space-y-10">
      <HomeHero />

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Featured products</h2>
          <p className="text-sm text-muted-foreground">
            Powered by typed product mocks and a Zustand-backed cart store.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
