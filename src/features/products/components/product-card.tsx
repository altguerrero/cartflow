import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "@/features/cart";
import { ProductPrice } from "@/features/products/components/product-price";
import { ProductRating } from "@/features/products/components/product-rating";
import type { Product } from "@/features/products/types/product.types";
import { formatProductCategoryLabel } from "@/features/products/utils/product-filters";
import { buildProductDetailHref } from "@/features/products/utils/product-navigation";

interface ProductCardProps {
  catalogQueryString?: string;
  product: Product;
}

export function ProductCard({ catalogQueryString, product }: ProductCardProps) {
  const categoryLabel = formatProductCategoryLabel(product.category);
  const detailHref = buildProductDetailHref(product.id, catalogQueryString);

  return (
    <Card className="group/card h-full gap-0 pt-0 pb-4 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={detailHref}
        className="block rounded-t-2xl outline-none focus-visible:ring-[3px] focus-visible:ring-(--accent-primary-soft)"
        aria-label={`View details for ${product.title}`}
      >
        <span className="bg-surface relative block aspect-4/3 overflow-hidden rounded-t-2xl">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain px-6 pt-3 pb-5 transition-transform duration-200 group-hover/card:scale-105 sm:px-7 sm:pt-4 sm:pb-6"
          />
        </span>
      </Link>

      <CardContent className="flex flex-1 flex-col gap-4 pt-4">
        <div className="space-y-3">
          <div className="space-y-3">
            <Badge variant="secondary" className="max-w-full truncate">
              {categoryLabel}
            </Badge>

            <Link
              href={detailHref}
              className="block rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-(--accent-primary-soft)"
            >
              <h2 className="text-primary line-clamp-2 min-h-11 text-base leading-snug font-semibold">
                {product.title}
              </h2>
            </Link>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 space-y-2">
              <ProductRating rating={product.rating} />
              <ProductPrice price={product.price} />
            </div>
          </div>
        </div>

        <AddToCartButton product={product} className="mt-auto w-full" />
      </CardContent>
    </Card>
  );
}
