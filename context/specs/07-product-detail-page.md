# Unit 07: Product Detail Page

## Goal

Implement the product detail browsing experience for CartFlow.

At the end of this unit, users should be able to open a product from the catalog, view a dedicated product detail page, and return to the catalog without losing the active URL-driven search, category, and sort state from Unit 06.

This unit introduces product detail navigation and product detail display only. Do not implement add-to-cart behavior, cart state, cart drawer behavior, cart persistence, product recommendations, reviews creation, checkout, authentication, analytics, or comprehensive loading skeletons in this unit.

---

## Design

### Product Detail Purpose

The product detail page gives users more room to evaluate a single product before later cart functionality is added.

The product detail experience should:

- Use a dynamic App Router route.
- Fetch a single product through the existing product service layer.
- Render a large product image.
- Render product title, category, description, price, rating, and review count.
- Preserve catalog URL state when navigating from listing to detail and back.
- Keep product detail UI read-only for now.
- Stay ready for Unit 09, where add-to-cart behavior will be introduced.

### User Experience

Users should be able to:

- Click a product card from the catalog.
- Land on a dedicated product detail page.
- Inspect product image, title, category, price, rating, review count, and description.
- Return to the previous catalog view with filters, search, and sort still intact.
- Open a product detail page directly by URL.
- See a graceful not-found state for invalid product IDs or missing products.

The page should feel like part of the same storefront, not a separate technical route.

### Scope Boundary With Cart Units

Unit 07 must not introduce cart behavior.

Do not add:

- Add to cart buttons.
- Quantity controls.
- Cart drawer opening.
- Cart context usage.
- Cart reducer usage.
- Local storage persistence.
- Cart totals.

Unit 08 owns cart state architecture. Unit 09 owns cart UI and add-to-cart interactions.

---

## Implementation

### 1. Product Detail Structure

Add product detail files under the existing products feature boundary:

```text
src/features/products/
├── components/
│   ├── product-detail.tsx
│   └── product-detail-back-link.tsx
└── utils/
    └── product-navigation.ts
```

Add the dynamic route:

```text
src/app/products/[productId]/page.tsx
```

Only create additional files if they directly support this unit.

Responsibilities:

- `src/app/products/[productId]/page.tsx` owns route composition, route param validation, product fetching, metadata if implemented, and not-found behavior.
- `product-detail.tsx` renders the read-only product detail layout.
- `product-detail-back-link.tsx` renders catalog return navigation while preserving catalog state.
- `product-navigation.ts` owns pure URL construction helpers for product detail and catalog return URLs.

Do not move API fetching into Client Components.

---

### 2. Dynamic Product Route

Create:

```text
src/app/products/[productId]/page.tsx
```

Responsibilities:

- Remain a Server Component.
- Parse `productId` from route params.
- Validate that `productId` is a positive integer.
- Fetch the product using `getProductById()` from the product feature public API.
- Render `ProductDetail`.
- Handle invalid IDs and missing products with `notFound()`.
- Handle known product service failures gracefully when appropriate.

Rules:

- Do not fetch product data in a Client Component.
- Do not duplicate Fake Store API fetch logic.
- Do not introduce route handlers or Server Actions.
- Do not implement cart behavior.

### Route Path

Use this path:

```text
/products/[productId]
```

Examples:

```text
/products/1
/products/12
```

Invalid examples should not render a broken page:

```text
/products/not-a-number
/products/0
/products/-1
```

---

### 3. Product Detail UI

Create:

```text
src/features/products/components/product-detail.tsx
```

Expected props:

```ts
interface ProductDetailProps {
  product: Product;
}
```

Responsibilities:

- Render a responsive detail layout.
- Render large product image with `next/image`.
- Render polished category label.
- Render product title.
- Render product description.
- Render product price using existing `ProductPrice`.
- Render product rating and review count using existing `ProductRating`.
- Render a back link through `ProductDetailBackLink`.

Layout requirements:

- Mobile: single-column layout.
- Desktop: two-column layout with image and product information side by side.
- Use CartFlow semantic Tailwind utilities.
- Use existing UI primitives where appropriate.
- Keep image presentation product-focused and inspection-friendly.

Do not render:

- Add to cart button.
- Quantity selectors.
- Product recommendations.
- Review forms.
- Breadcrumb systems beyond the scoped catalog return link.

---

### 4. Catalog Navigation From Product Cards

Update:

```text
src/features/products/components/product-card.tsx
```

Responsibilities:

- Make product cards navigate to their detail route.
- Preserve current catalog search params when building the detail URL.
- Keep keyboard accessibility.
- Keep hover/focus visual affordances.
- Avoid nesting interactive elements in invalid ways.

Recommended behavior:

- Use `next/link`.
- Build detail URLs with a helper from `product-navigation.ts`.
- Append the current catalog query string to the detail route so detail pages can construct a return URL.

Example:

```text
/?q=gold&category=jewelery&sort=rating-desc
```

Clicking product `5` should navigate to:

```text
/products/5?q=gold&category=jewelery&sort=rating-desc
```

