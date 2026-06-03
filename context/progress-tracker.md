# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

Implementation

## Current Goal

Prepare for Unit 04: Product Grid UI.

## Build Plan

- [x] Unit 01: Project Foundation
- [x] Unit 02: Design System & Layout Shell
- [x] Unit 03: Product Catalog Data Layer
- [ ] Unit 04: Product Grid UI
- [ ] Unit 05: Filtering & Sorting System
- [ ] Unit 06: URL State Synchronization
- [ ] Unit 07: Product Detail Page
- [ ] Unit 08: Cart State Management
- [ ] Unit 09: Cart UI & Interactions
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

## In Progress

- None.

## Next Up

- Implement Unit 04: Product Grid UI according to `context/specs/04-product-grid-ui.md`.

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
