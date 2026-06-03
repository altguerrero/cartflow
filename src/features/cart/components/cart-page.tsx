"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { CartLineItem } from "@/features/cart/components/cart-line-item";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { useCart } from "@/features/cart/hooks/use-cart";

export function CartPage() {
  const { clearCart, isEmpty, items } = useCart();

  return (
    <Container className="py-10 sm:py-14 lg:py-16">
      <section className="space-y-8" aria-labelledby="cart-page-title">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="bg-accent-primary-soft text-brand flex size-10 items-center justify-center rounded-xl">
              <ShoppingBag aria-hidden="true" className="size-5" />
            </div>
            <div className="space-y-2">
              <h1
                id="cart-page-title"
                className="text-primary text-4xl font-semibold tracking-normal md:text-5xl"
              >
                Your cart
              </h1>
              <p className="text-secondary text-sm leading-7 md:text-base">
                Review products, adjust quantities, and keep browsing when you
                are ready.
              </p>
            </div>
          </div>

          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft aria-hidden="true" />
              Continue shopping
            </Link>
          </Button>
        </div>

        {isEmpty ? (
          <EmptyState
            title="Your cart is empty"
            description="Add products from the catalog to start building your order."
            action={
              <Button asChild>
                <Link href="/">Browse products</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <ul className="space-y-4" aria-label="Cart items">
              {items.map((item) => (
                <CartLineItem key={item.productId} item={item} />
              ))}
            </ul>

            <aside className="space-y-3 lg:sticky lg:top-24">
              <CartSummary />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                Clear cart
              </Button>
            </aside>
          </div>
        )}
      </section>
    </Container>
  );
}
