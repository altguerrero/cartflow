import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { FALLBACK_PRODUCTS } from "@/features/products/data/fallback-products";
import { ProductServiceError } from "@/features/products/services/products.errors";
import {
  getCategories,
  getProductById,
  getProducts,
} from "@/features/products/services/products.service";

const originalApiUrl = process.env.NEXT_PUBLIC_API_URL;
const originalFetch = globalThis.fetch;

const apiProduct = {
  id: 42,
  title: "API product",
  price: 19.99,
  description: "Product from the configured API.",
  category: "electronics",
  image: "https://example.com/api-product.png",
  rating: {
    rate: 4.1,
    count: 18,
  },
};

describe("products service", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_URL = "https://fakestoreapi.com";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_URL = originalApiUrl;
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("returns products from the configured API when the request succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse([apiProduct])),
    );

    await expect(getProducts()).resolves.toEqual([apiProduct]);
  });

  it("returns fallback products when the configured API request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("Network unavailable");
      }),
    );

    await expect(getProducts()).resolves.toEqual(FALLBACK_PRODUCTS);
  });

  it("returns a fallback product detail when provider access fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("Forbidden", { status: 403 })),
    );

    await expect(getProductById(FALLBACK_PRODUCTS[0].id)).resolves.toEqual(
      FALLBACK_PRODUCTS[0],
    );
  });

  it("preserves not found responses for product detail routes", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("Not found", { status: 404 })),
    );

    await expect(getProductById(FALLBACK_PRODUCTS[0].id)).rejects.toMatchObject(
      {
        code: "request_failed",
        status: 404,
      },
    );
  });

  it("does not hide a missing API configuration", async () => {
    process.env.NEXT_PUBLIC_API_URL = "";
    vi.stubGlobal("fetch", vi.fn());

    await expect(getProducts()).rejects.toMatchObject({
      code: "api_configuration_error",
    });
    await expect(getProducts()).rejects.toBeInstanceOf(ProductServiceError);
  });

  it("returns fallback categories when category fetching fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("<html></html>", { status: 502 })),
    );

    await expect(getCategories()).resolves.toEqual([
      "electronics",
      "men's clothing",
      "women's clothing",
      "jewelery",
    ]);
  });
});

function jsonResponse(value: unknown): Response {
  return new Response(JSON.stringify(value), {
    headers: {
      "content-type": "application/json",
    },
  });
}
