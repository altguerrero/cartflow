import { Star } from "lucide-react";

import type { ProductRating as ProductRatingType } from "@/features/products/types/product.types";

interface ProductRatingProps {
  rating: ProductRatingType;
}

const reviewCountFormatter = new Intl.NumberFormat("en-US");

export function ProductRating({ rating }: ProductRatingProps) {
  const reviewText = `${reviewCountFormatter.format(rating.count)} reviews`;

  return (
    <div
      className="text-muted flex items-center gap-1.5 text-xs"
      aria-label={`Rated ${rating.rate} out of 5 from ${reviewText}`}
    >
      <Star
        aria-hidden="true"
        className="size-4 fill-(--state-warning) text-(--state-warning)"
      />
      <span className="text-primary font-medium">{rating.rate.toFixed(1)}</span>
      <span aria-hidden="true">({reviewText})</span>
    </div>
  );
}
