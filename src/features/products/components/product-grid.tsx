import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/features/products/types/product.types";

interface ProductGridProps {
  catalogQueryString?: string;
  products: Product[];
}

export function ProductGrid({
  catalogQueryString,
  products,
}: ProductGridProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <li
          key={product.id}
          className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 min-w-0 motion-safe:duration-200"
        >
          <ProductCard
            product={product}
            catalogQueryString={catalogQueryString}
            priority={index < 4}
          />
        </li>
      ))}
    </ul>
  );
}
