"use client";

import { useRouter } from "next/navigation";
import { AdminOrdersPage } from "@/features/ecommerce/order/pages";

export default function OrdersPage() {
  const router = useRouter();

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
      <p className="text-sm text-muted-foreground">
        Track your recent orders and open each order detail page.
      </p>
      <AdminOrdersPage detailBasePath="/orders" navigateTo={router.push} />
    </section>
  );
}
