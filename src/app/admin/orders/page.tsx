"use client";

import { useRouter } from "next/navigation";
import { AdminOrdersPage } from "@/features/ecommerce/order/pages";

export default function AdminOrdersRoutePage() {
  const router = useRouter();

  return <AdminOrdersPage detailBasePath="/admin/orders" navigateTo={router.push} />;
}
