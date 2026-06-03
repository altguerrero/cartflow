# Unit 03: Product Catalog Data Layer

## Goal

Implement the reusable product catalog data layer for CartFlow.

At the end of this unit, the application should have typed domain models, centralized Fake Store API service functions, predictable error handling, and testable data transformation utilities that future catalog UI, filtering, sorting, and product detail units can consume.

Do not implement product grid UI, product cards, search UI, filters, sorting controls, URL synchronization, product detail pages, or cart behavior in this unit.

---

## Design

### Data Layer Purpose

This unit establishes the product domain foundation only.

The data layer should:

- Encapsulate all Fake Store API communication.
- Expose stable TypeScript domain types.
- Normalize external API responses before UI consumption.
- Provide clear error behavior for failed API requests.
- Keep product and category logic isolated under the products feature boundary.
- Be reusable by Server Components and future feature utilities.

### User Experience Impact

This unit does not introduce a new user-facing catalog experience.

The temporary homepage may remain unchanged unless a minimal non-business validation is needed. Product data should not be rendered as a catalog in this unit.

Future units will use this data layer to build:

- Product grid UI
- Product detail pages
- Filtering and sorting
- URL-driven catalog state

---

## Implementation

### 1. Product Feature Structure

Create the product feature data structure:

```text
src/features/products/
├── services/
│   ├── products.service.ts
│   └── products.errors.ts
├── types/
│   └── product.types.ts
├── utils/
│   └── product-transformers.ts
└── index.ts
```

Only create files that are needed for this unit.

Keep UI components out of this unit.

---

### 2. Domain Types

Create:

```text
src/features/products/types/product.types.ts
```

Define domain types for:

- Product
- Product rating
- Product category
- External Fake Store product response if transformation requires a separate API type

Requirements:

- Use `interface` for object contracts.
- Use `type` for unions or aliases.
- Avoid `any`.
- Avoid unnecessary type assertions.
- Keep exported types feature-specific unless they are genuinely shared across the application.

Expected product domain shape:

```ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
  rating: ProductRating;
}
```

Categories should be represented as API-provided string values for this unit. Do not hardcode a closed category enum unless the service layer validates and owns that decision explicitly.

---

### 3. API Configuration

Use the existing environment contract:

```env
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

Create a small API URL helper only if needed.

Rules:

- Do not fetch directly from UI components.
- Do not duplicate endpoint strings across modules.
- Do not introduce a data fetching library.
- Use native `fetch`.
- Keep the app backendless.

---

### 4. Products Service

Create:

```text
src/features/products/services/products.service.ts
```

Expose service functions:

```ts
getProducts();
getProductById(id);
getCategories();
```

Responsibilities:

- Build Fake Store API URLs.
- Fetch catalog data.
- Validate response status.
- Transform external product responses into domain products.
- Return typed data.
- Throw predictable product service errors when requests fail.

Expected endpoints:

```text
GET /products
GET /products/:id
GET /products/categories
```

Caching and rendering expectations:

- Service functions should be safe to call from App Router Server Components.
- Use Next.js-compatible `fetch` options where appropriate for catalog data revalidation.
- Do not add Route Handlers or Server Actions.
- Do not add client-side fetching hooks in this unit.

---

### 5. Error Handling

Create:

```text
src/features/products/services/products.errors.ts
```

Define a predictable service error model.

Requirements:

- Failed requests should not leak raw implementation details to UI layers.
- Errors should include enough information for future user-friendly fallback states.
- Service functions should throw a typed custom error or a clearly typed error factory.
- Preserve the failed operation context where useful.

Example error scenarios:

- API base URL is missing or invalid.
- Product list request fails.
- Product detail request fails.
- Categories request fails.
- Response shape is invalid.

Do not implement UI error states in this unit. Unit 11 owns visible loading and error states.

---

### 6. Data Transformation Utilities

Create:

```text
src/features/products/utils/product-transformers.ts
```

Responsibilities:

- Convert Fake Store product responses into CartFlow domain products.
- Validate required fields at runtime before returning typed data.
- Keep transformation logic pure and testable.
- Normalize data only when it benefits downstream code.

Rules:

- Do not silently accept malformed external data.
- Do not perform UI formatting here.
- Do not calculate cart-related values.
- Do not implement filtering, sorting, or search logic in this unit.

---

### 7. Feature Exports

Create:

```text
src/features/products/index.ts
```

Export only the stable public API needed by future units:

- Product domain types
- Product service functions
- Product service error type if needed by callers

Avoid exporting internal transformer helpers unless tests or future units require them directly.

---

### 8. Environment Documentation

Verify:

```text
.env.example
```

Contains:

```env
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

Update only if the existing file is missing or inconsistent.

Do not add unrelated environment variables.

---

### 9. Testing

Add tests for pure business/data logic introduced in this unit.

Preferred targets:

- Product transformation utilities
- Invalid product response handling
- Service error construction

If Vitest is not already installed, this unit may add minimal testing infrastructure only if needed to verify the new data layer.

Allowed testing dependencies if required:

- vitest

Do not add React Testing Library unless this unit introduces React hooks or components, which it should not.

Tests should avoid live network dependency. Mock fetch or test pure transformers directly.

---

### 10. Validation

Verify the service layer without building UI:

- Product types compile.
- Services compile.
- Transformers reject invalid data.
- Tests pass if added.
- TypeScript strict mode passes.
- Lint passes.
- Build succeeds.

No product catalog UI should exist after this unit.

---

## Dependencies

Do not install:

- SWR
- TanStack Query
- Axios
- Zod
- Redux
- Zustand
- Any external state management library

Optional:

- `vitest`, only if test infrastructure is required for the data layer tests.

Prefer native TypeScript and small local validation helpers over dependency-heavy solutions.

---

## Out of Scope

Do not implement:

- Product grid UI
- Product card UI
- Rating display component
- Price display component
- Catalog page redesign
- Search input
- Debounce logic
- Category filter UI
- Sorting UI
- Filtering utilities
- Sorting utilities
- URL query parameter synchronization
- Product detail route
- Loading skeletons for product data
- Empty catalog states
- Add to cart behavior
- Cart state
- Cart persistence

This unit is only for the product catalog data layer.

---

## Verify When Done

- [ ] Product domain types are defined.
- [ ] Category domain type is defined.
- [ ] Fake Store API service functions are created.
- [ ] Product list fetching is implemented.
- [ ] Product detail fetching is implemented.
- [ ] Category fetching is implemented.
- [ ] API requests are centralized in the products service layer.
- [ ] External API responses are transformed into domain products.
- [ ] Invalid response shapes are handled predictably.
- [ ] Product service errors are typed or consistently modeled.
- [ ] Public product feature exports are intentional.
- [ ] `.env.example` includes `NEXT_PUBLIC_API_URL`.
- [ ] No UI components are added for products.
- [ ] No filtering, sorting, or search behavior is implemented.
- [ ] No cart behavior is implemented.
- [ ] No unnecessary dependencies are introduced.
- [ ] Tests are added for new data transformation or error logic if applicable.
- [ ] `npm run lint` passes.
- [ ] `npm run type-check` passes.
- [ ] `npm run build` passes.
- [ ] `context/progress-tracker.md` is updated.
