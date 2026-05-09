import { test } from '@playwright/test';

test('record demo', async ({ page }) => {
  // Force dark mode before load
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');

  // Wait for terminal animation to finish
  await page.waitForTimeout(4000);

  // Slow scroll through hero
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
  await page.waitForTimeout(1500);

  // Scroll to experiences
  await page.evaluate(() => {
    document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(2500);

  // Scroll to projects
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(2500);

  // Click Planific case study
  await page.click('text=Planific');
  await page.waitForTimeout(1500);

  // Scroll through case study
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
  await page.waitForTimeout(1500);

  // Navigate back
  await page.goBack();
  await page.waitForTimeout(1000);
});
