import { useMemo, useState, type FormEvent } from "react";

import { generateContent } from "../../../ai/generateContent";
import type { BusinessInfo, ShoppingMallContentSchema } from "../../../ai/types";
import { OrderTable } from "../components";
import { useOrders } from "../hooks";
import { type OrderRepository, type OrderStatus } from "../types";
import "../styles/admin-orders.css";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const defaultBusinessInfo: BusinessInfo = {
  name: "Luna Mall",
  category: "Lifestyle Goods",
  tone: "Friendly",
  target: "Busy urban professionals",
  keywords: ["daily essentials", "curated picks"],
};

const parseKeywords = (value: string): string[] => {
  return value
    .split(",")
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0);
};

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
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(defaultBusinessInfo);
  const [keywordsInput, setKeywordsInput] = useState(defaultBusinessInfo.keywords.join(", "));
  const [generatedContent, setGeneratedContent] = useState<ShoppingMallContentSchema | null>(null);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [contentGenerationError, setContentGenerationError] = useState<string | null>(null);

  const updateBusinessInfoField = (
    field: Exclude<keyof BusinessInfo, "keywords">,
    value: string,
  ): void => {
    setBusinessInfo((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleGenerateContent = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const nextBusinessInfo: BusinessInfo = {
      name: businessInfo.name.trim(),
      category: businessInfo.category.trim(),
      tone: businessInfo.tone.trim(),
      target: businessInfo.target.trim(),
      keywords: parseKeywords(keywordsInput),
    };

    setContentGenerationError(null);
    setIsGeneratingContent(true);

    try {
      // No API call yet: generateContent uses the mock provider by default.
      const nextContent = await generateContent(nextBusinessInfo);
      setBusinessInfo(nextBusinessInfo);
      setKeywordsInput(nextBusinessInfo.keywords.join(", "));
      setGeneratedContent(nextContent);
    } catch (generationError) {
      setContentGenerationError(
        generationError instanceof Error
          ? generationError.message
          : "Failed to generate content. Please try again.",
      );
    } finally {
      setIsGeneratingContent(false);
    }
  };

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

      <section className="admin-orders-panel" aria-label="AI content generation panel">
        <div className="admin-orders-panel-header">
          <h2>Content Studio</h2>
        </div>

        <form className="admin-ai-form" onSubmit={(event) => void handleGenerateContent(event)}>
          <label className="admin-ai-field">
            <span>Business Name</span>
            <input
              type="text"
              value={businessInfo.name}
              onChange={(event) => {
                updateBusinessInfoField("name", event.target.value);
              }}
              required
            />
          </label>

          <label className="admin-ai-field">
            <span>Category</span>
            <input
              type="text"
              value={businessInfo.category}
              onChange={(event) => {
                updateBusinessInfoField("category", event.target.value);
              }}
              required
            />
          </label>

          <label className="admin-ai-field">
            <span>Tone</span>
            <input
              type="text"
              value={businessInfo.tone}
              onChange={(event) => {
                updateBusinessInfoField("tone", event.target.value);
              }}
              required
            />
          </label>

          <label className="admin-ai-field">
            <span>Target Audience</span>
            <input
              type="text"
              value={businessInfo.target}
              onChange={(event) => {
                updateBusinessInfoField("target", event.target.value);
              }}
              required
            />
          </label>

          <label className="admin-ai-field admin-ai-field--full">
            <span>Keywords (comma separated)</span>
            <input
              type="text"
              value={keywordsInput}
              onChange={(event) => {
                setKeywordsInput(event.target.value);
              }}
              required
            />
          </label>

          <div className="admin-ai-actions">
            <button
              type="submit"
              className="admin-orders-secondary-button admin-ai-generate-button"
              disabled={isGeneratingContent}
            >
              {isGeneratingContent ? "Generating..." : "AI Generate Content"}
            </button>
          </div>
        </form>

        {contentGenerationError ? (
          <p className="admin-orders-error-message" role="alert">
            {contentGenerationError}
          </p>
        ) : null}

        {generatedContent ? (
          <div className="admin-ai-preview" aria-live="polite">
            <article className="admin-ai-preview-card">
              <h3>{generatedContent.pageContent.heroBanner.title}</h3>
              <p>{generatedContent.pageContent.heroBanner.subtitle}</p>
              <span>
                SEO: <strong>{generatedContent.marketingContent.seo.title}</strong>
              </span>
            </article>

            <article className="admin-ai-preview-card">
              <h3>{generatedContent.pageContent.brandStory.title}</h3>
              <p>{generatedContent.pageContent.brandStory.summary}</p>
              <span>
                Updated:{" "}
                <strong>
                  {new Date(generatedContent.metadata.generatedAt).toLocaleString("en-US")}
                </strong>
              </span>
            </article>

            <details className="admin-ai-json-preview">
              <summary>Current content JSON (local state)</summary>
              <pre>{JSON.stringify(generatedContent, null, 2)}</pre>
            </details>
          </div>
        ) : (
          <p className="admin-orders-empty-state">
            Submit BusinessInfo to generate mock content and preview updates instantly.
          </p>
        )}
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
