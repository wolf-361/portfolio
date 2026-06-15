# Boot Animation & Detail Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a once-per-session terminal boot overlay and redesign the project detail page to match the cinematic feel of the homepage.

**Architecture:** 7 tasks in two independent tracks (A: boot overlay, B: detail page). Track A wires a `BootService` + `BootOverlayComponent` into `AppComponent`. Track B extracts `ui-phone-mockup`, extends the data model, and rebuilds the detail page hero + content. They share `ScrollRevealDirective` and the `--font-display` / `--font-mono` CSS variables already in `:root`.

**Tech Stack:** Angular 21, signals, `sessionStorage`, `setInterval`, `IntersectionObserver`, `NgZone`, `@use 'styles/sys'`, `@use 'styles/spacing'`, `@use 'styles/tokens'`.

---

## File Map

| Action | Path                                                                           | Responsibility                      |
| ------ | ------------------------------------------------------------------------------ | ----------------------------------- |
| Create | `src/app/core/boot-overlay/boot.service.ts`                                    | Session gate + `isFirstLoad` signal |
| Create | `src/app/core/boot-overlay/boot.service.spec.ts`                               | Service unit tests                  |
| Create | `src/app/core/boot-overlay/boot-overlay.ts`                                    | Typing animation component          |
| Create | `src/app/core/boot-overlay/boot-overlay.html`                                  | Overlay template                    |
| Create | `src/app/core/boot-overlay/boot-overlay.scss`                                  | Overlay styles                      |
| Modify | `src/app/app.ts`                                                               | Render overlay on first load        |
| Modify | `src/app/features/home/components/hero/terminal/terminal.ts`                   | Use `BootService.isFirstLoad`       |
| Create | `src/app/shared/components/phone-mockup/phone-mockup.ts`                       | Extracted phone frame component     |
| Create | `src/app/shared/components/phone-mockup/phone-mockup.html`                     | Phone frame template                |
| Create | `src/app/shared/components/phone-mockup/phone-mockup.scss`                     | Phone frame styles                  |
| Modify | `src/app/features/home/components/project-card/project-card.ts`                | Import `PhoneMockupComponent`       |
| Modify | `src/app/features/home/components/project-card/project-card.html`              | Use `<ui-phone-mockup />`           |
| Modify | `src/app/features/home/components/project-card/project-card.scss`              | Remove moved phone styles           |
| Modify | `src/app/features/projects/models/project-detail.ts`                           | Add `HeroVisual` type               |
| Modify | `src/app/features/projects/services/projects.ts`                               | Add `heroVisual` to each project    |
| Modify | `src/app/features/projects/pages/project-detail-page/project-detail-page.ts`   | Parallax, imports                   |
| Modify | `src/app/features/projects/pages/project-detail-page/project-detail-page.html` | Split hero + content                |
| Modify | `src/app/features/projects/pages/project-detail-page/project-detail-page.scss` | New styles                          |
| Modify | `src/app/shared/components/stat-card/stat-card.scss`                           | Count-up entrance animation         |

---

## Task 1: BootService

**Files:**

- Create: `src/app/core/boot-overlay/boot.service.ts`
- Create: `src/app/core/boot-overlay/boot.service.spec.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// src/app/core/boot-overlay/boot.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { BootService } from './boot.service';

describe('BootService', () => {
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('shows overlay on first load', () => {
    const svc = TestBed.inject(BootService);
    expect(svc.showOverlay()).toBe(true);
    expect(svc.isFirstLoad()).toBe(true);
  });

  it('markSeen sets showOverlay to false and persists to sessionStorage', () => {
    const svc = TestBed.inject(BootService);
    svc.markSeen();
    expect(svc.showOverlay()).toBe(false);
    expect(sessionStorage.getItem('boot-seen')).toBe('1');
  });

  it('does not show overlay if already seen this session', () => {
    sessionStorage.setItem('boot-seen', '1');
    const svc = TestBed.inject(BootService);
    expect(svc.showOverlay()).toBe(false);
    expect(svc.isFirstLoad()).toBe(false);
  });

  it('isFirstLoad never changes after construction', () => {
    const svc = TestBed.inject(BootService);
    expect(svc.isFirstLoad()).toBe(true);
    svc.markSeen();
    expect(svc.isFirstLoad()).toBe(true); // snapshot — does not change
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
bun test --testPathPattern=boot.service
```

Expected: FAIL — `BootService` not found.

- [ ] **Step 3: Implement BootService**

