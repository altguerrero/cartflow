import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ErrorState } from "@/components/ui/error-state";
import { RouteRefreshButton } from "@/components/ui/route-refresh-button";
import {
  getProductById,
  ProductDetail,
  ProductServiceError,
} from "@/features/products";
import type { Product } from "@/features/products/types/product.types";
import {
  buildCatalogQueryString,
  parseProductIdParam,
} from "@/features/products/utils/product-navigation";

interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const productId = parseProductIdParam((await params).productId);

  if (!productId) {
    return {
      title: "Product not found | CartFlow",
    };
  }

  try {
    const product = await getProductById(productId);

    return {
      title: `${product.title} | CartFlow`,
      description: product.description,
    };
  } catch {
    return {
      title: "Product | CartFlow",
    };
  }
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const productId = parseProductIdParam((await params).productId);

  if (!productId) {
    notFound();
  }

  const catalogQueryString = buildCatalogQueryString(
    createUrlSearchParams(await searchParams),
  );
  const product = await loadProductDetail(productId);

  if (!product) {
    notFound();
  }

  if (product instanceof ProductServiceError) {
    return (
      <Container className="py-10 sm:py-14 lg:py-16">
        <ErrorState
          title="Product is temporarily unavailable"
          description="This product could not be reached right now. Try refreshing this page or return to the catalog."
          primaryAction={<RouteRefreshButton>Try again</RouteRefreshButton>}
          secondaryAction={
            <Button asChild variant="outline">
              <Link href={catalogQueryString ? `/?${catalogQueryString}` : "/"}>
                Back to catalog
              </Link>
            </Button>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <ProductDetail
        product={product}
        catalogQueryString={catalogQueryString}
      />
    </Container>
  );
}

async function loadProductDetail(
  productId: number,
): Promise<Product | ProductServiceError | null> {
  try {
    return await getProductById(productId);
  } catch (error) {
    if (error instanceof ProductServiceError) {
      if (isMissingProductError(error)) {
        return null;
      }

      return error;
    }

    throw error;
  }
}

function isMissingProductError(error: ProductServiceError): boolean {
  return error.status === 404 || error.code === "invalid_response";
}

function createUrlSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const urlSearchParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlSearchParams.append(key, value);
      return;
    }

    value?.forEach((item) => {
      urlSearchParams.append(key, item);
    });
  });

  return urlSearchParams;
}
