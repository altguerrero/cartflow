"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

import type {
  ProductFilterState,
  ProductSortOption,
} from "@/features/products/types/product-filters.types";
import type {
  Product,
  ProductCategory,
} from "@/features/products/types/product.types";
import {
  DEFAULT_PRODUCT_FILTERS,
  filterAndSortProducts,
  getProductCategories,
  hasActiveProductFilters,
} from "@/features/products/utils/product-filters";
import {
  buildProductFilterQueryString,
  parseProductFilterUrlState,
} from "@/features/products/utils/product-filter-url-state";

const SEARCH_DEBOUNCE_MS = 250;

interface SearchInputState {
  lastUrlSearchTerm: string;
  value: string;
}

type SearchInputAction =
  | {
      type: "userInputChanged";
      value: string;
    }
  | {
      searchTerm: string;
      type: "urlSearchTermChanged";
    }
  | {
      searchTerm: string;
      type: "urlSearchTermCommitted";
    };

function searchInputReducer(
  state: SearchInputState,
  action: SearchInputAction,
): SearchInputState {
  switch (action.type) {
    case "userInputChanged":
      return {
        ...state,
        value: action.value,
      };
    case "urlSearchTermChanged":
      if (action.searchTerm === state.lastUrlSearchTerm) {
        return state;
      }

      return {
        lastUrlSearchTerm: action.searchTerm,
        value: action.searchTerm,
      };
    case "urlSearchTermCommitted":
      return {
        ...state,
        lastUrlSearchTerm: action.searchTerm,
      };
  }
}

export function useProductCatalogUrlFilters(products: Product[]) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const pendingInternalSearchTermRef = useRef<string | null>(null);

  const categories = useMemo(() => getProductCategories(products), [products]);

  const filters = useMemo<ProductFilterState>(
    () =>
      parseProductFilterUrlState(new URLSearchParams(searchParamsString), {
        categories,
      }),
    [categories, searchParamsString],
  );

  const [searchInputState, dispatchSearchInput] = useReducer(
    searchInputReducer,
    filters.searchTerm,
    (searchTerm): SearchInputState => ({
      lastUrlSearchTerm: searchTerm,
      value: searchTerm,
    }),
  );
  const searchInputValue = searchInputState.value;

  useEffect(() => {
    if (pendingInternalSearchTermRef.current === filters.searchTerm) {
      pendingInternalSearchTermRef.current = null;
      dispatchSearchInput({
        searchTerm: filters.searchTerm,
        type: "urlSearchTermCommitted",
      });
      return;
    }

    dispatchSearchInput({
      searchTerm: filters.searchTerm,
      type: "urlSearchTermChanged",
    });
  }, [filters.searchTerm]);

  const setSearchInputValue = useCallback((value: string) => {
    dispatchSearchInput({
      type: "userInputChanged",
      value,
    });
  }, []);

  const navigateToFilters = useCallback(
    (nextFilters: ProductFilterState, navigationMode: "push" | "replace") => {
      const nextQueryString = buildProductFilterQueryString({
        currentSearchParams: new URLSearchParams(searchParamsString),
        filters: nextFilters,
      });
      const nextHref = nextQueryString
        ? `${pathname}?${nextQueryString}`
        : pathname;

      if (nextQueryString === searchParamsString) {
        return;
      }

      if (navigationMode === "push") {
        router.push(nextHref, { scroll: false });
        return;
      }

      router.replace(nextHref, { scroll: false });
    },
    [pathname, router, searchParamsString],
  );

  useEffect(() => {
    const normalizedSearchInputValue = searchInputValue.trim();

    if (normalizedSearchInputValue === filters.searchTerm) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      pendingInternalSearchTermRef.current = normalizedSearchInputValue;
      navigateToFilters(
        {
          ...filters,
          searchTerm: searchInputValue,
        },
        "replace",
      );
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [filters, navigateToFilters, searchInputValue]);

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, filters),
    [filters, products],
  );

  const hasActiveFilters = hasActiveProductFilters(filters);

  function updateCategory(nextCategory: ProductCategory | "all") {
    navigateToFilters(
      {
        ...filters,
        category: nextCategory,
      },
      "push",
    );
  }

  function updateSort(nextSort: ProductSortOption) {
    navigateToFilters(
      {
        ...filters,
        sort: nextSort,
      },
      "push",
    );
  }

  function clearFilters() {
    setSearchInputValue(DEFAULT_PRODUCT_FILTERS.searchTerm);
    navigateToFilters(DEFAULT_PRODUCT_FILTERS, "push");
  }

  return {
    categories,
    clearFilters,
    filteredProducts,
    filters,
    hasActiveFilters,
    searchInputValue,
    setSearchInputValue,
    updateCategory,
    updateSort,
  };
}
