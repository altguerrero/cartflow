# Unit 06: URL State Synchronization

## Goal

Make the product catalog controls URL-driven.

At the end of this unit, users should be able to search, filter by category, and sort products with state reflected in the URL query string. Refreshing the page, sharing the URL, and using browser back/forward navigation should recreate the same catalog view without triggering additional product API requests for client-side filter changes.

This unit builds directly on Unit 05. Do not implement product detail navigation, product detail pages, add-to-cart behavior, cart state, cart drawer behavior, cart persistence, comprehensive loading skeletons, or analytics in this unit.

---

## Design

### URL State Purpose

Unit 05 introduced local client-side product discovery controls. Unit 06 makes those same controls restorable and shareable by synchronizing their state with URL query parameters.

The URL-driven catalog experience should:

- Treat URL query parameters as the source of truth for active search, category, and sort state.
- Hydrate the catalog controls from the URL on initial render.
- Update the URL when users change search, category, or sort controls.
- Preserve browser back/forward behavior.
- Preserve refresh and direct-link behavior.
- Avoid additional product API requests during search, filtering, or sorting interactions.
- Keep filtering and sorting logic pure and testable.
- Preserve the existing product card, grid, controls, summary, and empty-state presentation.

### User Experience

Users should be able to:

- Search products and see the search term reflected in the URL.
- Select a category and see the category reflected in the URL.
- Select a sort option and see the sort reflected in the URL.
- Refresh the page and keep the same active catalog view.
- Share a URL that opens the same active catalog view.
- Use browser back/forward controls to move through previous catalog states.
- Clear controls and return to the canonical unfiltered catalog URL.
- Land on invalid query values without the interface breaking.

### Query Parameters

Use these query parameter names:

```text
q
category
sort
```

Parameter meanings:

- `q`: product search term.
- `category`: API-provided product category value.
- `sort`: product sort option.

Default state should not be written to the URL.

Canonical default URL:

```text
/
```

Example filtered URLs:

```text
/?q=shirt
/?category=electronics
/?sort=price-asc
/?q=gold&category=jewelery&sort=rating-desc
```

### URL Value Rules

Search:

- Trim unnecessary whitespace before applying to filters.
- Preserve readable user input in the control.
- Remove `q` from the URL when the normalized search term is empty.
- Debounce URL updates so typing does not write on every keystroke.

Category:

- Accept only `"all"` or category values derived from the loaded products.
- Do not write `category=all` to the URL.
- If the URL contains an unknown category, fall back to all categories and remove or ignore the invalid value.
- Preserve API-provided category values internally.

Sort:

- Accept only supported `ProductSortOption` values.
- Do not write `sort=featured` to the URL.
- If the URL contains an unknown sort value, fall back to `"featured"` and remove or ignore the invalid value.

Multiple values:

- If a query parameter appears multiple times, use the first value.
- Do not support multi-select category filters in this unit.

---

## Implementation

### 1. URL State Structure

Add URL-specific product discovery support under the products feature boundary:

```text
src/features/products/
├── hooks/
│   └── use-product-catalog-url-filters.ts
├── utils/
│   └── product-filter-url-state.ts
└── types/
    └── product-filter-url-state.types.ts
```

Only create additional files if they directly support this unit.

Responsibilities:

- `use-product-catalog-url-filters.ts` owns URL-driven filter state coordination.
- `product-filter-url-state.ts` owns pure parsing, validation, serialization, and query-building helpers.
- `product-filter-url-state.types.ts` owns URL-specific constants and contracts if those contracts do not naturally fit in existing product filter types.

Keep existing Unit 05 filtering and sorting utilities in `product-filters.ts`.

Do not move product API fetching into client components.

---

### 2. Homepage Composition

Update only if required:

```text
src/app/page.tsx
```

Responsibilities:

- Remain a Server Component.
- Continue fetching products using `getProducts()` from the product feature public API.
- Continue passing already-loaded products into `ProductCatalog`.
- Continue handling product service failure and truly empty product arrays gracefully.

The homepage must not become a Client Component.

Do not add client-side data fetching hooks.

Do not fetch products based on query parameters in this unit.

---

### 3. Product Catalog Client Component

Update:

```text
src/features/products/components/product-catalog.tsx
```

Responsibilities:

- Use the URL-driven product catalog filter hook.
- Continue rendering `ProductCatalogControls`.
- Continue rendering `ProductResultsSummary`.
- Continue rendering `ProductGrid` with filtered and sorted products.
- Continue rendering the filtered empty state when active filters produce zero matches.

Rules:

- Do not fetch products.
- Do not call product services.
- Do not mutate products.
- Do not add cart actions.
- Do not add product detail links.

---

### 4. URL-Driven Product Catalog Hook

Create:

```text
src/features/products/hooks/use-product-catalog-url-filters.ts
```

This hook should include `"use client"` if needed by the final implementation.

Responsibilities:

- Read current query parameters using Next.js App Router navigation APIs.
- Derive validated `ProductFilterState` from query parameters and loaded product categories.
- Maintain immediate search input text for controlled input responsiveness.
- Debounce search before writing the `q` parameter.
- Update query parameters when category or sort changes.
- Clear all catalog query parameters when controls are cleared.
- Derive filtered and sorted products from already-loaded products.
- Preserve unrelated query parameters only if they exist and do not conflict with catalog state.

Required Next.js APIs:

- `useSearchParams`
- `useRouter`
- `usePathname`

Use Next.js navigation APIs instead of manual `window.location` updates.

