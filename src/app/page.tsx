"use client";

import { useMemo, useState } from "react";
import { BeforeAfterImageSlider, HeroSlider } from "@/components/interior";
import { interiorBeforeAfterProjects, interiorHeroSlides } from "@/data/interiorProjects";
import { CartDrawer } from "@/features/ecommerce/cart/components";
import {
  useCartItems,
  useCartTotalItems,
  useCartTotalPrice,
  useClearCart,
  useDecreaseQuantity,
  useIncreaseQuantity,
  useRemoveFromCart,
} from "@/features/ecommerce/cart/hooks";
import { CheckoutForm, OrderSummary } from "@/features/ecommerce/checkout/components";
import type { CartItem as CheckoutCartItem, CheckoutFormValues, OrderTotals } from "@/features/ecommerce/checkout/types";
import { AdminOrdersPage } from "@/features/ecommerce/order/pages/AdminOrdersPage";
import {
  AdminProductTable,
  ProductForm,
  ProductList,
} from "@/features/ecommerce/product/components";
import type { AdminProduct, AdminProductPayload } from "@/features/ecommerce/product/hooks";
import { useAdminProduct } from "@/features/ecommerce/product/hooks";
import { mockProducts } from "@/features/ecommerce/product/mock";

export default function HomePage() {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [adminMessage, setAdminMessage] = useState<string | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);

  const cartItems = useCartItems();
  const cartTotalItems = useCartTotalItems();
  const cartTotalPrice = useCartTotalPrice();
  const clearCart = useClearCart();
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();
  const removeFromCart = useRemoveFromCart();

  const initialAdminProducts = useMemo<AdminProduct[]>(() => {
    const timestamp = new Date().toISOString();

    return mockProducts.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.imageUrl,
      category: product.category,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));
  }, []);

  const { products, createProduct, updateProduct, deleteProduct } = useAdminProduct({
    initialProducts: initialAdminProducts,
  });

  const checkoutItems = useMemo<ReadonlyArray<CheckoutCartItem>>(
    () =>
      cartItems.map((item) => ({
        id: item.productId,
        title: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    [cartItems],
  );

  const checkoutTotals = useMemo<OrderTotals>(() => {
    const subtotal = Number(cartTotalPrice.toFixed(2));
    const shipping = subtotal > 0 ? 12 : 0;
    const tax = Number((subtotal * 0.1).toFixed(2));

    return {
      subtotal,
      shipping,
      tax,
      grandTotal: Number((subtotal + shipping + tax).toFixed(2)),
    };
  }, [cartTotalPrice]);

  const handleCreateOrder = async (values: CheckoutFormValues): Promise<void> => {
    setCheckoutMessage(null);
    setIsSubmittingOrder(true);

    try {
      if (cartItems.length === 0) {
        setCheckoutMessage("Add items to the cart before placing an order.");
        return;
      }

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
      });

      clearCart();
      setCheckoutMessage(`Order created for ${values.customer.firstName} ${values.customer.lastName}.`);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const openCreateProductForm = (): void => {
    setAdminError(null);
    setAdminMessage(null);
    setEditingProduct(null);
    setIsProductFormOpen(true);
  };

  const openEditProductForm = (product: AdminProduct): void => {
    setAdminError(null);
    setAdminMessage(null);
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };

  const closeProductForm = (): void => {
    setEditingProduct(null);
    setIsProductFormOpen(false);
  };

  const handleProductSubmit = async (payload: AdminProductPayload): Promise<void> => {
    setAdminError(null);
    setAdminMessage(null);

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        setAdminMessage("Product updated successfully.");
      } else {
        await createProduct(payload);
        setAdminMessage("Product created successfully.");
      }
      closeProductForm();
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : "Failed to save product.");
    }
  };

  const handleDeleteProduct = async (product: AdminProduct): Promise<void> => {
    setAdminError(null);
    setAdminMessage(null);
    setDeletingProductId(product.id);

    try {
      await deleteProduct(product.id);
      setAdminMessage("Product deleted successfully.");
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : "Failed to delete product.");
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Final integrated homepage
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Interior + Commerce + Admin + AI Unified Surface
            </h1>
            <p className="max-w-3xl text-sm text-slate-600 md:text-base">
              Hero slider, before/after gallery, product catalog, cart & checkout, admin product
              tools, and AI content studio are rendered on one page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsCartDrawerOpen(true);
            }}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Cart ({cartTotalItems})
          </button>
        </div>
      </section>

      <HeroSlider slides={interiorHeroSlides} />

      <section className="space-y-4">
        <header className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Before / After Slider
          </h2>
          <p className="text-sm text-slate-600">
            Interior showcase module merged from requested feature scope.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {interiorBeforeAfterProjects.map((project) => (
            <BeforeAfterImageSlider key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Product Catalog</h2>
          <p className="text-sm text-slate-600">
            Product cards use cart store integration. Add items directly from the list.
          </p>
        </header>
        <ProductList products={mockProducts} />
      </section>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Checkout</h2>
          <p className="text-sm text-slate-600">
            Uses checkout form validation module and an order summary mapped from cart state.
          </p>
          {checkoutMessage ? (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {checkoutMessage}
            </p>
          ) : null}
          <OrderSummary
            items={checkoutItems}
            currency="USD"
            totals={checkoutTotals}
            className="rounded-xl border border-slate-200 p-4"
          />
        </div>
        <CheckoutForm createOrder={handleCreateOrder} isSubmitting={isSubmittingOrder} />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Admin Product Management
          </h2>
          <p className="text-sm text-slate-600">
            CRUD management surface from admin product branch.
          </p>
        </header>

        {adminMessage ? (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {adminMessage}
          </p>
        ) : null}
        {adminError ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {adminError}
          </p>
        ) : null}

        <AdminProductTable
          products={products}
          onAddNewProduct={openCreateProductForm}
          onEditProduct={openEditProductForm}
          onDeleteProduct={handleDeleteProduct}
          deletingProductId={deletingProductId}
        />

        {isProductFormOpen ? (
          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {editingProduct ? "Edit Product" : "Create Product"}
            </h3>
            <div className="mt-3">
              <ProductForm
                mode={editingProduct ? "edit" : "create"}
                initialProduct={editingProduct ?? undefined}
                onSubmit={handleProductSubmit}
                onCancel={closeProductForm}
              />
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <AdminOrdersPage />
      </section>

      <CartDrawer
        open={isCartDrawerOpen}
        items={cartItems}
        totalPrice={cartTotalPrice}
        onClose={() => {
          setIsCartDrawerOpen(false);
        }}
        onIncreaseQuantity={increaseQuantity}
        onDecreaseQuantity={decreaseQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  );
}
