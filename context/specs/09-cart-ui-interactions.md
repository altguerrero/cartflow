# Unit 09: Cart UI & Interactions

## Goal

Provide the visible cart experience for CartFlow.

At the end of this unit, users should be able to add products to the cart from the catalog and product detail page, open a cart drawer from the header, manage cart item quantities, remove items, clear the cart, and review cart totals. Users should also be able to visit a dedicated cart page for full cart management.

This unit connects the existing Unit 08 cart state to the interface. Do not implement localStorage persistence, cart hydration, persistence migrations, checkout, payment, order submission, inventory validation, authentication, analytics, or server-side cart storage in this unit.

---

## Design

### Cart Interaction Purpose

Unit 09 turns the cart state architecture into a usable shopping experience.

The cart UI should:

- Use the existing cart context, reducer, actions, and selectors from Unit 08.
- Keep all cart mutations client-side.
- Avoid product API requests for cart interactions.
- Store cart item snapshots using the already-loaded product data.
- Make add, update, remove, and clear actions immediate and predictable.
- Present item subtotals and cart totals using derived selector values.
- Work consistently from the product catalog, product detail page, cart drawer, and cart page.
- Remain ready for Unit 10 persistence without implementing persistence yet.

### User Experience

Users should be able to:

- Add an item to the cart from a product card.
- Add an item to the cart from the product detail page.
- See the header cart count update immediately.
- Open and close a cart drawer from the header.
- Increase and decrease item quantities.
- Remove individual cart items.
- Clear the full cart.
- Review subtotal information.
- Navigate to a dedicated `/cart` page.
- Continue browsing products after interacting with the cart.

The cart experience should feel native to the storefront, with compact controls in the drawer and a fuller management layout on the cart page.

### Scope Boundary With Unit 10

Unit 09 uses in-memory cart state only.

Do not read from or write to:

- `localStorage`
- `sessionStorage`
- cookies
- IndexedDB
- server APIs

Unit 10 owns cart persistence, storage validation, hydration, and refresh survival.

---

## Implementation

### 1. Cart UI Structure

Create cart UI files under the cart feature boundary:

```text
src/features/cart/
├── components/
│   ├── add-to-cart-button.tsx
│   ├── cart-drawer.tsx
│   ├── cart-drawer-item.tsx
│   ├── cart-header-action.tsx
│   ├── cart-line-item.tsx
│   ├── cart-page.tsx
│   ├── cart-quantity-controls.tsx
│   └── cart-summary.tsx
├── utils/
│   ├── cart-formatters.ts
│   └── cart-product-adapter.ts
```

Only create additional files if they directly support this unit.

Responsibilities:

- `add-to-cart-button.tsx` owns product-to-cart add actions.
- `cart-header-action.tsx` owns the interactive header cart trigger and count display.
- `cart-drawer.tsx` owns drawer visibility, drawer layout, drawer empty state, and drawer actions.
- `cart-drawer-item.tsx` owns compact drawer item rendering.
- `cart-line-item.tsx` owns full cart page item rendering.
- `cart-quantity-controls.tsx` owns accessible increment/decrement quantity controls.
- `cart-summary.tsx` owns subtotal and cart summary display.
- `cart-page.tsx` owns the dedicated cart page composition.
- `cart-formatters.ts` owns currency and count formatting used by cart UI.
- `cart-product-adapter.ts` owns conversion from `Product` to `AddCartItemInput`.

Keep cart business rules inside the existing reducer and selectors. UI components should call cart actions; they should not duplicate reducer logic.

---

### 2. Cart Route

Create:

```text
src/app/cart/page.tsx
```

Responsibilities:

- Remain a Server Component.
- Render route metadata for the cart page.
- Compose the page shell and client cart page component.
- Do not fetch product data.
- Do not access cart context directly in the Server Component.

The page should render a client `CartPage` component from the cart feature.

Suggested metadata:

```ts
export const metadata = {
  title: "Cart | CartFlow",
  description: "Review and manage the products in your CartFlow shopping cart.",
};
```