Avoid creating browser history entries for every debounced search keystroke. Prefer `router.replace` for debounced search updates. Category and sort changes may use `router.push` so browser back/forward can step through intentional control changes.

Do not use external URL state libraries.

---

### 5. URL Parsing and Serialization Utilities

Create:

```text
src/features/products/utils/product-filter-url-state.ts
```

Responsibilities:

- Parse `URLSearchParams` into a validated `ProductFilterState`.
- Validate category values against loaded product categories.
- Validate sort values against supported product sort options.
- Serialize `ProductFilterState` back into canonical query parameters.
- Build the next query string while omitting default values.
- Preserve deterministic parameter ordering.

Requirements:

- Keep utilities pure.
- Avoid `any`.
- Keep behavior deterministic.
- Do not mutate input `URLSearchParams`.
- Do not include product filtering or sorting logic in this file.
- Do not read browser globals in this file.

Suggested deterministic query order:

```text
q
category
sort
```

---

### 6. Query Parameter Constants

Define query parameter names in a single stable location.

Preferred location:

```text
src/features/products/utils/product-filter-url-state.ts
```

Acceptable alternative if shared outside the products feature becomes necessary later:

```text
src/shared/constants/query-params.ts
```

For this unit, keep constants product-scoped unless another route genuinely needs them.

Do not introduce shared constants prematurely.

---

### 7. Search Debounce Behavior

Search should continue to debounce before applying URL state updates.

Requirements:

- Typing in the search input should feel immediate.
- Filtering should update after the debounced search value is applied through URL state.
- The URL should not update on every keypress.
- Clearing the search input should remove `q` from the URL after debounce.
- Clear controls should reset immediately without waiting for debounce.

Do not add a debounce dependency.

If debounce logic becomes reusable, extract a generic hook only if it improves clarity without expanding scope.

---

### 8. Invalid URL State

Invalid query parameters must not break the catalog.

Examples:

```text
/?category=unknown
/?sort=not-real
/?q=%20%20%20
```

Expected behavior:

- Render the catalog using valid fallback defaults.
- Keep controls in a valid state.
- Avoid runtime errors.
- Avoid showing impossible selected values.

The implementation may either ignore invalid values or normalize the URL to remove them. If normalizing, avoid creating unnecessary history entries.

---

### 9. Browser Navigation

Browser navigation should work naturally with catalog state.

Requirements:

- Back/forward navigation should update controls and product results.
- Refresh should preserve active catalog state.
- Direct visits to URLs with valid query parameters should hydrate controls and results.
- Clearing controls should return the catalog to default state and remove catalog query parameters.

Do not implement product detail back navigation in this unit. Unit 07 owns product detail pages and context-preserving navigation from detail back to catalog.

---

### 10. Results and Empty States

Preserve Unit 05 results behavior:

- Show current visible result count.
- Indicate when the result set is filtered.
- Show a user-friendly empty state when active URL-driven filters produce zero results.
- Provide a clear controls action from the empty state.

Do not add loading skeletons in this unit.

---

### 11. Feature Exports

Update:

```text
src/features/products/index.ts
```

Export only stable APIs needed by app routes or tests:

- `ProductCatalog`
- Product URL state utilities only if tests import them directly
- Product filter types if used outside the feature boundary

Avoid exporting private hook internals unless they are needed outside the feature boundary.

---

## Testing

Add focused unit tests for URL parsing and serialization logic.

Required test coverage:

- Parses valid search query.
- Parses valid category query.
- Parses valid sort query.
- Falls back when category query is invalid.
- Falls back when sort query is invalid.
- Omits default values when serializing query state.
- Serializes combined search, category, and sort state.
- Preserves deterministic query parameter ordering.
- Does not mutate input `URLSearchParams`.
- Handles empty or whitespace-only search values.

Preferred test target:

```text
src/features/products/utils/product-filter-url-state.test.ts
```

If hook behavior is tested, keep tests focused on observable URL state behavior and avoid brittle implementation details.

---

## Dependencies

Do not add new dependencies for this unit.

Allowed existing dependencies:

- React
- Next.js App Router navigation APIs
- Tailwind CSS
- Existing shadcn/ui primitives
- Existing Lucide icons
- Vitest

Do not introduce:

- URL state libraries
- State management libraries
- Data fetching libraries
- Debounce utility libraries
- Search libraries
- Form libraries
- Analytics libraries

---

## Verify When Done

- [ ] Scope matches this specification.
- [ ] Homepage remains a Server Component.
- [ ] Products are fetched through `getProducts()`.
- [ ] Filtering, sorting, and search operate on already-loaded products.
- [ ] URL query parameters are the source of truth for search, category, and sort state.
- [ ] Search uses the `q` query parameter.
- [ ] Category uses the `category` query parameter.
- [ ] Sort uses the `sort` query parameter.
- [ ] Default filter values are omitted from the URL.
- [ ] Search input remains debounced.
- [ ] Refresh preserves active catalog state.
- [ ] Direct links hydrate active catalog state.
- [ ] Browser back/forward updates controls and results.
- [ ] Clear controls removes catalog query parameters.
- [ ] Invalid URL query values are handled gracefully.
- [ ] Filtered empty state still works.
- [ ] No additional product API requests are triggered by client-side filter changes.
- [ ] No product detail routes added.
- [ ] No cart behavior added.
- [ ] No unnecessary dependencies introduced.
- [ ] URL parsing and serialization utilities are covered by unit tests.
- [ ] `pnpm test` passes.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] Responsive behavior verified on mobile and desktop.
- [ ] Accessibility basics verified.
- [ ] No console errors.
- [ ] `context/progress-tracker.md` updated after implementation.
