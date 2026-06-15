# Cinematic Redesign Polish — Design Spec

**Date:** 2026-06-11
**Branch:** feat/cinematic-redesign

## Overview

Four targeted fixes to the cinematic redesign branch: revert display font overuse, fix a terminal hint layout shift, and replace scroll-reveal on the detail page hero with a proper entrance animation sequence.

---

## 1. Font scope revert

### Problem

`var(--font-display)` (Instrument Serif, italic) was added to `section-header.scss` and `project-detail-page.scss` content titles, making it appear on every section header across the home page and within detail page content. The editorial serif should be reserved for the hero and contact section only.

### Change

Remove `font-family: var(--font-display)` (and related `font-style: italic`, `font-weight: 400`) from:

- `src/app/shared/components/section-header/section-header.scss` → `.title`
  - Revert to: `font-size`, `font-weight: 600`, `letter-spacing`, `line-height` using the body font (Space Grotesk)
- `src/app/features/projects/pages/project-detail-page/project-detail-page.scss` → `.sec-title`
  - Revert to: sans-serif, `font-weight: 600`, appropriate size

### Keep as-is

- Home hero title (already scoped to the hero component)
- `.contact-cta` in `home-page.scss`
- `.cs-title` in `project-detail-page.scss` (this is the hero title of the detail page)

---

## 2. Terminal hint layout shift

### Problem

In `terminal.html`, the `.t-hint` ("try typing a command") is rendered with `@if (showHint())`. It sits between the title bar and the terminal body. When it appears after the neofetch animation finishes, it shifts the terminal body downward — creating a visible layout jump.

### Change

Remove the `@if` and always render `.t-hint`. Control visibility via a CSS class or inline style based on `showHint()`:

```html
<div class="t-hint" [class.t-hint--visible]="showHint()" aria-hidden="true">
  <span class="t-hint-dot"></span>
  <span class="t-hint-text mono">try typing a command</span>
</div>
```

In `terminal.scss`, add:

```scss
.t-hint {
  visibility: hidden;
  &--visible {
    visibility: visible;
  }
}
```

The element is always in the DOM and always takes up space. No layout shift.

---

## 3. Detail page hero entrance animation

### Problem

The detail page hero uses `scrollReveal="fade-up"` on 4 elements (title, subtitle, CTA row, visual panel). Scroll-reveal fires via IntersectionObserver — appropriate for mid-page content, but awkward for above-the-fold hero content that's already in the viewport on load. It doesn't feel like a deliberate "page arrived" moment.

### Change

**Remove** `scrollReveal` and `scrollRevealDelay` from the 4 hero elements in `project-detail-page.html`:

- `h1.cs-title`
- `p.cs-subtitle`
- `div.cs-cta-row`
- `div.cs-hero-visual`

**Add** `[class.cs-entering]="entering()"` to `.cs-hero`.

**Add** to `project-detail-page.ts`:

```ts
entering = signal(false);

constructor() {
  effect(() => {
    this.project(); // re-runs on slug change
    this.entering.set(false);
    requestAnimationFrame(() => this.entering.set(true));
  });
}
```

**Add** to `project-detail-page.scss`:

```scss
@keyframes cs-fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

// Hide animated children before the entrance class is applied (avoids 1-frame flash)
.cs-hero:not(.cs-entering) {
  .cs-title,
  .cs-subtitle,
  .cs-cta-row,
  .cs-hero-visual {
    opacity: 0;
  }
}

.cs-entering {
  .cs-title {
    animation: cs-fade-up 500ms ease-out both;
  }
  .cs-subtitle {
    animation: cs-fade-up 500ms ease-out 80ms both;
  }
  .cs-cta-row {
    animation: cs-fade-up 500ms ease-out 160ms both;
  }
  .cs-hero-visual {
    animation: cs-fade-up 500ms ease-out 240ms both;
  }
}
```

### Component reuse

Angular reuses the component instance when navigating between projects (same route config, different `:slug`). The `effect()` + `requestAnimationFrame` toggle ensures the animation replays on every navigation, not just the first load.

---

## Files touched

| File                                                                           | Change                                                                              |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `src/app/shared/components/section-header/section-header.scss`                 | Revert `.title` font to Space Grotesk                                               |
| `src/app/features/projects/pages/project-detail-page/project-detail-page.scss` | Revert `.sec-title` font; add `cs-fade-up` keyframe + `.cs-entering` stagger        |
| `src/app/features/projects/pages/project-detail-page/project-detail-page.html` | Remove `scrollReveal` from 4 hero elements; add `[class.cs-entering]` to `.cs-hero` |
| `src/app/features/projects/pages/project-detail-page/project-detail-page.ts`   | Add `entering` signal + `effect()`                                                  |
| `src/app/features/home/components/hero/terminal/terminal.html`                 | Remove `@if (showHint())`, always render `.t-hint`                                  |
| `src/app/features/home/components/hero/terminal/terminal.scss`                 | Add `visibility: hidden` + `.t-hint--visible`                                       |
