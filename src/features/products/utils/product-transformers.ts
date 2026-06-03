import {
  createProductServiceError,
  type ProductServiceOperation,
} from "@/features/products/services/products.errors";
import type {
  FakeStoreProductResponse,
  Product,
  ProductCategory,
  ProductRating,
} from "@/features/products/types/product.types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isProductRating(value: unknown): value is ProductRating {
  return (
    isRecord(value) &&
    isFiniteNumber(value.rate) &&
    isFiniteNumber(value.count)
  );
}

function isFakeStoreProductResponse(
  value: unknown,
): value is FakeStoreProductResponse {
  return (
    isRecord(value) &&
    isFiniteNumber(value.id) &&
    isString(value.title) &&
    isFiniteNumber(value.price) &&
    isString(value.description) &&
    isString(value.category) &&
    isString(value.image) &&
    isProductRating(value.rating)
  );
}

function throwInvalidResponse(operation: ProductServiceOperation): never {
  throw createProductServiceError({
    code: "invalid_response",
    message: "Fake Store API returned an invalid product catalog response.",
    operation,
  });
}

export function transformProductResponse(value: unknown): Product {
  if (!isFakeStoreProductResponse(value)) {
    throwInvalidResponse("transformProduct");
  }

  return {
    id: value.id,
    title: value.title,
    price: value.price,
    description: value.description,
    category: value.category,
    image: value.image,
    rating: {
      rate: value.rating.rate,
      count: value.rating.count,
    },
  };
}

export function transformProductsResponse(value: unknown): Product[] {
  if (!Array.isArray(value)) {
    throwInvalidResponse("transformProducts");
  }

  return value.map(transformProductResponse);
}

export function transformCategoriesResponse(value: unknown): ProductCategory[] {
  if (!Array.isArray(value) || !value.every(isString)) {
    throwInvalidResponse("transformCategories");
  }

  return value;
}
