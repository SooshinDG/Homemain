"use client";

import { useMemo, useState } from "react";
import type {
  BusinessInfo,
  ContentSource,
  ShoppingMallContentSchema,
} from "@/features/ai/types";

type FormState = {
  name: string;
  category: string;
  tone: string;
  target: string;
  keywords: string;
};

const INITIAL_FORM: FormState = {
  name: "TemplateForge Mall",
  category: "Lifestyle",
  tone: "Confident and friendly",
  target: "Young professionals",
  keywords: "curated deals, premium essentials, online shopping",
};

export default function AdminAiPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [source, setSource] = useState<ContentSource>("mock");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<ShoppingMallContentSchema | null>(null);

  const businessInfo = useMemo<BusinessInfo>(
    () => ({
      name: form.name,
      category: form.category,
      tone: form.tone,
      target: form.target,
      keywords: form.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0),
    }),
    [form],
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Admin AI content generation</h1>
        <p className="text-sm text-muted-foreground">
          Generate shopping mall copy via mock generator or OpenAI API.
        </p>
      </div>

      {errorMessage ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <form
        className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);
          setErrorMessage(null);

          try {
            const response = await fetch("/api/admin/ai/generate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                source,
                businessInfo,
              }),
            });

            if (!response.ok) {
              const errorPayload = (await response.json()) as { message?: string };
              throw new Error(errorPayload.message ?? "Failed to generate content.");
            }

            const payload = (await response.json()) as ShoppingMallContentSchema;
            setResult(payload);
          } catch (error: unknown) {
            setErrorMessage(
              error instanceof Error ? error.message : "Failed to generate content.",
            );
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <label className="grid gap-1 text-sm">
          Business name
          <input
            className="rounded-md border border-slate-300 px-3 py-2"
            value={form.name}
            onChange={(event) => {
              setForm((previous) => ({ ...previous, name: event.target.value }));
            }}
          />
        </label>
        <label className="grid gap-1 text-sm">
          Category
          <input
            className="rounded-md border border-slate-300 px-3 py-2"
            value={form.category}
            onChange={(event) => {
              setForm((previous) => ({ ...previous, category: event.target.value }));
            }}
          />
        </label>
        <label className="grid gap-1 text-sm">
          Tone
          <input
            className="rounded-md border border-slate-300 px-3 py-2"
            value={form.tone}
            onChange={(event) => {
              setForm((previous) => ({ ...previous, tone: event.target.value }));
            }}
          />
        </label>
        <label className="grid gap-1 text-sm">
          Target audience
          <input
            className="rounded-md border border-slate-300 px-3 py-2"
            value={form.target}
            onChange={(event) => {
              setForm((previous) => ({ ...previous, target: event.target.value }));
            }}
          />
        </label>
        <label className="grid gap-1 text-sm md:col-span-2">
          Keywords (comma separated)
          <input
            className="rounded-md border border-slate-300 px-3 py-2"
            value={form.keywords}
            onChange={(event) => {
              setForm((previous) => ({ ...previous, keywords: event.target.value }));
            }}
          />
        </label>
        <label className="grid gap-1 text-sm md:col-span-2">
          Source
          <select
            className="rounded-md border border-slate-300 px-3 py-2"
            value={source}
            onChange={(event) => {
              setSource(event.target.value as ContentSource);
            }}
          >
            <option value="mock">mock</option>
            <option value="openai">openai</option>
          </select>
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Generate content"}
          </button>
        </div>
      </form>

      {result ? (
        <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Generated preview</h2>
          <p className="text-sm text-slate-700">
            <strong>Hero:</strong> {result.pageContent.heroBanner.title}
          </p>
          <p className="text-sm text-slate-700">
            <strong>SEO title:</strong> {result.marketingContent.seo.title}
          </p>
          <pre className="max-h-[420px] overflow-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
      ) : null}
    </section>
  );
}
