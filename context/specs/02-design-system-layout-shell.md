# Unit 02: Design System & Layout Shell

## Goal

Create the reusable UI foundation and application layout for CartFlow.

This unit must provide the base visual system, layout shell, and reusable UI primitives needed by future catalog, product detail, cart, loading, and error states.

Do not implement API calls, product fetching, filtering, sorting, product detail, or cart logic in this unit.

## Design

Follow `context/ui-context.md` as the source of truth for:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Layout behavior
- Component tone

The UI should feel clean, modern, product-focused, and production-ready.

The shell should support:

- Mobile-first responsive layout
- Desktop-centered content
- Consistent page spacing
- Accessible keyboard focus states
- Light and dark theme support only if already defined in the context files

The application should visually communicate that CartFlow is an e-commerce storefront, even before real products are wired.

## Implementation

### 1. Root Layout

Update the root layout only as needed to support the application shell.

Ensure:

- Global styles are loaded correctly.
- The layout wraps pages with the application shell.
- Metadata remains clean and project-specific.
- No product-specific or cart-specific logic is added.

### 2. App Shell

Create:

```txt
src/components/layout/app-shell.tsx
```

# Unit 02: Design System & Layout Shell

## Goal

Establish the CartFlow design system and application layout shell using shadcn/ui, Tailwind CSS, reusable UI primitives, and a responsive App Router layout structure.

At the end of this unit, the project should have a consistent visual foundation, reusable base components, a global application shell, and a temporary validation interface that confirms the design system is operational.

No product data, API integration, filtering, sorting, product detail, or cart functionality should be implemented in this unit.

---

## Design

### Design System Foundation

Initialize and configure shadcn/ui as the component foundation for CartFlow.

The design system should be aligned with `context/ui-context.md` and should use semantic tokens instead of hardcoded visual decisions.

The UI should feel:

- Clean
- Modern
- Product-focused
- Trustworthy
- Production-ready
- Suitable for an e-commerce storefront

### Initial Layout Shell

Create a reusable application shell that future pages can use.

Structure:

- Global header
- Main content area
- Responsive container
- Consistent page spacing
- Shared background and foreground styling

### User Experience

- Clearly communicate that the design system is working
- Show a polished visual foundation before business functionality exists
- Responsive across mobile and desktop
- Accessible keyboard focus states
- No business functionality yet
- No product data
- No cart functionality
- No API integration

---

## Implementation

### 1. shadcn/ui Initialization

Initialize shadcn/ui in the project.

Requirements:

- Generate `components.json`
- Configure Tailwind CSS integration
- Configure CSS variables
- Use App Router-compatible setup
- Align tokens with `context/ui-context.md`
- Keep the setup minimal and intentional

Use:

```bash
npx shadcn@latest init
```

Do not install a large batch of components.

Only install the components required for this unit.

---

### 2. Base shadcn Components

Install the initial shadcn/ui components required for the design system foundation:

```bash
npx shadcn@latest add button card badge skeleton
```

Components required:

- Button
- Card
- Badge
- Skeleton

These components should become the reusable base for future product cards, catalog states, cart states, and loading states.

Do not create duplicate custom versions of these components if shadcn/ui already provides them.

---

### 3. Utility Foundation

Create or verify:

```text
src/lib/utils.ts
```

Responsibilities:

- Export the `cn()` helper
- Support className composition
- Follow the standard shadcn/ui utility pattern

Example usage:

```ts
import { cn } from "@/lib/utils";
```

All reusable UI components should use this utility when conditional class composition is needed.

---

### 4. Source Structure Updates

Create or update the following structure:

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   └── theme/
├── lib/
└── styles/
```

Expected files after this unit:

```text
src/components/layout/
├── app-shell.tsx
└── header.tsx

src/components/ui/
├── badge.tsx
├── button.tsx
├── card.tsx
├── container.tsx
├── empty-state.tsx
└── skeleton.tsx

src/components/theme/
├── theme-provider.tsx
└── theme-toggle.tsx

src/lib/
└── utils.ts
```

Only create the theme files if theme support is approved in the current project context.

---

### 5. Global Layout

Update:

```text
src/app/layout.tsx
```

Responsibilities:

- Configure global metadata
- Load global styles
- Wrap the application with providers if needed
- Wrap pages with the application shell
- Preserve App Router conventions

Expected structure:

```tsx
<AppShell>{children}</AppShell>
```

Do not add product-specific, cart-specific, or API-specific logic to the root layout.

---

### 6. App Shell

Create:

```text
src/components/layout/app-shell.tsx
```

Responsibilities:

- Render the global page structure
- Render the header
- Render the main content area
- Apply global layout spacing
- Apply shared background and foreground classes
- Keep layout concerns separate from feature logic

Expected API:

```tsx
type AppShellProps = {
  children: React.ReactNode;
};
```

Example usage:

```tsx
<AppShell>{children}</AppShell>
```

---

### 7. Header

Create:

```text
src/components/layout/header.tsx
```

Display:

- CartFlow brand/logo text
- Simple navigation placeholder if useful
- Cart action placeholder
- Theme toggle if theme support is enabled

Rules:

- Do not implement cart state
- Do not show a real cart count
- Do not fetch product data
- Do not link to unfinished feature pages unless placeholder routes already exist
- Use accessible labels for icon-only actions
- Keep the header responsive

Example content:

```text
CartFlow

