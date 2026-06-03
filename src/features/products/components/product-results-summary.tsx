interface ProductResultsSummaryProps {
  visibleCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
}

export function ProductResultsSummary({
  visibleCount,
  totalCount,
  hasActiveFilters,
}: ProductResultsSummaryProps) {
  const resultLabel = visibleCount === 1 ? "product" : "products";

  return (
    <p className="text-muted text-sm leading-6" aria-live="polite">
      Showing{" "}
      <span className="text-primary font-medium">
        {visibleCount} {resultLabel}
      </span>
      {hasActiveFilters ? ` from ${totalCount} total` : " available"}
    </p>
  );
}
