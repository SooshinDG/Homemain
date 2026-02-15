import type {
  CurrencyCode,
  PaginationInput,
  SupabaseTimestampColumns,
} from "../types";

export type OrderId = string;
export type OrderNumber = string;
export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "completed"
  | "fulfilled"
  | "cancelled"
  | "refunded";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderLineItem {
  id: string;
  orderId: OrderId;
  productId: string;
  sku?: string;
  quantity: number;
  unitPriceCents?: number;
  lineTotalCents?: number;
}

export interface Order {
  id: string;
  orderNumber?: OrderNumber;
  ownerId?: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  lineItems?: ReadonlyArray<OrderLineItem>;
  totalPrice: number;
  currencyCode?: CurrencyCode;
  subtotalCents?: number;
  shippingCents?: number;
  taxCents?: number;
  totalCents?: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface OrderQuery extends PaginationInput {
  ownerId?: string;
  status?: OrderStatus;
  orderNumber?: OrderNumber;
}

export interface OrderRepository {
  listOrders(): Promise<Order[]>;
  getOrderById(orderId: string): Promise<Order | null>;
  list?(input?: OrderQuery): Promise<ReadonlyArray<Order>>;
  getById?(id: OrderId): Promise<Order | null>;
  getByNumber?(orderNumber: OrderNumber): Promise<Order | null>;
}

// Mirrors Supabase snake_case rows so adapters stay isolated to this feature.
export interface SupabaseOrderRow {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  total_price: number;
  status: OrderStatus;
  created_at: string;
}

export interface SupabaseOrderItemRow {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export interface SupabaseOrderInsert {
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  total_price: number;
  status: OrderStatus;
  created_at: string;
}

export interface SupabaseOrderItemInsert {
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
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

export const calculateOrderTotal = (items: readonly CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
};

export const mapSupabaseRowsToOrder = (
  orderRow: SupabaseOrderRow,
  itemRows: readonly SupabaseOrderItemRow[],
): Order => {
  const createdAt = new Date(orderRow.created_at);

  if (Number.isNaN(createdAt.getTime())) {
    throw new Error(`Invalid order date for order "${orderRow.id}"`);
  }

  const items: CartItem[] = itemRows.map((item) => ({
    id: item.id,
    productId: item.product_id,
    name: item.product_name,
    quantity: item.quantity,
    unitPrice: item.unit_price,
  }));

  return {
    id: orderRow.id,
    customerName: orderRow.customer_name,
    email: orderRow.email,
    phone: orderRow.phone,
    address: orderRow.address,
    items,
    totalPrice: orderRow.total_price,
    status: orderRow.status,
    createdAt,
  };
};

export const mapOrderToSupabaseInsert = (order: Order): SupabaseOrderInsert => {
  return {
    customer_name: order.customerName,
    email: order.email,
    phone: order.phone,
    address: order.address,
    total_price: order.totalPrice,
    status: order.status,
    created_at: order.createdAt.toISOString(),
  };
};

export const mapOrderItemsToSupabaseInsert = (
  orderId: string,
  items: readonly CartItem[],
): SupabaseOrderItemInsert[] => {
  return items.map((item) => ({
    order_id: orderId,
    product_id: item.productId,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.unitPrice,
  }));
};
