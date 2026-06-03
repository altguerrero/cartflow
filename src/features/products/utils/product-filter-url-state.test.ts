import { describe, expect, it } from "vitest";

import {
  buildProductFilterQueryString,
  parseProductFilterUrlState,
} from "@/features/products/utils/product-filter-url-state";

const categories = ["electronics", "jewelery", "men's clothing"];

describe("product filter URL state", () => {
  it("parses a valid search query", () => {
    expect(
      parseProductFilterUrlState(new URLSearchParams("q=gold"), {
        categories,
      }).searchTerm,
    ).toBe("gold");
  });

  it("parses a valid category query", () => {
    expect(
      parseProductFilterUrlState(new URLSearchParams("category=electronics"), {
        categories,
      }).category,
    ).toBe("electronics");
  });

  it("parses a valid sort query", () => {
    expect(
      parseProductFilterUrlState(new URLSearchParams("sort=price-asc"), {
        categories,
      }).sort,
    ).toBe("price-asc");
  });

  it("falls back when category query is invalid", () => {
    expect(
      parseProductFilterUrlState(new URLSearchParams("category=unknown"), {
        categories,
      }).category,
    ).toBe("all");
  });

  it("falls back when sort query is invalid", () => {
    expect(
      parseProductFilterUrlState(new URLSearchParams("sort=not-real"), {
        categories,
      }).sort,
    ).toBe("featured");
  });

  it("omits default values when serializing query state", () => {
    expect(
      buildProductFilterQueryString({
        filters: {
          searchTerm: "",
          category: "all",
          sort: "featured",
        },
      }),
    ).toBe("");
  });

  it("serializes combined search, category, and sort state", () => {
    expect(
      buildProductFilterQueryString({
        filters: {
          searchTerm: "gold",
          category: "jewelery",
          sort: "rating-desc",
        },
      }),
    ).toBe("q=gold&category=jewelery&sort=rating-desc");
  });

  it("preserves deterministic catalog query parameter ordering", () => {
    expect(
      buildProductFilterQueryString({
        currentSearchParams: new URLSearchParams("sort=price-asc&q=ssd"),
        filters: {
          searchTerm: "ssd",
          category: "electronics",
          sort: "price-asc",
        },
      }),
    ).toBe("q=ssd&category=electronics&sort=price-asc");
  });

  it("does not mutate input URLSearchParams", () => {
    const searchParams = new URLSearchParams("q=gold&category=jewelery");

    buildProductFilterQueryString({
      currentSearchParams: searchParams,
      filters: {
        searchTerm: "",
        category: "all",
        sort: "featured",
      },
    });

    expect(searchParams.toString()).toBe("q=gold&category=jewelery");
  });

  it("handles empty or whitespace-only search values", () => {
    const parsedFilters = parseProductFilterUrlState(
      new URLSearchParams("q=%20%20%20"),
      { categories },
    );

    expect(parsedFilters.searchTerm).toBe("");
    expect(
      buildProductFilterQueryString({
        filters: {
          ...parsedFilters,
          category: "all",
          sort: "featured",
        },
      }),
    ).toBe("");
  });
});
