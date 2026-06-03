# Unit 04: Product Grid UI

## Goal

Implement the first real product catalog browsing experience for CartFlow.

At the end of this unit, the homepage should display products from the Unit 03 data layer in a responsive grid with polished product cards, product imagery, category badges, ratings, and prices.

Do not implement filtering, sorting, search, URL state synchronization, product detail navigation, cart state, add-to-cart behavior, cart drawer behavior, or cart persistence in this unit.

---

## Design

### Catalog Experience

This unit replaces the temporary design-system validation homepage with a product-focused catalog page.

The catalog should:

- Feel like a production storefront.
- Use the existing application shell and container system.
- Fetch products through the product service layer.
- Render products in a responsive grid.
- Make each product visually scannable.
- Preserve the CartFlow semantic token system.
- Remain mobile-first and accessible.

### Product Card

Each product card should display:

- Product image.
- Product category badge.
- Product title.
- Product rating value.
- Review count.
- Product price.

The product card should follow `context/ui-context.md`:

- Product-first layout.
- `rounded-2xl` card shape.
- `shadow-sm` by default.
- Subtle hover elevation.
- Image area with stable dimensions.
- Responsive text behavior without overflow.

Do not add an active Add to Cart interaction in this unit. Unit 09 owns catalog cart interactions. If the card layout reserves space for a future cart action, it must not mutate cart state or imply completed cart functionality.

### Product Grid

Use the documented responsive catalog grid:

```text
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
```

The grid should avoid layout shifts caused by image loading or long product names.

### User Experience Boundaries

Allowed:

- Product catalog page composition.
- Server-side product fetching through `getProducts()`.
- Product card rendering.
- Product grid rendering.
- Price and rating presentation.
- Product image handling.
- Empty product list fallback if the service returns an empty array.

Not allowed:

- Search input.
- Category filter controls.
- Sort controls.
- Query parameter state.
- Dynamic product detail route.
- Client-side product fetching.
- Add-to-cart behavior.
- Cart context, reducer, persistence, or drawer logic.
- Comprehensive loading and error state system beyond what is necessary for this page. Unit 11 owns the full asynchronous state treatment.

---

## Implementation

### 1. Product Components Structure

Create product UI components under the products feature boundary:

```text
src/features/products/components/
├── product-card.tsx
├── product-grid.tsx
├── product-price.tsx
└── product-rating.tsx
```

Only create additional files if they directly support this unit.

Component responsibilities:

- `product-card.tsx` renders one product summary card.
- `product-grid.tsx` renders a responsive list of product cards.
- `product-price.tsx` owns consistent price display.
- `product-rating.tsx` owns rating and review count display.

Keep components presentational. They should receive typed props and should not fetch data directly.

---

### 2. Homepage Catalog Composition

Update:

```text
src/app/page.tsx
```

Responsibilities:

- Remain a Server Component.
- Fetch products using `getProducts()` from the products feature public API.
- Render page-level catalog heading and supporting copy.
- Render `ProductGrid`.
- Render an empty state if no products are available.

Do not add `"use client"` to the homepage for this unit.

Do not fetch directly from Fake Store API in the page. Use the existing service function only.

---

### 3. Product Card

Create:

```text
src/features/products/components/product-card.tsx
```

Expected props:

```ts
interface ProductCardProps {
  product: Product;
}
```

Requirements:

- Use the existing `Card`, `Badge`, and related UI primitives where appropriate.
- Use semantic Tailwind utilities from the CartFlow design tokens.
- Keep the whole card layout stable across product titles of different lengths.
- Prevent image overflow.
- Provide meaningful image `alt` text based on the product title.
- Avoid inline styles.
- Avoid cart actions.
- Avoid product detail links until Unit 07 defines route behavior and context-preserving navigation.

Hover behavior may include subtle card elevation and image scale using Tailwind transitions.

---

### 4. Product Grid

Create:

