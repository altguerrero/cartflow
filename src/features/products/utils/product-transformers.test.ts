import { describe, expect, it } from "vitest";

import { ProductServiceError } from "@/features/products/services/products.errors";
import {
  transformCategoriesResponse,
  transformProductResponse,
  transformProductsResponse,
} from "@/features/products/utils/product-transformers";

const fakeStoreProduct = {
  id: 1,
  title: "Sample product",
  price: 29.99,
  description: "A sample product description.",
  category: "electronics",
  image: "https://example.com/product.png",
  rating: {
    rate: 4.5,
    count: 120,
  },
};

describe("product transformers", () => {
  it("transforms a valid Fake Store product response into a domain product", () => {
    expect(transformProductResponse(fakeStoreProduct)).toEqual(fakeStoreProduct);
  });

  it("transforms a valid Fake Store product list response", () => {
    expect(transformProductsResponse([fakeStoreProduct])).toEqual([
      fakeStoreProduct,
    ]);
  });

  it("transforms valid category responses", () => {
    expect(transformCategoriesResponse(["electronics", "jewelery"])).toEqual([
      "electronics",
      "jewelery",
    ]);
  });

  it("rejects malformed product responses", () => {
    expect(() =>
      transformProductResponse({
        ...fakeStoreProduct,
        rating: undefined,
      }),
    ).toThrow(ProductServiceError);
  });

  it("rejects malformed product list responses", () => {
    expect(() => transformProductsResponse({ products: [] })).toThrow(
      ProductServiceError,
    );
  });

  it("rejects malformed category responses", () => {
    expect(() => transformCategoriesResponse(["electronics", 42])).toThrow(
      ProductServiceError,
    );
  });
});
