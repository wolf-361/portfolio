# Contact Single-Column Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse the desktop two-column contact layout into a single left-aligned vertical column.

**Architecture:** CSS-only change — remove the row media query from `.contact-split`, flip `.contact-email-block` alignment, bump inner gap. No HTML changes.

**Tech Stack:** Angular 21, SCSS with `styles/spacing` and `styles/sys` tokens.

---

### Task 1: Update `home-page.scss` — single-column contact layout

**Files:**

- Modify: `src/app/features/home/pages/home-page/home-page.scss`

Current state of the three rules being changed:

```scss
// lines ~399-410
.contact-split {
  display: flex;
  flex-direction: column;
  gap: sp.$xl;
  margin-bottom: sp.$xl;

  @media (min-width: 720px) {
    // ← remove this entire block
    flex-direction: row;
    align-items: flex-end;
    gap: sp.$xl-2;
  }
}

// lines ~423-432
.contact-email-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end; // ← change to flex-start
  gap: sp.$xs; // ← change to sp.$sm

  @media (max-width: 720px) {
    align-items: center; // ← keep
  }
}
```

- [ ] **Step 1: Remove the row media query from `.contact-split`**

In `src/app/features/home/pages/home-page/home-page.scss`, replace:

```scss
.contact-split {
  display: flex;
  flex-direction: column;
  gap: sp.$xl;
  margin-bottom: sp.$xl;

  @media (min-width: 720px) {
    flex-direction: row;
    align-items: flex-end;
    gap: sp.$xl-2;
  }
}
```

with:

```scss
.contact-split {
  display: flex;
  flex-direction: column;
  gap: sp.$xl;
  margin-bottom: sp.$xl;
}
```

- [ ] **Step 2: Update `.contact-email-block` alignment and gap**

Replace:

```scss
.contact-email-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: sp.$xs;

  @media (max-width: 720px) {
    align-items: center;
  }
}
```

with:

```scss
.contact-email-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: sp.$sm;

  @media (max-width: 720px) {
    align-items: center;
  }
}
```

- [ ] **Step 3: Verify the dev server compiles without errors**

The dev server should already be running on `http://localhost:4200`. Check the terminal — no SCSS compilation errors expected.

- [ ] **Step 4: Screenshot contact section at desktop 1440px and mobile 375px (both locales)**

```js
// run via: node /tmp/contact-verify.js
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();

  async function shot(page, file) {
    await page.waitForSelector('#contact', { timeout: 10000 });
    await page.evaluate(() =>
      document.querySelector('#contact').scrollIntoView({ behavior: 'instant', block: 'center' }),
    );
    await page.waitForTimeout(700);
    await page.locator('#contact').screenshot({ path: file });
  }

  const p1 = await browser.newPage();
  await p1.setViewportSize({ width: 1440, height: 900 });
  await p1.goto('http://localhost:4200', { waitUntil: 'networkidle' });
  await shot(p1, '/tmp/contact-col-desktop-en.png');
  await p1.close();

  const p2 = await browser.newPage();
  await p2.setViewportSize({ width: 1440, height: 900 });
  await p2.goto('http://localhost:4200', { waitUntil: 'networkidle' });
  await p2.locator('button').filter({ hasText: /^FR$/ }).first().click();
  await p2.waitForTimeout(300);
  await shot(p2, '/tmp/contact-col-desktop-fr.png');
  await p2.close();

  const p3 = await browser.newPage();
  await p3.setViewportSize({ width: 375, height: 812 });
  await p3.goto('http://localhost:4200', { waitUntil: 'networkidle' });
  await shot(p3, '/tmp/contact-col-mobile-en.png');
  await p3.close();

  const p4 = await browser.newPage();
  await p4.setViewportSize({ width: 375, height: 812 });
  await p4.goto('http://localhost:4200', { waitUntil: 'networkidle' });
  await p4.locator('button').filter({ hasText: /^FR$/ }).first().click();
  await p4.waitForTimeout(300);
  await shot(p4, '/tmp/contact-col-mobile-fr.png');
  await p4.close();

  await browser.close();
  console.log('done');
})();
```

Expected: desktop EN and FR show a single left-aligned column; mobile EN and FR remain centered.

- [ ] **Step 5: Commit**

```bash
git add src/app/features/home/pages/home-page/home-page.scss
git commit -m "fix(contact): collapse two-column layout to single left-aligned column"
```
