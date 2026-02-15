"use client";

import { AdminOrderDetailPage } from "@/features/ecommerce/order/pages";

type OrderDetailRoutePageProps = {
  params: {
    orderId: string;
  };
};

export default function OrderDetailRoutePage({ params }: OrderDetailRoutePageProps) {
  return <AdminOrderDetailPage orderId={decodeURIComponent(params.orderId)} listPagePath="/orders" />;
}
