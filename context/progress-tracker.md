# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

Implementation

## Current Goal

Prepare for Unit 10: Cart Persistence.

## Build Plan

- [x] Unit 01: Project Foundation
- [x] Unit 02: Design System & Layout Shell
- [x] Unit 03: Product Catalog Data Layer
- [x] Unit 04: Product Grid UI
- [x] Unit 05: Filtering & Sorting System
- [x] Unit 06: URL State Synchronization
- [x] Unit 07: Product Detail Page
- [x] Unit 08: Cart State Management
- [x] Unit 09: Cart UI & Interactions
- [ ] Unit 10: Cart Persistence
- [ ] Unit 11: Loading & Error States
- [ ] Unit 12: Testing
- [ ] Unit 13: Performance & Final Polish

## Completed

- Project requirements analyzed.
- Product scope defined.
- Project naming finalized (CartFlow).
- Project overview created.
- Architecture context created.
- UI context created.
- Code standards created.
- AI workflow rules created.
- AGENTS.md created.
- Progress tracker initialized.
- Build plan created (`context/specs/00-build-plan.md`).
- Unit 01 specification created (`context/specs/01-project-foundation.md`).
- Unit 01 completed: Next.js App Router foundation moved under `src/app`.
- Initial feature-oriented source structure created.
- Temporary CartFlow health-check interface created.
- Global layout, metadata, font configuration, provider placeholder, and application header created.
- Tailwind semantic theme tokens configured from UI context.
- TypeScript `@/*` path alias configured for `src`.
- Prettier and Tailwind class sorting plugin installed and configured.
- Environment example file created.
- README updated for project setup, scripts, structure, and stack.
- Unit 01 dark-mode token mapping corrected with explicit semantic Tailwind utilities.
- TypeScript path alias configuration updated to avoid deprecated `baseUrl`.
- Unit 02 completed: shadcn/ui initialized with `components.json`.
- Initial shadcn/ui primitives added: Button, Card, Badge, and Skeleton.
- `cn()` utility added for class composition.
- Reusable AppShell, Header, Container, and EmptyState components created.
- Theme provider and accessible theme toggle added with `next-themes`.
- Root layout now wraps pages with AppShell through AppProviders.
- Temporary homepage updated to validate the design system and reusable UI primitives.
- Unit 02 style follow-up completed: shadcn primitives now consume CartFlow semantic tokens directly for consistent light and dark contrast.
- Unit 02 globals follow-up completed: explicit utilities added for accent soft background and focus ring offset tokens.
- Unit 02 globals cleanup completed: light theme tokens, compatibility aliases, fonts, and radius values consolidated into a single `:root` block.
- Unit 03 specification created (`context/specs/03-product-catalog-data-layer.md`).
- Unit 03 completed: product domain types, Fake Store API services, transformation utilities, service error model, and data-layer tests implemented.
- Product feature public exports added through `src/features/products/index.ts`.
- Vitest test runner added with minimal project configuration for data-layer tests.
- Unit 04 specification created (`context/specs/04-product-grid-ui.md`).
- Unit 04 completed: homepage now renders a server-composed product catalog experience backed by `getProducts()`.
- Product UI components created under `src/features/products/components`: product grid, product card, product rating, and product price.
- Product cards now display image, category, title, rating, review count, and USD price without cart actions or product detail links.
- Next.js remote image configuration added for Fake Store API product images.
- Minimal product service error fallback added to the homepage so API failures do not crash the catalog page.
- Unit 04 visual follow-up completed: catalog copy refined, product count moved closer to the heading, product image padding adjusted, and API category values mapped to polished display labels in the UI.
- Unit 04 image spacing follow-up completed: product image padding now reduces top whitespace while preserving side and bottom breathing room.
- Unit 04 card spacing follow-up completed: product cards now override the base card vertical padding so the image container starts flush with the top of the card.
- Unit 04 card spacing correction completed: product cards now keep top padding removed while restoring bottom padding so prices do not sit against the card edge.
- Unit 05 specification created (`context/specs/05-filtering-sorting-system.md`).
- Unit 05 completed: product catalog now supports local client-side search, category filtering, sorting, results summary, clear controls, and filtered empty states.
- Product discovery utilities added for search, category filtering, sorting, category label formatting, unique category derivation, and active filter detection.
- Product filtering and sorting unit tests added for title, description, category search, category filtering, price sorting, rating sorting, non-mutating sort behavior, composed filters, and empty results.
- Product catalog client composition added without moving product fetching out of the server-rendered homepage.
- Unit 05 controls spacing follow-up completed: category and sort selects now use explicit chevron icons with native select appearance removed so arrow spacing is consistent.
- Unit 06 specification created (`context/specs/06-url-state-synchronization.md`).
- Unit 06 completed: product catalog search, category, and sort state are now synchronized with URL query parameters.
- Product URL state utilities added for parsing, validation, canonical query serialization, default omission, deterministic parameter ordering, and invalid query fallbacks.
- Product URL state unit tests added for valid query parsing, invalid fallback behavior, default omission, combined serialization, ordering, immutability, and whitespace search handling.
- Product catalog now uses Next.js App Router navigation APIs for URL hydration, refresh/share preservation, and browser back/forward support.
- Homepage remains a Server Component and wraps the URL-driven catalog in `Suspense` for static rendering compatibility with `useSearchParams`.
- Unit 07 specification created (`context/specs/07-product-detail-page.md`).
- Unit 07 completed: dynamic product detail pages are available at `/products/[productId]`.
- Product cards now link to detail pages while preserving active catalog `q`, `category`, and `sort` query parameters.
- Read-only product detail UI added with large product image, category, title, price, rating, review count, description, and catalog back link.
- Product navigation utilities added for detail hrefs, catalog return hrefs, catalog query extraction, deterministic query ordering, and product ID parsing.
- Product navigation unit tests added for detail URLs, catalog return URLs, query preservation, unknown query omission, immutability, ordering, and invalid ID handling.
- Unit 07 not-found follow-up completed: product detail 404s now use a scoped not-found route with CartFlow metadata and UI instead of the framework default 404 title.
- Unit 08 specification created (`context/specs/08-cart-state-management.md`).
- Unit 08 completed: cart feature boundary added with typed state, actions, reducer, selectors, context provider, consumer hook, and public exports.
- Cart reducer now supports add item, increment existing item quantity, explicit quantity add, quantity update, remove item, remove by zero quantity, no-op updates, and clear cart.
- Cart selectors added for unique item count, total quantity, item subtotal, cart subtotal, empty state detection, and product ID lookup.
- Cart provider is wired into `AppProviders` using React Context + `useReducer` without adding cart UI or persistence.
- Cart reducer and selector unit tests added.
- Unit 09 specification created (`context/specs/09-cart-ui-interactions.md`).
- Unit 09 completed: visible cart UI and interactions added using the Unit 08 cart context.
- Product cards now expose accessible add-to-cart buttons without nesting buttons inside product detail links.
- Product detail pages now expose an accessible add-to-cart action near product pricing.
- Header cart placeholder replaced with an interactive cart action that displays total quantity and opens a cart drawer.
- Cart drawer added with empty/populated states, quantity controls, item removal, clear cart, subtotal display, Escape close, backdrop close, and focus restoration.
- Dedicated `/cart` page added with empty/populated states, line items, quantity controls, remove/clear actions, summary totals, and continue-shopping navigation.
- Cart UI utility functions added for product-to-cart adaptation and cart formatting, with unit test coverage.
- Unit 09 cart UI follow-up completed: header cart quantity badge contrast fixed in light mode and drawer list layout adjusted so cart items render above the summary.
- Unit 09 drawer layout follow-up completed: cart drawer switched to deterministic viewport grid rows and compact item cards so the item list is visible between the drawer header and summary.
- Unit 09 add-to-cart feedback follow-up completed: add-to-cart buttons now show a short local "Added" confirmation with an icon and accessible label after each click.
- Unit 09 header navigation follow-up completed: the Products header action now links back to the catalog route instead of using a no-op content anchor.

