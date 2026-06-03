# Unit 10: Cart Persistence

## Goal

Persist CartFlow cart state across browser refreshes, direct URL entry, and normal browsing sessions.

At the end of this unit, users should be able to add products to the cart, refresh the page, navigate directly to `/cart`, close and reopen the browser tab, and still see the same cart contents restored from `localStorage`.

This unit adds persistence only. Do not implement checkout, payment, order submission, authentication, backend cart storage, cross-device sync, product inventory validation, product data refetching for stored cart items, cart expiration, analytics, or loading skeletons in this unit.

---

## Design

### Persistence Purpose

Unit 10 completes the cart behavior introduced in Units 08 and 09 by storing cart state locally in the browser.

Cart persistence should:

- Use `localStorage`.
- Keep the cart reducer as the source of truth for cart transitions.
- Keep storage access isolated from UI components.
- Validate persisted data before using it.
- Recover safely from missing, malformed, stale, or incompatible persisted data.
- Avoid hydration mismatches in the App Router.
- Avoid overwriting a valid stored cart with the initial empty cart before hydration completes.
- Keep all persistence client-side.

### User Experience

Users should be able to:

- Add products to the cart.
- Refresh the current page without losing cart contents.
- Enter `http://localhost:3000/cart` directly and see persisted cart contents.
- Navigate between catalog, product detail, drawer, and cart page without losing cart contents.
- Clear the cart and have the cleared state persist.
- Continue using the cart normally if stored data is invalid; invalid stored data should be discarded.

Persistence should feel invisible. Do not add new visible UI unless it is necessary to prevent confusing hydration behavior.

### Scope Boundary With Unit 11

Unit 10 should not add comprehensive loading skeletons, error boundaries, retry UIs, or broad loading/error state redesigns.

Unit 11 owns broader loading and error state polish.

If a minimal hydration guard is needed to prevent cart flicker or accidental empty persistence, keep it scoped to the cart provider and cart UI.

---

## Implementation

### 1. Cart Persistence Structure

Create persistence files under the cart feature boundary:

```text
src/features/cart/
├── persistence/
│   ├── cart-storage.ts
│   └── cart-storage.test.ts
```

Only create additional files if they directly support this unit.

Responsibilities:

- `cart-storage.ts` owns all `localStorage` interaction.
- `cart-storage.test.ts` owns storage serialization, validation, and recovery tests.

Do not access `localStorage` from UI components, reducer tests, product components, app routes, or shared layout components.

---

### 2. Storage Key and Data Shape

Define a stable storage key.

Suggested key:

```ts
const CART_STORAGE_KEY = "cartflow.cart.v1";
```

Persist a versioned payload.

Suggested shape:

```ts
interface PersistedCartPayload {
  version: 1;
  state: CartState;
}
```

Requirements:

- Store cart state as JSON.
- Persist only serializable cart state.
- Do not persist selector-derived totals.
- Do not persist UI state such as drawer open/closed status.
- Do not persist temporary button feedback state.
- Do not persist product API metadata outside the cart item snapshot.

---

### 3. Storage Adapter

Create:

```text
src/features/cart/persistence/cart-storage.ts
```

Required exports:

- `CART_STORAGE_KEY`
- `readPersistedCartState`
- `writePersistedCartState`
- `clearPersistedCartState`
- `parsePersistedCartState` or equivalent pure parser

Responsibilities:

- Read cart state from `localStorage`.
- Write cart state to `localStorage`.
- Clear persisted cart state.
- Parse and validate unknown persisted values.
- Return a safe empty result when stored data is missing or invalid.

Requirements:

- Keep parser logic pure and testable.
- Treat `localStorage` failures as recoverable.
- Do not throw for malformed JSON.
- Do not throw for unavailable storage.
- Do not use `any`.
- Do not mutate parsed state.
- Do not import React.
- Do not call product services.

Recommended return style:

```ts
type CartStorageReadResult =
  | { status: "success"; state: CartState }
  | { status: "empty" }
  | { status: "invalid" }
  | { status: "unavailable" };
```

Use an equivalent typed result if it is clearer for the implementation.

---

### 4. Persisted State Validation

Validate persisted cart state before hydrating.

Validation requirements:

- Payload must be an object.
- Payload version must be supported.
- `state.items` must be an array.
- Every item must include:
  - `productId` as a finite number.
  - `title` as a non-empty string.
  - `price` as a finite non-negative number.
  - `image` as a non-empty string.
  - `category` as a non-empty string.
  - `quantity` as a positive integer.
- Duplicate product IDs must not produce duplicate cart items.
- Invalid items must not be hydrated.
- If all items are invalid, hydrate an empty cart or return invalid/empty.

Choose one deterministic duplicate strategy:

- Keep the first valid item for a product ID.
- Or keep the last valid item for a product ID.

Document the chosen strategy in the storage parser tests.

