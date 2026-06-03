import { PRODUCT_FILTER_QUERY_PARAMS } from "@/features/products/utils/product-filter-url-state";

const PRODUCT_ROUTE_BASE = "/products";
const CATALOG_ROUTE = "/";
const PRODUCT_FILTER_QUERY_PARAM_ORDER = [
  PRODUCT_FILTER_QUERY_PARAMS.search,
  PRODUCT_FILTER_QUERY_PARAMS.category,
  PRODUCT_FILTER_QUERY_PARAMS.sort,
] as const;

export function parseProductIdParam(productId: string): number | null {
  if (!/^[1-9]\d*$/.test(productId)) {
    return null;
  }

  const parsedProductId = Number(productId);

  return Number.isSafeInteger(parsedProductId) ? parsedProductId : null;
}

export function buildProductDetailHref(
  productId: number,
  searchParams?: URLSearchParams | string,
): string {
  const queryString = buildCatalogQueryString(searchParams);

  return queryString
    ? `${PRODUCT_ROUTE_BASE}/${productId}?${queryString}`
    : `${PRODUCT_ROUTE_BASE}/${productId}`;
}

export function buildCatalogHref(
  searchParams?: URLSearchParams | string,
): string {
  const queryString = buildCatalogQueryString(searchParams);

  return queryString ? `${CATALOG_ROUTE}?${queryString}` : CATALOG_ROUTE;
}

export function buildCatalogQueryString(
  searchParams?: URLSearchParams | string,
): string {
  if (!searchParams) {
    return "";
  }

  const sourceSearchParams =
    typeof searchParams === "string"
      ? new URLSearchParams(searchParams)
      : searchParams;
  const catalogSearchParams = new URLSearchParams();

  PRODUCT_FILTER_QUERY_PARAM_ORDER.forEach((queryParamName) => {
    const value = sourceSearchParams.get(queryParamName)?.trim();

    if (value) {
      catalogSearchParams.set(queryParamName, value);
    }
  });

  return catalogSearchParams.toString();
}
