import type {
  CurrencyCode,
  PaginationInput,
  SupabaseTimestampColumns,
  Timestamped,
} from "../types";

export type OrderId = string;
export type OrderNumber = string;
export type OrderStatus =
  | "pending"
  | "paid"
  | "fulfilled"
  | "cancelled"
  | "refunded";

export interface OrderLineItem extends Timestamped {
  id: string;
  orderId: OrderId;
  productId: string;
  sku: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
}

export interface Order extends Timestamped {
  id: OrderId;
  orderNumber: OrderNumber;
  ownerId: string;
  currencyCode: CurrencyCode;
  status: OrderStatus;
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  lineItems: ReadonlyArray<OrderLineItem>;
}

export interface OrderQuery extends PaginationInput {
  ownerId?: string;
  status?: OrderStatus;
  orderNumber?: OrderNumber;
}

export interface OrderRepository {
  list(input?: OrderQuery): Promise<ReadonlyArray<Order>>;
  getById(id: OrderId): Promise<Order | null>;
  getByNumber(orderNumber: OrderNumber): Promise<Order | null>;
}

export interface OrderSupabaseRow extends SupabaseTimestampColumns {
  id: string;
  order_number: string;
  owner_id: string;
  currency_code: string;
  status: OrderStatus;
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
}

export interface OrderLineItemSupabaseRow extends SupabaseTimestampColumns {
  id: string;
  order_id: string;
  product_id: string;
  sku: string;
  quantity: number;
  unit_price_cents: number;
  line_total_cents: number;
}
