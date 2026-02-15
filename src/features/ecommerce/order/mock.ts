import { type Order, type OrderRepository } from "./types";

const MOCK_REQUEST_DELAY_MS = 120;

const mockOrders: Order[] = [
  {
    id: "ord_24001",
    customerName: "Ariana Park",
    customerEmail: "ariana.park@example.com",
    customerPhone: "+1-555-0134",
    shippingAddress: "101 Maple St, Denver, CO 80203",
    status: "pending",
    createdAt: new Date("2026-02-10T10:22:00.000Z"),
    totalPrice: 238.5,
    items: [
      {
        id: "item_24001_1",
        productId: "prd_101",
        productName: "Wireless Mouse",
        quantity: 2,
        unitPrice: 39.5,
      },
      {
        id: "item_24001_2",
        productId: "prd_205",
        productName: "Mechanical Keyboard",
        quantity: 1,
        unitPrice: 159.5,
      },
    ],
  },
  {
    id: "ord_24002",
    customerName: "Julian Rivera",
    customerEmail: "julian.rivera@example.com",
    customerPhone: "+1-555-0190",
    shippingAddress: "77 Spring Ave, Austin, TX 78701",
    status: "paid",
    createdAt: new Date("2026-02-10T15:41:00.000Z"),
    totalPrice: 129.99,
    items: [
      {
        id: "item_24002_1",
        productId: "prd_501",
        productName: "Laptop Stand",
        quantity: 1,
        unitPrice: 49.99,
      },
      {
        id: "item_24002_2",
        productId: "prd_518",
        productName: "USB-C Hub",
        quantity: 1,
        unitPrice: 80,
      },
    ],
  },
  {
    id: "ord_24003",
    customerName: "Mina Choi",
    customerEmail: "mina.choi@example.com",
    customerPhone: "+1-555-0127",
    shippingAddress: "500 Harbor Blvd, San Diego, CA 92101",
    status: "processing",
    createdAt: new Date("2026-02-11T08:05:00.000Z"),
    totalPrice: 412,
    items: [
      {
        id: "item_24003_1",
        productId: "prd_802",
        productName: "Noise-Canceling Headphones",
        quantity: 1,
        unitPrice: 299,
      },
      {
        id: "item_24003_2",
        productId: "prd_315",
        productName: "Webcam 4K",
        quantity: 1,
        unitPrice: 113,
      },
    ],
  },
  {
    id: "ord_24004",
    customerName: "Noah Bennett",
    customerEmail: "noah.bennett@example.com",
    customerPhone: "+1-555-0148",
    shippingAddress: "901 Pinecrest Rd, Seattle, WA 98109",
    status: "shipped",
    createdAt: new Date("2026-02-11T19:30:00.000Z"),
    totalPrice: 87.25,
    items: [
      {
        id: "item_24004_1",
        productId: "prd_119",
        productName: "Desk Mat",
        quantity: 1,
        unitPrice: 22.25,
      },
      {
        id: "item_24004_2",
        productId: "prd_120",
        productName: "Screen Cleaning Kit",
        quantity: 1,
        unitPrice: 15,
      },
      {
        id: "item_24004_3",
        productId: "prd_121",
        productName: "Cable Organizer",
        quantity: 2,
        unitPrice: 25,
      },
    ],
  },
  {
    id: "ord_24005",
    customerName: "Hana Kim",
    customerEmail: "hana.kim@example.com",
    customerPhone: "+1-555-0181",
    shippingAddress: "380 3rd St, Brooklyn, NY 11215",
    status: "completed",
    createdAt: new Date("2026-02-12T13:18:00.000Z"),
    totalPrice: 59,
    items: [
      {
        id: "item_24005_1",
        productId: "prd_712",
        productName: "Insulated Bottle",
        quantity: 1,
        unitPrice: 29,
      },
      {
        id: "item_24005_2",
        productId: "prd_730",
        productName: "Travel Pouch",
        quantity: 1,
        unitPrice: 30,
      },
    ],
  },
  {
    id: "ord_24006",
    customerName: "Ian Morales",
    customerEmail: "ian.morales@example.com",
    customerPhone: "+1-555-0165",
    shippingAddress: "901 Meadow Ln, Phoenix, AZ 85016",
    status: "cancelled",
    createdAt: new Date("2026-02-12T18:07:00.000Z"),
    totalPrice: 199.99,
    items: [
      {
        id: "item_24006_1",
        productId: "prd_440",
        productName: "Smart Light Strip",
        quantity: 1,
        unitPrice: 79.99,
      },
      {
        id: "item_24006_2",
        productId: "prd_441",
        productName: "Smart Plug Set",
        quantity: 2,
        unitPrice: 60,
      },
    ],
  },
];

const wait = async (delayMs: number): Promise<void> => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });
};

const cloneOrder = (order: Order): Order => {
  return {
    ...order,
    createdAt: new Date(order.createdAt.getTime()),
    items: order.items.map((item) => ({ ...item })),
  };
};

const buildOrders = (): Order[] => {
  return mockOrders.map(cloneOrder);
};

export const mockOrderRepository: OrderRepository = {
  async listOrders(): Promise<Order[]> {
    await wait(MOCK_REQUEST_DELAY_MS);
    return buildOrders();
  },
  async getOrderById(orderId: string): Promise<Order | null> {
    await wait(MOCK_REQUEST_DELAY_MS);
    return buildOrders().find((order) => order.id === orderId) ?? null;
  },
};
