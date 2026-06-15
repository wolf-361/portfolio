# Contact Section — Single-Column Desktop Layout

**Date:** 2026-06-14
**Scope:** CSS-only change to `home-page.scss`

## Problem

The contact section uses a two-column flex-row on desktop (≥720px): headline left, email block right. This creates uneven vertical space and a disconnected feel.

## Design

Replace the two-column layout with a single left-aligned vertical column on desktop, matching the stacking order specified:

1. `// 03. CONTACT` eyebrow (unchanged)
2. Headline (`contact-cta`)
3. Email + copy button row (`contact-row`)
4. Meta line 1: availability (`contact-hint`)
5. Meta line 2: reply time (`contact-hint`)

Mobile (≤720px) stays centered, same order — existing breakpoint overrides are kept as-is.

## CSS Changes

**`.contact-split`** — remove the `@media (min-width: 720px)` block that switches to `flex-direction: row`. The element stays a column at all widths. Gap stays `sp.$xl` (32px) between headline and email block.

**`.contact-email-block`** — change default `align-items: flex-end` → `align-items: flex-start`. Mobile override `align-items: center` stays. Gap bumped from `sp.$xs` (4px) → `sp.$sm` (8px) to give the two hint lines breathing room consistent with the hero's `1.25rem` rhythm.

**`@media (max-width: 720px)` centering block** — no changes; continues to center `contact-cta`, `contact-row`, and `contact-hint` on narrow viewports.

## No Changes To

- HTML structure (`contact-split` wrapper stays)
- Spacing between eyebrow and headline (`margin-bottom: sp.$lg`)
- All text styles, copy button, animations