```text
src/features/products/components/product-grid.tsx
```

Expected props:

```ts
interface ProductGridProps {
  products: Product[];
}
```

Requirements:

- Render products using the documented responsive grid columns.
- Use stable spacing between cards.
- Keep the component free of filtering, sorting, and search logic.
- Render only products provided through props.

If the product array is empty, either return `null` and let the page render the empty state, or render a scoped empty state consistently. Prefer page-level empty handling unless a reusable grid empty state is clearly simpler.

---

### 5. Rating Display

Create:

```text
src/features/products/components/product-rating.tsx
```

Expected props:

```ts
interface ProductRatingProps {
  rating: ProductRating;
}
```

Requirements:

- Display the numeric rating.
- Display the review count.
- Include accessible text for screen readers.
- Use a simple visual indicator, such as a Lucide star icon, if it aligns with existing dependencies.
- Do not introduce a new icon library.

Do not implement interactive ratings or review creation.

---

### 6. Price Display

Create:

```text
src/features/products/components/product-price.tsx
```

Expected props:

```ts
interface ProductPriceProps {
  price: number;
}
```

Requirements:

- Display prices in USD.
- Keep formatting consistent across product cards.
- Use a small, local formatting helper only if needed.
- Avoid introducing a dependency for currency formatting.

If a formatting helper is extracted into a utility, it should be pure and testable.

---

### 7. Product Image Handling

Use Next.js image handling for product images.

Requirements:

- Use `next/image` for product images unless a framework-specific blocker is discovered.
- Configure `next.config.ts` for Fake Store API image hosts if required.
- Keep image containers dimensionally stable with aspect ratio or fixed responsive constraints.
- Avoid cumulative layout shift.
- Use product titles for image alt text.

Do not add image optimization work beyond the needs of this unit. Unit 13 owns final image optimization review.

---

### 8. Feature Exports

Update:

```text
src/features/products/index.ts
```

Export only stable component APIs needed by app routes:

- `ProductGrid`
- Any product UI components that routes need directly

Do not export internal helpers unless needed outside the feature boundary.

---

### 9. Accessibility Requirements

The catalog UI must include:

- Semantic page heading.
- Semantic list or grid structure for products.
- Meaningful product image alt text.
- Screen-reader-friendly rating text.
- Visible keyboard focus states only where focusable elements exist.
- Text that does not overflow or overlap at mobile widths.

Since this unit should not add clickable product cards or active cart actions, avoid adding unnecessary focusable controls.

---

### 10. Testing

This unit is primarily presentational.

Required:

- Existing tests must continue passing.
- Add unit tests only for extracted pure formatting logic, if such logic is introduced.

Do not add fragile UI tests for card markup unless a reusable business or formatting behavior is introduced.

---

## Dependencies

Do not add new dependencies for this unit.

Allowed existing dependencies:

- Next.js
- React
- Tailwind CSS
- shadcn/ui primitives already installed
- `lucide-react` if an icon is useful for rating display

Do not introduce:

- Data fetching libraries
- State management libraries
- Carousel libraries
- Image gallery libraries
- Currency formatting libraries

---

## Verify When Done

- [ ] Scope matches this specification.
- [ ] Homepage renders a product catalog instead of the temporary validation UI.
- [ ] Products are fetched through `getProducts()`.
- [ ] No direct Fake Store API calls exist in UI components.
- [ ] Product cards show image, category, title, rating, review count, and price.
- [ ] Product grid uses the documented responsive columns.
- [ ] Product images render without layout shift.
- [ ] Empty product arrays are handled gracefully.
- [ ] No filtering, sorting, search, URL state, detail routes, or cart behavior added.
- [ ] No unnecessary dependencies introduced.
- [ ] `pnpm test` passes.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] Responsive behavior verified on mobile and desktop.
- [ ] Accessibility basics verified.
- [ ] No console errors.
- [ ] `context/progress-tracker.md` updated after implementation.

