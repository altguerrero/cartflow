import { describe, expect, it } from "vitest";

import type { Product } from "@/features/products/types/product.types";
import {
  filterAndSortProducts,
  filterProductsByCategory,
  filterProductsBySearch,
  formatProductCategoryLabel,
  getProductCategories,
  sortProducts,
} from "@/features/products/utils/product-filters";

const products: Product[] = [
  {
    id: 1,
    title: "Leather Backpack",
    price: 109.95,
    description: "Fits laptops and daily carry essentials.",
    category: "men's clothing",
    image: "https://example.com/backpack.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Gold Ring",
    price: 695,
    description: "Elegant wedding jewelry with a polished finish.",
    category: "jewelery",
    image: "https://example.com/ring.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
  },
  {
    id: 3,
    title: "Portable SSD",
    price: 64,
    description: "Fast external storage for laptops.",
    category: "electronics",
    image: "https://example.com/ssd.jpg",
    rating: {
      rate: 4.8,
      count: 900,
    },
  },
  {
    id: 4,
    title: "Cotton Jacket",
    price: 55.99,
    description: "Light jacket for daily use.",
    category: "men's clothing",
    image: "https://example.com/jacket.jpg",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
];

describe("product filters", () => {
  it("searches products by title", () => {
    expect(filterProductsBySearch(products, "backpack")).toEqual([products[0]]);
  });

  it("searches products by description", () => {
    expect(filterProductsBySearch(products, "external storage")).toEqual([
      products[2],
    ]);
  });

  it("searches products by category label", () => {
    expect(filterProductsBySearch(products, "jewelry")).toEqual([products[1]]);
  });

  it("filters products by category", () => {
    expect(filterProductsByCategory(products, "men's clothing")).toEqual([
      products[0],
      products[3],
    ]);
  });

  it("sorts products by price ascending and descending", () => {
    expect(
      sortProducts(products, "price-asc").map((product) => product.id),
    ).toEqual([4, 3, 1, 2]);
    expect(
      sortProducts(products, "price-desc").map((product) => product.id),
    ).toEqual([2, 1, 3, 4]);
  });

  it("sorts products by rating ascending and descending", () => {
    expect(
      sortProducts(products, "rating-asc").map((product) => product.id),
    ).toEqual([1, 2, 4, 3]);
    expect(
      sortProducts(products, "rating-desc").map((product) => product.id),
    ).toEqual([3, 4, 2, 1]);
  });

  it("does not mutate the original products array", () => {
    const originalOrder = products.map((product) => product.id);

    sortProducts(products, "price-asc");

    expect(products.map((product) => product.id)).toEqual(originalOrder);
  });

  it("returns empty results when no products match", () => {
    expect(filterProductsBySearch(products, "not-a-product")).toEqual([]);
  });

  it("composes search, category filtering, and sorting", () => {
    expect(
      filterAndSortProducts(products, {
        searchTerm: "daily",
        category: "men's clothing",
        sort: "price-asc",
      }).map((product) => product.id),
    ).toEqual([4, 1]);
  });

  it("derives unique categories with polished labels available", () => {
    expect(getProductCategories(products)).toEqual([
      "electronics",
      "jewelery",
      "men's clothing",
    ]);
    expect(formatProductCategoryLabel("jewelery")).toBe("Jewelry");
  });
});
