"use client";

import { AdminOrderDetailPage } from "@/features/ecommerce/order/pages";

type AdminOrderDetailRoutePageProps = {
  params: {
    orderId: string;
  };
};

export default function AdminOrderDetailRoutePage({ params }: AdminOrderDetailRoutePageProps) {
  return (
    <AdminOrderDetailPage
      orderId={decodeURIComponent(params.orderId)}
      listPagePath="/admin/orders"
    />
  );
}
