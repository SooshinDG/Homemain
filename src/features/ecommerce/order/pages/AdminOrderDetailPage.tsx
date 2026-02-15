import { useEffect, useMemo, useState } from "react";

import { OrderDetail } from "../components";
import { useOrderById } from "../hooks";
import { type OrderRepository, type OrderStatus } from "../types";
import "../styles/admin-orders.css";

export interface AdminOrderDetailPageProps {
  orderId: string;
  repository?: OrderRepository;
  listPagePath?: string;
  navigateTo?: (path: string) => void;
}

export const AdminOrderDetailPage = ({
  orderId,
  repository,
  listPagePath = "/admin/orders",
  navigateTo,
}: AdminOrderDetailPageProps): JSX.Element => {
  const { order, isLoading, error, refreshOrder } = useOrderById({
    orderId,
    repository,
  });
  const [localStatus, setLocalStatus] = useState<OrderStatus | null>(null);

  useEffect(() => {
    setLocalStatus(order?.status ?? null);
  }, [order]);

  const orderWithLocalStatus = useMemo(() => {
    if (!order || !localStatus || order.status === localStatus) {
      return order;
    }

    return {
      ...order,
      status: localStatus,
    };
  }, [localStatus, order]);

  return (
    <section className="admin-orders-page" aria-label="Admin order detail">
      <header className="admin-orders-page-header admin-orders-page-header--detail">
        <button
          type="button"
          className="admin-orders-secondary-button"
          onClick={() => {
            if (navigateTo) {
              navigateTo(listPagePath);
              return;
            }

            if (typeof window !== "undefined") {
              window.location.assign(listPagePath);
            }
          }}
        >
          Back to Orders
        </button>

        <button
          type="button"
          className="admin-orders-secondary-button"
          onClick={() => {
            void refreshOrder();
          }}
          disabled={isLoading}
        >
          Refresh
        </button>
      </header>

      {error ? (
        <p className="admin-orders-error-message" role="alert">
          {error}
        </p>
      ) : null}

      {isLoading ? (
        <p className="admin-orders-empty-state">Loading order...</p>
      ) : (
        <>
          <OrderDetail
            order={orderWithLocalStatus}
            currentStatus={localStatus ?? undefined}
            onStatusChange={setLocalStatus}
          />
          {orderWithLocalStatus ? (
            <p className="admin-order-detail-state-note">
              Status updates are mock-only and saved in local page state.
            </p>
          ) : null}
        </>
      )}
    </section>
  );
};
