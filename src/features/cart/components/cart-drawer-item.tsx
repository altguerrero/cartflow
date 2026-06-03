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

interface CartDrawerItemProps {
  item: CartItem;
}

export function CartDrawerItem({ item }: CartDrawerItemProps) {
  const { removeItem } = useCart();

  return (
    <li className="border-default bg-elevated motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-right-1 flex gap-3 rounded-2xl border p-3 shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md">
      <div className="bg-surface relative size-16 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="64px"
          className="object-contain p-2"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-3">
        <div className="min-w-0 space-y-1">
          <p className="text-primary line-clamp-2 text-sm leading-5 font-medium">
            {item.title}
          </p>
          <p className="text-muted text-xs">
            {formatProductCategoryLabel(item.category)}
          </p>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-muted text-xs">
              {formatCartCurrency(item.price)} each
            </p>
            <p className="text-primary text-sm font-semibold">
              {formatCartCurrency(getCartItemSubtotal(item))}
            </p>
          </div>

          <CartQuantityControls
            productId={item.productId}
            productTitle={item.title}
            quantity={item.quantity}
          />
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-muted hover:text-primary"
        aria-label={`Remove ${item.title} from cart`}
        onClick={() => {
          removeItem(item.productId);
        }}
      >
        <Trash2 aria-hidden="true" />
      </Button>
    </li>
  );
}
