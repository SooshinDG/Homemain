import type {
  CurrencyCode,
  SupabaseTimestampColumns,
  Timestamped,
} from "../types";

export type CheckoutSessionId = string;
export type CheckoutPaymentMethod = "card" | "wallet" | "bank_transfer";
export type CheckoutStatus = "draft" | "ready" | "submitted" | "failed";

export interface CheckoutAddress {
  firstName: string;
  lastName: string;
  line1: string;
  line2: string | null;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryCode: string;
}

export interface CheckoutLineItem {
  productId: string;
  quantity: number;
  unitPriceCents: number;
}

export interface CheckoutSession extends Timestamped {
  id: CheckoutSessionId;
  cartId: string;
  currencyCode: CurrencyCode;
  status: CheckoutStatus;
  paymentMethod: CheckoutPaymentMethod | null;
  shippingAddress: CheckoutAddress | null;
  billingAddress: CheckoutAddress | null;
  lineItems: ReadonlyArray<CheckoutLineItem>;
}

export interface CheckoutSubmitInput {
  sessionId: CheckoutSessionId;
  paymentMethod: CheckoutPaymentMethod;
}

export interface CheckoutGateway {
  createFromCart(cartId: string): Promise<CheckoutSession>;
  updateShippingAddress(
    sessionId: CheckoutSessionId,
    address: CheckoutAddress,
  ): Promise<CheckoutSession>;
  submit(input: CheckoutSubmitInput): Promise<{ orderId: string }>;
}

export interface CheckoutSessionSupabaseRow extends SupabaseTimestampColumns {
  id: string;
  cart_id: string;
  currency_code: string;
  status: CheckoutStatus;
  payment_method: CheckoutPaymentMethod | null;
  shipping_address: Readonly<Record<string, unknown>> | null;
  billing_address: Readonly<Record<string, unknown>> | null;
}
