export { ProductCatalog } from "@/features/products/components/product-catalog";
export { ProductCatalogSkeleton } from "@/features/products/components/product-catalog-skeleton";
export { ProductDetail } from "@/features/products/components/product-detail";
export { ProductDetailSkeleton } from "@/features/products/components/product-detail-skeleton";
export { ProductGrid } from "@/features/products/components/product-grid";
export {
  createProductServiceError,
  ProductServiceError,
  type ProductServiceErrorCode,
  type ProductServiceOperation,
} from "@/features/products/services/products.errors";
export {
  getCategories,
  getProductById,
  getProducts,
} from "@/features/products/services/products.service";
export type {
  ProductFilterState,
  ProductSortOption,
} from "@/features/products/types/product-filters.types";
export type {
  Product,
  ProductCategory,
  ProductRating,
} from "@/features/products/types/product.types";