```typescript
// src/app/core/boot-overlay/boot.service.ts
import { Injectable, signal } from '@angular/core';

const SESSION_KEY = 'boot-seen';

@Injectable({ providedIn: 'root' })
export class BootService {
  private readonly _seen = !!sessionStorage.getItem(SESSION_KEY);

  readonly showOverlay = signal(!this._seen);
  readonly isFirstLoad = signal(!this._seen);

  markSeen(): void {
    sessionStorage.setItem(SESSION_KEY, '1');
    this.showOverlay.set(false);
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
bun test --testPathPattern=boot.service
```

Expected: PASS — 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/app/core/boot-overlay/boot.service.ts src/app/core/boot-overlay/boot.service.spec.ts
git commit -m "feat: add BootService with sessionStorage session gate"
```

---

## Task 2: BootOverlayComponent

**Files:**

- Create: `src/app/core/boot-overlay/boot-overlay.ts`
- Create: `src/app/core/boot-overlay/boot-overlay.html`
- Create: `src/app/core/boot-overlay/boot-overlay.scss`

- [ ] **Step 1: Create the component**

```typescript
// src/app/core/boot-overlay/boot-overlay.ts
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { BootService } from './boot.service';

const LINES = ['initializing luc.allaire...', 'loading portfolio.ts', 'ready.'];

@Component({
  selector: 'app-boot-overlay',
  templateUrl: './boot-overlay.html',
  styleUrl: './boot-overlay.scss',
})
export class BootOverlayComponent implements OnInit, OnDestroy {
  private readonly bootService = inject(BootService);
  private interval: ReturnType<typeof setInterval> | null = null;
  private lineIdx = 0;
  private charIdx = 0;

  readonly completedLines = signal<string[]>([]);
  readonly currentText = signal('');
  readonly isDone = signal(false);
  readonly fading = signal(false);

  ngOnInit(): void {
    this.interval = setInterval(() => this.tick(), 30);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  private tick(): void {
    if (this.lineIdx >= LINES.length) return;

    const line = LINES[this.lineIdx];

    if (this.charIdx <= line.length) {
      this.currentText.set(line.slice(0, this.charIdx));
      this.charIdx++;
    } else {
      this.completedLines.update((l) => [...l, line]);
      this.currentText.set('');
      this.lineIdx++;
      this.charIdx = 0;

      if (this.lineIdx >= LINES.length) {
        clearInterval(this.interval!);
        this.interval = null;
        this.isDone.set(true);
        setTimeout(() => {
          this.fading.set(true);
          setTimeout(() => this.bootService.markSeen(), 400);
        }, 300);
      }
    }
  }
}
```

- [ ] **Step 2: Create the template**

```html
<!-- src/app/core/boot-overlay/boot-overlay.html -->
<div class="boot-overlay" [class.boot-overlay--fading]="fading()" aria-hidden="true">
  @for (line of completedLines(); track $index) {
  <p class="boot-line">
    <span class="boot-prefix">~</span>
    <span class="boot-text">{{ line }}</span>
    @if ($index === 1) {
    <span class="boot-check"> ✓</span>
    } @if ($last && isDone()) {
    <span class="boot-cursor boot-cursor--blink">▌</span>
    }
  </p>
  } @if (!isDone()) {
  <p class="boot-line">
    <span class="boot-prefix">~</span>
    <span class="boot-text">{{ currentText() }}</span>
    <span class="boot-cursor">▌</span>
  </p>
  }
</div>
```

- [ ] **Step 3: Create the styles**

```scss
// src/app/core/boot-overlay/boot-overlay.scss
@use 'styles/sys' as sys;
@use 'styles/spacing' as sp;

.boot-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--mat-sys-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: sp.$xl-2;
  opacity: 1;
  transition: opacity 400ms ease;

  &.boot-overlay--fading {
    opacity: 0;
    pointer-events: none;
  }
}

.boot-line {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  line-height: 2.2;
  color: color-mix(in srgb, sys.$on-surface 85%, transparent);
}

.boot-prefix {
  color: sys.$primary;
  user-select: none;
}

.boot-check {
  color: sys.$primary;
}

.boot-cursor {
  color: sys.$on-surface;
  opacity: 0.8;

  &.boot-cursor--blink {
    animation: boot-cursor-blink 1.1s step-end infinite;
  }
}

