import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header className="border-default bg-base/95 supports-[backdrop-filter]:bg-base/80 sticky top-0 z-50 border-b backdrop-blur">
      <a
        href="#content"
        className="focus:border-default focus:bg-elevated focus:text-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:border focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:outline-none"
      >
        Skip to content
      </a>

      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="focus-visible:ring-ring focus-visible:ring-offset-background flex items-center gap-3 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-offset-2"
          aria-label="CartFlow home"
        >
          <span className="bg-accent-primary-soft text-brand flex size-9 items-center justify-center rounded-xl text-sm font-semibold">
            CF
          </span>
          <span className="flex flex-col">
            <span className="text-primary text-base leading-5 font-semibold">
              CartFlow
            </span>
            <span className="text-muted hidden text-xs sm:inline">
              Modern storefront
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
            <Button asChild variant="ghost">
              <a href="#content">Products</a>
            </Button>
          </nav>
          <Button
            type="button"
            variant="outline"
            aria-label="Cart preview placeholder"
          >
            <ShoppingBag aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
          </Button>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
