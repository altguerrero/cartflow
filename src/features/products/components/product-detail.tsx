import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AddToCartButton } from "@/features/cart";
import { ProductDetailBackLink } from "@/features/products/components/product-detail-back-link";
import { ProductPrice } from "@/features/products/components/product-price";
import { ProductRating } from "@/features/products/components/product-rating";
import type { Product } from "@/features/products/types/product.types";
import { formatProductCategoryLabel } from "@/features/products/utils/product-filters";

interface ProductDetailProps {
  catalogQueryString?: string;
  product: Product;
}

export function ProductDetail({
  catalogQueryString,
  product,
}: ProductDetailProps) {
  const categoryLabel = formatProductCategoryLabel(product.category);

  return (
    <article className="space-y-8" aria-labelledby="product-detail-title">
      <ProductDetailBackLink catalogQueryString={catalogQueryString} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
        <Card className="bg-surface p-0">
          <div className="relative aspect-square min-h-72 overflow-hidden sm:min-h-96 lg:min-h-[520px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-8 sm:p-12"
            />
          </div>
        </Card>

        <div className="space-y-7">
          <div className="space-y-4">
            <Badge variant="secondary">{categoryLabel}</Badge>
            <div className="space-y-3">
              <h1
                id="product-detail-title"
                className="text-primary text-3xl leading-tight font-semibold tracking-normal md:text-5xl"
              >
                {product.title}
              </h1>
              <ProductRating rating={product.rating} />
            </div>
          </div>

          <div className="border-default space-y-5 border-y py-5">
            <ProductPrice price={product.price} />
            <AddToCartButton
              product={product}
              size="lg"
              className="w-full sm:w-auto"
            />
          </div>

          <section className="space-y-3" aria-labelledby="product-description">
            <h2
              id="product-description"
              className="text-primary text-base font-semibold"
            >
              Description
            </h2>
            <p className="text-secondary text-sm leading-7 md:text-base">
              {product.description}
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