Products
Cart
```

The cart button may be visual only in this unit.

---

### 8. Container Component

Create:

```text
src/components/ui/container.tsx
```

Responsibilities:

- Provide a reusable max-width wrapper
- Apply consistent horizontal padding
- Support responsive layouts
- Be reusable by catalog, detail, cart, and static pages

Expected API:

```tsx
type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};
```

Example usage:

```tsx
<Container>{children}</Container>
```

---

### 9. Empty State Component

Create:

```text
src/components/ui/empty-state.tsx
```

Responsibilities:

- Provide a reusable empty state pattern
- Support future error states
- Accept title
- Accept description
- Accept optional action

Expected API:

```tsx
type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};
```

Future use cases:

- No products found
- No search results
- Empty cart
- API error fallback

Do not add feature-specific copy tied to unfinished functionality.

---

### 10. Theme System

If theme support is approved in the project context, install and configure:

```bash
npm install next-themes
```

Create:

```text
src/components/theme/theme-provider.tsx
src/components/theme/theme-toggle.tsx
```

Requirements:

- Support light mode
- Support dark mode
- Persist selected theme
- Use semantic design tokens
- Avoid hardcoded colors
- Prevent hydration warnings where applicable

The theme toggle should be accessible and usable from the header.

If theme support is not approved in the project context, skip this section and do not install `next-themes`.

---

### 11. Temporary Home Page

Update:

```text
src/app/page.tsx
```

Create a temporary design-system validation page.

Display:

- CartFlow title
- Short product/storefront description
- Design system status
- Example button variants
- Example card
- Example badge
- Example skeleton preview
- Example empty state

Example content:

```text
CartFlow

Modern E-Commerce Experience

Design System: Ready

Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
```

Purpose:

Validate that the design system, layout shell, and reusable UI primitives render correctly before feature development begins.

No real product data should be displayed.

---

### 12. Accessibility

Ensure:

- Interactive elements have visible focus states
- Icon-only buttons have `aria-label`
- Buttons preserve native button behavior
- Header navigation is keyboard accessible
- Color usage respects the semantic token system
- Layout works at mobile and desktop widths

---

### 13. Validation

Verify:

- shadcn/ui initializes correctly
- Tailwind styles render correctly
- CSS variables are working
- App shell wraps the application correctly
- Header renders correctly
- UI components render correctly
- Theme toggle works if enabled
- No business functionality exists after this unit

---

## Dependencies

Install:

- shadcn/ui through the CLI
- class-variance-authority
- clsx
- tailwind-merge
- lucide-react

These may be installed automatically by the shadcn/ui CLI depending on the selected setup.

Optional:

- next-themes

Only install `next-themes` if theme support is approved in the current project context.

Do not install:

- state management libraries
- data fetching libraries
- testing libraries
- product-specific libraries
- cart-specific libraries
- additional UI libraries

Those will be introduced only when required.

---

## Out of Scope

Do not implement:

- FakeStore API integration
- Product types
- Category types
- Product fetching
- Product grid
- Product card feature component
- Search
- Debounce
- Filtering
- Sorting
- URL query parameter synchronization
- Product detail page
- Cart context
- Cart reducer
- Add to cart behavior
- Local storage persistence
- Business logic tests

This unit is only for the design system and layout foundation.

---

## Verify When Done

- [ ] shadcn/ui is initialized
- [ ] `components.json` exists
- [ ] Tailwind CSS integration works
- [ ] CSS variables are configured
- [ ] Button component is installed and usable
- [ ] Card component is installed and usable
- [ ] Badge component is installed and usable
- [ ] Skeleton component is installed and usable
- [ ] `src/lib/utils.ts` exists
- [ ] AppShell is created
- [ ] Header is created
- [ ] Container component is created
- [ ] EmptyState component is created
- [ ] Temporary homepage validates the design system
- [ ] Application is responsive on mobile and desktop
- [ ] Interactive elements have accessible focus states
- [ ] No product API calls exist
- [ ] No product feature logic exists
- [ ] No cart logic exists
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run build` passes
- [ ] No console errors
