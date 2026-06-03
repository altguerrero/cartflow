import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProductSortOption } from "@/features/products/types/product-filters.types";
import type { ProductCategory } from "@/features/products/types/product.types";
import { formatProductCategoryLabel } from "@/features/products/utils/product-filters";

interface ProductCatalogControlsProps {
  categories: ProductCategory[];
  category: ProductCategory | "all";
  hasActiveFilters: boolean;
  onCategoryChange: (category: ProductCategory | "all") => void;
  onClearFilters: () => void;
  onSearchChange: (searchTerm: string) => void;
  onSortChange: (sort: ProductSortOption) => void;
  searchValue: string;
  sort: ProductSortOption;
}

const PRODUCT_SORT_OPTIONS: Array<{
  label: string;
  value: ProductSortOption;
}> = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" },
  { label: "Rating: Low to High", value: "rating-asc" },
];

export function ProductCatalogControls({
  categories,
  category,
  hasActiveFilters,
  onCategoryChange,
  onClearFilters,
  onSearchChange,
  onSortChange,
  searchValue,
  sort,
}: ProductCatalogControlsProps) {
  return (
    <section
      className="border-default bg-elevated motion-safe:animate-in motion-safe:fade-in-0 rounded-2xl border p-4 shadow-sm motion-safe:duration-200"
      aria-label="Product catalog controls"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px_auto] lg:items-end">
        <div className="space-y-2">
          <label
            htmlFor="product-search"
            className="text-primary text-sm font-medium"
          >
            Search products
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="text-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            />
            <input
              id="product-search"
              type="search"
              value={searchValue}
              onChange={(event) => {
                onSearchChange(event.target.value);
              }}
              placeholder="Search by product, category, or description"
              className="border-default bg-base text-primary placeholder:text-muted hover:border-subtle h-10 w-full rounded-xl border px-9 text-sm transition outline-none focus:border-(--accent-primary) focus:ring-[3px] focus:ring-(--accent-primary-soft)"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="product-category"
            className="text-primary text-sm font-medium"
          >
            Category
          </label>
          <div className="relative">
            <select
              id="product-category"
              value={category}
              onChange={(event) => {
                onCategoryChange(event.target.value);
              }}
              className="border-default bg-base text-primary hover:border-subtle h-10 w-full appearance-none rounded-xl border py-0 pr-10 pl-3 text-sm transition outline-none focus:border-(--accent-primary) focus:ring-[3px] focus:ring-(--accent-primary-soft)"
            >
              <option value="all">All categories</option>
              {categories.map((productCategory) => (
                <option key={productCategory} value={productCategory}>
                  {formatProductCategoryLabel(productCategory)}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="text-muted pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="product-sort"
            className="text-primary text-sm font-medium"
          >
            Sort by
          </label>
          <div className="relative">
            <select
              id="product-sort"
              value={sort}
              onChange={(event) => {
                const nextSort = getProductSortOption(event.target.value);

                if (nextSort) {
                  onSortChange(nextSort);
                }
              }}
              className="border-default bg-base text-primary hover:border-subtle h-10 w-full appearance-none rounded-xl border py-0 pr-10 pl-3 text-sm transition outline-none focus:border-(--accent-primary) focus:ring-[3px] focus:ring-(--accent-primary-soft)"
            >
              {PRODUCT_SORT_OPTIONS.map((sortOption) => (
                <option key={sortOption.value} value={sortOption.value}>
                  {sortOption.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="text-muted pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
            />
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          className="h-10 lg:self-end"
        >
          <SlidersHorizontal aria-hidden="true" />
          Clear
        </Button>
      </div>
    </section>
  );
}

function getProductSortOption(value: string): ProductSortOption | undefined {
  return PRODUCT_SORT_OPTIONS.find((sortOption) => sortOption.value === value)
    ?.value;
}
