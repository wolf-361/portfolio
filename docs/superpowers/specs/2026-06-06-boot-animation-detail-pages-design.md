# Boot Animation & Detail Page Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a once-per-session terminal boot overlay and redesign the project detail page to match the cinematic feel of the homepage.

**Architecture:** Two independent features implemented in a single plan. The boot overlay lives in `core/boot-overlay/` and is wired into `AppComponent`. The detail page redesign touches `features/projects/`, `shared/components/`, and the project data model. They share the `scroll-reveal` directive and `--font-display` typography system already in place.

**Tech Stack:** Angular 21 signals, `sessionStorage`, CSS transitions, `IntersectionObserver` (via existing `ScrollRevealDirective`), `@use 'styles/sys'` M3 tokens, `@use 'styles/spacing'` scale.

---

## Feature A — Terminal Boot Overlay

### Behaviour

- Plays once per browser session, gated by `sessionStorage` key `boot-seen`.
- A full-screen overlay (`position: fixed; inset: 0; z-index: 9999`) renders on top of the fully-loaded page so there is no route blocking or layout shift.
- Types 3 lines at ~30 ms/char:
  ```
  ~ initializing luc.allaire...
  ~ loading portfolio.ts        ✓
  ~ ready.▌
  ```
- After the last line, cursor blinks for 300 ms.
- Overlay fades out over 400 ms, then is removed from the DOM.
- Total visible duration: ~1.8 s.
- Once dismissed, sets `sessionStorage.setItem('boot-seen', '1')` — never shows again that session.

### Angular Architecture

**`src/app/core/boot-overlay/boot.service.ts`**

- `injectable({ providedIn: 'root' })`
- `readonly showOverlay = signal(!sessionStorage.getItem('boot-seen'))` — false if already seen.
- `markSeen(): void` — sets sessionStorage and `showOverlay.set(false)`.
- `readonly isFirstLoad = signal(!sessionStorage.getItem('boot-seen'))` — read once at construction, never changes after that. Used by the hero terminal to extend its start delay on first load only.

**`src/app/core/boot-overlay/boot-overlay.ts`**

- Standalone component, no inputs, no outputs.
- On `ngOnInit`: starts the typing animation with `setInterval` at 30 ms/tick.
- After last line + 300 ms pause: adds a `.fading` CSS class (triggers `opacity: 0` transition over 400 ms), then calls `bootService.markSeen()` after the transition — `showOverlay` becomes false, Angular removes the element from the DOM automatically.
- Template: dark full-screen panel, mono font, lines appear one at a time, blinking cursor on the active line.

**`src/app/app.ts`**

- Injects `BootService`.
- Template: `@if (bootService.showOverlay()) { <app-boot-overlay /> }`

**Hero coordination:** The hero terminal already has an 800 ms `isFirstLoad` start delay. `BootService.isFirstLoad` signal replaces that local flag — no behaviour change, just shared source of truth.

### Visual Design

- Background: `var(--mat-sys-background)` — matches the page exactly so the fade-out is seamless.
- Font: `var(--font-mono)`, `0.875rem`, `sys.$on-surface` at 90% opacity.
- Prefix `~` in `sys.$primary` color.
- Checkmark `✓` on line 2 fades in after the line completes.
- Cursor: `▌` blinking at 1.1 s step-end (same keyframe as the hero terminal).
- Fade-out: `opacity: 0` transition 400 ms ease, then `display: none`.

---

## Feature B — Detail Page Redesign

### B1 — Data Model Extension

**`src/app/features/projects/models/project-detail.ts`**

Add `HeroVisual` interface and field to `ProjectDetail`:

```typescript
export type HeroVisualType = 'phone' | 'terminal' | 'none';

export interface HeroVisual {
  type: HeroVisualType;
  // type: 'terminal' only
  terminalCommand?: string; // e.g. 'ansible-playbook site.yml'
  terminalLines?: string[]; // output lines shown below the command
}
```

Add to `ProjectDetail`:

```typescript
heroVisual?: HeroVisual;
```

Update existing project data in `projects.ts`:

- `planific`: `heroVisual: { type: 'phone' }` — uses CSS phone mockup (placeholder; refined later when repo access is available).
- Other projects: `heroVisual: { type: 'terminal', terminalCommand: '...', terminalLines: [...] }` or `type: 'none'` as appropriate.

### B2 — Shared Phone Mockup Component

Extract the CSS phone mockup markup and styles currently duplicated in `project-card.scss` into a reusable component.

**`src/app/shared/components/phone-mockup/phone-mockup.ts`**

- Selector: `ui-phone-mockup`
- No inputs for now (static placeholder content).
- Contains the full phone frame HTML (status bar, dynamic island, app content).
- Styles in `phone-mockup.scss` — move all `.phone-frame`, `.phone-*`, `.app-*` rules here.
- `project-card.scss` imports nothing new — the card template replaces inline markup with `<ui-phone-mockup />`.

### B3 — Detail Page Hero Split

