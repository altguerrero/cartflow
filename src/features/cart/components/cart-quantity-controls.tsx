"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/hooks/use-cart";

interface CartQuantityControlsProps {
  productId: number;
  productTitle: string;
  quantity: number;
}

export function CartQuantityControls({
  productId,
  productTitle,
  quantity,
}: CartQuantityControlsProps) {
  const { updateItemQuantity } = useCart();

  return (
    <div
      className="border-default bg-elevated inline-flex h-8 items-center overflow-hidden rounded-xl border"
      aria-label={`Quantity controls for ${productTitle}`}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-none border-0"
        aria-label={`Decrease quantity for ${productTitle}`}
        onClick={() => {
          updateItemQuantity(productId, quantity - 1);
        }}
      >
        <Minus aria-hidden="true" />
      </Button>
      <span
        className="text-primary grid min-w-9 place-items-center px-2 text-sm font-medium tabular-nums"
        aria-live="polite"
        aria-label={`${quantity} in cart`}
      >
        {quantity}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-none border-0"
        aria-label={`Increase quantity for ${productTitle}`}
        onClick={() => {
          updateItemQuantity(productId, quantity + 1);
        }}
      >
        <Plus aria-hidden="true" />
      </Button>
    </div>
  );
}
