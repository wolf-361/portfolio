# Luc Allaire — Portfolio

Mobile-first, but fluent across the stack — from Kotlin to Go to bare metal. Production-grade work across KMP mobile, Angular web, and self-hosted infrastructure.

**Live:** [me.wolf-361.ca](https://me.wolf-361.ca)

---

![Demo](public/demo.gif)

## What this is

A bilingual (FR/EN) single-page portfolio built from scratch with Angular 21 and Angular Material M3. It features an interactive terminal that doubles as a navigable resume, project case studies with architecture diagrams, and a live dark/light theme with no flash on load.

---

## Stack

| Layer           | Choice                               | Why                                                                                                                                                                                           |
| :-------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | Angular 21 (standalone, no NgModule) | Stable, opinionated, excellent Material integration — [ADR-0002](./docs/adr/0002-standalone-components-only.md)                                                                               |
| UI              | Angular Material M3                  | Accessible components out of the box, single token file to rebrand — [ADR-0006](./docs/adr/0006-angular-material-design-tokens.md)                                                            |
| State           | Signals + `httpResource()`           | No subscription management, fine-grained reactivity, aligned with Angular's direction — [ADR-0003](./docs/adr/0003-signals-as-state-primitive.md)                                             |
| Styling         | SCSS with M3 design tokens           | One `_tokens.scss` to change the entire palette, font, and radius                                                                                                                             |
| Tests           | Vitest (unit) · Playwright (e2e)     | Vitest: no browser launch, Jest-compatible API — [ADR-0007](./docs/adr/0007-vitest-over-karma.md). Playwright: real browser, trace viewer — [ADR-0008](./docs/adr/0008-playwright-for-e2e.md) |
| Linting         | ESLint + `eslint-plugin-boundaries`  | Import rules between `core / shared / features` are enforced mechanically, not by convention                                                                                                  |
| Formatting      | Prettier                             |                                                                                                                                                                                               |
| Git hooks       | Husky + lint-staged + commitlint     | Pre-commit: format + lint staged files only. Commit-msg: Conventional Commits — [ADR-0009](./docs/adr/0009-husky-lint-staged.md)                                                              |
| Package manager | Bun                                  |                                                                                                                                                                                               |

---

## Architecture

Feature-First layout — code is grouped by business domain, not by technical type. ([ADR-0001](./docs/adr/0001-feature-first-architecture.md))

```
src/app/
├── core/       # Singletons loaded once: interceptors, layout, theme, lang
├── shared/     # Reusable building blocks with no feature affinity
└── features/   # One folder per domain (home, projects, not-found)
```

Import rules enforced by `eslint-plugin-boundaries`:

- `features` → may import `core` and `shared`
- `shared` → may **not** import `core` or `features`
- `core` → may **not** import `features`
- Features may **not** cross-import each other

Within each feature:

```
features/{name}/
├── models/      # TypeScript interfaces scoped to this feature
├── services/    # Signal-based state, httpResource() reads, mutation methods
├── guards/      # Route guards (optional)
├── components/  # Dumb components — @Input/@Output only, no service injection
└── pages/       # Smart components — inject services, connected to routes
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full guide and [docs/adr/](./docs/adr/) for the reasoning behind each decision.

---

## Key patterns

**Reads** uses `httpResource()` from `@angular/common/http`. The URL factory reads signals, so re-fetching on param changes is automatic. No manual subscriptions.

```typescript
readonly projects = httpResource<Project[]>(() => this.api.url('/projects'));
```

**State** is signals throughout. `computed()` for all derived state. No RxJS in components.

**Theming** — `src/styles/_tokens.scss` is the single source of truth for palette, font, and radius. The `dark` class on `<html>` drives light/dark switching. An inline script in `index.html` sets the class synchronously before first paint — no flash of wrong theme. ([ADR-0005](./docs/adr/0005-dark-light-theme-strategy.md))

**File naming** — Angular 21 style: no type suffixes in filenames (`auth.ts`, not `auth.service.ts`). Class names retain their suffix. ([ADR-0010](./docs/adr/0010-file-naming-conventions.md))

---

## Running locally

```bash
bun install
bun start           # dev server → http://localhost:4200
```

The dev server proxies `/api` → `http://localhost:8080`. Edit `proxy.conf.json` to change the target.

---

## Commands

```bash
bun start           # dev server
bun run build       # production build
bun test            # unit tests (Vitest)
bun run test:watch  # unit tests in watch mode
bun run test:e2e    # Playwright e2e tests
bun run lint        # ESLint
bun run format      # Prettier
bun run init        # interactive theme initializer (palette, font, radius)
```
