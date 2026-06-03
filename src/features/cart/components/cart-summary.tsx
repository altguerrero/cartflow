"use client";

import { useCart } from "@/features/cart/hooks/use-cart";
import {
  formatCartCurrency,
  formatCartItemQuantity,
} from "@/features/cart/utils/cart-formatters";
import { cn } from "@/lib/utils";

interface CartSummaryProps {
  className?: string;
}

export function CartSummary({ className }: CartSummaryProps) {
  const { subtotal, totalQuantity } = useCart();

  return (
    <section
      className={cn(
        "border-default bg-elevated space-y-4 rounded-2xl border p-5 shadow-sm",
        className,
      )}
      aria-labelledby="cart-summary-title"
    >
      <h2 id="cart-summary-title" className="text-primary font-semibold">
        Cart summary
      </h2>

      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">Items</dt>
          <dd className="text-primary font-medium">
            {formatCartItemQuantity(totalQuantity)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">Subtotal</dt>
          <dd className="text-primary text-lg font-semibold">
            {formatCartCurrency(subtotal)}
          </dd>
        </div>
      </dl>

      <p className="text-muted text-xs leading-5">
        Shipping, taxes, discounts, and checkout are not calculated yet.
      </p>
    </section>
  );
}
