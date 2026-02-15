import { OrderDetail } from "../components";
import { useOrderById } from "../hooks";
import { type OrderRepository } from "../types";

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

      {isLoading ? <p className="admin-orders-empty-state">Loading order...</p> : <OrderDetail order={order} />}
    </section>
  );
};