---

### 3. Add to Cart From Product Cards

Update:

```text
src/features/products/components/product-card.tsx
```

Requirements:

- Add a visible “Add to cart” action to each product card.
- Use the existing cart context through a cart feature component.
- Preserve product detail navigation.
- Preserve existing catalog query string behavior for product detail links.
- Keep the card responsive and accessible.
- Use product snapshots from the existing `Product` object.

Important accessibility rule:

- Do not nest a `<button>` inside a `<Link>`.

If the product card currently uses the whole card as a link, restructure it so the product detail navigation and cart button are separate interactive elements. The product detail area should remain easy to click, but the add-to-cart button must be a real button with its own accessible label.

Do not add product quantity selection to product cards in this unit. Product card add-to-cart should add one item per click.

---

### 4. Add to Cart From Product Detail

Update:

```text
src/features/products/components/product-detail.tsx
```

Requirements:

- Add a visible add-to-cart action near the product price and primary product information.
- Use the same cart feature add button or shared cart adapter as product cards.
- Add one item per click.
- Preserve the existing read-only product detail content.
- Preserve catalog-state-aware back navigation.

Do not implement product variants, stock checks, checkout, or quantity selection on the detail page in this unit.

---

### 5. Header Cart Action

Update:

```text
src/components/layout/header.tsx
```

Requirements:

- Replace the visual cart placeholder with a client cart header action.
- Display the current total cart quantity.
- Open the cart drawer from the header.
- Provide a link or action from the drawer to the dedicated `/cart` page.
- Keep the existing header as a Server Component if possible by extracting only the interactive cart action into a Client Component.

The header should not read cart context directly unless it becomes a Client Component for a necessary reason. Prefer a small client component inside the cart feature boundary.

---

### 6. Cart Drawer

Create:

```text
src/features/cart/components/cart-drawer.tsx
```

This component should include `"use client"`.

Requirements:

- Open from the header cart action.
- Close with an explicit close button.
- Close with the Escape key.
- Close when clicking the backdrop.
- Trap obvious interaction focus inside the drawer as reasonably as possible without adding dependencies.
- Restore focus to the trigger after closing when practical.
- Render an empty state when the cart is empty.
- Render cart items when products exist.
- Show subtotal and total quantity.
- Provide a “View cart” link to `/cart`.
- Provide a clear cart action when the cart has items.

Use semantic Tailwind tokens and existing UI primitives.

Do not install a drawer/dialog dependency in this unit unless the existing shadcn/radix setup already provides an appropriate primitive without broad new dependency surface.

Do not implement checkout behavior. If a checkout CTA is shown, it must be disabled or clearly non-functional in this unit.

---

### 7. Cart Page

Create:

```text
src/features/cart/components/cart-page.tsx
```

This component should include `"use client"`.

Requirements:

- Render a full-page cart management experience.
- Render an empty state with a link back to the product catalog when the cart is empty.
- Render all cart items when the cart has items.
- Support quantity updates and item removal.
- Show subtotal and total quantity.
- Provide a clear cart action.
- Provide a “Continue shopping” link back to `/`.

Do not implement checkout flow or checkout routing.

---

### 8. Quantity Controls

Create:

```text
src/features/cart/components/cart-quantity-controls.tsx
```

Responsibilities:

- Render decrement and increment buttons.
- Render the current quantity.
- Use accessible labels that include the product title or item context.
- Decrementing from quantity `1` should remove the item by updating quantity to `0`.
- Keep controls keyboard accessible.
- Use stable dimensions so changing quantities does not shift the layout.

Do not duplicate quantity business rules in UI beyond calling the existing cart actions with the intended next quantity.

---

### 9. Cart Item Rendering

Create compact and full item components:

```text
src/features/cart/components/cart-drawer-item.tsx
src/features/cart/components/cart-line-item.tsx
```

Requirements:

- Display product image.
- Display product title.
- Display category.
- Display unit price.
- Display quantity controls.
- Display item subtotal.
- Display remove action.
- Use accessible image alt text.
- Use `next/image` for product images.