## In Progress

- None.

## Next Up

- Create or review the Unit 10 specification before implementing Cart Persistence.

## Open Questions

- None at this time.

## Architecture Decisions

- Framework: Next.js App Router.
- Language: TypeScript with strict mode enabled.
- Styling: Tailwind CSS.
- State Management: React Context + useReducer.
- Cart persistence: localStorage.
- Data Source: Fake Store API.
- Search behavior: Client-side filtering with debounce.
- URL synchronization for filters, sorting, and search state.
- Testing: Vitest + React Testing Library.
- Feature-oriented folder structure.
- Application branding: CartFlow.
- Development process: Spec-driven development with unit-based implementation.
- Source root: `src/`.
- Path alias: `@/*` resolves to `src/*`.
- Path aliases use relative `paths` entries without `baseUrl`.
- Unit 01 introduces only foundation scaffolding and no business functionality.
- Tailwind semantic utilities map to documented UI tokens through explicit `@utility` definitions.
- Unit 02 introduces shadcn/ui as the base component foundation.
- shadcn/ui tokens are mapped to CartFlow semantic CSS variables in `globals.css`.
- Theme support uses `next-themes` with class-based light and dark tokens.
- Header cart action remains a visual placeholder only; no cart state or cart logic exists yet.
- Base UI primitives avoid unresolved shadcn token aliases and use CartFlow semantic utilities for foreground, muted text, surfaces, borders, and focus states.
- Tailwind token aliases used by layout focus and accent states are exposed through explicit utilities in `globals.css`.
- Global light-mode CSS variables are defined in one `:root` block; `.dark` only overrides theme color tokens.
- Unit 03 product API access is centralized in `src/features/products/services/products.service.ts`.
- Product catalog data uses native `fetch` with Next.js-compatible time-based revalidation.
- Fake Store API responses are validated and transformed before being exposed as product domain objects.
- Product data-layer validation uses Vitest without React Testing Library because this unit introduced no React hooks or components.
- Unit 04 homepage remains a Server Component and fetches products through the product feature public API.
- Unit 04 product UI components are presentational and do not perform API calls, filtering, sorting, URL state management, detail navigation, or cart mutations.
- Product images use `next/image` with `images.remotePatterns` scoped to `https://fakestoreapi.com/img/**`.
- The homepage includes a minimal service-error fallback because Fake Store API can fail or challenge requests during prerendering.
- Category display labels are handled locally in product card UI so external API category values remain unchanged in the product domain model.
- Unit 05 catalog interactions use local client state only; URL query parameter synchronization is intentionally deferred to Unit 06.
- Unit 05 filtering and sorting operate only on products already fetched by `getProducts()` and do not trigger additional product API requests.
- Unit 05 debounce behavior is implemented inside the product catalog filter hook without adding a dependency or shared hook surface.
- Unit 06 treats `q`, `category`, and `sort` query parameters as the source of truth for product catalog search, filtering, and sorting state.
- Unit 06 omits default catalog filter values from the URL, preserving `/` as the canonical unfiltered catalog URL.
- Unit 06 uses a `Suspense` boundary around the URL-driven catalog because `useSearchParams` in a statically rendered App Router page requires one for production builds.
- Unit 07 product detail pages remain Server Components and fetch product data through `getProductById()`.
- Unit 07 uses Promise-based dynamic route params for current Next.js App Router compatibility.
- Unit 07 keeps catalog return navigation deterministic with explicit `Link` hrefs instead of browser-history-only `router.back()` behavior.
- Unit 08 establishes cart as the only global application state and manages it through React Context + `useReducer`.
- Unit 08 intentionally keeps cart totals derived through selectors rather than storing derived totals in reducer state.
- Unit 08 intentionally excludes localStorage persistence; persistence remains deferred to Unit 10.
- Unit 09 will connect cart state to visible UI interactions while keeping localStorage persistence deferred to Unit 10.
- Unit 09 keeps cart route composition server-first by rendering `/cart` as a Server Component shell around a client `CartPage`.
- Unit 09 keeps header layout server-first by extracting only cart interactivity into `CartHeaderAction`.
- Unit 09 preserves product detail navigation by separating product card links from add-to-cart buttons.

