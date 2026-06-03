# UI Context

## Theme

CartFlow uses a modern e-commerce design language inspired by Vercel, Shopify, and Linear.

The visual experience should feel fast, professional, trustworthy, and product-focused. The UI prioritizes content clarity, conversion, and usability over decorative elements.

The application supports both Light Mode and Dark Mode using semantic design tokens. All visual styles must be implemented through CSS variables and Tailwind theme mappings. Hardcoded colors are not allowed.

Design principles:

- Product-first interface
- Consistent spacing and hierarchy
- Minimal visual noise
- Accessible contrast ratios
- Subtle motion and feedback
- Mobile-first responsive design
- Professional SaaS-quality aesthetics

---

## Colors

All colors are defined as CSS custom properties in `globals.css`.

### Light Theme

| Role                 | CSS Variable             | Value     |
| -------------------- | ------------------------ | --------- |
| Page background      | `--bg-base`              | `#FFFFFF` |
| Surface              | `--bg-surface`           | `#F8FAFC` |
| Elevated surface     | `--bg-elevated`          | `#FFFFFF` |
| Subtle surface       | `--bg-subtle`            | `#F1F5F9` |
| Primary text         | `--text-primary`         | `#0F172A` |
| Secondary text       | `--text-secondary`       | `#334155` |
| Muted text           | `--text-muted`           | `#64748B` |
| Border               | `--border-default`       | `#E2E8F0` |
| Border subtle        | `--border-subtle`        | `#CBD5E1` |
| Primary accent       | `--accent-primary`       | `#2563EB` |
| Primary accent hover | `--accent-primary-hover` | `#1D4ED8` |
| Accent soft          | `--accent-primary-soft`  | `#DBEAFE` |
| Success              | `--state-success`        | `#10B981` |
| Error                | `--state-error`          | `#EF4444` |
| Warning              | `--state-warning`        | `#F59E0B` |

### Dark Theme

| Role                 | CSS Variable             | Value                   |
| -------------------- | ------------------------ | ----------------------- |
| Page background      | `--bg-base`              | `#020617`               |
| Surface              | `--bg-surface`           | `#0F172A`               |
| Elevated surface     | `--bg-elevated`          | `#1E293B`               |
| Subtle surface       | `--bg-subtle`            | `#334155`               |
| Primary text         | `--text-primary`         | `#F8FAFC`               |
| Secondary text       | `--text-secondary`       | `#CBD5E1`               |
| Muted text           | `--text-muted`           | `#94A3B8`               |
| Border               | `--border-default`       | `#334155`               |
| Border subtle        | `--border-subtle`        | `#475569`               |
| Primary accent       | `--accent-primary`       | `#3B82F6`               |
| Primary accent hover | `--accent-primary-hover` | `#60A5FA`               |
| Accent soft          | `--accent-primary-soft`  | `rgba(59,130,246,0.12)` |
| Success              | `--state-success`        | `#34D399`               |
| Error                | `--state-error`          | `#F87171`               |
| Warning              | `--state-warning`        | `#FBBF24`               |

### Tailwind Mapping

Semantic utility names should be exposed through Tailwind theme extensions:

- `bg-base`
- `bg-surface`
- `bg-elevated`
- `bg-subtle`
- `text-primary`
- `text-secondary`
- `text-muted`
- `text-brand`
- `border-default`
- `border-subtle`

Components must consume semantic tokens rather than raw colors.

---

## Typography

Typography should prioritize readability and product information hierarchy.

| Role        | Font       | Variable            |
| ----------- | ---------- | ------------------- |
| UI Text     | Geist Sans | `--font-geist-sans` |
| Code / Mono | Geist Mono | `--font-geist-mono` |

### Typography Scale

| Usage         | Tailwind                  |
| ------------- | ------------------------- |
| Hero          | `text-4xl md:text-5xl`    |
| Page title    | `text-3xl`                |
| Section title | `text-2xl`                |
| Card title    | `text-base font-semibold` |
| Body          | `text-sm md:text-base`    |
| Caption       | `text-xs text-muted`      |

---

## Border Radius

Rounded corners should feel modern without becoming playful.

| Context          | Class         |
| ---------------- | ------------- |
| Inputs           | `rounded-xl`  |
| Buttons          | `rounded-xl`  |
| Product cards    | `rounded-2xl` |
| Filters panel    | `rounded-2xl` |
| Cart drawer      | `rounded-2xl` |
| Dialogs / Modals | `rounded-2xl` |
| Toasts           | `rounded-xl`  |

