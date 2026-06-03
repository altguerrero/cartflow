import { ProductCardSkeleton } from "@/features/products/components/product-card-skeleton";

interface ProductGridSkeletonProps {
  itemCount?: number;
}

export function ProductGridSkeleton({
  itemCount = 8,
}: ProductGridSkeletonProps) {
  return (
    <ul
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="Loading products"
    >
      {Array.from({ length: itemCount }, (_, index) => (
        <li key={index} className="min-w-0">
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
