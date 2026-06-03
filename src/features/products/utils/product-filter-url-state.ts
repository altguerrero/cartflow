import type {
  ProductFilterState,
  ProductSortOption,
} from "@/features/products/types/product-filters.types";
import type {
  ProductFilterQueryParam,
  ProductFilterUrlBuildOptions,
  ProductFilterUrlParseOptions,
} from "@/features/products/types/product-filter-url-state.types";
import { DEFAULT_PRODUCT_FILTERS } from "@/features/products/utils/product-filters";

export const PRODUCT_FILTER_QUERY_PARAMS = {
  search: "q",
  category: "category",
  sort: "sort",
} as const satisfies Record<string, ProductFilterQueryParam>;

const CATALOG_QUERY_PARAM_NAMES = new Set<string>(
  Object.values(PRODUCT_FILTER_QUERY_PARAMS),
);

export function parseProductFilterUrlState(
  searchParams: URLSearchParams,
  options: ProductFilterUrlParseOptions,
): ProductFilterState {
  const searchTerm =
    searchParams.get(PRODUCT_FILTER_QUERY_PARAMS.search)?.trim() ??
    DEFAULT_PRODUCT_FILTERS.searchTerm;
  const category = getValidCategory(
    searchParams.get(PRODUCT_FILTER_QUERY_PARAMS.category),
    options.categories,
  );
  const sort = getValidSortOption(
    searchParams.get(PRODUCT_FILTER_QUERY_PARAMS.sort),
  );

  return {
    searchTerm,
    category,
    sort,
  };
}

export function buildProductFilterQueryString({
  currentSearchParams,
  filters,
}: ProductFilterUrlBuildOptions): string {
  const nextSearchParams = new URLSearchParams();

  appendCatalogFilterParams(nextSearchParams, filters);

  if (currentSearchParams) {
    currentSearchParams.forEach((value, key) => {
      if (!CATALOG_QUERY_PARAM_NAMES.has(key)) {
        nextSearchParams.append(key, value);
      }
    });
  }

  return nextSearchParams.toString();
}

function appendCatalogFilterParams(
  searchParams: URLSearchParams,
  filters: ProductFilterState,
) {
  const normalizedSearchTerm = filters.searchTerm.trim();

  if (normalizedSearchTerm) {
    searchParams.set(PRODUCT_FILTER_QUERY_PARAMS.search, normalizedSearchTerm);
  }

  if (filters.category !== DEFAULT_PRODUCT_FILTERS.category) {
    searchParams.set(PRODUCT_FILTER_QUERY_PARAMS.category, filters.category);
  }

  if (filters.sort !== DEFAULT_PRODUCT_FILTERS.sort) {
    searchParams.set(PRODUCT_FILTER_QUERY_PARAMS.sort, filters.sort);
  }
}

function getValidCategory(
  category: string | null,
  categories: string[],
): ProductFilterState["category"] {
  if (!category || category === DEFAULT_PRODUCT_FILTERS.category) {
    return DEFAULT_PRODUCT_FILTERS.category;
  }

  return categories.includes(category)
    ? category
    : DEFAULT_PRODUCT_FILTERS.category;
}

function getValidSortOption(sort: string | null): ProductSortOption {
  if (!sort) {
    return DEFAULT_PRODUCT_FILTERS.sort;
  }

  return isProductSortOption(sort) ? sort : DEFAULT_PRODUCT_FILTERS.sort;
}

function isProductSortOption(value: string): value is ProductSortOption {
  switch (value) {
    case "featured":
    case "price-asc":
    case "price-desc":
    case "rating-desc":
    case "rating-asc":
      return true;
    default:
      return false;
  }
}
