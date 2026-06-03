"use client";

import { useCallback, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { useCart } from "@/features/cart/hooks/use-cart";

export function CartHeaderAction() {
  const { totalQuantity } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        aria-label={`Open cart with ${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`}
        aria-haspopup="dialog"
        aria-expanded={isDrawerOpen}
        onClick={() => {
          setIsDrawerOpen(true);
        }}
      >
        <ShoppingBag aria-hidden="true" />
        <span className="hidden sm:inline">Cart</span>
        {totalQuantity > 0 ? (
          <span className="ml-1 grid min-w-5 place-items-center rounded-full bg-[var(--accent-primary)] px-1.5 text-xs font-semibold text-[var(--accent-primary-foreground)] tabular-nums shadow-sm">
            {totalQuantity}
          </span>
        ) : null}
      </Button>

      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        triggerRef={triggerRef}
      />
    </>
  );
}
