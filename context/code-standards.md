# Code Standards

## General

- Build production-quality code.
- Keep modules small, focused, and single-purpose.
- Fix root causes instead of adding workarounds.
- Do not mix UI, business logic, and data access responsibilities.
- Prefer composition over large monolithic components.
- Favor readability and maintainability over clever abstractions.
- Every implementation decision should support scalability and testability.
- Avoid premature optimization and unnecessary complexity.

---

## TypeScript

- Strict mode is required throughout the project.
- Do not use `any`.
- Use explicit interfaces and types for all domain models.
- Prefer `interface` for object contracts.
- Use `type` for unions, utility types, and mapped types.
- All API responses must be typed.
- Validate unknown external data before consuming it.
- Avoid type assertions unless absolutely necessary.
- Export shared domain types from centralized feature-level type files.

### Example

```ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
```

---

## Next.js

- Use App Router exclusively.
- Default to React Server Components.
- Add `"use client"` only when browser APIs, local state, hooks, or user interactions require it.
- Keep page files focused on composition and orchestration.
- Move reusable logic into feature modules and hooks.
- Avoid fetching data directly inside presentational components.
- Use Next.js navigation APIs instead of manual URL manipulation.
- Preserve filters and sorting state through URL query parameters.

---

## Data Fetching

- All API communication must be centralized.
- UI components must never call external APIs directly.
- Use feature-level service modules for all API interactions.
- Create typed API functions that return predictable data structures.
- Handle loading and error states explicitly for every request.
- Never duplicate fetch logic across features.

### Structure

```txt
src/features/products/services/
├── products.service.ts
├── products.types.ts
```

---

## State Management

- Use Context + useReducer for global cart state.
- Do not introduce external state management libraries.
- Keep global state minimal and focused.
- Prefer local state when data is not shared.
- Reducers must be pure functions.
- Action types must be explicit and strongly typed.
- Business logic belongs inside reducers, hooks, or services — never inside UI components.

---

## Local Storage

- Cart state must persist using localStorage.
- Access localStorage only inside client-side code.
- Wrap persistence logic in dedicated utility functions.
- Components should not directly manage serialization logic.
- Hydration issues must be handled explicitly.

---

## React Components

- Components should have a single responsibility.
- Prefer feature-based composition.
- Avoid components larger than approximately 200 lines.
- Extract reusable logic into custom hooks.
- Keep JSX focused on rendering concerns.
- Avoid nested conditional rendering when possible.
- Use early returns for loading and error states.
- Memoization should only be introduced when measurable value exists.

---

## Custom Hooks

- Extract reusable stateful logic into hooks.
- Prefix all hooks with `use`.
- Hooks must not contain UI concerns.
- Hooks should expose a clear public API.
- Unit tests should target hooks whenever business logic exists.

### Example

```txt
hooks/
├── useDebounce.ts
├── useCart.ts
├── useProductFilters.ts
```

---

## URL State

- Active filters must be reflected in URL query parameters.
- Sorting state must be reflected in URL query parameters.
- Search terms that affect filtering should be reflected in the URL.
- Navigation back from product detail must preserve previous state.
- URL state should be treated as the source of truth for filters.

---

## Search and Filtering

- Product search must use client-side filtering.
- Do not trigger additional API requests while searching.
- Search input must implement debounce.
- Filtering logic should be isolated from presentation.
- Sorting and filtering functions must be pure and testable.

---

## Styling

- Tailwind CSS is the only styling solution.
- Do not use CSS Modules.
- Do not use styled-components.
- Do not use inline styles unless unavoidable.
- Use utility classes consistently.
- Prefer reusable UI components for repeated patterns.
- Maintain consistent spacing using Tailwind scale values.
- Ensure responsive behavior across mobile, tablet, and desktop breakpoints.

---

## Testing

- Use Vitest for unit testing.
- Focus tests on business logic, utilities, reducers, and hooks.
- Avoid testing implementation details.
- Every test should validate observable behavior.
- Maintain at least the minimum required coverage for:
  - Debounce behavior
  - Cart reducer or cart utilities

### Example Targets

```txt
src/features/cart/cart.reducer.test.ts
src/hooks/useDebounce.test.ts
```

---

## Error Handling

- Every API request must expose loading and error states.
- Never silently fail.
- Display user-friendly error messages.
- Log unexpected errors appropriately.
- Handle empty states explicitly.

---

## File Organization

Use feature-based architecture.

```txt
src/
├── app/
├── components/
│   └── ui/
├── features/
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── cart/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── reducer/
│   │   └── types/
│   │
│   └── filters/
│       ├── hooks/
│       ├── utils/
│       └── types/
│
├── hooks/
├── lib/
├── types/
└── utils/
```

---

## Naming Conventions

- Components: PascalCase.
- Hooks: camelCase prefixed with `use`.
- Utilities: camelCase.
- Types and Interfaces: PascalCase.
- Constants: UPPER_SNAKE_CASE.
- File names should match the responsibility they contain.
- Avoid generic names such as `helpers.ts`, `stuff.ts`, or `utils.ts`.

### Examples

```txt
ProductCard.tsx
ProductGrid.tsx
useCart.ts
useDebounce.ts
products.service.ts
cart.reducer.ts
```

---

## Architecture Rules

- Components render data.
- Hooks manage UI behavior.
- Reducers manage state transitions.
- Services communicate with APIs.
- Utilities contain pure reusable functions.
- Types define contracts.
- No layer should bypass its responsibility.

### Never Do

- Fetch data inside presentational components.
- Store business logic in JSX.
- Access localStorage from reducers.
- Duplicate API calls across features.
- Use any.
- Introduce external state management libraries.
