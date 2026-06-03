import { describe, expect, it } from "vitest";

import {
  buildCatalogHref,
  buildProductDetailHref,
  parseProductIdParam,
} from "@/features/products/utils/product-navigation";

describe("product navigation", () => {
  it("builds a product detail href without query parameters", () => {
    expect(buildProductDetailHref(5)).toBe("/products/5");
  });

  it("builds a product detail href with catalog query parameters", () => {
    expect(
      buildProductDetailHref(
        5,
        new URLSearchParams("q=gold&category=jewelery&sort=rating-desc"),
      ),
    ).toBe("/products/5?q=gold&category=jewelery&sort=rating-desc");
  });

  it("builds a catalog return href without query parameters", () => {
    expect(buildCatalogHref()).toBe("/");
  });

  it("builds a catalog return href with search query", () => {
    expect(buildCatalogHref(new URLSearchParams("q=shirt"))).toBe("/?q=shirt");
  });

  it("builds a catalog return href with category query", () => {
    expect(buildCatalogHref(new URLSearchParams("category=electronics"))).toBe(
      "/?category=electronics",
    );
  });

  it("builds a catalog return href with sort query", () => {
    expect(buildCatalogHref(new URLSearchParams("sort=price-asc"))).toBe(
      "/?sort=price-asc",
    );
  });

  it("preserves deterministic query parameter ordering", () => {
    expect(
      buildCatalogHref(
        new URLSearchParams("sort=price-asc&category=electronics&q=ssd"),
      ),
    ).toBe("/?q=ssd&category=electronics&sort=price-asc");
  });

  it("omits non-catalog query parameters", () => {
    expect(
      buildCatalogHref(
        new URLSearchParams("q=ssd&page=2&ref=promo&sort=price-desc"),
      ),
    ).toBe("/?q=ssd&sort=price-desc");
  });

  it("does not mutate input URLSearchParams", () => {
    const searchParams = new URLSearchParams("sort=price-desc&q=ssd");

    buildCatalogHref(searchParams);

    expect(searchParams.toString()).toBe("sort=price-desc&q=ssd");
  });

  it("parses valid product IDs and rejects invalid product IDs", () => {
    expect(parseProductIdParam("12")).toBe(12);
    expect(parseProductIdParam("not-a-number")).toBeNull();
    expect(parseProductIdParam("0")).toBeNull();
    expect(parseProductIdParam("-1")).toBeNull();
  });
});
