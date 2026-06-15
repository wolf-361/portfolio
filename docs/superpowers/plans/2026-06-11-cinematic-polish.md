# Cinematic Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 3 issues on the cinematic redesign branch: revert the display font to hero + contact only, eliminate a terminal hint layout shift, and replace scroll-reveal on the detail page hero with a proper entrance animation.

**Architecture:** Pure CSS/HTML/TS changes within existing components — no new files, no new dependencies. The entrance animation uses a CSS keyframe stagger driven by an Angular signal that resets on each slug change.

**Tech Stack:** Angular 21 (signals, effects, standalone), SCSS with Material 3 tokens, Vitest

---

## File Map

| File                                                                           | Change                                                                              |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `src/app/shared/components/section-header/section-header.scss`                 | Revert `.title` to Space Grotesk (remove display font)                              |
| `src/app/features/projects/pages/project-detail-page/project-detail-page.scss` | Revert `.sec-title` font; add `cs-fade-up` keyframe + `.cs-entering` stagger        |
| `src/app/features/projects/pages/project-detail-page/project-detail-page.html` | Remove `scrollReveal` from 4 hero elements; add `[class.cs-entering]` to `.cs-hero` |
| `src/app/features/projects/pages/project-detail-page/project-detail-page.ts`   | Add `entering` signal + `effect()` in constructor                                   |
| `src/app/features/home/components/hero/terminal/terminal.html`                 | Always render `.t-hint`, control via CSS class                                      |
| `src/app/features/home/components/hero/terminal/terminal.scss`                 | Add `visibility: hidden` base + `.t-hint--visible`                                  |

---

## Task 1: Revert display font from section headers and detail content titles

**Files:**

- Modify: `src/app/shared/components/section-header/section-header.scss`
- Modify: `src/app/features/projects/pages/project-detail-page/project-detail-page.scss`

- [ ] **Step 1: Revert `.title` in section-header.scss**

Replace the full `.title` rule:

```scss
// Main title
.title {
  margin: 0 0 sp.$sm;
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 600;
  color: sys.$on-surface;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
```

(Removed: `font-family: var(--font-display)`, `font-style: italic`, changed `font-weight` from 400 to 600)

- [ ] **Step 2: Revert `.sec-title` in project-detail-page.scss**

Replace the full `.sec-title` rule:

```scss
.sec-title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  color: sys.$on-background;
  max-width: 22ch;
  line-height: 1.1;
}
```

(Removed: `font-family: var(--font-display)`, `font-style: italic`, changed `font-weight` from 400 to 600)

- [ ] **Step 3: Run lint**

```bash
bun run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/shared/components/section-header/section-header.scss \
        src/app/features/projects/pages/project-detail-page/project-detail-page.scss
git commit -m "style: revert display font to hero and contact section only"
```

---

## Task 2: Fix terminal hint layout shift

The `.t-hint` ("try typing a command") is rendered conditionally with `@if (showHint())`. It sits between the title bar and `.terminal-body`, so when it appears after the animation it shifts the body down. Fix: always render it, control visibility with a CSS class.

**Files:**

- Modify: `src/app/features/home/components/hero/terminal/terminal.html`
- Modify: `src/app/features/home/components/hero/terminal/terminal.scss`

- [ ] **Step 1: Make `.t-hint` always rendered in terminal.html**

Find this block (around line 15):

```html
@if (showHint()) {
<div class="t-hint" aria-hidden="true">
  <span class="t-hint-dot"></span>
  <span class="t-hint-text mono">try typing a command</span>
</div>
}
```

Replace with:

```html
<div class="t-hint" [class.t-hint--visible]="showHint()" aria-hidden="true">
  <span class="t-hint-dot"></span>
  <span class="t-hint-text mono">try typing a command</span>
</div>
```

- [ ] **Step 2: Add visibility styles in terminal.scss**

Add to the end of `terminal.scss`:

```scss
.t-hint {
  visibility: hidden;

  &--visible {
    visibility: visible;
  }
}
```

- [ ] **Step 3: Run lint**

```bash
bun run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/features/home/components/hero/terminal/terminal.html \
        src/app/features/home/components/hero/terminal/terminal.scss
git commit -m "fix: reserve space for terminal hint to prevent layout shift on reveal"
```

---

## Task 3: Add `entering` signal to ProjectDetailPageComponent

The detail page hero currently uses `scrollReveal` for its entrance. We replace this with a CSS keyframe stagger driven by an `entering` signal. This task adds the TS signal + effect; the next task wires it into the template and styles.

**Files:**

- Modify: `src/app/features/projects/pages/project-detail-page/project-detail-page.ts`

- [ ] **Step 1: Write a failing test**

Create `src/app/features/projects/pages/project-detail-page/project-detail-page.spec.ts`:

