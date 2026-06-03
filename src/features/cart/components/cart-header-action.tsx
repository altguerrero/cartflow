"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { useCart } from "@/features/cart/hooks/use-cart";

const CART_DRAWER_TRANSITION_MS = 250;

export function CartHeaderAction() {
  const { isHydrated, totalQuantity } = useCart();
  const [isDrawerMounted, setIsDrawerMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }

      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const openDrawer = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsDrawerMounted(true);

    openTimeoutRef.current = setTimeout(() => {
      setIsDrawerOpen(true);
      openTimeoutRef.current = null;
    }, 0);
  }, []);

  const closeDrawer = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }

    setIsDrawerOpen(false);

    closeTimeoutRef.current = setTimeout(() => {
      setIsDrawerMounted(false);
      closeTimeoutRef.current = null;
    }, CART_DRAWER_TRANSITION_MS);
  }, []);

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        aria-label={
          isHydrated
            ? `Open cart with ${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`
            : "Open cart"
        }
        aria-haspopup="dialog"
        aria-expanded={isDrawerOpen}
        onPointerUp={openDrawer}
        onClick={openDrawer}
      >
        <ShoppingBag aria-hidden="true" />
        <span className="hidden sm:inline">Cart</span>
        {isHydrated && totalQuantity > 0 ? (
          <span className="ml-1 grid min-w-5 place-items-center rounded-full bg-[var(--accent-primary)] px-1.5 text-xs font-semibold text-[var(--accent-primary-foreground)] tabular-nums shadow-sm">
            {totalQuantity}
          </span>
        ) : null}
      </Button>

      {isDrawerMounted ? (
        <CartDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          triggerRef={triggerRef}
        />
      ) : null}
    </>
  );
}
