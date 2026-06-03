import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { buildCatalogHref } from "@/features/products/utils/product-navigation";

interface ProductDetailBackLinkProps {
  catalogQueryString?: string;
}

export function ProductDetailBackLink({
  catalogQueryString,
}: ProductDetailBackLinkProps) {
  return (
    <Link
      href={buildCatalogHref(catalogQueryString)}
      className="text-primary hover:bg-subtle inline-flex w-fit items-center gap-2 rounded-xl border border-transparent px-2.5 py-2 text-sm font-medium transition outline-none focus-visible:border-(--accent-primary) focus-visible:ring-[3px] focus-visible:ring-(--accent-primary-soft)"
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      Back to catalog
    </Link>
  );
}
