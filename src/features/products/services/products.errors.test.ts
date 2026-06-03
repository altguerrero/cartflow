import { describe, expect, it } from "vitest";

import {
  createProductServiceError,
  ProductServiceError,
} from "@/features/products/services/products.errors";

describe("product service errors", () => {
  it("creates a predictable product service error", () => {
    const error = createProductServiceError({
      code: "request_failed",
      message: "Product API request failed.",
      operation: "getProducts",
      status: 500,
    });

    expect(error).toBeInstanceOf(ProductServiceError);
    expect(error.name).toBe("ProductServiceError");
    expect(error.code).toBe("request_failed");
    expect(error.operation).toBe("getProducts");
    expect(error.status).toBe(500);
    expect(error.message).toBe("Product API request failed.");
  });
});