**`project-detail-page.html`** — replace the `.cs-hero` block:

```
┌─────────────────────────────────────────────────────┐
│  // breadcrumb                                      │
│                                                     │
│  [Instrument Serif italic, large title]             │  ← scrollReveal="fade-up" delay=0
│  [subtitle]                                         │  ← scrollReveal="fade-up" delay=80
│  [CTA buttons + status badge]                       │  ← scrollReveal="fade-up" delay=160
│                                              ┌────┐ │
│                                              │    │ │  ← scrollReveal="fade-up" delay=240
│                                              │    │ │
│                                              └────┘ │
└─────────────────────────────────────────────────────┘
```

Layout: CSS grid `grid-template-columns: 1fr 420px` at ≥860px, single column below.

The right panel renders conditionally:

- `type: 'phone'` → `<ui-phone-mockup />`
- `type: 'terminal'` → a static `.cs-hero-terminal` block (same visual style as the hero terminal: dark background, titlebar dots, mono font, `terminalCommand` + `terminalLines` rendered statically)
- `type: 'none'` → right panel absent, title area spans full width

**Parallax:** The visual panel gets a CSS `transform: translateY()` driven by `window.scrollY * 0.3`. Implemented via a `fromEvent(window, 'scroll')` subscription in `ngOnInit`, run outside NgZone. An `IntersectionObserver` on `.cs-hero` gates the listener — scroll handler only fires while the hero is intersecting, and is disconnected once the hero scrolls out of view to avoid unnecessary work.

**Title typography:**

```scss
.cs-title {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  letter-spacing: -0.025em;
  line-height: 1.05;
}
```

### B4 — Content Section Polish

**Section titles:** `.sec-title` gets `font-family: var(--font-display); font-style: italic; font-weight: 400` — editorial heading, consistent with hero + contact CTA.

**Scroll-reveal:** Remove `uiFadeIn` from `cs-section` articles. Add `scrollReveal="fade-up"` with `[scrollRevealDelay]="$index * 120"` on each section. Sidebar meta block: `scrollReveal="from-left"`. Sidebar TOC: `scrollReveal="from-left" [scrollRevealDelay]="120"`.

**Section divider:** A `<div class="cs-divider">` between sections — `1px solid sys.$outline-variant` with a `4px × 4px` square dot in `sys.$primary` at the left edge.

**Stats countUp:** When a `ui-stat-card` host has `is-revealed` (added by `scrollReveal`), trigger a CSS counter animation. The stat value is split into a numeric part — `@keyframes count-up` using `counter()` is not viable; instead, add an `@Input countUp = false` to `StatCard`, set it `true` once the parent section is revealed, and animate `opacity 0→1 + translateY 8px→0` with staggered delay per card.

**Highlight blockquote:** Remove `-webkit-mask-image` / `mask-image` (was cutting off text). Replace with:

```scss
.sec-highlight {
  border-left: 2px solid sys.$primary;
  box-shadow: inset 4px 0 24px -8px color-mix(in srgb, sys.$primary 20%, transparent);
  background: color-mix(in srgb, sys.$primary 8%, sys.$surface-container-low);
}
```

---

## Scope Note — Phone Mockup Content

The CSS phone stub currently shows generic scheduling UI. Once repo access is available for the Planific app, the `ui-phone-mockup` component will be updated with an animated stub that accurately represents the real app screens. This is explicitly out of scope for this plan — tracked as a follow-up.

---

## Files Created / Modified

| Action | Path                                                                           |
| ------ | ------------------------------------------------------------------------------ |
| Create | `src/app/core/boot-overlay/boot.service.ts`                                    |
| Create | `src/app/core/boot-overlay/boot-overlay.ts`                                    |
| Create | `src/app/core/boot-overlay/boot-overlay.html`                                  |
| Create | `src/app/core/boot-overlay/boot-overlay.scss`                                  |
| Modify | `src/app/app.ts`                                                               |
| Create | `src/app/shared/components/phone-mockup/phone-mockup.ts`                       |
| Create | `src/app/shared/components/phone-mockup/phone-mockup.html`                     |
| Create | `src/app/shared/components/phone-mockup/phone-mockup.scss`                     |
| Modify | `src/app/features/projects/models/project-detail.ts`                           |
| Modify | `src/app/features/projects/services/projects.ts`                               |
| Modify | `src/app/features/projects/pages/project-detail-page/project-detail-page.ts`   |
| Modify | `src/app/features/projects/pages/project-detail-page/project-detail-page.html` |
| Modify | `src/app/features/projects/pages/project-detail-page/project-detail-page.scss` |
| Modify | `src/app/features/home/components/project-card/project-card.html`              |
| Modify | `src/app/features/home/components/project-card/project-card.scss`              |
| Modify | `src/app/features/home/components/hero/terminal/terminal.ts`                   |
| Modify | `src/app/shared/components/stat-card/stat-card.ts`                             |
| Modify | `src/app/shared/components/stat-card/stat-card.scss`                           |
