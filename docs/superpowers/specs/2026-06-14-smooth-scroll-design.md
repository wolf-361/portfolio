# Smooth Scroll for In-Page Anchor Navigation

**Date:** 2026-06-14
**Scope:** 3-file change — `styles.scss`, `navbar.ts`, `mobile-nav.ts`

## Problem

In-page anchor navigation has inconsistent scroll behaviour:

- Hero CTA `<a href="#projects">` jumps instantly (native anchor, no JS handler)
- Navbar `scrollTo()` and mobile nav `navigate()` already use `behavior: 'smooth'` but neither checks `prefers-reduced-motion`

## Design

### CSS — `src/styles.scss`

Add to the `html` rule area:

```scss
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

Fixes hero CTA and any future native anchors at zero JS cost.

### JS — `src/app/core/layout/navbar/navbar.ts`

In `scrollTo()`, change `behavior: 'smooth'` → `behavior: 'auto'`. This defers to the CSS `scroll-behavior` on `html`, which handles both the smooth default and the reduced-motion override automatically — no `matchMedia` check needed in JS.

```ts
window.scrollTo({ top, behavior: 'auto' });
```

### JS — `src/app/core/layout/mobile-nav/mobile-nav.ts`

Same change in `navigate()`:

```ts
el.scrollIntoView({ behavior: 'auto', block: 'start' });
```

CSS is the single source of truth for scroll behaviour. Both JS scrollers defer to it via `behavior: 'auto'`.

## Verification

1. Hero CTA "View projects ↓" with normal OS settings → smooth scroll
2. Navbar / mobile nav clicks with normal OS settings → still smooth (no regression)
3. All three with `prefers-reduced-motion: reduce` active → instant jump
4. Scroll-spy nav highlighting updates correctly during smooth scroll

## No Changes To

- Scroll-spy logic (event-driven, works during smooth scroll automatically)
- Any other anchor or navigation code
