# Unit 05: Filtering & Sorting System

## Goal

Implement the first interactive product discovery controls for CartFlow.

At the end of this unit, users should be able to search, filter by category, and sort the already-loaded product catalog without triggering additional product API requests.

This unit introduces local client-side catalog interaction only. Do not implement URL query parameter synchronization, URL hydration, browser back/forward restoration, product detail navigation, cart state, add-to-cart behavior, cart drawer behavior, or cart persistence in this unit.

---

## Design

### Catalog Interaction Purpose

This unit builds on the Unit 04 product grid and makes the catalog browsable through client-side controls.

The filtering and sorting experience should:

- Operate on products already fetched by the page.
- Avoid additional network requests while searching, filtering, or sorting.
- Keep product discovery fast and predictable.
- Use local component state only.
- Keep filtering and sorting logic pure and testable.
- Preserve the existing product card and grid presentation.
- Stay ready for Unit 06, where the same state will become URL-driven.

### User Experience

Users should be able to:

- Type into a search input to narrow products.
- Filter products by category.
- Sort products by price.
- Sort products by rating.
- Clear active controls.
- See an empty state when no products match the active controls.

The controls should feel like part of the storefront, not a separate technical demo.

### Scope Boundary With Unit 06

Unit 05 uses local state only.

Do not read from or write to:

- `searchParams`
- `window.location`
- `URLSearchParams`
- Router query state
- Browser history

Unit 06 owns URL query parameters, URL hydration, and browser navigation behavior.

---

## Implementation

### 1. Product Filtering Structure

Create the filtering and sorting feature files under the products feature boundary:

```text
src/features/products/
├── components/
│   ├── product-catalog.tsx
│   ├── product-catalog-controls.tsx
│   └── product-results-summary.tsx
├── hooks/
│   └── use-product-catalog-filters.ts
├── utils/
│   └── product-filters.ts
└── types/
    └── product-filters.types.ts
```

Only create additional files if they directly support this unit.

Responsibilities:

- `product-catalog.tsx` owns the client-side interactive catalog composition.
- `product-catalog-controls.tsx` renders search, category, sort, and clear controls.
- `product-results-summary.tsx` renders the current result count and active state summary.
- `use-product-catalog-filters.ts` owns local state and derived filtered products.
- `product-filters.ts` owns pure search, filtering, sorting, and category-label helpers.
- `product-filters.types.ts` owns filter and sort type contracts.

Do not move API fetching into client components.

---

### 2. Homepage Composition

Update:

```text
src/app/page.tsx
```

Responsibilities:

- Remain a Server Component.
- Continue fetching products using `getProducts()` from the product feature public API.
- Render the page heading and catalog shell.
- Pass products into a client `ProductCatalog` component.
- Continue handling service failure and truly empty product arrays gracefully.

The homepage must not become a Client Component.

Do not add client-side data fetching hooks.

---

### 3. Product Catalog Client Component

Create:

```text
src/features/products/components/product-catalog.tsx
```

This component should include `"use client"`.

Expected props:

```ts
interface ProductCatalogProps {
  products: Product[];
}
```

Responsibilities:

- Use the product catalog filter hook.
- Render `ProductCatalogControls`.
- Render `ProductResultsSummary`.
- Render `ProductGrid` with filtered and sorted products.
- Render a scoped empty state when active filters produce zero matches.

Rules:

- Do not fetch products.
- Do not call product services.
- Do not mutate products.
- Do not add cart actions.
- Do not add product detail links.
- Do not synchronize state with the URL.

---

### 4. Product Catalog Controls

Create:

```text
src/features/products/components/product-catalog-controls.tsx
```

Controls required:

- Search input.
- Category filter.
- Sort selector.
- Clear controls button.

Requirements:

- Use accessible labels.
- Use semantic form controls.
- Use visible focus states.
- Use CartFlow semantic Tailwind utilities.
- Keep layout responsive.
- Use native inputs/selects unless an existing shadcn/ui primitive is already available and appropriate.

Do not install new shadcn/ui components for this unit unless the implementation genuinely benefits from them and the dependency surface remains minimal. Native controls are acceptable.

### Search Input

Search should:

