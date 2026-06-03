# Unit 11: Loading & Error States

## Goal

Make CartFlow feel reliable during route transitions, product API failures, unexpected rendering errors, empty data states, and cart hydration.

At the end of this unit, users should see consistent, branded, accessible loading and error experiences across the catalog, product detail, cart drawer, and cart page.

This unit improves resilience and perceived responsiveness only. Do not implement checkout, payment, authentication, backend storage, analytics, recommendations, product inventory validation, new product fetching patterns, or broad visual redesigns in this unit.

---

## Design

### Loading and Error Purpose

Unit 11 turns the existing happy-path product and cart experiences into a more complete application shell.

The loading and error experience should:

- Use Next.js App Router loading and error conventions where appropriate.
- Preserve the existing Server Component data fetching model.
- Keep product API access inside product services and route-level composition.
- Keep cart persistence and reducer logic unchanged.
- Use existing CartFlow UI primitives and semantic Tailwind utilities.
- Provide useful retry or navigation actions when recovery is possible.
- Avoid layout jumps by matching skeleton structure to the eventual UI.
- Preserve accessibility basics for loading, error, empty, and retry states.

### User Experience

Users should be able to:

- Navigate to the catalog and see an immediate product-shaped loading state while route content streams.
- Navigate to product detail pages and see a detail-shaped loading state.
- Recover from route-level rendering failures with a retry action.
- Recover from expected product service failures with a clear retry or return action.
- Understand when the catalog is empty versus temporarily unavailable.
- Open the cart drawer or cart page during hydration without seeing misleading empty-cart content.
- Use loading and error states in light and dark mode with readable contrast.

### Scope Boundary With Unit 12

Unit 12 owns broader test coverage expansion.

Unit 11 may add tests only when new pure helpers are introduced. Do not add fragile UI tests solely to assert skeleton markup.

### Scope Boundary With Unit 13

Unit 13 owns final polish, performance audits, and broader visual refinement.

Unit 11 should create solid, consistent states, not redesign the entire interface.

---

## Implementation

### 1. Route Loading Structure

Create route-level loading files where asynchronous route content exists:

```text
src/app/
├── loading.tsx
└── products/
    └── [productId]/
        └── loading.tsx
```

Responsibilities:

- `src/app/loading.tsx` renders a catalog-shaped loading experience.
- `src/app/products/[productId]/loading.tsx` renders a product-detail-shaped loading experience.

Requirements:

- Loading files must be Server Components unless a Client Component is genuinely required.
- Loading UI must use existing `Skeleton` and layout primitives.
- Loading UI must preserve header/layout stability.
- Loading UI must not fetch data.
- Loading UI must not read URL state.
- Loading UI must not access cart state.
- Loading UI must not add new dependencies.

Reference behavior:

- Current Next.js App Router `loading.tsx` files automatically wrap route segments in a Suspense boundary and provide instant loading UI during navigation.

---

### 2. Route Error Boundaries

Create route-level error files for unexpected runtime errors:

```text
src/app/
├── error.tsx
└── products/
    └── [productId]/
        └── error.tsx
```

Responsibilities:

- `src/app/error.tsx` handles uncaught errors in the root page segment.
- `src/app/products/[productId]/error.tsx` handles uncaught errors in the product detail segment.

Requirements:

- Error files must include `"use client"` because App Router error boundaries receive `reset`.
- Render a branded, accessible error state.
- Include a retry action using `reset()`.
- Include a secondary navigation action where useful, such as returning to the catalog.
- Do not expose raw stack traces or sensitive error details.
- Do not log expected service failures as uncaught runtime errors.
- Do not introduce global error handling unless a root layout failure is explicitly being handled.

---

### 3. Reusable Error State Primitive

Create a reusable UI primitive if it avoids duplication:

```text
src/components/ui/error-state.tsx
```

Responsibilities:

- Render a branded error surface similar in quality to `EmptyState`.
- Support title, description, primary action, and optional secondary action.
- Use semantic Tailwind utilities.
- Preserve keyboard accessibility through normal button/link semantics.

Rules:

- Do not replace `EmptyState` globally unless it remains semantically correct.
- Keep the component presentation-only.
- Do not include data fetching, router logic, logging, or domain-specific copy inside the primitive.

---

### 4. Product Loading Components

Create product-scoped skeleton components under the products feature boundary:

```text
src/features/products/components/
├── product-card-skeleton.tsx
├── product-grid-skeleton.tsx
├── product-catalog-skeleton.tsx
└── product-detail-skeleton.tsx
```

Responsibilities:

- `product-card-skeleton.tsx` mirrors the visual footprint of a product card.
- `product-grid-skeleton.tsx` renders responsive product-card skeletons.
- `product-catalog-skeleton.tsx` mirrors the catalog heading, controls, result summary, and grid shell.
- `product-detail-skeleton.tsx` mirrors the product detail page layout with image, metadata, price/action, and description placeholders.

Requirements:

- Use existing `Skeleton`.
- Use stable dimensions to avoid layout shift.
- Match current product grid breakpoints.
- Keep skeletons presentational.
- Do not fetch products.
- Do not add shimmer libraries or animation dependencies.
- Do not include misleading fake product text.

---

### 5. Expected Product Service Error States

Update existing expected service failure handling in:

```text
src/app/page.tsx
src/app/products/[productId]/page.tsx
```

Responsibilities:

- Preserve current Server Component data fetching.
- Keep `ProductServiceError` handling explicit.
- Render a polished error state when the catalog or product detail cannot load.
- Provide a user-visible recovery action.

Requirements:

- Catalog service failure should clearly say products are temporarily unavailable.
- Product detail service failure should clearly say that product is temporarily unavailable.
- Product-not-found behavior must continue to use `notFound()`.
- Retry must not perform client-side product fetching.
- If a retry action is client-side, it should use route refresh/reset behavior rather than duplicating service calls.
- Empty catalog arrays must remain a separate empty state, not an error state.

---

### 6. Cart Hydration Loading Polish

Update only the cart UI needed for consistent loading behavior:

```text
src/features/cart/components/cart-drawer.tsx
src/features/cart/components/cart-page.tsx
```

Responsibilities:

- Replace the minimal Unit 10 hydration text states with CartFlow-consistent loading surfaces.
- Avoid showing empty cart states before hydration completes.
- Preserve current cart reducer, persistence, and action behavior.

Requirements:

- Do not change storage format.
- Do not change reducer behavior.
- Do not add checkout behavior.
- Do not fetch product data to revalidate cart items.
- Keep drawer focus behavior and keyboard close behavior working.
- Keep loading UI minimal and scoped.

---

### 7. Not Found Consistency

Review existing not-found behavior:

```text
src/app/products/[productId]/not-found.tsx
```

Requirements:

- Preserve the Unit 07 product detail not-found metadata and UI.
- Ensure the product not-found state remains visually consistent with new error/loading primitives.
- Do not change valid product route behavior.
- Do not add new product lookup behavior.

Optional if needed for consistency:

```text
src/app/not-found.tsx
```

Only add a global not-found page if it improves consistency for unknown application routes without changing product detail 404 behavior.

---

### 8. Feature Exports

Update feature public exports only when needed:

```text
src/features/products/index.ts
```

Potential exports:

- `ProductCatalogSkeleton`
- `ProductDetailSkeleton`

Rules:

- Export only components required by app route files.
- Do not export private skeleton internals unless app routes use them directly.
- Do not expose UI primitives through product feature exports.

---

## Testing

Unit 11 is mostly route and presentation work.

Add tests only if new pure logic is introduced.

Existing required tests must continue passing:

- Product service and transformer tests.
- Product filtering and navigation tests.
- Cart reducer, selector, persistence, adapter, and formatter tests.

Avoid fragile tests for:

- Exact skeleton count.
- Skeleton CSS classes.
- App Router file-convention behavior.

---

## Dependencies

Do not add new dependencies for this unit.

Allowed existing dependencies:

- React
- Next.js
- Tailwind CSS
- Existing shadcn/ui primitives
- Existing Lucide icons if useful
- Vitest

Do not introduce:

- Data fetching libraries
- Error tracking services
- Toast libraries
- Animation libraries
- Skeleton/shimmer packages
- State management libraries

---

## Verify When Done

- [ ] Scope matches this specification.
- [ ] Route loading states exist for catalog and product detail routes.
- [ ] Route error boundaries exist for catalog/root page and product detail route.
- [ ] Error boundaries include retry behavior.
- [ ] Expected product service errors render friendly recovery UI.
- [ ] Empty catalog state remains distinct from API failure state.
- [ ] Product not-found behavior still works.
- [ ] Cart drawer does not show a misleading empty state before hydration.
- [ ] Cart page does not show a misleading empty state before hydration.
- [ ] Skeletons use existing CartFlow primitives and semantic tokens.
- [ ] No client-side product fetching added.
- [ ] No checkout, payment, backend storage, analytics, or recommendations added.
- [ ] No unnecessary dependencies introduced.
- [ ] Existing unit tests still pass.
- [ ] `pnpm test` passes.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] Responsive behavior verified on mobile and desktop.
- [ ] Accessibility basics verified.
- [ ] No console errors.
- [ ] `context/progress-tracker.md` updated after implementation.
