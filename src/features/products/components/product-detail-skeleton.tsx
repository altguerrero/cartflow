import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <article
        className="space-y-8"
        aria-labelledby="product-detail-loading-title"
        aria-busy="true"
      >
        <Skeleton className="h-8 w-36" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
          <Card className="bg-surface p-0">
            <Skeleton className="aspect-square min-h-72 rounded-2xl sm:min-h-96 lg:min-h-[520px]" />
          </Card>

          <div className="space-y-7">
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                <h1 id="product-detail-loading-title" className="sr-only">
                  Loading product details
                </h1>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-4/5" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>

            <div className="border-default space-y-5 border-y py-5">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-9 w-full sm:w-36" />
            </div>

            <section className="space-y-3" aria-label="Loading description">
              <Skeleton className="h-5 w-28" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </section>
          </div>
        </div>
      </article>
    </Container>
  );
}
