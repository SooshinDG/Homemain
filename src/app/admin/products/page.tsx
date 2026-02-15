"use client";

import { useMemo, useState } from "react";
import {
  AdminProductTable,
  ProductForm,
  useAdminProduct,
  type AdminProduct,
} from "@/features/ecommerce";
import { mockProducts } from "@/features/ecommerce/product/mock";

export default function AdminProductsRoutePage() {
  const initialProducts = useMemo<AdminProduct[]>(
    () =>
      mockProducts.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.createdAt.toISOString(),
      })),
    [],
  );

  const { products, createProduct, updateProduct, deleteProduct } = useAdminProduct({
    initialProducts,
  });
  const [mode, setMode] = useState<"idle" | "create" | "edit">("idle");
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const closeForm = (): void => {
    setMode("idle");
    setEditingProduct(null);
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Admin products</h1>
        <p className="text-sm text-muted-foreground">
          Local CRUD-ready product management with typed form validation.
        </p>
      </div>

      {errorMessage ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      {mode !== "idle" ? (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            {mode === "create" ? "Create product" : `Edit ${editingProduct?.name ?? "product"}`}
          </h2>
          <div className="mt-3">
            <ProductForm
              mode={mode === "create" ? "create" : "edit"}
              initialProduct={editingProduct ?? undefined}
              onCancel={closeForm}
              onSubmit={async (payload) => {
                setErrorMessage(null);
                try {
                  if (mode === "create") {
                    await createProduct(payload);
                  } else if (editingProduct) {
                    await updateProduct(editingProduct.id, payload);
                  }
                  closeForm();
                } catch (error: unknown) {
                  setErrorMessage(error instanceof Error ? error.message : "Failed to save product.");
                }
              }}
            />
          </div>
        </section>
      ) : null}

      <div className="overflow-auto rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <AdminProductTable
          products={products}
          deletingProductId={deletingProductId}
          onAddNewProduct={() => {
            setErrorMessage(null);
            setMode("create");
            setEditingProduct(null);
          }}
          onEditProduct={(product) => {
            setErrorMessage(null);
            setMode("edit");
            setEditingProduct(product);
          }}
          onDeleteProduct={async (product) => {
            setDeletingProductId(product.id);
            setErrorMessage(null);

            try {
              await deleteProduct(product.id);
            } catch (error: unknown) {
              setErrorMessage(error instanceof Error ? error.message : "Failed to delete product.");
            } finally {
              setDeletingProductId(null);
            }
          }}
        />
      </div>
    </section>
  );
}