This keeps the catalog context attached to the detail page URL.

Do not add cart actions to product cards in this unit.

---

### 5. Back Navigation Behavior

Create:

```text
src/features/products/components/product-detail-back-link.tsx
```

Responsibilities:

- Render a visible, accessible link back to the catalog.
- Preserve catalog search, category, and sort query parameters from the current detail URL.
- Fall back to `/` when no catalog query parameters exist.

Example:

```text
/products/5?q=gold&category=jewelery&sort=rating-desc
```

Back link target:

```text
/?q=gold&category=jewelery&sort=rating-desc
```

Rules:

- Prefer a normal `Link` with an explicit `href`.
- Do not rely only on `router.back()`, because direct visits need a deterministic catalog destination.
- Do not introduce browser-history-only behavior.

---

### 6. Product Navigation Utilities

Create:

```text
src/features/products/utils/product-navigation.ts
```

Responsibilities:

- Build product detail hrefs.
- Build catalog return hrefs.
- Preserve only catalog query parameters defined by Unit 06:

```text
q
category
sort
```

Requirements:

- Keep utilities pure.
- Avoid `any`.
- Do not read browser globals.
- Do not mutate input `URLSearchParams`.
- Omit unknown query parameters from catalog return URLs unless explicitly needed by this unit.
- Preserve deterministic query parameter ordering.

Use existing Unit 06 query parameter constants if available within the products feature boundary.

---

### 7. Direct Detail Visits

Direct visits to product detail URLs must work:

```text
/products/1
```

Expected behavior:

- Product loads server-side.
- Back link points to `/`.
- Product information is visible without requiring prior catalog navigation.

Direct visits with catalog state must also work:

```text
/products/1?q=shirt&sort=price-asc
```

Expected behavior:

- Product loads server-side.
- Back link points to `/?q=shirt&sort=price-asc`.

---

### 8. Not Found and Error Handling

Invalid route params should call `notFound()`.

Missing products should call `notFound()` when the service clearly indicates the product cannot be retrieved.

Known API failures should not crash the app with raw errors. Use the existing product service error model to decide whether to show a user-friendly `EmptyState` or call `notFound()` for invalid/missing product responses.

Do not implement a full route-level `error.tsx` in this unit unless the current implementation requires it to satisfy graceful handling.

Unit 11 owns comprehensive loading and error state coverage.

---

### 9. Metadata

If metadata is added, keep it simple and server-derived:

- Product title.
- Short description based on product description.

Do not add Open Graph images, structured data, or analytics metadata in this unit.

Metadata is optional unless it can be implemented without expanding scope.

---

### 10. Feature Exports

Update:

```text
src/features/products/index.ts
```

Export only stable APIs needed by app routes or tests:

- `ProductDetail`
- Product navigation utilities only if tests import them directly

Avoid exporting private component internals unless needed outside the feature boundary.

---

## Testing

Add focused unit tests for product navigation helpers.

Required test coverage:

- Builds product detail href without query parameters.
- Builds product detail href with catalog query parameters.
- Builds catalog return href without query parameters.
- Builds catalog return href with `q`.
- Builds catalog return href with `category`.
- Builds catalog return href with `sort`.
- Preserves deterministic query parameter ordering.
- Omits non-catalog query parameters.
- Does not mutate input `URLSearchParams`.
- Rejects or handles invalid product IDs in route-param parsing if parsing is extracted to a utility.

Preferred test target:

```text
src/features/products/utils/product-navigation.test.ts
```

Avoid fragile UI tests unless pure navigation tests cannot cover the behavior.

---

## Dependencies

Do not add new dependencies for this unit.

Allowed existing dependencies:

- React
- Next.js App Router
- Tailwind CSS
- Existing shadcn/ui primitives
- Existing Lucide icons
- Vitest

Do not introduce:

- State management libraries
- Data fetching libraries
- Product carousel libraries
- Image gallery libraries
- Analytics libraries
- Cart-related dependencies

---

## Verify When Done

- [ ] Scope matches this specification.
- [ ] Dynamic product route exists at `/products/[productId]`.
- [ ] Product detail route remains a Server Component.
- [ ] Product detail data is fetched through `getProductById()`.
- [ ] Invalid product IDs are handled gracefully.
- [ ] Missing products are handled gracefully.
- [ ] Product detail renders image, title, category, description, price, rating, and review count.
- [ ] Product cards link to detail pages.
- [ ] Product card links preserve active catalog query parameters.
- [ ] Product detail back link preserves catalog query parameters.
- [ ] Direct detail visits work without catalog query parameters.
- [ ] No cart state added.
- [ ] No add-to-cart behavior added.
- [ ] No cart drawer behavior added.
- [ ] No unnecessary dependencies introduced.
- [ ] Product navigation utilities are covered by unit tests.
- [ ] `pnpm test` passes.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] Responsive behavior verified on mobile and desktop.
- [ ] Accessibility basics verified.
- [ ] No console errors.
- [ ] `context/progress-tracker.md` updated after implementation.
