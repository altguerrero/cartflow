# Unit 01: Project Foundation

## Goal

Establish the CartFlow project foundation using Next.js App Router, TypeScript Strict Mode, and Tailwind CSS.

At the end of this unit, the project should compile successfully, follow the defined architecture, include code quality tooling, and expose a minimal validation interface that confirms the application is operational.

---

## Design

### Initial Layout

Create a temporary landing page that serves as a project health check.

Structure:

- Simple application header
- Project branding
- Status message
- Basic stack information

### User Experience

- Clearly communicate that the application is running correctly
- Follow the design system defined in `context/ui-context.md`
- Responsive across mobile and desktop
- No business functionality yet
- No product data
- No cart functionality
- No API integration

---

## Implementation

### 1. Project Initialization

Initialize the application with:

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint

Requirements:

- TypeScript Strict Mode enabled
- App Router architecture only
- No Pages Router

---

### 2. Source Structure

Create the initial project structure:

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

Create placeholder files where necessary to preserve structure.

---

### 3. Path Aliases

Configure TypeScript aliases:

```text
@/*
```

Example:

```ts
import { Header } from "@/components/layout/header";
```

All future imports should use aliases whenever possible.

---

### 4. Global Layout

Create:

```text
src/app/layout.tsx
```

Responsibilities:

- Global metadata
- Font configuration
- Application shell
- Global providers placeholder
- Root layout structure

---

### 5. Temporary Home Page

Create:

```text
src/app/page.tsx
```

Display:

- CartFlow logo/title
- Project status
- Environment validation message
- Stack summary

Example content:

```text
CartFlow

Modern E-Commerce Experience

Project Status: Ready

Next.js
TypeScript
Tailwind CSS
```

Purpose:

Validate that the application boots correctly before feature development begins.

---

### 6. Code Quality Tooling

Install and configure:

- Prettier
- prettier-plugin-tailwindcss

Create:

```text
.prettierrc
.prettierignore
```

Add scripts:

```json
{
  "dev": "...",
  "build": "...",
  "start": "...",
  "lint": "...",
  "lint:fix": "...",
  "format": "prettier . --write",
  "type-check": "tsc --noEmit"
}
```

---

### 7. Environment Configuration

Create:

```text
.env.example
```

Variables:

```env
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```

No additional environment variables are required in this unit.

---

### 8. README Setup

Update README with:

- Project overview
- Requirements
- Installation instructions
- Available scripts
- Project structure
- Technology stack

---

### 9. Validation

Verify:

- Development server starts successfully
- Production build completes successfully
- TypeScript strict mode is active
- Tailwind styles render correctly
- Aliases resolve correctly

No business features should exist after this unit.

---

## Dependencies

Install:

- prettier
- prettier-plugin-tailwindcss

Do not install:

- state management libraries
- data fetching libraries
- testing libraries
- utility libraries

Those will be introduced only when required.

---

## Verify When Done

- [ ] Application starts with `npm run dev`
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run build` passes
- [ ] Tailwind CSS is working
- [ ] Path aliases are working
- [ ] README is updated
- [ ] `.env.example` exists
- [ ] Responsive on mobile and desktop
- [ ] No console errors
- [ ] No business functionality implemented
