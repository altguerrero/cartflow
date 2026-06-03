import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card
      className="h-full gap-0 pt-0 pb-4"
      aria-hidden="true"
      data-testid="product-card-skeleton"
    >
      <Skeleton className="aspect-4/3 rounded-t-2xl rounded-b-none" />

      <CardContent className="flex flex-1 flex-col gap-4 pt-4">
        <div className="space-y-3">
          <Skeleton className="h-5 w-28" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        <Skeleton className="mt-auto h-8 w-full" />
      </CardContent>
    </Card>
  );
}
