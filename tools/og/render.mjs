#!/usr/bin/env node
/**
 * Renders the social card(s) defined in config.json to PNG.
 *
 *   bun run og            regenerate every variant into public/
 *   node tools/og/render.mjs --out some/dir
 *
 * The card itself lives in template.html and reads its content from
 * window.__OG_DATA__, so you can open that file directly in a browser to
 * iterate on the design with the fallback dataset.
 */
import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..', '..');

const args = process.argv.slice(2);
const outFlag = args.indexOf('--out');
const OUT_DIR =
  outFlag !== -1 && args[outFlag + 1]
    ? resolve(process.cwd(), args[outFlag + 1])
    : join(ROOT, 'public');

const config = JSON.parse(await readFile(join(HERE, 'config.json'), 'utf8'));
const templateUrl = pathToFileURL(join(HERE, 'template.html')).href;

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();

try {
  for (const variant of config.variants) {
    const { name, width, height, scale = 1 } = variant;

    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: scale,
    });

    await page.addInitScript(
      (data) => {
        window.__OG_DATA__ = data;
      },
      { brand: config.brand, content: config.content },
    );

    await page.goto(templateUrl, { waitUntil: 'load' });
    await page.waitForFunction(() => window.__OG_READY__ === true);
    await page.evaluate(() => document.fonts.ready);

    const card = page.locator('#card');
    await card.evaluate(
      (el, size) => {
        el.style.width = size.width + 'px';
        el.style.height = size.height + 'px';
      },
      { width, height },
    );

    const file = join(OUT_DIR, `${name}.png`);
    await card.screenshot({ path: file });
    console.log(`  ${name}.png  ${width}x${height}${scale !== 1 ? ` @${scale}x` : ''}`);

    await page.close();
  }
} finally {
  await browser.close();
}

console.log(`\nWritten to ${OUT_DIR}`);
