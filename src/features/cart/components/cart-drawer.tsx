"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { ArrowRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { CartDrawerItem } from "@/features/cart/components/cart-drawer-item";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { useCart } from "@/features/cart/hooks/use-cart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function CartDrawer({ isOpen, onClose, triggerRef }: CartDrawerProps) {
  const { clearCart, isEmpty, isHydrated, items, totalQuantity } = useCart();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleDocumentKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleDocumentKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) {
    return null;
  }

  function handlePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !panelRef.current) {
      return;
    }

    const focusableElements = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  }

  return (
    <div className="fixed inset-0 z-[60]" role="presentation">
      <button
        type="button"
        className="fixed inset-0 h-dvh w-dvw bg-black/35 backdrop-blur-[2px]"
        aria-label="Close cart drawer"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-base border-default fixed top-0 right-0 grid h-dvh w-full max-w-md grid-rows-[auto_minmax(0,1fr)_auto] border-l shadow-lg outline-none"
        onKeyDown={handlePanelKeyDown}
      >
        <div className="border-default flex items-center justify-between gap-4 border-b px-5 py-4">
          <div>
            <h2 id={titleId} className="text-primary text-lg font-semibold">
              Cart
            </h2>
            <p className="text-muted text-sm">
              {!isHydrated
                ? "Loading cart..."
                : totalQuantity === 1
                  ? "1 product selected"
                  : `${totalQuantity} products selected`}
            </p>
          </div>

          <Button
            ref={closeButtonRef}
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close cart drawer"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </Button>
        </div>

        {!isHydrated ? (
          <CartDrawerLoadingState />
        ) : isEmpty ? (
          <div className="flex min-h-0 items-center px-5">
            <EmptyState
              title="Your cart is empty"
              description="Add products from the catalog to review them here."
              action={
                <Button asChild onClick={onClose}>
                  <Link href="/">Continue shopping</Link>
                </Button>
              }
              className="w-full"
            />
          </div>
        ) : (
          <>
            <div className="min-h-0 overflow-y-auto px-5 py-4">
              <p className="text-muted mb-3 text-xs font-medium tracking-normal">
                Products in cart
              </p>
              <ul className="space-y-3" aria-label="Cart items">
                {items.map((item) => (
                  <CartDrawerItem key={item.productId} item={item} />
                ))}
              </ul>
            </div>

            <div className="border-default space-y-4 border-t p-5">
              <CartSummary />

              <div className="grid gap-2 sm:grid-cols-2">
                <Button asChild onClick={onClose}>
                  <Link href="/cart">
                    View cart
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
                <Button type="button" variant="outline" onClick={clearCart}>
                  Clear cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CartDrawerLoadingState() {
  return (
    <div
      className="min-h-0 overflow-hidden px-5 py-4"
      role="status"
      aria-live="polite"
      aria-label="Restoring saved cart items"
    >
      <p className="text-muted mb-3 text-xs font-medium tracking-normal">
        Restoring saved cart
      </p>
      <div className="space-y-3" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="border-default bg-elevated grid grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-2xl border p-3 shadow-sm"
          >
            <Skeleton className="size-18" />
            <div className="min-w-0 space-y-3">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-24" />
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-4 w-14" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
