# Unit 13: Performance & Final Polish

## Goal

Prepare CartFlow as a production-ready delivery candidate by polishing perceived performance, interaction feedback, accessibility, responsive behavior, metadata, deployment documentation, and final code quality.

At the end of this unit, CartFlow should feel fast, stable, accessible, and complete across the catalog, product detail, cart drawer, cart page, loading states, error states, and empty states.

This unit is final polish only. Do not implement checkout, payment, authentication, backend storage, analytics, recommendations, inventory validation, wishlists, admin features, new data sources, or broad visual redesigns in this unit.

---

## Design

### Final Polish Purpose

Unit 13 turns the completed application into a delivery-ready frontend.

The polish pass should:

- Preserve the existing Next.js App Router architecture.
- Preserve server-side product data fetching through product services.
- Preserve URL-driven catalog state.
- Preserve cart state through Context + `useReducer`.
- Preserve cart persistence through `localStorage`.
- Improve motion and interaction feedback without distracting from product content.
- Improve perceived performance without introducing speculative complexity.
- Verify accessibility, responsive behavior, and production build behavior.
- Complete deployment and setup documentation.
- Remove temporary, stale, or inconsistent implementation details.

### User Experience

Users should be able to:

- Browse products with smooth, subtle interaction feedback.
- Navigate between catalog, product detail, and cart without jarring visual changes.
- Understand loading, empty, and error states immediately.
- Use all interactive controls with keyboard and visible focus states.
- Use the application comfortably on mobile, tablet, and desktop widths.
- Refresh or share filtered catalog URLs without losing state.
- Return to a persisted cart without hydration flicker or misleading empty states.
- Use light and dark mode with readable contrast.

### Scope Boundary With Previous Units

Unit 13 may polish behavior and presentation introduced by Units 01 through 12.

Unit 13 must not redefine previously completed feature behavior:

- Product fetching remains server-first and service-based.
- Search remains client-side and debounced.
- Filters, sorting, and search remain URL-driven.
- Cart state remains global only through Cart Context.
- Cart persistence remains browser-only through `localStorage`.
- Tests remain focused on critical business behavior.

---

## Implementation

### 1. Motion And Interaction Polish

Add subtle motion where it improves state communication and perceived quality.

Target areas:

```text
src/features/products/components/
src/features/cart/components/
src/components/ui/
src/components/layout/
```

Potential polish:

- Product card hover and image feedback.
- Catalog results transitions when filters change.
- Cart drawer open and close motion.
- Cart item add, remove, and quantity feedback.
- Empty, loading, and error state entrance polish.
- Theme toggle, buttons, and icon controls where appropriate.

Requirements:

- Use Framer Motion if a runtime animation dependency is needed, because `context/ui-context.md` defines Framer Motion as the animation system.
- Add `framer-motion` only if motion cannot be cleanly handled with existing Tailwind transitions.
- Animate opacity and transform only.
- Keep durations aligned with `context/ui-context.md`.
- Avoid bounce effects, excessive stagger, decorative motion, and layout-shift animations.
- Respect `prefers-reduced-motion`.
- Do not animate text in a way that affects readability.
- Do not introduce page transition systems that conflict with App Router behavior.

---

### 2. Performance Review

Review the application for realistic performance improvements without premature optimization.

Targets:

```text
src/app/page.tsx
src/app/products/[productId]/page.tsx
src/features/products/
src/features/cart/
next.config.ts
```

Responsibilities:

- Confirm product images use `next/image` correctly.
- Confirm image dimensions, priority usage, and responsive sizing are appropriate.
- Confirm product fetching is not duplicated in client components.
- Confirm search, filtering, and sorting do not trigger network requests.
- Confirm expensive derived catalog work is isolated and predictable.
- Confirm cart selectors and formatting remain simple and deterministic.
- Review bundle impact if adding `framer-motion`.
- Review loading skeletons for stable dimensions and low layout shift.

Allowed improvements:

- Add `sizes` or priority hints where they provide clear value.
- Use small, focused memoization only when it prevents repeated work in interactive catalog filtering.
- Clean up avoidable rerenders that come from unstable handlers or derived values.
- Remove unused imports, dead code, and temporary artifacts.

Avoid:

- Speculative caching layers.
- Client-side product refetching.
- Backend proxies or route handlers.
- Virtualized product grids.
- Heavy analytics or performance libraries.
- Broad component rewrites for theoretical gains.

---

### 3. Accessibility Audit And Fixes

Review accessibility basics across completed user flows.

Target flows:

- Catalog search, category filter, sort control, and clear filters.
- Product cards and add-to-cart controls.
- Product detail back navigation and add-to-cart control.
- Header cart trigger and cart drawer.
- Cart page quantity controls, remove actions, clear cart, and summary.
- Loading, empty, error, and not-found states.
- Theme toggle and skip link.

Requirements:

- All interactive elements must be keyboard reachable.
- Focus states must be visible in light and dark mode.
- Inputs and selects must have accessible labels.
- Icon-only controls must have accessible names.
- Drawer close behavior must preserve Escape close, backdrop close, focus trapping, and focus restoration.
- Error and status states must communicate useful text without relying only on color.
- Do not introduce inaccessible custom select, dialog, or menu behavior.
- Do not hide focus outlines without replacing them with equivalent visible focus styles.

---

### 4. Responsive QA And Layout Polish

Review the application at mobile, tablet, and desktop sizes.

Required widths:

```text
390px
768px
1024px
1440px
```

Target routes:

```text
/
/products/[productId]
/cart
unknown route
invalid product route
```

Responsibilities:

