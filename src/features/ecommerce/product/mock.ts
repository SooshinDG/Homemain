import type { Product } from "./types";

export const mockProducts = [
  {
    id: "prd_001",
    name: "CloudFlex Everyday Sneakers",
    description:
      "Lightweight daily sneakers with breathable mesh and soft rebound midsoles.",
    price: 89,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    category: "Footwear",
  },
  {
    id: "prd_002",
    name: "Nordic Ceramic Mug Set",
    description:
      "Set of 4 matte ceramic mugs for modern kitchens and cafe-inspired setups.",
    price: 34,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=80",
    category: "Home",
  },
  {
    id: "prd_003",
    name: "AeroLite Carry-On Luggage",
    description:
      "Hard-shell carry-on with 360-degree spinner wheels and expandable storage.",
    price: 159,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80",
    category: "Travel",
  },
  {
    id: "prd_004",
    name: "Studio Wireless Headphones",
    description:
      "Over-ear headphones with active noise cancellation and all-day battery.",
    price: 199,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    category: "Audio",
  },
  {
    id: "prd_005",
    name: "Terra Linen Shirt",
    description:
      "Relaxed fit linen shirt designed for warm weather and effortless layering.",
    price: 54,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
  },
  {
    id: "prd_006",
    name: "DeskBloom Minimal Lamp",
    description:
      "Dimmable desk lamp with warm and cool lighting presets for focus sessions.",
    price: 72,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    category: "Workspace",
  },
] satisfies ReadonlyArray<Product>;
