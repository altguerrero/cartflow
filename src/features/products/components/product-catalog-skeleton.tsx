import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/features/products/components/product-grid-skeleton";

export function ProductCatalogSkeleton() {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <section
        className="space-y-8"
        aria-labelledby="catalog-loading-title"
        aria-busy="true"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl space-y-4">
            <Badge>Product Catalog</Badge>
            <div className="space-y-3">
              <h1
                id="catalog-loading-title"
                className="text-primary text-4xl font-semibold tracking-normal md:text-5xl"
              >
                Shop CartFlow essentials
              </h1>
              <Skeleton className="h-5 w-full max-w-2xl" />
              <Skeleton className="h-5 w-4/5 max-w-xl" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="border-default bg-elevated grid gap-4 rounded-2xl border p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_220px_220px_auto] md:items-end">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>

          <Skeleton className="h-5 w-56" />
          <ProductGridSkeleton />
        </div>
      </section>
    </Container>
  );
}