Do not fetch fresh product data to validate persisted cart items in this unit.

---

### 5. Cart Hydration Action

Update cart state types, actions, and reducer as needed to support hydration.

Suggested action:

```ts
"cart/hydrate";
```

Requirements:

- Hydrate the reducer with a validated `CartState`.
- Keep reducer pure.
- Do not read `localStorage` inside the reducer.
- Hydration should replace current cart state with validated persisted state.
- Existing add/update/remove/clear behavior must remain unchanged.

Update reducer tests to cover hydration if a new reducer action is introduced.

---

### 6. Cart Provider Hydration

Update:

```text
src/features/cart/context/cart-context.tsx
```

Responsibilities:

- Read persisted cart state on the client after mount.
- Hydrate cart reducer once using validated persisted state.
- Persist cart state after hydration has completed.
- Clear persisted state when the cart is cleared or empty if that is the chosen storage behavior.
- Avoid writing the initial empty state before storage has been read.

Requirements:

- Keep `CartProvider` as a Client Component.
- Use `useEffect` for browser storage access.
- Do not access `window` or `localStorage` during server render.
- Expose hydration status if cart UI needs it to avoid flicker.
- Do not add product fetching.
- Do not add UI rendering inside the provider.

Recommended context addition:

```ts
isHydrated: boolean;
```

Use this only if needed by cart UI to avoid confusing empty states before persisted data is loaded.

---

### 7. Cart UI Hydration Handling

Update cart UI only as needed to avoid misleading empty states before hydration completes.

Potential targets:

```text
src/features/cart/components/cart-header-action.tsx
src/features/cart/components/cart-drawer.tsx
src/features/cart/components/cart-page.tsx
```

Requirements:

- Do not show a misleading empty cart state before hydration has completed.
- Header cart count should reflect hydrated cart state after mount.
- Direct navigation to `/cart` should restore persisted items after hydration.
- Keep UI minimal; comprehensive loading skeletons belong to Unit 11.

Acceptable minimal approaches:

- Temporarily hide the cart count until hydrated.
- Render a minimal “Loading cart…” state in cart drawer/page until hydrated.
- Or keep existing UI if hydration is synchronous enough and does not write empty state prematurely.

Do not add new cart UI features beyond hydration-safe behavior.

---

### 8. Feature Exports

Update:

```text
src/features/cart/index.ts
```

Export only stable persistence APIs needed by tests or implementation:

- Storage functions only if tests import from the feature barrel.
- Hydration types only if needed outside the cart feature boundary.

Avoid exporting private validation helpers unless tests require direct parser coverage.

---

## Testing

Add focused unit tests for persistence logic.

Required test coverage:

- Missing storage value returns empty result.
- Valid persisted payload hydrates expected cart state.
- Malformed JSON does not throw and returns invalid/empty result.
- Unsupported payload version is rejected.
- Invalid item fields are rejected.
- Duplicate product IDs are handled deterministically.
- Writing cart state stores the expected versioned payload.
- Clearing cart persistence removes the storage key.
- Storage read/write failures are recoverable.
- Hydration reducer action replaces current state if introduced.

Suggested test targets:

```text
src/features/cart/persistence/cart-storage.test.ts
src/features/cart/reducer/cart.reducer.test.ts
```

Avoid fragile UI tests unless hydration behavior cannot be verified through storage and reducer tests.

Existing cart reducer, selector, adapter, and formatter tests must keep passing.

---

## Dependencies

Do not add new dependencies for this unit.

Allowed existing dependencies:

- React
- Next.js
- Tailwind CSS
- Vitest

Do not introduce:

- External state management libraries
- Persistence libraries
- Schema validation libraries
- Data fetching libraries
- Server APIs
- Cookies
- IndexedDB wrappers
- Checkout or payment SDKs

---

## Verify When Done

- [ ] Scope matches this specification.
- [ ] Cart state persists to `localStorage`.
- [ ] Cart state hydrates from `localStorage`.
- [ ] Direct navigation to `/cart` restores persisted cart contents.
- [ ] Refreshing catalog restores header cart count.
- [ ] Refreshing cart page restores cart items.
- [ ] Clearing the cart clears persisted cart state or persists an empty cart consistently.
- [ ] Invalid persisted data is safely ignored or cleared.
- [ ] Malformed JSON does not crash the app.
- [ ] Reducer remains pure.
- [ ] No product API requests are added for cart hydration.
- [ ] No checkout, payment, backend storage, or cross-device sync added.
- [ ] No unnecessary dependencies introduced.
- [ ] Persistence utilities are covered by unit tests.
- [ ] Existing cart tests still pass.
- [ ] `pnpm test` passes.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] Manual refresh/direct URL behavior verified in browser.
- [ ] Accessibility basics preserved.
- [ ] No console errors.
- [ ] `context/progress-tracker.md` updated after implementation.
