import type { ProductCategory } from "@/features/products/types/product.types";

export type ProductSortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "rating-asc";

export interface ProductFilterState {
  searchTerm: string;
  category: ProductCategory | "all";
  sort: ProductSortOption;
}
