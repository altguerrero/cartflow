export type ProductServiceErrorCode =
  | "api_configuration_error"
  | "request_failed"
  | "invalid_response";

export type ProductServiceOperation =
  | "getProducts"
  | "getProductById"
  | "getCategories"
  | "transformProduct"
  | "transformProducts"
  | "transformCategories";

export interface ProductServiceErrorDetails {
  code: ProductServiceErrorCode;
  message: string;
  operation: ProductServiceOperation;
  status?: number;
}

export class ProductServiceError extends Error {
  code: ProductServiceErrorCode;
  operation: ProductServiceOperation;
  status?: number;

  constructor(details: ProductServiceErrorDetails) {
    super(details.message);
    this.name = "ProductServiceError";
    this.code = details.code;
    this.operation = details.operation;
    this.status = details.status;
  }
}

export function createProductServiceError(
  details: ProductServiceErrorDetails,
): ProductServiceError {
  return new ProductServiceError(details);
}
