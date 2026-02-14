import { useMemo } from "react";

import { OrderTable } from "../components";
import { useOrders } from "../hooks";
import { type OrderRepository, type OrderStatus } from "../types";
import "../styles/admin-orders.css";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export interface AdminOrdersPageProps {
  repository?: OrderRepository;
  detailBasePath?: string;
  navigateTo?: (path: string) => void;
}

const normalizeDetailBasePath = (detailBasePath: string): string => {
  return detailBasePath.endsWith("/") ? detailBasePath.slice(0, -1) : detailBasePath;
};

const buildOrderDetailPath = (detailBasePath: string, orderId: string): string => {
  return `${normalizeDetailBasePath(detailBasePath)}/${orderId}`;
};

export const AdminOrdersPage = ({
  repository,
  detailBasePath = "/admin/orders",
  navigateTo,
}: AdminOrdersPageProps): JSX.Element => {
  const { orders, isLoading, error, refreshOrders } = useOrders({
    repository,
  });

  const metrics = useMemo(() => {
    const statusCount = orders.reduce<Record<OrderStatus, number>>(
      (count, order) => ({
        ...count,
        [order.status]: count[order.status] + 1,
      }),
      {
        pending: 0,
        paid: 0,
        processing: 0,
        shipped: 0,
        completed: 0,
        cancelled: 0,
      },
    );

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const activeOrders =
      statusCount.pending + statusCount.paid + statusCount.processing + statusCount.shipped;

    return {
      totalOrders: orders.length,
      activeOrders,
      completedOrders: statusCount.completed,
      totalRevenue,
    };
  }, [orders]);

  return (
    <section className="admin-orders-page" aria-label="Admin orders dashboard">
      <header className="admin-orders-page-header">
        <div>
          <h1>Orders</h1>
          <p>Monitor and manage customer orders in one place.</p>
        </div>
      </header>

      <section className="admin-orders-metrics" aria-label="Order summary metrics">
        <article className="admin-orders-metric-card">
          <h2>Total Orders</h2>
          <p>{metrics.totalOrders}</p>
        </article>
        <article className="admin-orders-metric-card">
          <h2>Active Orders</h2>
          <p>{metrics.activeOrders}</p>
        </article>
        <article className="admin-orders-metric-card">
          <h2>Completed</h2>
          <p>{metrics.completedOrders}</p>
        </article>
        <article className="admin-orders-metric-card">
          <h2>Revenue</h2>
          <p>{currencyFormatter.format(metrics.totalRevenue)}</p>
        </article>
      </section>

      <section className="admin-orders-panel" aria-label="Orders table panel">
        <div className="admin-orders-panel-header">
          <h2>Recent Orders</h2>
          <button
            type="button"
            className="admin-orders-secondary-button"
            onClick={() => {
              void refreshOrders();
            }}
            disabled={isLoading}
          >
            Refresh
          </button>
        </div>

        {error ? (
          <p className="admin-orders-error-message" role="alert">
            {error}
          </p>
        ) : null}

        {isLoading ? (
          <p className="admin-orders-empty-state">Loading orders...</p>
        ) : (
          <OrderTable
            orders={orders}
            getOrderDetailPath={(orderId) => buildOrderDetailPath(detailBasePath, orderId)}
            onRowClick={(orderId) => {
              const path = buildOrderDetailPath(detailBasePath, orderId);

              if (navigateTo) {
                navigateTo(path);
                return;
              }

              if (typeof window !== "undefined") {
                window.location.assign(path);
              }
            }}
          />
        )}
      </section>
    </section>
  );
};