- Match against product title.
- Match against product description.
- Match against product category.
- Be case-insensitive.
- Trim unnecessary whitespace.
- Use debounce before applying the value to filtering.

Do not trigger API requests.

### Category Filter

Category filter should:

- Include an all-categories option.
- Use categories derived from the loaded products.
- Render polished category labels in the UI.
- Preserve API-provided category values internally.

Do not call `getCategories()` from the client.

### Sort Selector

Supported sort values:

- Featured/default order.
- Price: low to high.
- Price: high to low.
- Rating: high to low.
- Rating: low to high.

Sorting must be stable and must not mutate the original product array.

---

### 5. Filtering and Sorting Types

Create:

```text
src/features/products/types/product-filters.types.ts
```

Define explicit types for:

- Product sort option.
- Product filter state.

Example:

```ts
export type ProductSortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "rating-asc";
```

Use string unions instead of loosely typed strings.

---

### 6. Filtering and Sorting Utilities

Create:

```text
src/features/products/utils/product-filters.ts
```

Responsibilities:

- Filter products by search term.
- Filter products by category.
- Sort products by selected sort option.
- Compose filtering and sorting into a reusable function.
- Derive unique categories from products.
- Format category labels for UI display.

Requirements:

- Keep utilities pure.
- Do not mutate input arrays.
- Avoid `any`.
- Keep behavior deterministic.
- Keep matching logic simple and transparent.

Do not include URL parsing or query parameter helpers in this file. Unit 06 owns those concerns.

---

### 7. Debounce Hook

Implement debounce behavior for search input.

Preferred options:

- Create a shared generic hook if no existing hook exists:

```text
src/hooks/use-debounce.ts
```

- Or create a product-scoped hook only if it is tightly coupled to product filtering.

Requirements:

- Debounce search input before applying filtering.
- Keep the hook generic if placed in `src/hooks`.
- Add unit tests for debounce behavior if a new hook is introduced.

Do not add a debounce dependency.

---

### 8. Empty and Results States

When active filters produce zero results:

- Render a user-friendly empty state.
- Mention that no products match the current controls.
- Provide a clear controls action.

When products are shown:

- Display current result count.
- Indicate when the result set is filtered.

Do not implement loading skeletons in this unit. Unit 11 owns comprehensive loading states.

---

### 9. Feature Exports

Update:

```text
src/features/products/index.ts
```

Export only stable APIs needed by app routes or tests:

- `ProductCatalog`
- Product filter types if used outside the feature boundary
- Product filtering utilities only if tests import them directly

Avoid exporting private component internals unless they are needed outside the feature boundary.

---

## Testing

Add focused unit tests for pure product discovery logic.

Required test coverage:

- Search by title.
- Search by description.
- Search by category.
- Category filtering.
- Price sorting ascending and descending.
- Rating sorting ascending and descending.
- Original product arrays are not mutated.
- Empty results when no products match.
- Debounce behavior if a new debounce hook is introduced.

Preferred test targets:

```text
src/features/products/utils/product-filters.test.ts
src/hooks/use-debounce.test.ts
```

Avoid fragile UI implementation tests unless pure logic tests cannot cover the behavior.

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
- State management libraries
- Debounce utility libraries
- Search libraries
- Form libraries
- URL state libraries

---

## Verify When Done

- [ ] Scope matches this specification.
- [ ] Homepage remains a Server Component.
- [ ] Products are fetched through `getProducts()`.
- [ ] Filtering, sorting, and search operate on already-loaded products.
- [ ] Search input is debounced.
- [ ] Category filter works.
- [ ] Price sorting works.
- [ ] Rating sorting works.
- [ ] Clear controls resets local filter state.
- [ ] Filtered empty state is handled gracefully.
- [ ] No URL query parameter synchronization added.
- [ ] No product detail routes added.
- [ ] No cart behavior added.
- [ ] No unnecessary dependencies introduced.
- [ ] Product filtering utilities are covered by unit tests.
- [ ] Debounce behavior is covered by unit tests if a hook is introduced.
- [ ] `pnpm test` passes.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] Responsive behavior verified on mobile and desktop.
- [ ] Accessibility basics verified.
- [ ] No console errors.
- [ ] `context/progress-tracker.md` updated after implementation.