@keyframes boot-cursor-blink {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0;
  }
}
```

- [ ] **Step 4: Build to verify no errors**

```bash
bun run build 2>&1 | tail -5
```

Expected: `Application bundle generation complete.`

- [ ] **Step 5: Commit**

```bash
git add src/app/core/boot-overlay/boot-overlay.ts src/app/core/boot-overlay/boot-overlay.html src/app/core/boot-overlay/boot-overlay.scss
git commit -m "feat: add BootOverlayComponent with terminal typing animation"
```

---

## Task 3: Wire Boot into App + Terminal

**Files:**

- Modify: `src/app/app.ts`
- Modify: `src/app/features/home/components/hero/terminal/terminal.ts`

- [ ] **Step 1: Update AppComponent**

Replace the entire `src/app/app.ts` with:

```typescript
// src/app/app.ts
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { NavbarComponent } from './core/layout/navbar/navbar';
import { FooterComponent } from './core/layout/footer/footer';
import { BootOverlayComponent } from './core/boot-overlay/boot-overlay';
import { BootService } from './core/boot-overlay/boot.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, BootOverlayComponent],
  template: `
    @if (bootService.showOverlay()) {
      <app-boot-overlay />
    }
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [
    `
      :host {
        display: block;
      }
      main {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly bootService = inject(BootService);

  private readonly scrollMap = new Map<string, number>();
  private currentUrl = '';

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationStart || e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((e) => {
        if (e instanceof NavigationStart) {
          if (this.currentUrl) {
            this.scrollMap.set(this.currentUrl, window.scrollY);
          }
        }

        if (e instanceof NavigationEnd) {
          this.currentUrl = e.urlAfterRedirects;
          const fragment = this.router.parseUrl(e.urlAfterRedirects).fragment;
          const saved = this.scrollMap.get(e.urlAfterRedirects);

          if (saved !== undefined) {
            setTimeout(() => window.scrollTo({ top: saved, behavior: 'instant' }), 0);
          } else if (!fragment) {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        }
      });
  }
}
```

- [ ] **Step 2: Connect terminal to BootService**

In `src/app/features/home/components/hero/terminal/terminal.ts`, make the following targeted changes:

Add import at the top (after existing imports):

```typescript
import { BootService } from '../../../../core/boot-overlay/boot.service';
```

In the class, replace:

```typescript
  private isFirstLoad = true;
```

with:

```typescript
  private isFirstLoad = inject(BootService).isFirstLoad();
```

Remove the `private isFirstLoad = true;` line — it's now initialized from `BootService.isFirstLoad()` which is a snapshot boolean, so the existing `reset()` logic (`const startDelay = this.isFirstLoad ? 800 : 0; this.isFirstLoad = false;`) works exactly as before.

- [ ] **Step 3: Build and smoke-test**

```bash
bun run build 2>&1 | tail -5
```

Expected: `Application bundle generation complete.`

Open the app in a browser (clear sessionStorage first: DevTools → Application → Session Storage → Clear). You should see the boot overlay type 3 lines, then fade out, then the hero appears.

Reload the same tab — boot overlay should NOT appear.

- [ ] **Step 4: Commit**

```bash
git add src/app/app.ts src/app/features/home/components/hero/terminal/terminal.ts
git commit -m "feat: wire boot overlay into app and coordinate with hero terminal"
```

---

## Task 4: Extract PhoneMockupComponent

**Files:**

- Create: `src/app/shared/components/phone-mockup/phone-mockup.ts`
- Create: `src/app/shared/components/phone-mockup/phone-mockup.html`
- Create: `src/app/shared/components/phone-mockup/phone-mockup.scss`
- Modify: `src/app/features/home/components/project-card/project-card.ts`
- Modify: `src/app/features/home/components/project-card/project-card.html`
- Modify: `src/app/features/home/components/project-card/project-card.scss`

- [ ] **Step 1: Create PhoneMockupComponent**

```typescript
// src/app/shared/components/phone-mockup/phone-mockup.ts
import { Component } from '@angular/core';

@Component({
  selector: 'ui-phone-mockup',
  templateUrl: './phone-mockup.html',
  styleUrl: './phone-mockup.scss',
})
export class PhoneMockupComponent {}
```

- [ ] **Step 2: Create the phone template**

Copy the exact phone frame markup from `project-card.html` lines 93–149:

```html
<!-- src/app/shared/components/phone-mockup/phone-mockup.html -->
<div class="phone-frame">
  <div class="phone-island"></div>

  <div class="phone-status-bar">
    <span class="phone-time">9:41</span>
    <div class="phone-status-icons">
      <div class="phone-status-icon"></div>
    </div>
  </div>

  <div class="phone-scroll">
    <div class="app-greeting">
      <span class="app-greeting-sub">Mon, May 4</span>
      <span class="app-greeting-name">Hello, Luc!</span>
    </div>

    <div class="app-semester-card">
      <span class="app-semester-name">Summer 2026</span>
      <span class="app-semester-days">119 days left</span>
    </div>

    <div class="app-section-header">
      <span class="app-section-title">Today's Schedule</span>
      <span class="app-section-action">📅</span>
    </div>
    <div class="app-empty-state">No classes today! Take a break.</div>

    <div class="app-section-header">
      <span class="app-section-title">Up Next</span>
      <span class="app-section-action">See all</span>
    </div>
    <div class="app-task-list">
      <div class="app-task">
        <span class="task-badge">Today</span>
        <span class="task-name">Lab Report: Gravity</span>
        <span class="task-course">PHY101</span>
      </div>
      <div class="app-task">
        <span class="task-badge">Today</span>
        <span class="task-name">Derivatives Problem Set</span>
        <span class="task-course">MAT+101</span>
      </div>
      <div class="app-task">
        <span class="task-badge">Today</span>
        <span class="task-name">Reading Reflection</span>
        <span class="task-course">LIT390</span>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Create phone styles**

