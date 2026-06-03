import { createProductServiceError } from "@/features/products/services/products.errors";
import type { ProductCategory } from "@/features/products/types/product.types";
import {
  transformCategoriesResponse,
  transformProductResponse,
  transformProductsResponse,
} from "@/features/products/utils/product-transformers";

const PRODUCT_CATALOG_REVALIDATE_SECONDS = 60 * 60;

const PRODUCT_ENDPOINTS = {
  products: "/products",
  productById: (id: number) => `/products/${id}`,
  categories: "/products/categories",
} as const;

type NextFetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

type ProductFetchOperation = "getProducts" | "getProductById" | "getCategories";

function getApiBaseUrl(operation: ProductFetchOperation): URL {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    throw createProductServiceError({
      code: "api_configuration_error",
      message: "Product API base URL is not configured.",
      operation,
    });
  }

  try {
    return new URL(apiBaseUrl);
  } catch {
    throw createProductServiceError({
      code: "api_configuration_error",
      message: "Product API base URL is invalid.",
      operation,
    });
  }
}

function buildProductApiUrl(
  pathname: string,
  operation: ProductFetchOperation,
): string {
  const url = getApiBaseUrl(operation);
  url.pathname = pathname;
  return url.toString();
}

async function fetchCatalogJson(
  pathname: string,
  operation: ProductFetchOperation,
): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(buildProductApiUrl(pathname, operation), {
      next: {
        revalidate: PRODUCT_CATALOG_REVALIDATE_SECONDS,
      },
    } satisfies NextFetchOptions);
  } catch {
    throw createProductServiceError({
      code: "request_failed",
      message: "Product API request failed.",
      operation,
    });
  }

  if (!response.ok) {
    throw createProductServiceError({
      code: "request_failed",
      message: "Product API returned an unsuccessful response.",
      operation,
      status: response.status,
    });
  }

  try {
    return await response.json();
  } catch {
    throw createProductServiceError({
      code: "invalid_response",
      message: "Product API returned invalid JSON.",
      operation,
    });
  }
}

export async function getProducts() {
  const data = await fetchCatalogJson(PRODUCT_ENDPOINTS.products, "getProducts");
  return transformProductsResponse(data);
}

export async function getProductById(id: number) {
  const data = await fetchCatalogJson(
    PRODUCT_ENDPOINTS.productById(id),
    "getProductById",
  );

  return transformProductResponse(data);
}

export async function getCategories(): Promise<ProductCategory[]> {
  const data = await fetchCatalogJson(
    PRODUCT_ENDPOINTS.categories,
    "getCategories",
  );

  return transformCategoriesResponse(data);
}
