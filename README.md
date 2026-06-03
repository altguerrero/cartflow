# CartFlow

CartFlow is a production-quality e-commerce frontend built with the Next.js App Router, React, TypeScript, and Tailwind CSS. This foundation unit establishes the application shell, source structure, code quality tooling, and a temporary health-check interface before product and cart features are introduced.

## Requirements

- Node.js 20 or newer
- pnpm

## Installation

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm lint:fix
pnpm format
pnpm type-check
```

## Project Structure

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
├── features/
│   ├── products/
│   └── cart/
├── services/
│   └── api/
├── hooks/
├── context/
├── lib/
├── types/
├── constants/
└── tests/
```

## Technology Stack

- Next.js App Router
- React
- TypeScript with strict mode
- Tailwind CSS
- ESLint
- Prettier with `prettier-plugin-tailwindcss`

## Environment

The example environment file contains the only variable required for future API integration:

```env
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

No business functionality, product data fetching, or cart behavior is implemented in Unit 01.