Move all `.phone-frame`, `.phone-*`, `.app-*`, `.task-*` rules from `project-card.scss` into a new file. The exact rules to move are lines 246–439 of `project-card.scss` (everything from `.card-phone-bleed` down through `.task-course`).

```scss
// src/app/shared/components/phone-mockup/phone-mockup.scss
@use 'styles/sys' as sys;

:host {
  display: block;
}

.phone-frame {
  width: 178px;
  height: 356px;
  border-radius: 38px;
  background: #1c1c1e;
  border: 1.5px solid rgba(255 255 255 / 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  position: relative;
  box-shadow:
    -20px 8px 72px color-mix(in srgb, sys.$primary 22%, transparent),
    0 24px 48px rgba(0 0 0 / 0.5);
  transform: rotate(8deg) translateY(-4px);
  flex-shrink: 0;
}

.phone-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px 0;
  flex-shrink: 0;
}

.phone-time {
  font-size: 0.5rem;
  font-weight: 700;
  color: rgba(255 255 255 / 0.85);
  letter-spacing: 0.02em;
}

.phone-island {
  width: 52px;
  height: 14px;
  border-radius: 999px;
  background: #000;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.phone-status-icons {
  display: flex;
  align-items: center;
  gap: 3px;
}

.phone-status-icon {
  width: 12px;
  height: 6px;
  border-radius: 1px;
  border: 1px solid rgba(255 255 255 / 0.6);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    right: 3px;
    background: rgba(255 255 255 / 0.6);
    border-radius: 0.5px;
  }
}

.phone-scroll {
  flex: 1;
  overflow: hidden;
  padding: 12px 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.app-greeting {
  flex-shrink: 0;
}

.app-greeting-sub {
  font-size: 0.45rem;
  color: rgba(255 255 255 / 0.5);
  margin-bottom: 2px;
  display: block;
}

.app-greeting-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  display: block;
}

.app-semester-card {
  background: color-mix(in srgb, sys.$primary 25%, #000);
  border-radius: 12px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.app-semester-name {
  font-size: 0.55rem;
  font-weight: 600;
  color: color-mix(in srgb, sys.$primary 70%, #fff);
}

.app-semester-days {
  font-size: 0.45rem;
  color: color-mix(in srgb, sys.$primary 50%, transparent);
  font-family: sys.$font-mono;
}

.app-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.app-section-title {
  font-size: 0.5rem;
  font-weight: 600;
  color: rgba(255 255 255 / 0.7);
}

.app-section-action {
  font-size: 0.42rem;
  color: sys.$primary;
}

.app-empty-state {
  background: #2c2c2e;
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 0.45rem;
  color: rgba(255 255 255 / 0.4);
  flex-shrink: 0;
}

.app-task-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow: hidden;
}

.app-task {
  background: #2c2c2e;
  border-radius: 10px;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
}

.task-badge {
  font-size: 0.38rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: color-mix(in srgb, sys.$primary 70%, #fff);
  margin-bottom: 1px;
}

.task-name {
  font-size: 0.52rem;
  font-weight: 600;
  color: rgba(255 255 255 / 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-course {
  font-size: 0.42rem;
  color: rgba(255 255 255 / 0.4);
  font-family: sys.$font-mono;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

- [ ] **Step 4: Update project-card.ts imports**

In `src/app/features/home/components/project-card/project-card.ts`, add `PhoneMockupComponent` to imports:

```typescript
import { PhoneMockupComponent } from '../../../../shared/components/phone-mockup/phone-mockup';
// ... existing imports ...

