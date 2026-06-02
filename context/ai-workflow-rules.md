# AI Workflow Rules

## Approach

Build CartFlow incrementally using a context-driven and spec-driven workflow.

All implementation decisions must be guided by the project context files. Do not infer product behavior, architecture, or business rules that are not explicitly documented.

Before implementing any feature, review the relevant context files and ensure the requested work aligns with the documented scope.

The objective is not simply to complete requirements, but to build a maintainable, production-quality e-commerce application using modern Next.js architecture and frontend engineering best practices.

---

## Development Philosophy

- Prefer clarity over cleverness.
- Prefer maintainability over premature optimization.
- Prefer composition over complexity.
- Prefer explicitness over hidden abstractions.
- Prefer incremental delivery over large unverified changes.

Every implementation should be understandable, testable, and easy to extend.

---

## Context First Development

Before starting any implementation:

1. Review `AGENTS.md`
2. Review the relevant context files
3. Verify the requested work belongs to the current scope
4. Confirm no existing architectural decision already defines the solution
5. Identify dependencies and affected features

Implementation should always follow documented decisions before introducing new ones.

---

## Scoping Rules

Work on one feature unit at a time.

Examples of valid feature units:

- Product catalog
- Category filtering
- Product detail page
- Cart state management
- Cart persistence
- Search functionality
- URL synchronization
- Testing infrastructure

Prefer small, verifiable increments over broad implementation phases.

Do not combine unrelated system boundaries in a single implementation step.

---

## When To Split Work

Split an implementation step if it combines:

- UI implementation and architectural refactoring
- Multiple unrelated routes
- Multiple unrelated features
- State management and API integration changes
- Server-side and client-side concerns that can be delivered independently
- Behavior not clearly defined in the context files

If a change cannot be verified end-to-end within a single review cycle, the scope is too large and should be split.

---

## Architectural Rules

### Server-First Architecture

Use Server Components by default.

Only use Client Components when required for:

- User interaction
- Local component state
- Browser APIs
- Context providers
- Event handlers
- Client-side persistence

Do not add `"use client"` unless there is a clear justification.

---

### Data Access

All API communication must pass through the services layer.

Do not fetch data directly inside UI components.

Preferred flow:

```text
API
↓
services/
↓
server actions or pages
↓
components
```

This keeps data access centralized, testable, and maintainable.

---

### URL-Driven State

The URL is the source of truth for:

- Search
- Category filters
- Sorting

Active filters must always be reflected in search params.

Application state should be restorable from the URL alone.

---

### State Management

Global state must use:

```text
Context API + useReducer
```

Do not introduce external state management libraries.

Examples of valid global state:

- Shopping cart

Examples of invalid global state:

- Temporary UI state
- Component-specific interactions

Keep state as local as possible.

---

### Cart Persistence

Cart persistence must use:

```text
localStorage
```

Persistence logic should be isolated from presentation logic.

Cart state must survive page refreshes.

---

## TypeScript Rules

Strict mode is mandatory.

Never:

- Use `any`
- Disable strict mode
- Bypass type safety for convenience

Prefer:

- Explicit types
- Domain-specific interfaces
- Type-safe utility functions
- Narrowed unions where appropriate

Type assertions should be used only when absolutely necessary.

---

## Component Rules

Components should have a single responsibility.

Avoid:

- Business logic inside UI components
- Data fetching inside presentation components
- Large components with multiple responsibilities

Prefer:

```text
services/
hooks/
utils/
context/
components/
```

Each layer should own its responsibility.

---

## Dependency Rules

Do not introduce external libraries when the problem can be solved with:

- React
- Next.js
- TypeScript
- Browser APIs

Every dependency increases maintenance cost and must have clear justification.

---

## Testing Rules

Critical business logic should be testable.

Prioritize tests for:

- Reducers
- Custom hooks
- Utility functions
- Data transformation logic

At least the required unit tests must remain passing throughout development.

Tests should validate behavior, not implementation details.

---

## Performance Rules

Avoid premature optimization.

Do not:

- Add memoization without evidence
- Introduce unnecessary abstractions
- Optimize hypothetical bottlenecks

Do:

- Prevent duplicate requests
- Keep rendering predictable
- Avoid unnecessary state updates
- Favor simple solutions first

Measure before optimizing.

---

## Handling Missing Requirements

Do not invent product behavior.

If a requirement is:

### Ambiguous

Clarify and document the decision in the appropriate context file before implementation.

### Missing

Add it as an open question in:

```text
progress-tracker.md
```

before continuing.

---

## Protected Files

Do not modify foundational or generated code unless explicitly required.

Examples:

```text
components/ui/*
```

Third-party or generated code should remain reusable and isolated.

Project-specific behavior belongs in application-level components.

---

## Keeping Documentation In Sync

Documentation is part of the implementation.

Update the appropriate context file whenever changes affect:

- Architecture
- Feature scope
- Development conventions
- State management
- Storage decisions
- UI patterns
- System boundaries

Progress documentation must always reflect the current implementation state.

Never leave context files behind the codebase.

---

## Definition Of Done

Before marking a feature as complete:

### Functional Validation

- Feature works end-to-end
- Requirements are satisfied
- Edge cases are handled

### Technical Validation

- TypeScript passes
- ESLint passes
- Build succeeds
- Tests pass

### Documentation Validation

- Relevant context files updated
- Architectural decisions documented
- Progress tracker updated

### Quality Validation

- No duplicated logic
- No unnecessary abstractions
- No architectural rules violated
- Code remains maintainable and readable

Only after all validations pass should work move to the next feature unit.
