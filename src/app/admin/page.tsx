import Link from "next/link";

const adminLinks = [
  {
    href: "/admin/products",
    title: "Product management",
    description: "Create, update, and remove products from the catalog.",
  },
  {
    href: "/admin/orders",
    title: "Order management",
    description: "Monitor order metrics and inspect detail pages.",
  },
  {
    href: "/admin/ai",
    title: "AI content generator",
    description: "Generate shopping-mall content blocks with mock/OpenAI providers.",
  },
] as const;

export default function AdminLandingPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
        <p className="text-sm text-muted-foreground">
          Manage products, orders, and AI-assisted content from one workspace.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow"
          >
            <h2 className="text-base font-semibold text-slate-900">{link.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
