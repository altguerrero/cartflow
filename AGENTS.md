<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This project uses the latest stable Next.js App Router architecture.

Before introducing patterns, APIs, or conventions that may have changed between Next.js versions, verify current framework behavior and avoid relying on outdated assumptions.

<!-- END:nextjs-agent-rules -->

# CartFlow AI Agent Instructions

## Project Context

CartFlow is a production-quality e-commerce application built with:

- Next.js App Router
- React
- TypeScript (strict mode)
- Tailwind CSS
- Context API + useReducer
- Fake Store API
- Vitest
- Local Storage persistence

The objective is not simply to complete a technical assessment.

The objective is to build a maintainable, scalable, production-grade frontend application that demonstrates senior-level engineering practices.

---

# Mandatory Context Loading

Before implementing, modifying, refactoring, or reviewing any code, read the following files in order:

1. `context/project-overview.md`
2. `context/architecture.md`
3. `context/ui-context.md`
4. `context/code-standards.md`
5. `context/ai-workflow-rules.md`
6. `context/progress-tracker.md`

Do not make architectural assumptions before reading these files.

If context files and implementation disagree, the context files are the source of truth.

---

# Development Philosophy

The AI agent is an implementation partner, not a product owner.

The AI agent must:

- Follow existing architecture.
- Respect established patterns.
- Avoid speculative improvements.
- Avoid introducing unnecessary abstractions.
- Prioritize consistency over creativity.

When requirements are ambiguous:

- Use existing project patterns.
- Infer only minor implementation details.
- Ask for clarification when architecture, UX, business logic, or scope could be affected.

---

# Spec-Driven Development

Every meaningful implementation must be driven by a spec.

Before implementing a new feature:

1. Create or review the corresponding spec.
2. Confirm scope.
3. Implement only the defined scope.
4. Verify completion criteria.
5. Update documentation.

Do not implement future features.

Do not expand scope.

Do not bundle unrelated changes into the same implementation.

---

# Scope Control Rules

Work on one unit at a time.

Allowed:

- Completing the active unit.
- Fixing issues introduced by the active unit.
- Updating related documentation.

Not allowed:

- Refactoring unrelated areas.
- Implementing future roadmap items.
- Reorganizing architecture without explicit approval.
- Introducing new design systems or frameworks.

If a change exceeds the current unit boundary, stop and request clarification.

---

# Dependency Management

The AI agent may introduce dependencies when ALL conditions are met:

- The dependency directly supports the current scope.
- The dependency is actively maintained.
- The dependency aligns with project standards.
- The dependency reduces complexity rather than increasing it.

Whenever a dependency is added:

- Explain why it is needed.
- Mention possible alternatives.
- Keep the dependency surface minimal.

Avoid dependency-heavy solutions.

Prefer native platform capabilities whenever reasonable.

---

# Architecture Protection Rules

Never violate the following principles:

## State Management

Use:

- React Context
- useReducer
- Local component state

Do not introduce:

- Redux
- Zustand
- MobX
- Recoil
- Jotai
- Any external state management library

## Data Fetching

Use:

- Server Components when appropriate
- Route-level data fetching
- Feature-oriented service abstractions

Avoid:

- Duplicated API logic
- Data-fetching logic spread across components

## Persistence

Cart state must persist using Local Storage.

Do not introduce backend persistence.

## URL State

Filters, sorting, and search state must remain URL-driven whenever specified by requirements.

---

# Code Quality Requirements

All code must satisfy:

## TypeScript

- Strict mode compliance.
- No implicit any.
- No unnecessary type assertions.
- Prefer explicit domain types.

## Components

- Single responsibility.
- Feature-oriented organization.
- Reusable when appropriate.
- Avoid premature abstraction.

## Styling

Use:

- Tailwind CSS
- Design tokens defined in ui-context

Avoid:

- Inline styles
- Hardcoded design values
- Multiple styling paradigms

## Accessibility

Every implementation must include:

- Semantic HTML
- Keyboard accessibility
- Visible focus states
- Appropriate labels and ARIA attributes when necessary

---

# Testing Requirements

All new business logic should be testable.

Prefer testing:

- Utilities
- Hooks
- Reducers
- Domain logic

Avoid fragile UI implementation tests when domain tests provide equivalent coverage.

Maintain at least the minimum testing requirements defined by the project.

---

# Verification Checklist

Before considering a unit complete:

- [ ] Scope matches the spec.
- [ ] TypeScript passes.
- [ ] Lint passes.
- [ ] Tests pass.
- [ ] Build succeeds.
- [ ] Responsive behavior verified.
- [ ] Accessibility basics verified.
- [ ] No console errors.
- [ ] No unnecessary dependencies introduced.
- [ ] Documentation updated if needed.
- [ ] Progress tracker updated.

---

# Progress Tracking

After every meaningful implementation:

Update:

`context/progress-tracker.md`

Include:

- Completed work
- Current status
- Open questions
- Architecture decisions
- Next recommended unit

The progress tracker must always reflect the current project state.

---

# Documentation Synchronization

If implementation changes:

- Scope
- Architecture
- UI conventions
- Development workflow
- Engineering standards

Update the corresponding context file before continuing.

Never allow documentation drift.

---

# Git Workflow

At the end of every completed unit:

1. Summarize what was implemented.
2. Summarize any architectural decisions.
3. Suggest a conventional commit message.

Commit format:

feat: feature implementation

fix: bug fix

refactor: internal improvement

test: test additions or updates

docs: documentation updates

chore: maintenance changes

Use clear and descriptive commit messages.

---

# Definition of Done

A task is only complete when:

- Requirements are implemented.
- Verification checklist passes.
- Documentation is synchronized.
- Progress tracker is updated.
- A commit recommendation has been provided.

Completion means production-quality, not prototype-quality.
