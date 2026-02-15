import type { Product } from "./types";

export const mockProducts = [
  {
    id: "prd_001",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Over-ear Bluetooth headphones with adaptive noise cancellation and 30-hour battery life.",
    price: 199.99,
    imageUrl: "/images/products/headphones-wireless.jpg",
    currency: "USD",
    category: "Audio",
    createdAt: new Date("2026-01-04T10:30:00.000Z"),
  },
  {
    id: "prd_002",
    name: "Minimalist Running Shoes",
    description:
      "Lightweight everyday running shoes with breathable mesh upper and responsive midsole.",
    price: 119,
    imageUrl: "/images/products/running-shoes-minimalist.jpg",
    currency: "USD",
    category: "Footwear",
    createdAt: new Date("2026-01-08T08:15:00.000Z"),
  },
  {
    id: "prd_003",
    name: "Stainless Steel Water Bottle",
    description:
      "Insulated bottle that keeps beverages cold for 24 hours or hot for 12 hours.",
    price: 29.5,
    imageUrl: "/images/products/water-bottle-steel.jpg",
    currency: "USD",
    category: "Accessories",
    createdAt: new Date("2026-01-12T14:05:00.000Z"),
  },
  {
    id: "prd_004",
    name: "Ergonomic Office Chair",
    description:
      "High-back office chair with adjustable lumbar support and breathable fabric seat.",
    price: 349,
    imageUrl: "/images/products/office-chair-ergonomic.jpg",
    currency: "USD",
    category: "Furniture",
    createdAt: new Date("2026-01-18T11:45:00.000Z"),
  },
] satisfies ReadonlyArray<Product>;
