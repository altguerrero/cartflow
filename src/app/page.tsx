import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getProducts,
  ProductCatalog,
  ProductServiceError,
  type Product,
} from "@/features/products";

export default async function Home() {
  const catalog = await loadCatalogProducts();

  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <section className="space-y-8" aria-labelledby="catalog-title">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl space-y-4">
            <Badge>Product Catalog</Badge>
            <div className="space-y-3">
              <h1
                id="catalog-title"
                className="text-primary text-4xl font-semibold tracking-normal md:text-5xl"
              >
                Shop CartFlow essentials
              </h1>
              <p className="text-secondary max-w-2xl text-sm leading-7 md:text-base">
                Browse products with clear pricing, ratings, and category
                details from the CartFlow catalog.
              </p>
            </div>
          </div>
        </div>

        {catalog.products.length > 0 ? (
          <ProductCatalog products={catalog.products} />
        ) : catalog.errorMessage ? (
          <EmptyState
            title="Products could not load"
            description={catalog.errorMessage}
          />
        ) : (
          <EmptyState
            title="No products available"
            description="The catalog is empty right now. Product discovery will appear here as soon as products are available."
          />
        )}
      </section>
    </Container>
  );
}

interface CatalogProductsResult {
  products: Product[];
  errorMessage?: string;
}

async function loadCatalogProducts(): Promise<CatalogProductsResult> {
  try {
    return {
      products: await getProducts(),
    };
  } catch (error) {
    if (error instanceof ProductServiceError) {
      return {
        products: [],
        errorMessage:
          "The product catalog is temporarily unavailable. Please try again later.",
      };
    }

    throw error;
  }
}
