# Architecture Context

## Stack

| Layer            | Technology                 | Role                                                                              |
| ---------------- | -------------------------- | --------------------------------------------------------------------------------- |
| Framework        | Next.js 16 + TypeScript    | Application framework using App Router, Server Components, and strict type safety |
| UI               | Tailwind CSS               | Styling, responsive layouts, and design system implementation                     |
| State Management | React Context + useReducer | Global cart state and application-wide shared state                               |
| Data Fetching    | Native Fetch API           | Server-side data retrieval from FakeStore API                                     |
| Persistence      | localStorage               | Cart persistence across page refreshes and browser sessions                       |
| Testing          | Vitest + Testing Library   | Unit testing for hooks, reducers, and utility functions                           |
| Deployment       | Vercel                     | Hosting, build pipeline, and ISR support                                          |
| External API     | FakeStore API              | Product catalog, categories, pricing, and ratings data                            |

---

## System Boundaries

- `src/app` — Route definitions, page composition, layouts, metadata, and server-side data loading.
- `src/features/products` — Product domain logic including services, hooks, types, filtering, sorting, search, and UI components.
- `src/features/cart` — Cart domain logic including reducer, context, persistence, calculations, and cart-related UI.
- `src/shared/components` — Reusable UI components shared across multiple features.
- `src/shared/hooks` — Generic reusable hooks not tied to a specific business domain.
- `src/shared/lib` — Utilities, storage abstractions, API helpers, and shared infrastructure code.
- `src/shared/types` — Shared TypeScript types used across features.
- `src/shared/constants` — Application constants, configuration values, and query parameter definitions.

---

## Data Flow Model

### Product Catalog Flow

```text
Next.js Page
      ↓
Products Service
      ↓
FakeStore API
      ↓
UI Components
```

- Product data is fetched through dedicated service functions.
- Pages and components never call external APIs directly.
- Product filtering, searching, and sorting occur client-side after initial data retrieval.
- Search operates on already-loaded data without additional network requests.

### Cart Flow

```text
UI Components
      ↓
Cart Context
      ↓
Cart Reducer
      ↓
localStorage
```

- The reducer is the single source of truth for cart state.
- All cart mutations pass through reducer actions.
- Cart state automatically synchronizes with localStorage.
- Cart is restored during application initialization.

### Filter Synchronization Flow

```text
URL Query Params
        ↕
useProductFilters Hook
        ↕
Products UI
```

- Active filters are synchronized with URL query parameters.
- Browser navigation preserves filter state.
- Shared URLs recreate the same catalog view.
- Product list state can always be reconstructed from the URL.

---

## Storage Model

### Browser Memory

Stores:

- Active product list
- Search term
- Selected category
- Sort configuration
- Current cart state

### localStorage

Stores:

- Cart items
- Product quantities
- Cart totals metadata if needed

### External API

Stores:

- Product information
- Categories
- Pricing
- Ratings
- Product descriptions

The application does not own or persist product catalog data.

---

## API Consumption Model

### Products

- All products are retrieved through FakeStore API.
- Product requests are encapsulated inside service functions.
- Product services handle transformation and normalization when needed.
- UI layers consume typed service responses only.

### Caching Strategy

- Product pages use Incremental Static Regeneration (ISR).
- Catalog data is revalidated periodically.
- Search, filtering, and sorting occur client-side.
- Navigation between catalog and product detail should minimize redundant requests.

---

## Error Handling Model

### API Errors

- Every API request exposes loading, success, and error states.
- User-friendly error messages are displayed when requests fail.
- Failed requests never crash the application UI.

### Runtime Errors

- Error Boundaries isolate unexpected rendering failures.
- Feature-specific errors remain contained within their domain.
- A failure in one feature should not break unrelated features.

---

## Rendering Strategy

### Product Listing

- Server-rendered using App Router.
- Uses Incremental Static Regeneration (ISR).
- Initial product catalog is delivered from the server.

### Product Detail

- Server-rendered product detail pages.
- Direct navigation is supported.
- Browser back navigation preserves previous filter state through URL synchronization.

### Cart

- Client-side interactive feature.
- Hydrates from localStorage after page load.
- Updates immediately without page refresh.

---

## State Management Model

### Local State

Used for:

- Component interactions
- UI toggles
- Temporary view state

### Feature State

Used for:

- Product filtering
- Search management
- Sort management

### Global State

Used only for:

- Shopping cart

Global state is managed through Context + useReducer.

No external state management libraries are permitted.

---

## Invariants

1. UI components and pages must never perform direct API calls.
2. All external API communication must go through dedicated service layers.
3. The cart reducer is the single source of truth for cart state.
4. Active filters must always be reproducible from URL query parameters.
5. Search functionality must operate on already-loaded data and never trigger additional API requests.
6. No implicit or explicit `any` types are allowed.
7. All local persistence must be handled through a dedicated storage abstraction.
8. Loading and error states must exist for every API interaction.
9. Route handlers and Server Actions must not be introduced unless a genuine server-side requirement exists.
10. Product domain logic and cart domain logic must remain isolated within their respective feature boundaries.
11. Browser navigation must preserve the user’s catalog context.
12. Application architecture must remain backendless and consume FakeStore API directly through service layers.
