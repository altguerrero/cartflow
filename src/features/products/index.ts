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
  Product,
  ProductCategory,
  ProductRating,
} from "@/features/products/types/product.types";
