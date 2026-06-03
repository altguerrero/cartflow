import type { ProductFilterState } from "@/features/products/types/product-filters.types";
import type { ProductCategory } from "@/features/products/types/product.types";

export type ProductFilterQueryParam = "q" | "category" | "sort";

export interface ProductFilterUrlParseOptions {
  categories: ProductCategory[];
}

export interface ProductFilterUrlBuildOptions {
  currentSearchParams?: URLSearchParams;
  filters: ProductFilterState;
}
