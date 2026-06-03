import {
  createProductServiceError,
  ProductServiceError,
} from "@/features/products/services/products.errors";
import {
  FALLBACK_CATEGORIES,
  FALLBACK_PRODUCTS,
} from "@/features/products/data/fallback-products";
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
  const apiBaseUrl = globalThis.process?.env?.NEXT_PUBLIC_API_URL;

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
  const requestUrl = buildProductApiUrl(pathname, operation);
  let response: Response;

  try {
    response = await fetch(requestUrl, {
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
  try {
    const data = await fetchCatalogJson(
      PRODUCT_ENDPOINTS.products,
      "getProducts",
    );
    return transformProductsResponse(data);
  } catch (error) {
    if (isRecoverableCatalogError(error)) {
      return FALLBACK_PRODUCTS;
    }

    throw error;
  }
}

export async function getProductById(id: number) {
  try {
    const data = await fetchCatalogJson(
      PRODUCT_ENDPOINTS.productById(id),
      "getProductById",
    );

    return transformProductResponse(data);
  } catch (error) {
    const fallbackProduct = FALLBACK_PRODUCTS.find(
      (product) => product.id === id,
    );

    if (fallbackProduct && isRecoverableCatalogError(error)) {
      return fallbackProduct;
    }

    throw error;
  }
}

export async function getCategories(): Promise<ProductCategory[]> {
  try {
    const data = await fetchCatalogJson(
      PRODUCT_ENDPOINTS.categories,
      "getCategories",
    );

    return transformCategoriesResponse(data);
  } catch (error) {
    if (isRecoverableCatalogError(error)) {
      return FALLBACK_CATEGORIES;
    }

    throw error;
  }
}

function isRecoverableCatalogError(error: unknown): boolean {
  if (!(error instanceof ProductServiceError)) {
    return false;
  }

  if (error.code === "api_configuration_error") {
    return false;
  }

  return error.status !== 404;
}
