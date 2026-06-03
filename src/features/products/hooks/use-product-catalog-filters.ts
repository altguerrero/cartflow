"use client";

import { useEffect, useMemo, useState } from "react";

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

const SEARCH_DEBOUNCE_MS = 250;

export function useProductCatalogFilters(products: Product[]) {
  const [searchInputValue, setSearchInputValue] = useState(
    DEFAULT_PRODUCT_FILTERS.searchTerm,
  );
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    DEFAULT_PRODUCT_FILTERS.searchTerm,
  );
  const [category, setCategory] = useState<ProductFilterState["category"]>(
    DEFAULT_PRODUCT_FILTERS.category,
  );
  const [sort, setSort] = useState<ProductSortOption>(
    DEFAULT_PRODUCT_FILTERS.sort,
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchTerm(searchInputValue);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchInputValue]);

  const categories = useMemo(() => getProductCategories(products), [products]);

  const filters = useMemo<ProductFilterState>(
    () => ({
      searchTerm: debouncedSearchTerm,
      category,
      sort,
    }),
    [category, debouncedSearchTerm, sort],
  );

  const filteredProducts = useMemo(
    () => filterAndSortProducts(products, filters),
    [filters, products],
  );

  const hasActiveFilters = hasActiveProductFilters(filters);

  function updateCategory(nextCategory: ProductCategory | "all") {
    setCategory(nextCategory);
  }

  function updateSort(nextSort: ProductSortOption) {
    setSort(nextSort);
  }

  function clearFilters() {
    setSearchInputValue(DEFAULT_PRODUCT_FILTERS.searchTerm);
    setDebouncedSearchTerm(DEFAULT_PRODUCT_FILTERS.searchTerm);
    setCategory(DEFAULT_PRODUCT_FILTERS.category);
    setSort(DEFAULT_PRODUCT_FILTERS.sort);
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
