import type {
  Product,
  ProductCategory,
} from "@/features/products/types/product.types";

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Everyday Tech Pack",
    price: 74.95,
    description:
      "A compact daily carry set for keeping small devices, chargers, and work essentials organized.",
    category: "electronics",
    image: "/fallback-products/everyday-tech-pack.svg",
    rating: {
      rate: 4.6,
      count: 128,
    },
  },
  {
    id: 2,
    title: "Minimal Desk Lamp",
    price: 46.5,
    description:
      "A clean adjustable lamp designed for focused work sessions and low-glare evening browsing.",
    category: "electronics",
    image: "/fallback-products/minimal-desk-lamp.svg",
    rating: {
      rate: 4.4,
      count: 92,
    },
  },
  {
    id: 3,
    title: "Travel Knit Jacket",
    price: 58,
    description:
      "A lightweight layer with a soft knit finish, built for travel days and casual storefront browsing.",
    category: "men's clothing",
    image: "/fallback-products/travel-knit-jacket.svg",
    rating: {
      rate: 4.3,
      count: 74,
    },
  },
  {
    id: 4,
    title: "Structured Canvas Tote",
    price: 39.25,
    description:
      "A durable canvas tote with enough structure for errands, office runs, and weekend essentials.",
    category: "women's clothing",
    image: "/fallback-products/structured-canvas-tote.svg",
    rating: {
      rate: 4.7,
      count: 141,
    },
  },
  {
    id: 5,
    title: "Polished Chain Bracelet",
    price: 64,
    description:
      "A refined everyday bracelet with a clean polished finish and an easy adjustable clasp.",
    category: "jewelery",
    image: "/fallback-products/polished-chain-bracelet.svg",
    rating: {
      rate: 4.5,
      count: 83,
    },
  },
  {
    id: 6,
    title: "Compact Wireless Speaker",
    price: 52.9,
    description:
      "A portable speaker with a compact profile for desks, shelves, and small shared spaces.",
    category: "electronics",
    image: "/fallback-products/compact-wireless-speaker.svg",
    rating: {
      rate: 4.2,
      count: 116,
    },
  },
];

export const FALLBACK_CATEGORIES: ProductCategory[] = Array.from(
  new Set(FALLBACK_PRODUCTS.map((product) => product.category)),
);
