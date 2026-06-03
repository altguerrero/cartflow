# Spec 14: Vercel Catalog Resilience

## Objective

Prevent the deployed catalog from becoming empty when the external Fake Store API is temporarily unreachable or rejects server-side requests from the hosting environment.

This is a narrow deployment resilience hotfix. It does not replace Fake Store API as the primary product source.

---

## Scope

Implement a service-level fallback catalog that is used only when product requests fail after configuration has already been validated.

Allowed:

- Keep product fetching server-first through the existing product service.
- Keep Fake Store API as the primary external source.
- Add a small local fallback product dataset.
- Add local fallback product images.
- Use fallback products for recoverable provider failures.
- Add focused service tests.
- Update deployment documentation and progress tracking.

Not allowed:

- Client-side product refetching.
- Backend proxy routes.
- New runtime dependencies.
- Checkout, payment, authentication, inventory, analytics, or admin features.
- Hiding missing or invalid API configuration.
- Hiding product detail `404` responses.

---

## Functional Requirements

- `getProducts()` must attempt the configured Fake Store API first.
- If the configured request fails due to provider/network availability, `getProducts()` may return the local fallback products.
- `getProductById()` must attempt the configured Fake Store API first.
- If provider access fails and the requested product exists in the fallback dataset, `getProductById()` may return the fallback product.
- `getCategories()` may return categories derived from fallback products when provider access fails.
- Missing or invalid `NEXT_PUBLIC_API_URL` must still produce a `ProductServiceError`.
- `404` responses from product detail requests must still be preserved for not-found behavior.
- Fallback images must be local app assets so deployed rendering does not depend on remote image fetching.

---

## Verification

Required:

- Product service tests cover API success.
- Product service tests cover fallback list behavior.
- Product service tests cover fallback detail behavior.
- Product service tests cover missing configuration.
- Product service tests cover preserved `404` detail behavior.
- TypeScript passes.
- Lint passes.
- Tests pass.
- Build succeeds.

---

## Completion Criteria

- Vercel deployments can render a usable product catalog even when Fake Store API rejects server-side requests.
- Configuration mistakes remain visible through the existing error state.
- Documentation explains the deployment behavior.
- Progress tracker reflects the hotfix.
