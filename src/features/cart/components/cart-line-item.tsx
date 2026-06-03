"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CartQuantityControls } from "@/features/cart/components/cart-quantity-controls";
import { useCart } from "@/features/cart/hooks/use-cart";
import { getCartItemSubtotal } from "@/features/cart/selectors/cart.selectors";
import type { CartItem } from "@/features/cart/types/cart.types";
import { formatCartCurrency } from "@/features/cart/utils/cart-formatters";
import { formatProductCategoryLabel } from "@/features/products/utils/product-filters";

interface CartLineItemProps {
  item: CartItem;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const { removeItem } = useCart();

  return (
    <li className="border-default bg-elevated motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 grid gap-4 rounded-2xl border p-4 shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center">
      <div className="bg-surface relative aspect-square overflow-hidden rounded-xl sm:size-28">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="112px"
          className="object-contain p-4"
        />
      </div>

      <div className="min-w-0 space-y-3">
        <div className="space-y-1">
          <p className="text-primary text-base leading-6 font-semibold">
            {item.title}
          </p>
          <p className="text-muted text-sm">
            {formatProductCategoryLabel(item.category)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-secondary text-sm">
            {formatCartCurrency(item.price)} each
          </p>
          <CartQuantityControls
            productId={item.productId}
            productTitle={item.title}
            quantity={item.quantity}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="text-right">
          <p className="text-muted text-xs">Subtotal</p>
          <p className="text-primary text-lg font-semibold">
            {formatCartCurrency(getCartItemSubtotal(item))}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="text-muted hover:text-primary"
          aria-label={`Remove ${item.title} from cart`}
          onClick={() => {
            removeItem(item.productId);
          }}
        >
          <Trash2 aria-hidden="true" />
          Remove
        </Button>
      </div>
    </li>
  );
}
