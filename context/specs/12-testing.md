# Unit 12: Testing

## Goal

Strengthen CartFlow's automated test coverage around the highest-risk behavior introduced across Units 03 through 11.

At the end of this unit, critical business logic, persistence behavior, URL-driven catalog behavior, and key client interaction flows should be covered by reliable automated tests.

This unit improves confidence only. Do not implement new product features, checkout, payment, authentication, backend storage, analytics, recommendations, inventory validation, animations, broad visual redesigns, or performance polish in this unit.

---

## Design

### Testing Purpose

Unit 12 turns the existing focused unit tests into a more complete safety net for the application.

The testing strategy should:

- Prioritize observable business behavior over implementation details.
- Keep tests close to the feature boundary they validate.
- Prefer pure utility, reducer, selector, storage, and hook tests where possible.
- Add component tests only for user-facing interaction flows that cannot be validated through pure functions.
- Avoid brittle assertions for exact CSS classes, skeleton counts, markup structure, or App Router file conventions.
- Keep tests deterministic and fast.
- Avoid external network calls.
- Avoid testing Next.js framework internals.

### User Experience Risks To Cover

Users should be protected from regressions in:

- Product catalog filtering, sorting, and URL synchronization.
- Search debounce behavior, including slow typing and URL race conditions.
- Catalog state preservation when navigating to product detail pages.
- Cart reducer actions and derived totals.
- Cart persistence hydration and storage failure recovery.
- Add-to-cart product snapshot adaptation.
- Cart quantity updates, removal, clearing, and empty-cart transitions.
- Expected API error modeling and transformation behavior.

### Scope Boundary With Unit 13

Unit 13 owns performance audits, visual polish, animation, responsive QA, accessibility audits, SEO review, README completion, and final delivery cleanup.

Unit 12 may test accessibility basics for interaction components if a test naturally covers labels or keyboard behavior, but it should not become a broad manual accessibility audit.

---

## Implementation

### 1. Test Infrastructure Review

Review the current Vitest setup and package dependencies.

Current known test surface:

```text
src/features/cart/persistence/cart-storage.test.ts
src/features/cart/reducer/cart.reducer.test.ts
src/features/cart/selectors/cart.selectors.test.ts
src/features/cart/utils/cart-formatters.test.ts
src/features/cart/utils/cart-product-adapter.test.ts
src/features/products/services/products.errors.test.ts
src/features/products/utils/product-filter-url-state.test.ts
src/features/products/utils/product-filters.test.ts
src/features/products/utils/product-navigation.test.ts
src/features/products/utils/product-transformers.test.ts
```

Responsibilities:

- Confirm existing tests still target the correct business behavior.
- Identify coverage gaps introduced by Units 09, 10, 11, and the search stability follow-ups.
- Keep the test runner simple.

Requirements:

- Do not remove existing passing tests unless replacing them with stronger equivalent coverage.
- Do not weaken assertions to make tests pass.
- Do not introduce snapshot tests for UI markup.
- Do not introduce network-dependent tests.

---

### 2. Testing Library Setup For Client Behavior

If hook or component interaction tests are needed, add the minimal testing dependencies required for React client tests.

Potential dev dependencies:

```text
@testing-library/react
@testing-library/user-event
jsdom
```

Responsibilities:

- Configure Vitest to support DOM-based tests only if those tests are implemented.
- Keep pure tests in a Node-like environment when practical.
- Use Testing Library for user-observable behavior, not internal component structure.

Requirements:

- Add dependencies only if direct hook or component tests are implemented.
- Document why each dependency is needed.
- Do not add Cypress, Playwright, Storybook test runners, MSW, coverage dashboards, or E2E tooling in this unit.
- Do not add browser automation as part of automated tests in this unit.

---

### 3. Product URL Search Hook Coverage

Add focused tests for:

```text
src/features/products/hooks/use-product-catalog-url-filters.ts
```

Potential file:

```text
src/features/products/hooks/use-product-catalog-url-filters.test.tsx
```

Responsibilities:

- Validate search input state and debounced URL updates.
- Validate that slow typing does not truncate the user's in-progress input.
- Validate internal debounce URL commits do not overwrite newer input text.
- Validate external URL changes still update the input state.
- Validate category and sort updates use URL navigation.
- Validate clear filters resets input and URL state.

Requirements:

- Mock `next/navigation` APIs directly and minimally.
- Use fake timers for debounce behavior.
- Avoid asserting exact component markup.
- Avoid duplicating `product-filter-url-state` utility tests.
- Avoid testing Next.js router internals.
- Ensure tests fail for the previous search truncation bug.

---

### 4. Product Catalog Interaction Coverage

Add component interaction tests only where they validate behavior not covered by hook or utility tests.

Potential target:

```text
src/features/products/components/product-catalog.test.tsx
```

Potential coverage:

- Search input receives user text without being cleared.
- Results summary updates based on filtered product count.
- Empty result state appears when no products match.
- Clear controls restores the unfiltered catalog.

Requirements:

- Use a small local product fixture.
- Do not assert exact CSS class names.
- Do not test product card layout.
- Do not test skeleton file conventions.
- Prefer hook tests over component tests when they cover the same behavior with less fragility.

---

### 5. Cart Provider Persistence Coverage

Add tests around cart provider hydration and persistence if practical with Testing Library.

Potential file:

```text
src/features/cart/context/cart-context.test.tsx
```

Responsibilities:

- Validate persisted cart state hydrates into context after mount.
- Validate the provider does not overwrite stored cart before hydration completes.
- Validate invalid persisted state is cleared.
- Validate empty carts clear storage after hydration.
- Validate add, update, remove, and clear actions persist expected state.

Requirements:

- Keep storage mocked with deterministic in-memory storage.
- Do not test localStorage implementation details already covered by `cart-storage.test.ts`.
- Do not add product service calls.
- Do not test drawer or page presentation when provider behavior is enough.

---

### 6. Cart UI Interaction Coverage

Add UI interaction tests only for user behavior not already covered by reducer, selectors, provider, or utilities.

Potential targets:

```text
src/features/cart/components/cart-drawer.test.tsx
src/features/cart/components/cart-page.test.tsx
src/features/cart/components/add-to-cart-button.test.tsx
```

Potential coverage:

- Add-to-cart button dispatches add item behavior and exposes feedback.
- Cart drawer shows hydration loading state before hydrated context.
- Cart drawer quantity controls call update behavior.
- Cart page remove and clear controls call expected cart actions.

Requirements:

- Prefer small mocked cart context values over full integration when reducer behavior is already tested.
- Preserve accessible labels in assertions when useful.
- Do not assert exact visual layout or CSS classes.
- Do not test checkout behavior because checkout is out of scope.
- Do not test animations because Unit 13 owns motion polish.

---

### 7. Service And Transformer Gap Review

Review existing product service, error, and transformer tests.

Responsibilities:

- Ensure expected Fake Store API response validation remains covered.
- Ensure `ProductServiceError` construction and metadata remain covered.
- Ensure missing or invalid product detail data does not silently become valid data.

Requirements:

- Add only missing high-value cases.
- Do not perform real network requests.
- Do not test `fetch` implementation details beyond service observable behavior.
- Do not introduce broad API mocking infrastructure unless existing tests require it.

---

### 8. Test Data Organization

Keep test fixtures small and local unless reuse becomes clearly beneficial.

Allowed:

- Small fixtures inside individual test files.
- Feature-local fixture helper files when three or more tests need the same data shape.

Avoid:

- Global fixture directories before they are needed.
- Large product fixture arrays copied from Fake Store API.
- Snapshot fixtures.
- Shared test helpers that hide important setup details.

---

### 9. Coverage Expectations

This unit does not require a numeric coverage threshold.

Required coverage outcome:

- Existing 70 tests continue passing.
- Tests cover the recent search stability regression.
- Tests cover URL synchronization behavior that users rely on.
- Tests cover cart persistence behavior through provider or storage tests.
- Tests cover critical cart interactions through reducer/provider/component tests.

Do not add coverage tooling or thresholds unless explicitly approved.

---

## Dependencies

Do not add runtime dependencies.

Allowed existing dependencies:

- React
- React DOM
- Next.js
- Vitest
- Existing project utilities and UI primitives

Allowed dev dependencies if needed for client tests:

- `@testing-library/react`
- `@testing-library/user-event`
- `jsdom`

Do not introduce:

- Cypress
- Playwright test runner
- Storybook
- MSW
- Jest
- Coverage dashboard services
- Accessibility audit services
- Visual regression tools

---

## Verify When Done

- [ ] Scope matches this specification.
- [ ] Existing tests still pass.
- [ ] New tests cover the search truncation regression.
- [ ] New tests cover URL-driven catalog behavior.
- [ ] New tests cover cart hydration or persistence behavior beyond storage parsing.
- [ ] New tests avoid fragile CSS, markup, skeleton, and framework-convention assertions.
- [ ] No runtime dependencies introduced.
- [ ] Any new dev dependencies are justified and minimal.
- [ ] No product API network calls occur during tests.
- [ ] No checkout, payment, authentication, backend storage, analytics, recommendations, animations, or performance polish added.
- [ ] `pnpm test` passes.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] `context/progress-tracker.md` updated after implementation.

---

## Definition of Done

Unit 12 is complete when:

- Critical product and cart behavior has reliable automated coverage.
- The search input slow-typing regression is protected by tests.
- URL-driven filtering behavior remains protected by tests.
- Cart persistence and hydration behavior are protected by tests.
- The test suite remains fast, deterministic, and maintainable.
- Verification commands pass.
- Documentation and progress tracking are synchronized.
