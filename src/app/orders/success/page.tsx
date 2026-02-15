import Link from "next/link";
type OrderSuccessPageProps = {
  searchParams: {
    orderId?: string;
  };
};

export default function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const orderId = searchParams.orderId ?? "N/A";
  const createdAt = new Date().toLocaleString();

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
        Order Confirmed
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Thank you for your purchase!</h1>
      <p className="mt-2 text-sm text-slate-600">
        Your payment was successful and your order is being prepared.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Order number</p>
          <p className="mt-1 text-sm font-semibold">{orderId}</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Order date</p>
          <p className="mt-1 text-sm font-semibold">{createdAt}</p>
        </div>
      </div>

      <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
        Your cart has been cleared and order processing has started.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Continue shopping
        </Link>
        <Link
          href="/orders"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          View orders
        </Link>
      </div>
    </section>
  );
}