## Session Notes

- This project should be presented as a production-ready e-commerce application rather than a technical assessment.
- Follow all context files before making architectural or implementation decisions.
- The implementation roadmap is defined in `context/specs/00-build-plan.md`.
- Implement one unit at a time.
- Every unit must have a dedicated specification file before implementation begins.
- Every feature must expose visible loading and error states.
- Browser back navigation must preserve filters, sorting, and search state through URL parameters.
- Cart functionality must work from both product listing and product detail pages.
- Update this file whenever a unit is completed or a significant architectural decision is made.
- Unit 01 verification passed: `pnpm lint`, `pnpm type-check`, `pnpm build`, and `pnpm dev`.
- Production build required network access for `next/font/google` to fetch Geist fonts.
- Dev server started on port 3001 because port 3000 was already in use.
- Browser validation confirmed the CartFlow page content, no console errors, and no mobile horizontal overflow at 390px width.
- Dark-mode follow-up fixed semantic utility definitions so `bg-base`, `text-primary`, `text-secondary`, `text-muted`, `text-brand`, `border-default`, and related utilities render correctly.
- Dark-mode browser validation confirmed readable text, expected dark background, expected card surface, and no console errors.
- TypeScript configuration follow-up removed deprecated `baseUrl`; `pnpm type-check` and `pnpm lint` passed afterward.
- Unit 02 implementation started: Design System & Layout Shell.
- Unit 02 completed without product API calls, product feature logic, cart state, or cart persistence.
- Dependencies added for Unit 02: `class-variance-authority`, `clsx`, `lucide-react`, `next-themes`, `radix-ui`, `tailwind-merge`, and `tw-animate-css`.
- The shadcn CLI initialized project configuration and generated the required base UI components.
- Validation commands were intentionally left for the user to run after completion.
- Unit 02 style follow-up verification passed: `pnpm type-check` and `pnpm lint`.
- Unit 02 globals follow-up verification passed: `pnpm type-check` and `pnpm lint`.
- Unit 02 globals cleanup verification passed: `pnpm type-check` and `pnpm lint`.
- Local browser screenshot verification was not completed because the available Next dev server process was not reachable from this shell; existing dev log hydration warning was caused by a browser extension attribute (`cz-shortcut-listen`).
- Unit 03 implementation followed `context/specs/03-product-catalog-data-layer.md` and did not add product UI, filtering, sorting, URL synchronization, product detail routes, or cart behavior.
- Unit 03 dependency added: `vitest` for pure data-layer tests.
- Unit 03 verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Production build required network access for `next/font/google` to fetch Geist fonts.
- Unit 04 specification has been created and limits the next implementation to product catalog UI only.
- Unit 04 implementation followed `context/specs/04-product-grid-ui.md` and did not add filtering, sorting, search, URL synchronization, product detail routes, cart state, add-to-cart behavior, or cart persistence.
- Unit 04 added no new dependencies.
- Unit 04 verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Production build required escalated network access for Google Fonts.
- Fake Store API returned a Cloudflare challenge from this environment during verification, so local rendering showed the catalog-level fallback instead of live products; the homepage still renders `ProductGrid` when `getProducts()` succeeds.
- Local dev server responded with HTTP 200 on `http://127.0.0.1:3001`; the only browser-side warning observed was the known extension-injected `cz-shortcut-listen` hydration mismatch.
- Browser-tool screenshot verification was unavailable in this turn, so responsive validation was limited to static class review and server response validation.
- Unit 04 visual follow-up verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Unit 04 image spacing follow-up verification passed: `pnpm test`, `pnpm type-check`, and `pnpm lint`.
- Unit 04 card spacing follow-up verification passed: `pnpm test`, `pnpm type-check`, and `pnpm lint`.
- Unit 04 card spacing correction verification passed: `pnpm test`, `pnpm type-check`, and `pnpm lint`.
- Unit 05 specification has been created and limits the next implementation to local client-side filtering, sorting, search, and debounce behavior only.
- Unit 05 implementation followed `context/specs/05-filtering-sorting-system.md` and did not add URL synchronization, product detail routes, cart state, add-to-cart behavior, cart drawer behavior, or cart persistence.
- Unit 05 added no new dependencies.
- Unit 05 verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Production build required escalated network access for Google Fonts.
- Unit 05 scope check confirmed no `searchParams`, router navigation, browser history, URL synchronization, or cart behavior was introduced in product catalog code.
- Unit 05 controls spacing follow-up verification passed: `pnpm test`, `pnpm type-check`, and `pnpm lint`.
- Unit 06 specification has been created and limits the next implementation to URL query parameter synchronization, URL hydration, and browser navigation support for catalog search, category, and sort state.
- Unit 06 implementation followed `context/specs/06-url-state-synchronization.md` and did not add product detail routes, cart state, add-to-cart behavior, cart drawer behavior, cart persistence, loading skeletons, analytics, or new dependencies.
- Unit 06 verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Production build required escalated network access for Google Fonts.
- Local server verification confirmed HTTP 200 responses for valid and invalid catalog query parameter URLs.
- Unit 07 specification has been created and limits the next implementation to dynamic product detail pages, read-only product details, product card navigation, and catalog-state-preserving back navigation.
- Unit 07 implementation followed `context/specs/07-product-detail-page.md` and did not add cart state, add-to-cart behavior, cart drawer behavior, cart persistence, recommendations, review forms, analytics, or new dependencies.
- Unit 07 verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Production build required escalated network access for Google Fonts.
- Local server verification confirmed `/products/1?q=gold&category=jewelery&sort=rating-desc` returns HTTP 200, `/products/not-a-number` returns HTTP 404, and the product detail back link preserves only catalog query parameters.
- Unit 07 not-found metadata follow-up verified with `pnpm test`, `pnpm type-check`, `pnpm lint`, and local HTTP/HTML checks for `/products/2as`.
- Unit 08 specification has been created and limits the next implementation to cart state architecture, reducer logic, actions, selectors, provider integration, and tests without cart UI or persistence.
- Unit 08 implementation followed `context/specs/08-cart-state-management.md` and did not add cart UI, add-to-cart buttons, product card cart wiring, product detail cart wiring, cart drawer behavior, or localStorage persistence.
- Unit 08 verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Production build required escalated network access for Google Fonts.
- Unit 08 scope check confirmed cart code is isolated to `src/features/cart` plus `CartProvider` integration in `src/context/app-providers.tsx`; product feature code is not wired to cart actions.
- Unit 09 specification has been created and limits the next implementation to cart UI, add-to-cart interactions, drawer/page management, quantity controls, remove/clear actions, and cart totals without persistence or checkout behavior.
- Unit 09 implementation followed `context/specs/09-cart-ui-interactions.md` and did not add localStorage persistence, checkout, payment, order submission, backend cart storage, or new dependencies.
- Unit 09 verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Unit 09 scope check confirmed cart UI code does not read or write browser storage and does not perform product API calls.
- Local dev server started for route validation, but curl from this sandbox could not connect to the listening process; the server process was stopped afterward.
- Unit 09 cart UI follow-up verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Unit 09 drawer layout follow-up verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Unit 09 add-to-cart feedback follow-up verification passed: `pnpm test`, `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- Unit 09 header navigation follow-up verification passed: `pnpm type-check` and `pnpm lint`.
