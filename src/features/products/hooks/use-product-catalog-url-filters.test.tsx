/**
 * @vitest-environment jsdom
 */

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useProductCatalogUrlFilters } from "@/features/products/hooks/use-product-catalog-url-filters";
import type { Product } from "@/features/products/types/product.types";

const navigationState = vi.hoisted(() => ({
  pathname: "/",
  routerPush: vi.fn(),
  routerReplace: vi.fn(),
  searchParams: "",
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
  useRouter: () => ({
    push: navigationState.routerPush,
    replace: navigationState.routerReplace,
  }),
  useSearchParams: () => new URLSearchParams(navigationState.searchParams),
}));

const products: Product[] = [
  {
    id: 1,
    title: "Leather Jacket",
    price: 79.95,
    description: "Classic outerwear",
    category: "men's clothing",
    image: "https://example.com/jacket.jpg",
    rating: {
      rate: 4.4,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Gold Bracelet",
    price: 129.5,
    description: "Polished jewelry",
    category: "jewelery",
    image: "https://example.com/bracelet.jpg",
    rating: {
      rate: 4.8,
      count: 52,
    },
  },
];

describe("useProductCatalogUrlFilters", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    navigationState.pathname = "/";
    navigationState.searchParams = "";
    navigationState.routerPush.mockClear();
    navigationState.routerReplace.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces search input before replacing the URL", () => {
    const { result } = renderHook(() => useProductCatalogUrlFilters(products));

    act(() => {
      result.current.setSearchInputValue("jacket");
    });

    expect(result.current.searchInputValue).toBe("jacket");
    expect(navigationState.routerReplace).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(249);
    });

    expect(navigationState.routerReplace).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(navigationState.routerReplace).toHaveBeenCalledWith("/?q=jacket", {
      scroll: false,
    });
  });

  it("does not truncate newer search input when an older debounced URL update commits", () => {
    const { rerender, result } = renderHook(() =>
      useProductCatalogUrlFilters(products),
    );

    act(() => {
      result.current.setSearchInputValue("me");
    });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(navigationState.routerReplace).toHaveBeenLastCalledWith("/?q=me", {
      scroll: false,
    });

    act(() => {
      result.current.setSearchInputValue("mens");
    });

    navigationState.searchParams = "q=me";

    act(() => {
      rerender();
    });

    expect(result.current.searchInputValue).toBe("mens");

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(navigationState.routerReplace).toHaveBeenLastCalledWith("/?q=mens", {
      scroll: false,
    });
  });

  it("syncs search input from external URL changes", () => {
    const { rerender, result } = renderHook(() =>
      useProductCatalogUrlFilters(products),
    );

    navigationState.searchParams = "q=gold";

    act(() => {
      rerender();
    });

    expect(result.current.searchInputValue).toBe("gold");
    expect(result.current.filters.searchTerm).toBe("gold");
  });

  it("pushes category and sort changes into the URL", () => {
    const { result } = renderHook(() => useProductCatalogUrlFilters(products));

    act(() => {
      result.current.updateCategory("jewelery");
    });

    expect(navigationState.routerPush).toHaveBeenLastCalledWith(
      "/?category=jewelery",
      {
        scroll: false,
      },
    );

    act(() => {
      result.current.updateSort("price-desc");
    });

    expect(navigationState.routerPush).toHaveBeenLastCalledWith(
      "/?sort=price-desc",
      {
        scroll: false,
      },
    );
  });

  it("clears filters and search input", () => {
    navigationState.searchParams = "q=gold&category=jewelery&sort=rating-desc";

    const { result } = renderHook(() => useProductCatalogUrlFilters(products));

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.searchInputValue).toBe("");
    expect(navigationState.routerPush).toHaveBeenCalledWith("/", {
      scroll: false,
    });
  });
});
