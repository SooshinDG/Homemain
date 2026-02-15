import type { CartItem as StoreCartItem } from "@/features/ecommerce/cart/types";

export type CartItem = StoreCartItem;

export type CheckoutStatus = "idle" | "submitting" | "success" | "error";

export interface CustomerDetails {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone?: string;
}

export interface ShippingAddress {
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly stateOrRegion: string;
  readonly postalCode: string;
  readonly country: string;
}

export interface CheckoutFormValues {
  readonly customer: CustomerDetails;
  readonly shippingAddress: ShippingAddress;
  readonly notes?: string;
}

export interface CheckoutFormInitialValues {
  readonly customer?: Partial<CustomerDetails>;
  readonly shippingAddress?: Partial<ShippingAddress>;
  readonly notes?: string;
}

export interface OrderTotals {
  readonly subtotal: number;
  readonly shipping: number;
  readonly tax: number;
  readonly grandTotal: number;
}

export interface CheckoutOrder extends CheckoutFormValues {
  readonly id: string;
  readonly createdAt: string;
  readonly items: ReadonlyArray<CartItem>;
  readonly currency: string;
  readonly totals: OrderTotals;
  readonly status: "paid";
}

export interface UseCheckoutConfig {
  readonly shippingCost?: number;
  readonly taxRate?: number;
  readonly idGenerator?: () => string;
  readonly now?: () => Date;
}

export interface UseCheckoutResult {
  readonly items: ReadonlyArray<CartItem>;
  readonly currency: string;
  readonly totals: OrderTotals;
  readonly status: CheckoutStatus;
  readonly latestOrder: CheckoutOrder | null;
  readonly errorMessage: string | null;
  submitOrder(values: CheckoutFormValues): Promise<CheckoutOrder | null>;
  resetCheckout(): void;
}
