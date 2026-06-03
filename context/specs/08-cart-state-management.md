# Unit 08: Cart State Management

## Goal

Create the global shopping cart state architecture for CartFlow.

At the end of this unit, the application should have a typed cart domain model, reducer, actions, selectors, context provider, and hook that future UI can use to add, update, remove, and summarize cart items.

This unit introduces cart state architecture only. Do not implement add-to-cart buttons, product card cart actions, product detail cart actions, cart drawer UI, cart page UI, cart persistence, localStorage synchronization, checkout behavior, toasts, or visual cart item controls in this unit.

---

## Design

### Cart State Purpose

Unit 08 establishes the cart as the only global application state.

The cart state architecture should:

- Use React Context + `useReducer`.
- Keep reducer transitions pure and deterministic.
- Keep domain calculations in pure selectors/utilities.
- Store enough product information in cart items for later cart UI rendering.
- Support quantity updates and item removal.
- Be ready for Unit 09 cart UI and Unit 10 localStorage persistence.
- Avoid introducing external state management.

### User Experience Boundary

Users should not see new cart functionality yet.

This unit is infrastructure for future visible behavior. The existing header cart button may remain a visual placeholder.

Unit 09 owns:

- Add-to-cart buttons.
- Cart drawer/page UI.
- Quantity controls.
- Remove buttons.
- Cart totals displayed in the interface.
- Toasts or interaction feedback.

Unit 10 owns:

- localStorage reads.
- localStorage writes.
- Hydration from persisted cart data.
- Persistence migration or validation.

---

## Implementation

### 1. Cart Feature Structure

Create the cart feature boundary:

```text
src/features/cart/
├── context/
│   └── cart-context.tsx
├── hooks/
│   └── use-cart.ts
├── reducer/
│   ├── cart.reducer.ts
│   └── cart.actions.ts
├── selectors/
│   └── cart.selectors.ts
├── types/
│   └── cart.types.ts
└── index.ts
```

Only create additional files if they directly support this unit.

Responsibilities:

- `cart.types.ts` owns cart item, cart state, action, and dispatch contracts.
- `cart.actions.ts` owns typed action creators.
- `cart.reducer.ts` owns pure cart state transitions.
- `cart.selectors.ts` owns pure cart derivations and price calculations.
- `cart-context.tsx` owns the provider and React context values.
- `use-cart.ts` owns the consumer hook.
- `index.ts` exports stable cart APIs needed outside the feature boundary.

---

### 2. Cart State Model

Define a cart item that stores a product snapshot.

Suggested shape:

```ts
export interface CartItem {
  productId: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}
```

Define cart state:

```ts
export interface CartState {
  items: CartItem[];
}
```

Requirements:

- Quantity must be a positive integer.
- Product IDs must be unique in the cart.
- Cart state must be serializable.
- Cart state must not store functions, React nodes, or non-serializable values.

Do not store derived totals inside state in this unit. Totals should be computed by selectors.

---

### 3. Cart Actions

Define explicit cart actions.

Required reducer actions:

- Add item.
- Update item quantity.
- Remove item.
- Clear cart.

Suggested action type names:

```ts
"cart/add-item";
"cart/update-item-quantity";
"cart/remove-item";
"cart/clear";
```

Requirements:

- Use discriminated unions.
- Avoid loosely typed strings outside action definitions.
- Provide typed action creators.
- Keep payloads explicit.

Add item behavior:

- If the product is not already in the cart, add it with quantity `1` unless a valid quantity is provided.
- If the product already exists, increase its quantity by the provided quantity, defaulting to `1`.

Update item quantity behavior:

- If quantity is greater than `0`, update the item quantity.
- If quantity is `0` or lower, remove the item.

Remove item behavior:

- Remove the item with the matching product ID.
- If the item does not exist, return unchanged state.

Clear behavior:

- Return the empty cart state.

---

### 4. Reducer

Create:

```text
src/features/cart/reducer/cart.reducer.ts
```

Responsibilities:

- Export `cartReducer`.
- Export `INITIAL_CART_STATE`.
- Handle all cart action types.
- Return unchanged state for no-op updates.
- Keep transitions pure and deterministic.

Rules:

- Do not read or write localStorage.
- Do not call product services.
- Do not mutate existing state or item objects.
- Do not use browser APIs.
- Do not import React.

---

### 5. Selectors and Calculations

Create:

```text
src/features/cart/selectors/cart.selectors.ts
```

Required selectors:

- Get cart item count.
- Get total quantity.
- Get subtotal for one cart item.
- Get cart subtotal.
- Check whether cart is empty.
- Find a cart item by product ID.

Requirements:

- Keep selectors pure.
- Avoid floating-point surprises as much as reasonable for display calculations.
- Do not format currency strings in selectors.
- Do not store selector results in reducer state.

Suggested selector names:

```ts
getCartItemCount;
getCartTotalQuantity;
getCartItemSubtotal;
getCartSubtotal;
isCartEmpty;
getCartItemByProductId;
```

---

### 6. Cart Context Provider

Create:

```text
src/features/cart/context/cart-context.tsx
```

This file should include `"use client"`.

Responsibilities:

- Create cart state context.
- Create cart dispatch or actions context.
- Use `useReducer(cartReducer, INITIAL_CART_STATE)`.
- Expose stable, typed cart actions.
- Expose selector-derived values useful for UI.

Suggested context value:

```ts
interface CartContextValue {
  state: CartState;
  items: CartItem[];
  itemCount: number;
  totalQuantity: number;
  subtotal: number;
  isEmpty: boolean;
  addItem: (item: AddCartItemInput) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}
```

Requirements:

- Throw a clear error if `useCart` is used outside `CartProvider`.
- Keep provider focused on state orchestration.
- Do not access localStorage.
- Do not render cart UI.
- Do not call product services.

---

### 7. App Provider Integration

Update:

```text
src/context/app-providers.tsx
```

Responsibilities:

- Wrap application children with `CartProvider`.
- Preserve existing `ThemeProvider`.
- Keep provider order simple and predictable.

Example:

```tsx
<ThemeProvider>
  <CartProvider>{children}</CartProvider>
</ThemeProvider>
```

Do not add persistence effects in this unit.

---

### 8. Product Integration Boundary

Do not update product cards or product detail pages to call cart actions in this unit.

Allowed:

- Define cart input types that can be built from a `Product`.
- Add pure helper functions only if needed for cart domain tests.

Not allowed:

- Add visible add-to-cart buttons.
- Wire product listing to `useCart`.
- Wire product detail to `useCart`.
- Add cart drawer opening behavior.

---

### 9. Feature Exports

Create:

```text
src/features/cart/index.ts
```

Export only stable APIs needed outside the cart feature:

- `CartProvider`
- `useCart`
- Cart types used by future product/cart UI
- Cart reducer/selectors only if tests or future units require direct imports

Avoid exporting internal context objects unless necessary.

---

## Testing

Add focused unit tests for cart reducer and selectors.

Required reducer test coverage:

- Adds a new item.
- Increments quantity when adding an existing item.
- Adds item with explicit quantity.
- Updates item quantity.
- Removes item when quantity is set to zero.
- Removes item by product ID.
- Clears cart.
- Returns unchanged state for no-op removal or update.
- Does not mutate previous state.

Required selector test coverage:

- Calculates unique item count.
- Calculates total quantity.
- Calculates item subtotal.
- Calculates cart subtotal.
- Detects empty cart.
- Finds item by product ID.

Preferred test targets:

```text
src/features/cart/reducer/cart.reducer.test.ts
src/features/cart/selectors/cart.selectors.test.ts
```

Do not add fragile UI tests for this unit.

---

## Dependencies

Do not add new dependencies for this unit.

Allowed existing dependencies:

- React
- TypeScript
- Vitest

Do not introduce:

- Redux
- Zustand
- MobX
- Recoil
- Jotai
- Immer
- Data fetching libraries
- Persistence libraries
- Form libraries

---

## Verify When Done

- [ ] Scope matches this specification.
- [ ] Cart feature boundary exists under `src/features/cart`.
- [ ] Cart state uses React Context + `useReducer`.
- [ ] Cart reducer is pure.
- [ ] Cart actions are explicit and typed.
- [ ] Cart selectors are pure.
- [ ] Quantity logic works.
- [ ] Price calculations work.
- [ ] App is wrapped with `CartProvider`.
- [ ] `useCart` throws a clear error outside provider.
- [ ] No cart UI added.
- [ ] No add-to-cart buttons added.
- [ ] No product cards wired to cart actions.
- [ ] No product detail page wired to cart actions.
- [ ] No localStorage persistence added.
- [ ] No unnecessary dependencies introduced.
- [ ] Cart reducer tests added.
- [ ] Cart selector tests added.
- [ ] `pnpm test` passes.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] `context/progress-tracker.md` updated after implementation.