---

## Shadows

Use soft shadows with low visual weight.

| Context       | Utility     |
| ------------- | ----------- |
| Card          | `shadow-sm` |
| Product hover | `shadow-md` |
| Drawer        | `shadow-lg` |
| Dialog        | `shadow-xl` |

Avoid heavy shadows.

---

## Motion

Framer Motion is the animation system.

Animation should communicate state changes, never distract.

### Timing

| Action             | Duration |
| ------------------ | -------- |
| Hover              | 150ms    |
| Button interaction | 150ms    |
| Card elevation     | 200ms    |
| Drawer open/close  | 250ms    |
| Modal open/close   | 250ms    |
| Page transitions   | 250ms    |

### Rules

- Animate opacity and transform only.
- Avoid layout-shift animations.
- Avoid bounce effects.
- Respect `prefers-reduced-motion`.

---

## Component Library

The project uses:

- shadcn/ui
- Tailwind CSS
- Framer Motion
- Sonner

Components live in:

```txt
components/ui/
```

Use the shadcn CLI whenever a component already exists in the ecosystem.

Do not create custom versions of components that already exist in shadcn/ui.

---

## Product Catalog Patterns

### Product Grid

Responsive product grid:

| Breakpoint | Columns |
| ---------- | ------- |
| Mobile     | 1       |
| Small      | 2       |
| Large      | 3       |
| XL         | 4       |

Implementation:

```txt
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
```

### Product Card

Each product card contains:

- Product image
- Category badge
- Product title
- Rating
- Price
- Add to Cart button

Behavior:

- Slight lift on hover
- Image scale effect
- Add to Cart always visible
- Entire card clickable except button

---

## Cart Experience

Cart is available in two forms:

### Cart Drawer

Slide-over drawer from the right.

Contains:

- Product list
- Quantity controls
- Remove item action
- Subtotals
- Total price
- Checkout CTA

### Cart Page

Route:

```txt
/cart
```

Provides:

- Full cart management
- Better mobile experience
- Summary section
- Empty state

Both views use the same underlying cart state.

---

## Layout Patterns

### Header

Sticky header.

Contains:

- Logo
- Search input
- Theme toggle
- Cart button

Border bottom visible at all times.

### Product Listing Page

Layout:

```txt
----------------------------------
Header
----------------------------------
Filters
----------------------------------
Product Grid
----------------------------------
```

Desktop:

```txt
Sidebar Filters | Product Grid
```

Mobile:

```txt
Filter Drawer
Product Grid
```

### Product Detail

Layout:

```txt
Image Gallery | Product Information
```

Mobile:

```txt
Image
Information
```

### Empty States

Every empty state includes:

- Icon
- Title
- Description
- Primary action

No blank screens.

---

## Loading States

Use Skeleton components from shadcn/ui.

Required for:

- Product grid
- Product detail
- Categories
- Cart drawer

Avoid spinners as the primary loading mechanism.

---

## Notifications

Use Sonner.

Toast variants:

- Success
- Error
- Info

Examples:

- Product added to cart
- Product removed
- Quantity updated
- Error loading products

---

## Icons

Lucide React.

Only stroke icons.

Sizes:

| Usage              | Size        |
| ------------------ | ----------- |
| Inline             | `h-4 w-4`   |
| Buttons            | `h-5 w-5`   |
| Empty States       | `h-8 w-8`   |
| Feature Highlights | `h-10 w-10` |

Do not use emoji icons.

---

## Accessibility

Requirements:

- WCAG AA contrast minimum
- Keyboard navigation supported
- Visible focus states
- Semantic HTML
- Accessible labels for all controls
- ARIA attributes where necessary

Accessibility is a requirement, not an enhancement.

---

## Responsive Requirements

Supported breakpoints:

| Breakpoint | Width            |
| ---------- | ---------------- |
| Mobile     | `< 640px`        |
| Tablet     | `640px - 1024px` |
| Desktop    | `1024px+`        |

Every feature must work correctly across all breakpoints before being considered complete.

---

## Visual Goal

The final product should feel like a production-ready e-commerce experience rather than a technical assessment.

Primary references:

- Vercel
- Shopify
- Linear

The UI should communicate quality, speed, trust, and attention to detail.