```typescript
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ProjectDetailPageComponent } from './project-detail-page';
import { provideRouter } from '@angular/router';
import { ProjectsService } from '../../services/projects';
import { LangService } from '../../../../core/lang/lang';

describe('ProjectDetailPageComponent', () => {
  function setup(slug = 'test-slug') {
    const mockProject = {
      id: slug,
      slug,
      title: 'Test',
      description: null,
      heroVisual: { type: 'none' },
      links: [],
      status: null,
      sections: [],
      tags: [],
    };
    TestBed.configureTestingModule({
      imports: [ProjectDetailPageComponent],
      providers: [
        provideRouter([]),
        { provide: ProjectsService, useValue: { getDetail: () => mockProject } },
        { provide: LangService, useValue: { lang: signal('en'), t: (en: string) => en } },
      ],
    });
    const fixture = TestBed.createComponent(ProjectDetailPageComponent);
    fixture.componentRef.setInput('slug', slug);
    return fixture;
  }

  it('should have entering signal initially false', () => {
    const fixture = setup();
    expect(fixture.componentInstance.entering()).toBe(false);
  });

  it('should set entering to true after requestAnimationFrame fires', async () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
    const fixture = setup();
    fixture.detectChanges();
    expect(fixture.componentInstance.entering()).toBe(true);
    rafSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run the tests to confirm they fail**

```bash
bun test --reporter=verbose 2>&1 | grep -A5 "ProjectDetailPage"
```

Expected: test file not found or `entering` property doesn't exist yet.

- [ ] **Step 3: Add `entering` signal and `effect()` to the component**

In `project-detail-page.ts`, add `effect` to the import list:

```typescript
import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  NgZone,
  signal,
  viewChild,
} from '@angular/core';
```

Add `entering` as a public signal after `readonly activeSection`:

```typescript
readonly activeSection = signal<string>('');
readonly zoomedDiagram = signal<string | null>(null);
readonly entering = signal(false);
```

Add the effect inside `constructor()`, before `this.destroyRef.onDestroy(...)`:

```typescript
constructor() {
  effect(() => {
    this.slug(); // re-run on every slug change
    this.entering.set(false);
    requestAnimationFrame(() => this.entering.set(true));
  });

  this.destroyRef.onDestroy(() => {
    // ... existing cleanup
  });
}
```

- [ ] **Step 4: Run the tests to confirm they pass**

```bash
bun test --reporter=verbose 2>&1 | grep -A5 "ProjectDetailPage"
```

Expected: both tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/features/projects/pages/project-detail-page/project-detail-page.ts \
        src/app/features/projects/pages/project-detail-page/project-detail-page.spec.ts
git commit -m "feat: add entering signal to project detail page for hero entrance animation"
```

---

## Task 4: Wire entrance animation in template and styles

**Files:**

- Modify: `src/app/features/projects/pages/project-detail-page/project-detail-page.html`
- Modify: `src/app/features/projects/pages/project-detail-page/project-detail-page.scss`

- [ ] **Step 1: Remove `scrollReveal` from the 4 hero elements in the template**

In `project-detail-page.html`, find and update these 4 elements (they are all within `.cs-hero-left` and `.cs-hero-visual`):

```html
<!-- BEFORE -->
<h1 class="cs-title" scrollReveal="fade-up">{{ p.title }}</h1>

<p class="cs-subtitle" scrollReveal="fade-up" [scrollRevealDelay]="80">
  {{ lang.t(p.description.en, p.description.fr) }}
</p>

<div class="cs-cta-row" scrollReveal="fade-up" [scrollRevealDelay]="160">
  <div class="cs-hero-visual" #visualRef scrollReveal="fade-up" [scrollRevealDelay]="240"></div>
</div>
```

```html
<!-- AFTER -->
<h1 class="cs-title">{{ p.title }}</h1>

<p class="cs-subtitle">{{ lang.t(p.description.en, p.description.fr) }}</p>

<div class="cs-cta-row">
  <div class="cs-hero-visual" #visualRef></div>
</div>
```

- [ ] **Step 2: Add `[class.cs-entering]` binding to `.cs-hero`**

Find the `.cs-hero` opening tag (line 3 in the template):

```html
<div class="cs-hero" #heroRef></div>
```

Replace with:

```html
<div class="cs-hero" #heroRef [class.cs-entering]="entering()"></div>
```

- [ ] **Step 3: Add keyframe and stagger styles to project-detail-page.scss**

Add at the end of `project-detail-page.scss`:

```scss
// ── Hero entrance animation ───────────────────────────────────────────────────

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

// Hide hero elements before entrance class is applied — prevents 1-frame flash
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

- [ ] **Step 4: Run lint**

```bash
bun run lint
```

Expected: no errors. If `ScrollRevealDirective` is flagged as unused (it's still used in the sidebar and content sections below the hero, so it should not be), do not remove it.

- [ ] **Step 5: Run the full test suite**

```bash
bun test
```

Expected: all tests pass, including the ones written in Task 3.

- [ ] **Step 6: Start the dev server and verify visually**

```bash
bun start
```

Open `http://localhost:4200`. Check:

- Home page section headers (Projects, Experience, Education) use Space Grotesk, not Instrument Serif italic
- Detail page content section titles (e.g. "The Problem") use Space Grotesk
- Detail page hero title still uses Instrument Serif italic (`.cs-title` is untouched)
- Contact section CTA still uses Instrument Serif italic
- Navigate to any project detail page: title, subtitle, CTA, and visual panel fade up in sequence on arrival
- Navigate between two projects via the pager at the bottom: the animation replays on the new page
- Hero terminal: the "try typing a command" hint appears without shifting the terminal body down

- [ ] **Step 7: Commit**

```bash
git add src/app/features/projects/pages/project-detail-page/project-detail-page.html \
        src/app/features/projects/pages/project-detail-page/project-detail-page.scss
git commit -m "feat: replace scroll-reveal on detail hero with coordinated entrance animation"
```
