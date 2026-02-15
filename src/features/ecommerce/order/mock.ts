import {
  type Order,
  type OrderRepository,
  type SupabaseOrderItemRow,
  type SupabaseOrderRow,
  mapSupabaseRowsToOrder,
} from "./types";

const MOCK_NETWORK_DELAY_MS = 120;

const mockOrderRows: SupabaseOrderRow[] = [
  {
    id: "ord_1001",
    customer_name: "Ariana Park",
    email: "ariana.park@example.com",
    phone: "+1-555-0134",
    address: "101 Maple St, Denver, CO 80203",
    total_price: 238.5,
    status: "pending",
    created_at: "2026-02-08T10:22:00.000Z",
  },
  {
    id: "ord_1002",
    customer_name: "Julian Rivera",
    email: "julian.rivera@example.com",
    phone: "+1-555-0190",
    address: "77 Spring Ave, Austin, TX 78701",
    total_price: 129.99,
    status: "paid",
    created_at: "2026-02-09T15:41:00.000Z",
  },
  {
    id: "ord_1003",
    customer_name: "Mina Choi",
    email: "mina.choi@example.com",
    phone: "+1-555-0127",
    address: "500 Harbor Blvd, San Diego, CA 92101",
    total_price: 412,
    status: "shipped",
    created_at: "2026-02-10T08:05:00.000Z",
  },
  {
    id: "ord_1004",
    customer_name: "Noah Bennett",
    email: "noah.bennett@example.com",
    phone: "+1-555-0148",
    address: "901 Pinecrest Rd, Seattle, WA 98109",
    total_price: 87.25,
    status: "completed",
    created_at: "2026-02-11T19:30:00.000Z",
  },
];

const mockOrderItemRows: SupabaseOrderItemRow[] = [
  {
    id: "item_1001_1",
    order_id: "ord_1001",
    product_id: "prd_101",
    product_name: "Wireless Mouse",
    quantity: 2,
    unit_price: 39.5,
  },
  {
    id: "item_1001_2",
    order_id: "ord_1001",
    product_id: "prd_205",
    product_name: "Mechanical Keyboard",
    quantity: 1,
    unit_price: 159.5,
  },
  {
    id: "item_1002_1",
    order_id: "ord_1002",
    product_id: "prd_501",
    product_name: "Laptop Stand",
    quantity: 1,
    unit_price: 49.99,
  },
  {
    id: "item_1002_2",
    order_id: "ord_1002",
    product_id: "prd_518",
    product_name: "USB-C Hub",
    quantity: 1,
    unit_price: 80,
  },
  {
    id: "item_1003_1",
    order_id: "ord_1003",
    product_id: "prd_802",
    product_name: "Noise-Canceling Headphones",
    quantity: 1,
    unit_price: 299,
  },
  {
    id: "item_1003_2",
    order_id: "ord_1003",
    product_id: "prd_315",
    product_name: "Webcam 4K",
    quantity: 1,
    unit_price: 113,
  },
  {
    id: "item_1004_1",
    order_id: "ord_1004",
    product_id: "prd_119",
    product_name: "Desk Mat",
    quantity: 1,
    unit_price: 22.25,
  },
  {
    id: "item_1004_2",
    order_id: "ord_1004",
    product_id: "prd_120",
    product_name: "Screen Cleaning Kit",
    quantity: 1,
    unit_price: 15,
  },
  {
    id: "item_1004_3",
    order_id: "ord_1004",
    product_id: "prd_121",
    product_name: "Cable Organizer",
    quantity: 2,
    unit_price: 25,
  },
];

const wait = async (ms: number): Promise<void> => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

const cloneOrder = (order: Order): Order => {
  return {
    ...order,
    items: order.items.map((item) => ({ ...item })),
    createdAt: new Date(order.createdAt),
  };
};

const buildOrders = (): Order[] => {
  return mockOrderRows.map((row) => {
    const itemRows = mockOrderItemRows.filter((item) => item.order_id === row.id);
    return mapSupabaseRowsToOrder(row, itemRows);
  });
};

export const mockOrders: Order[] = buildOrders();

export const mockOrderRepository: OrderRepository = {
  async listOrders(): Promise<Order[]> {
    await wait(MOCK_NETWORK_DELAY_MS);
    return buildOrders().map(cloneOrder);
  },
  async getOrderById(orderId: string): Promise<Order | null> {
    await wait(MOCK_NETWORK_DELAY_MS);
    const order = buildOrders().find((entry) => entry.id === orderId);
    return order ? cloneOrder(order) : null;
  },
};