- Verify no horizontal overflow.
- Verify product grid breakpoints match `context/ui-context.md`.
- Verify cart drawer remains usable on small screens.
- Verify product detail layout preserves image and content hierarchy.
- Verify long product titles do not break cards, drawer rows, cart rows, or detail layout.
- Verify loading, empty, error, and not-found states remain centered and readable.
- Verify header actions remain usable on mobile.

Requirements:

- Keep layout changes scoped.
- Do not introduce a new layout system.
- Do not redesign the visual identity.
- Use semantic Tailwind tokens and existing spacing conventions.

---

### 5. Metadata, SEO, And App Identity

Review and complete metadata for the delivery candidate.

Targets:

```text
src/app/layout.tsx
src/app/page.tsx
src/app/products/[productId]/page.tsx
src/app/cart/page.tsx
src/app/not-found.tsx
src/app/products/[productId]/not-found.tsx
```

Responsibilities:

- Ensure the root application metadata reflects CartFlow clearly.
- Ensure catalog, cart, product detail, and not-found routes have appropriate titles and descriptions.
- Ensure product detail metadata uses product-specific information when available.
- Ensure metadata does not require client-side data fetching.
- Ensure favicon and app icons are intentional and committed only if they are final assets.

Requirements:

- Do not add dynamic Open Graph image generation.
- Do not add analytics.
- Do not introduce sitemap or robots generation unless already trivial and clearly useful.
- Do not expose raw API errors in metadata.

---

### 6. Deployment Readiness

Review deployment setup and documentation for Vercel.

Targets:

```text
README.md
.env.example
context/progress-tracker.md
```

Responsibilities:

- Document the required Fake Store API environment variable.
- Confirm local setup and Vercel setup instructions are accurate.
- Explain that Vercel Production and Preview environments need the required variable configured.
- Note that deployments should be redeployed after environment variables change.
- Keep deployment guidance concise and project-specific.

Required environment value:

```text
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

Requirements:

- Do not introduce a backend fallback.
- Do not change the external data source.
- Do not add secrets for public Fake Store API usage.
- Do not mark public API configuration as sensitive unless there is a project-specific reason.

---

### 7. README Completion

Complete the README as a delivery document.

Responsibilities:

- Describe CartFlow's purpose and completed feature set.
- Document local setup.
- Document scripts.
- Document environment variables.
- Document architecture at a high level.
- Document testing and verification commands.
- Document deployment notes for Vercel.

Requirements:

- Keep the README practical and concise.
- Do not overstate unsupported features such as checkout or authentication.
- Do not describe the project as a prototype.
- Keep documentation synchronized with the actual implementation.

---

### 8. Code Cleanup

Perform a final cleanup pass.

Responsibilities:

- Remove unused imports, stale comments, dead code, and temporary files.
- Confirm feature public exports expose only intentional surfaces.
- Confirm file names and locations still match project conventions.
- Confirm no implementation details drifted from context docs.
- Confirm no unrelated local changes are reverted.

Requirements:

- Do not refactor unrelated areas for style preference alone.
- Do not reorganize feature folders.
- Do not rewrite stable logic without a concrete issue.
- Preserve user-owned changes unless explicitly asked otherwise.

---

### 9. Verification Pass

Run the full project verification suite.

Required commands:

```bash
pnpm test
pnpm type-check
pnpm lint
pnpm build
```

Manual verification:

- Catalog route loads successfully.
- Product detail route loads successfully.
- Cart page loads successfully.
- Search, category filter, sort, and clear filters work.
- Product detail back navigation preserves catalog query state.
- Add-to-cart works from catalog and product detail.
- Cart quantity update, remove, and clear actions work.
- Cart persistence survives refresh.
- Loading, error, empty, and not-found states remain visually coherent.
- Light and dark mode remain readable.
- Responsive layouts work at required widths.
- Browser console has no application errors.

---

## Dependencies

Allowed existing dependencies:

- React
- React DOM
- Next.js
- Tailwind CSS
- shadcn/ui primitives already present
- lucide-react
- next-themes
- Sonner if already installed and needed by existing UI
- Vitest and Testing Library dependencies already present

Allowed new runtime dependency only if implementing motion polish:

- `framer-motion`

Dependency requirements:

- Add `framer-motion` only if used directly for Unit 13 motion.
- Keep usage focused and isolated.
- Explain why Tailwind transitions alone were insufficient if the dependency is added.
- Do not add animation packs, page transition frameworks, visual regression tools, accessibility services, analytics, or monitoring services.

---

## Verify When Done

- [ ] Scope matches this specification.
- [ ] No checkout, payment, authentication, backend storage, analytics, recommendations, inventory validation, or broad redesign added.
- [ ] Motion is subtle, uses opacity/transform only, and respects reduced motion.
- [ ] No product API calls are moved into client components.
- [ ] Search, filtering, and sorting remain client-side over already-loaded products.
- [ ] URL-driven catalog state remains shareable and restorable.
- [ ] Cart persistence behavior remains unchanged.
- [ ] Product images and responsive sizes are reviewed.
- [ ] Accessibility basics are verified across catalog, product detail, cart drawer, and cart page.
- [ ] Responsive behavior is verified at 390px, 768px, 1024px, and 1440px.
- [ ] Metadata is reviewed and completed.
- [ ] Vercel environment setup is documented.
- [ ] README reflects the completed application.
- [ ] Temporary files and unused code are cleaned up.
- [ ] No unrelated user changes are reverted.
- [ ] `pnpm test` passes.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] `context/progress-tracker.md` updated after implementation.

---

## Definition of Done

Unit 13 is complete when:

- CartFlow is polished as a production-ready delivery candidate.
- Motion, accessibility, responsive behavior, metadata, deployment documentation, and README are complete within the defined scope.
- Verification commands pass.
- Manual responsive and accessibility checks are completed.
- Documentation and progress tracking are synchronized.
- A conventional commit message is recommended.
