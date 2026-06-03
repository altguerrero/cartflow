"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCatalogControls } from "@/features/products/components/product-catalog-controls";
import { ProductGrid } from "@/features/products/components/product-grid";
import { ProductResultsSummary } from "@/features/products/components/product-results-summary";
import { useProductCatalogFilters } from "@/features/products/hooks/use-product-catalog-filters";
import type { Product } from "@/features/products/types/product.types";

interface ProductCatalogProps {
  products: Product[];
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const {
    categories,
    clearFilters,
    filteredProducts,
    filters,
    hasActiveFilters,
    searchInputValue,
    setSearchInputValue,
    updateCategory,
    updateSort,
  } = useProductCatalogFilters(products);

  return (
    <div className="space-y-5">
      <ProductCatalogControls
        categories={categories}
        category={filters.category}
        hasActiveFilters={hasActiveFilters}
        onCategoryChange={updateCategory}
        onClearFilters={clearFilters}
        onSearchChange={setSearchInputValue}
        onSortChange={updateSort}
        searchValue={searchInputValue}
        sort={filters.sort}
      />

      <ProductResultsSummary
        visibleCount={filteredProducts.length}
        totalCount={products.length}
        hasActiveFilters={hasActiveFilters}
      />

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <EmptyState
          title="No products match these controls"
          description="Try a different search, category, or sort option to see more products."
          action={
            <Button type="button" variant="outline" onClick={clearFilters}>
              Clear controls
            </Button>
          }
        />
      )}
    </div>
  );
}