@Component({
  // ...
  imports: [RouterLink, TagChipSetComponent, PhoneMockupComponent],
  // ...
})
```

- [ ] **Step 5: Update project-card.html**

Replace the `@else { <!-- CSS iOS-style app mockup --> ... }` block (lines 92–149) with:

```html
} @else {
<ui-phone-mockup />
}
```

The full updated `@if (project().visual)` block becomes:

```html
@if (project().visual) {
<img
  [src]="'/assets/projects/' + project().visual!.src"
  [alt]="lang.t(project().visual!.alt.en, project().visual!.alt.fr)"
  class="phone-img"
  loading="lazy"
  width="220"
  height="440"
/>
} @else {
<ui-phone-mockup />
}
```

- [ ] **Step 6: Clean up project-card.scss**

Delete lines 246–439 from `project-card.scss` — everything from `.card-phone-bleed` through `.task-course`. Keep `.card-phone-bleed` itself since it's the positioning wrapper:

The rules to **keep** in `project-card.scss`:

```scss
.card-phone-bleed {
  position: absolute;
  right: -24px;
  top: -12%;
  width: 220px;
  height: 124%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.phone-img {
  height: 100%;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(-12px 0 48px color-mix(in srgb, sys.$primary 20%, transparent));
  border-radius: 36px;
  transform: rotate(4deg);
}
```

Delete everything from `.phone-frame {` through `.task-course {` (the rest of the phone/app rules).

- [ ] **Step 7: Build and verify visually**

```bash
bun run build 2>&1 | tail -5
```

Expected: `Application bundle generation complete.`

Open the home page — the featured Planific card should still show the phone mockup identically to before.

- [ ] **Step 8: Commit**

```bash
git add src/app/shared/components/phone-mockup/ \
        src/app/features/home/components/project-card/project-card.ts \
        src/app/features/home/components/project-card/project-card.html \
        src/app/features/home/components/project-card/project-card.scss
git commit -m "refactor: extract phone mockup into shared ui-phone-mockup component"
```

---

## Task 5: Data Model + Project HeroVisual Data

**Files:**

- Modify: `src/app/features/projects/models/project-detail.ts`
- Modify: `src/app/features/projects/services/projects.ts`

- [ ] **Step 1: Extend the model**

In `src/app/features/projects/models/project-detail.ts`, add before the `ProjectDetail` interface:

```typescript
export type HeroVisualType = 'phone' | 'terminal' | 'none';

export interface HeroVisual {
  type: HeroVisualType;
  terminalCommand?: string;
  terminalLines?: string[];
}
```

Add the field to `ProjectDetail`:

```typescript
export interface ProjectDetail extends Omit<Project, 'slug'> {
  slug: string;
  heroVisual?: HeroVisual; // ← add this line
  meta?: ProjectMeta;
  sections: ProjectSection[];
  pager?: ProjectPager;
}
```

- [ ] **Step 2: Add heroVisual to each project in projects.ts**

For `planific` (mobile app → phone):

```typescript
planific: {
  slug: 'planific',
  heroVisual: { type: 'phone' },
  // ... rest unchanged
```

For `waystone` (Android app → phone):

```typescript
waystone: {
  slug: 'waystone',
  heroVisual: { type: 'phone' },
  // ... rest unchanged
```

For `home-ops` (infra → terminal):

```typescript
'home-ops': {
  slug: 'home-ops',
  heroVisual: {
    type: 'terminal',
    terminalCommand: 'ansible-playbook site.yml',
    terminalLines: [
      'PLAY [all] *****************************',
      '',
      'TASK [common : apply hardening] ********',
      'ok: [firenze]  ok: [siena]  ok: [roma]',
      '',
      'TASK [netbird : configure mesh VPN] ****',
      'ok: [firenze]  ok: [siena]  ok: [roma]',
      '',
      'PLAY RECAP *****************************',
      'firenze  : ok=18  changed=0  failed=0',
      'siena    : ok=16  changed=0  failed=0',
      'roma     : ok=16  changed=0  failed=0',
    ],
  },
  // ... rest unchanged
```

For `mesh-companion` (Go tool → terminal):

```typescript
'mesh-companion': {
  slug: 'mesh-companion',
  heroVisual: {
    type: 'terminal',
    terminalCommand: './mesh-companion --watch',
    terminalLines: [
      'INFO  watching Traefik API for route changes',
      'INFO  new route detected: portfolio.wolf-361.ca',
      'INFO  registered DNS record  → 100.64.0.1',
      'INFO  registered monitor    → uptime-kuma',
      'INFO  route removed: old-service.wolf-361.ca',
      'INFO  cleaned up DNS + monitor entries',
    ],
  },
  // ... rest unchanged
```

For `templates` (OSS library → none, title expands full-width):

```typescript
templates: {
  slug: 'templates',
  heroVisual: { type: 'none' },
  // ... rest unchanged
```

- [ ] **Step 3: Build to verify types**

```bash
bun run build 2>&1 | tail -5
```

Expected: `Application bundle generation complete.` — no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/features/projects/models/project-detail.ts \
        src/app/features/projects/services/projects.ts
git commit -m "feat: add HeroVisual type to ProjectDetail and assign per-project"
```

---

## Task 6: Detail Page Hero Split

**Files:**

- Modify: `src/app/features/projects/pages/project-detail-page/project-detail-page.ts`
- Modify: `src/app/features/projects/pages/project-detail-page/project-detail-page.html`
- Modify: `src/app/features/projects/pages/project-detail-page/project-detail-page.scss`

- [ ] **Step 1: Update the component**

Replace the full `src/app/features/projects/pages/project-detail-page/project-detail-page.ts` with:

```typescript
import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  input,
  NgZone,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LangService } from '../../../../core/lang/lang';
import { ProjectsService } from '../../services/projects';
import { TagChipSetComponent } from '../../../../shared/components/tag-chip-set/tag-chip-set';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card';
import { ScrollSpyDirective } from '../../../../shared/directives/scroll-spy/scroll-spy';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal/scroll-reveal';
import { PhoneMockupComponent } from '../../../../shared/components/phone-mockup/phone-mockup';

@Component({
  selector: 'app-project-detail-page',
  imports: [
    RouterLink,
    UpperCasePipe,
    TagChipSetComponent,
    StatCardComponent,
    ScrollSpyDirective,
    ScrollRevealDirective,
    PhoneMockupComponent,
  ],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.scss',
})
export class ProjectDetailPageComponent implements AfterViewInit, OnDestroy {
  private readonly projects = inject(ProjectsService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  readonly lang = inject(LangService);
  readonly slug = input.required<string>();

  readonly project = computed(() => this.projects.getDetail(this.slug()));
  readonly sectionIds = computed(() => this.project()?.sections.map((s) => s.id) ?? []);

  readonly activeSection = signal<string>('');
  readonly zoomedDiagram = signal<string | null>(null);

  readonly heroRef = viewChild<ElementRef<HTMLElement>>('heroRef');
  readonly visualRef = viewChild<ElementRef<HTMLElement>>('visualRef');

  private heroVisible = false;
  private heroObserver?: IntersectionObserver;
  private readonly onScroll = (): void => {
    if (!this.heroVisible) return;
    const el = this.visualRef()?.nativeElement;
    if (el) el.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  };

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.zoomedDiagram()) document.body.style.overflow = '';
      this.heroObserver?.disconnect();
      window.removeEventListener('scroll', this.onScroll);
    });
  }

  ngAfterViewInit(): void {
    this.setupParallax();
  }

  ngOnDestroy(): void {
    // handled by destroyRef
  }

  private setupParallax(): void {
    const heroEl = this.heroRef()?.nativeElement;
    if (!heroEl || !this.visualRef()?.nativeElement) return;

    this.heroObserver = new IntersectionObserver(([entry]) => {
      this.heroVisible = entry.isIntersecting;
    });
    this.heroObserver.observe(heroEl);

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  onActiveSection(id: string): void {
    this.activeSection.set(id);
  }

  openDiagram(svg: string): void {
    this.zoomedDiagram.set(svg);
    document.body.style.overflow = 'hidden';
  }

  closeDiagram(): void {
    this.zoomedDiagram.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.zoomedDiagram()) this.closeDiagram();
  }

  bodyParagraphs(text: string): SafeHtml[] {
    return text.split('\n\n').map((p) => this.sanitizer.bypassSecurityTrustHtml(p));
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 112;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
```

- [ ] **Step 2: Replace the hero in the template**

In `project-detail-page.html`, replace the entire `<div class="cs-hero">` block (lines 2–42) with:

```html
<!-- ── Hero ──────────────────────────────────────────────────────────────── -->
<div class="cs-hero" #heroRef>
  <div class="cs-container">
    <!-- Breadcrumb -->
    <div class="cs-nav mono">
      <a class="back-link" routerLink="/" fragment="projects">
        <span class="back-arr">←</span>
      </a>
      <span class="crumb-sep">/</span>
      <a class="crumb" routerLink="/" fragment="projects">{{ lang.t('projects', 'projets') }}</a>
      <span class="crumb-sep">/</span>
      <span class="crumb crumb-active">{{ p.title }}</span>
    </div>

    <!-- Split layout -->
    <div
      class="cs-hero-split"
      [class.cs-hero-split--full]="!p.heroVisual || p.heroVisual.type === 'none'"
    >
      <!-- Left: title + meta -->
      <div class="cs-hero-left">
        <h1 class="cs-title" scrollReveal="fade-up">{{ p.title }}</h1>
        @if (p.description) {
        <p class="cs-subtitle" scrollReveal="fade-up" [scrollRevealDelay]="80">
          {{ lang.t(p.description.en, p.description.fr) }}
        </p>
        }
        <div class="cs-cta-row" scrollReveal="fade-up" [scrollRevealDelay]="160">
          @if (p.links?.length) { @for (link of p.links!; track link.label) {
          <a
            class="cs-btn"
            [class.cs-btn--primary]="$first"
            [href]="link.url"
            target="_blank"
            rel="noopener"
          >
            {{ link.label }} <span class="btn-arr">↗</span>
          </a>
          } } @if (p.status) {
          <span class="cs-status-badge mono">{{ lang.t(p.status!.en, p.status!.fr) }}</span>
          }
        </div>
      </div>

      <!-- Right: visual panel -->
      @if (p.heroVisual && p.heroVisual.type !== 'none') {
      <div class="cs-hero-visual" #visualRef scrollReveal="fade-up" [scrollRevealDelay]="240">
        @if (p.heroVisual.type === 'phone') {
        <ui-phone-mockup />
        } @else if (p.heroVisual.type === 'terminal') {
        <div class="cs-hero-terminal">
          <div class="cs-hero-terminal-bar">
            <span class="cs-ht-dot cs-ht-dot--r"></span>
            <span class="cs-ht-dot cs-ht-dot--y"></span>
            <span class="cs-ht-dot cs-ht-dot--g"></span>
          </div>
          <div class="cs-hero-terminal-body">
            <p class="cs-ht-prompt">
              <span class="cs-ht-dollar mono">$</span>
              <span class="mono"> {{ p.heroVisual.terminalCommand }}</span>
            </p>
            @for (line of p.heroVisual.terminalLines ?? []; track $index) {
            <p class="cs-ht-line mono">{{ line }}</p>
            }
          </div>
        </div>
        }
      </div>
      }
    </div>
  </div>
</div>
```

- [ ] **Step 3: Add hero split styles to project-detail-page.scss**

Replace the existing `.cs-hero` and `.cs-title` blocks with:

```scss
// ── Hero ───────────────────────────────────────────────────────────────────────

.cs-hero {
  padding: sp.$xl-2 0 sp.$xl;
  border-bottom: 1px solid sys.$outline-variant;
}

.cs-hero-split {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: sp.$xl-2;
  align-items: center;
  padding-top: sp.$lg;

  &.cs-hero-split--full {
    grid-template-columns: 1fr;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: sp.$xl;
  }
}

.cs-hero-left {
  display: flex;
  flex-direction: column;
  gap: sp.$md;
}

.cs-hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: transform;
}

.cs-title {
  margin: 0;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  letter-spacing: -0.025em;
  line-height: 1.05;
  color: sys.$on-surface;
  max-width: 18ch;
}

.cs-subtitle {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: sys.$on-surface-variant;
  max-width: 60ch;
}

// ── Static hero terminal ───────────────────────────────────────────────────────

.cs-hero-terminal {
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  max-width: 380px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 20px 40px -4px rgba(0, 0, 0, 0.3);
}

.cs-hero-terminal-bar {
  background: t.$macos-titlebar;
  padding: 0.625rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.cs-ht-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;

  &--r {
    background: t.$macos-dot-red;
  }
  &--y {
    background: t.$macos-dot-yellow;
  }
  &--g {
    background: t.$macos-dot-green;
  }
}

.cs-hero-terminal-body {
  background: #0d1117;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cs-ht-prompt {
  margin: 0 0 0.5rem;
  font-size: 0.8125rem;
  color: #7dd3fc;
}

.cs-ht-dollar {
  color: #a78bfa;
}

.cs-ht-line {
  margin: 0;
  font-size: 0.6875rem;
  color: #cdd6f4;
  opacity: 0.65;
  line-height: 1.6;
  white-space: pre;
}
```

- [ ] **Step 4: Build and verify**

```bash
bun run build 2>&1 | tail -5
```

Expected: `Application bundle generation complete.`

Navigate to a project detail page (e.g. `/projects/planific`). You should see: large italic title on the left, phone mockup on the right. Navigate to `/projects/home-ops` — terminal block should appear on the right. Navigate to `/projects/templates` — full-width title, no right panel.

- [ ] **Step 5: Commit**

```bash
git add src/app/features/projects/pages/project-detail-page/
git commit -m "feat: add split hero layout to project detail page with parallax visual panel"
```

---

## Task 7: Detail Page Content Polish

**Files:**

- Modify: `src/app/features/projects/pages/project-detail-page/project-detail-page.html`
- Modify: `src/app/features/projects/pages/project-detail-page/project-detail-page.scss`
- Modify: `src/app/shared/components/stat-card/stat-card.scss`

- [ ] **Step 1: Update the content sections in the template**

In `project-detail-page.html`, replace the sidebar `<aside>` and `<main>` content area. Find:

```html
<!-- Sidebar -->
<aside class="cs-sidebar"></aside>
```

Change to:

```html
<!-- Sidebar -->
<aside class="cs-sidebar" scrollReveal="from-left"></aside>
```

Find the `<nav class="toc"` element and add a delay:

```html
<nav
  class="toc"
  scrollReveal="from-left"
  [scrollRevealDelay]="120"
  aria-label="Table of contents"
></nav>
```

Remove the `[uiScrollSpy]` wrapper's `uiFadeIn` from the articles. Find and replace all `<article class="cs-section" [id]="section.id" uiFadeIn>` with:

```html
<article
  class="cs-section"
  [id]="section.id"
  scrollReveal="fade-up"
  [scrollRevealDelay]="$index * 120"
></article>
```

Add dividers between sections. The `@for` loop currently is:

```html
@for (section of p.sections; track section.id) {
<article ...>...</article>
}
```

Change to:

```html
@for (section of p.sections; track section.id) { @if (!$first) {
<div class="cs-divider" aria-hidden="true"></div>
}
<article
  class="cs-section"
  [id]="section.id"
  scrollReveal="fade-up"
  [scrollRevealDelay]="$index * 120"
>
  ...
</article>
}
```

Add `scrollReveal` to each stat card with stagger. Find:

```html
<ui-stat-card [stat]="stat" />
```

Change to:

```html
<ui-stat-card [stat]="stat" scrollReveal="fade-up" [scrollRevealDelay]="$index * 80" />
```

- [ ] **Step 2: Remove FadeInDirective import from the component**

In `project-detail-page.ts`, remove:

```typescript
import { FadeInDirective } from '../../../../shared/directives/fade-in/fade-in';
```

And remove `FadeInDirective` from the `imports` array in `@Component`.

- [ ] **Step 3: Add content polish styles to project-detail-page.scss**

Update `.sec-title` to use Instrument Serif italic:

```scss
.sec-title {
  margin: 0;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: -0.025em;
  color: sys.$on-background;
  max-width: 22ch;
  line-height: 1.1;
}
```

Add the section divider:

```scss
.cs-divider {
  height: 1px;
  background: sys.$outline-variant;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -2px;
    width: 4px;
    height: 4px;
    background: sys.$primary;
    border-radius: 1px;
  }
}
```

Fix the blockquote — remove the mask, add a glow:

```scss
.sec-highlight {
  margin: 0;
  padding: sp.$lg sp.$xl;
  border-left: 2px solid sys.$primary;
  background: color-mix(in srgb, sys.$primary 8%, sys.$surface-container-low);
  box-shadow: inset 4px 0 24px -8px color-mix(in srgb, sys.$primary 20%, transparent);
  border-radius: 0 sys.$corner-small sys.$corner-small 0;
  display: flex;
  flex-direction: column;
  gap: sp.$xs;
  max-width: 58ch;
}
```

(Delete the `-webkit-mask-image` and `mask-image` lines from the old `.sec-highlight` block.)

- [ ] **Step 4: Add stat card entrance animation**

In `src/app/shared/components/stat-card/stat-card.scss`, add at the bottom:

```scss
// Entrance animation triggered by ScrollRevealDirective adding .is-revealed to host
:host.is-revealed .stat-value {
  animation: stat-entrance 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes stat-entrance {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 5: Build and verify**

```bash
bun run build 2>&1 | tail -5
```

Expected: `Application bundle generation complete.`

Navigate to a project detail page and scroll through. Sections should fade up as they enter view. Stats should have a snappy entrance animation. The blockquote should not have cut-off text. Section dividers appear between sections.

- [ ] **Step 6: Final lint + test run**

```bash
bun run lint && bun test
```

Expected: no lint errors, all tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/app/features/projects/pages/project-detail-page/ \
        src/app/shared/components/stat-card/stat-card.scss
git commit -m "feat: redesign detail page content with scroll-reveal, editorial titles, and stat animation"
```