The drawer item should be compact. The cart page line item may use a roomier layout that works well on mobile and desktop.

---

### 10. Cart Summary

Create:

```text
src/features/cart/components/cart-summary.tsx
```

Requirements:

- Display total item quantity.
- Display subtotal.
- Make clear that shipping, taxes, and checkout are not calculated in this unit.
- Use selector-derived values from cart context.
- Avoid storing derived totals in local state.

Do not implement tax, shipping, discounts, coupon codes, payment, or checkout calculations.

---

### 11. Cart Formatting and Product Adapter

Create:

```text
src/features/cart/utils/cart-formatters.ts
src/features/cart/utils/cart-product-adapter.ts
```

Requirements:

- Format cart currency consistently for UI display.
- Convert a `Product` into `AddCartItemInput`.
- Keep utilities pure and testable.
- Avoid `any`.
- Do not mutate product objects.

The adapter should preserve:

- Product ID
- Title
- Price
- Image
- Category

---

### 12. Feature Exports

Update:

```text
src/features/cart/index.ts
```

Export only stable APIs needed outside the cart feature boundary:

- `CartProvider`
- `useCart`
- `AddToCartButton`
- `CartHeaderAction`
- `CartPage`
- cart reducer/actions/selectors already exported from Unit 08 as needed
- cart utility functions only if tests import them directly

Avoid exporting private drawer item or line item internals unless needed outside the feature boundary.

---

## Testing

Add focused tests for new pure cart UI support logic.

Required test coverage:

- Product-to-cart adapter maps product fields correctly.
- Product-to-cart adapter does not mutate the product object.
- Currency formatter formats USD consistently.
- Count or quantity formatter handles singular and plural labels if introduced.

Suggested test targets:

```text
src/features/cart/utils/cart-product-adapter.test.ts
src/features/cart/utils/cart-formatters.test.ts
```

Do not add fragile UI tests unless the project already has the required test utilities and the behavior cannot be covered through pure logic tests.

Existing reducer and selector tests must keep passing.

---

## Dependencies

Do not add new dependencies for this unit.

Allowed existing dependencies:

- React
- Next.js
- Tailwind CSS
- Existing shadcn/ui primitives
- Existing Radix primitives already installed in the project
- Existing Lucide icons
- Vitest

Do not introduce:

- External state management libraries
- Cart persistence libraries
- Drawer/dialog packages not already available
- Payment or checkout SDKs
- Toast libraries unless already installed
- Form libraries
- Animation libraries

---

## Verify When Done

- [ ] Scope matches this specification.
- [ ] Cart UI uses the existing Unit 08 cart context and actions.
- [ ] Product cards have accessible add-to-cart buttons.
- [ ] Product cards do not nest buttons inside links.
- [ ] Product detail page has an accessible add-to-cart button.
- [ ] Header cart action displays current total quantity.
- [ ] Cart drawer opens and closes from the header.
- [ ] Cart drawer supports Escape key close.
- [ ] Cart drawer supports backdrop close.
- [ ] Cart drawer renders empty and populated states.
- [ ] Dedicated `/cart` page exists.
- [ ] Cart page renders empty and populated states.
- [ ] Quantity increment works.
- [ ] Quantity decrement works.
- [ ] Decrementing from `1` removes the item.
- [ ] Remove item action works.
- [ ] Clear cart action works.
- [ ] Cart subtotal and item subtotals are displayed.
- [ ] No localStorage or persistence logic added.
- [ ] No checkout, payment, or order submission behavior added.
- [ ] No unnecessary dependencies introduced.
- [ ] New pure cart utility logic is covered by unit tests.
- [ ] Existing reducer and selector tests still pass.
- [ ] `pnpm test` passes.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] Responsive behavior verified on mobile and desktop.
- [ ] Accessibility basics verified.
- [ ] No console errors.
- [ ] `context/progress-tracker.md` updated after implementation.
