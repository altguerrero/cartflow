# CartFlow

CartFlow is a production-ready e-commerce frontend built with the Next.js App Router, React, TypeScript, Tailwind CSS, and a feature-oriented architecture.

The application lets users browse a product catalog, search and filter products, inspect product detail pages, add items to a persistent shopping cart, and recover gracefully from loading, empty, and error states.

## Features

- Server-rendered product catalog backed by Fake Store API.
- Client-side search, category filtering, and product sorting.
- URL-driven catalog state for refreshes, sharing, and browser navigation.
- Product detail pages with catalog-context-preserving back navigation.
- Add-to-cart actions from catalog and detail pages.
- Cart drawer and dedicated cart page.
- Quantity updates, product removal, cart clearing, subtotals, and total quantity.
- Versioned `localStorage` cart persistence with safe hydration.
- Loading skeletons, empty states, expected API error states, not-found pages, and route error boundaries.
- Light and dark theme support using semantic design tokens.
- Focused automated coverage for product domain logic, URL search behavior, cart reducer logic, and cart persistence.

## Requirements

- Node.js 20 or newer
- pnpm

## Environment

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Required variable:

```env
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

This value is public configuration for the Fake Store API base URL. It is not a secret.

## Local Development

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev          # Start the local Next.js development server
pnpm build        # Create a production build
pnpm start        # Start the standalone production server after building
pnpm test         # Run Vitest tests
pnpm type-check   # Run TypeScript without emitting files
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with automatic fixes
pnpm format       # Format files with Prettier
```

## Architecture

```text
src/
├── app/                 # App Router routes, layouts, metadata, loading/error states
├── components/          # Shared layout, theme, and UI primitives
├── context/             # Application provider composition
├── features/
│   ├── cart/            # Cart context, reducer, selectors, persistence, and UI
│   └── products/        # Product services, types, hooks, utilities, and UI
└── lib/                 # Shared utility helpers
```

Key decisions:

- Product API access is centralized in `src/features/products/services`.
- Product fetching stays server-first through App Router pages.
- Product search, filtering, and sorting run client-side over already-loaded products.
- Catalog state is synchronized through URL query parameters.
- Cart state is managed with React Context + `useReducer`.
- Cart persistence is browser-only through a validated `localStorage` adapter.
- Styling uses Tailwind CSS with CartFlow semantic CSS variables.

## Verification

Run the full project check before delivery:

```bash
pnpm test
pnpm type-check
pnpm lint
pnpm build
```

The test suite covers product transformation and service error behavior, filter and navigation utilities, URL-driven catalog search behavior, cart reducer and selector behavior, cart persistence, and cart provider hydration.

## Vercel Deployment

CartFlow is designed to deploy on Vercel.

In the Vercel project settings, add the required environment variable for every environment you deploy:

```text
Key: NEXT_PUBLIC_API_URL
Value: https://fakestoreapi.com
Environments: Production and Preview
Sensitive: Off
```

After changing environment variables in Vercel, redeploy the project so the production build uses the updated configuration.

If the deployed app shows that products are temporarily unavailable, check that `NEXT_PUBLIC_API_URL` exists in the active Vercel environment and redeploy after saving it. CartFlow also includes a small local fallback catalog for recoverable Fake Store API availability failures, but missing or invalid API configuration still surfaces as an error so deployment mistakes are not hidden.

## Docker

CartFlow can also run from a production Docker image.

Build the image:

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://fakestoreapi.com \
  -t cartflow .
```

Run the container:

```bash
docker run --rm \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://fakestoreapi.com \
  cartflow
```

Open [http://localhost:3000](http://localhost:3000).

The Dockerfile uses Node 22 and the Next.js standalone production output. Keep `NEXT_PUBLIC_API_URL` available during the image build because the catalog route is statically generated with ISR.

## Scope

CartFlow includes catalog browsing, product details, URL-driven discovery controls, and persistent cart management.

Out of scope for this frontend are checkout, payments, authentication, order history, inventory management, product review creation, admin dashboards, backend services, and cross-device cart persistence.
