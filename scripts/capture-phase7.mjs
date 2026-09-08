import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? 'playwright');

const baseURL = process.env.APP_URL ?? 'http://127.0.0.1:4173/';
const output = new URL('../docs/qa/', import.meta.url);
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
});
const errors = [];

async function shot(name, viewport, route, prepare) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`${name}: ${message.text()}`); });
  page.on('pageerror', (error) => errors.push(`${name}: ${error.message}`));
  await page.goto(new URL(route, baseURL).href, { waitUntil: 'networkidle' });
  await prepare(page);
  const bodyWidth = await page.evaluate(() => ({ scroll: globalThis.document.documentElement.scrollWidth, client: globalThis.document.documentElement.clientWidth }));
  if (bodyWidth.scroll > bodyWidth.client) errors.push(`${name}: horizontal overflow ${bodyWidth.scroll}px > ${bodyWidth.client}px`);
  await page.screenshot({ path: fileURLToPath(new URL(name, output)), fullPage: false });
  await page.close();
}

await shot('phase7-depth-shallow.png', { width: 1440, height: 1000 }, '/?fixture=depth-matters&depth=4#experiment-lab', async (page) => {
  await page.locator('#experiment-lab').scrollIntoViewIfNeeded();
});
await shot('phase7-depth-solved.png', { width: 1440, height: 1000 }, '/?fixture=depth-matters&depth=6#experiment-lab', async (page) => {
  await page.locator('#experiment-lab').scrollIntoViewIfNeeded();
});
await shot('phase7-limitation.png', { width: 1440, height: 1000 }, '/?fixture=limitation-island&depth=8#experiment-lab', async (page) => {
  await page.locator('#experiment-lab').scrollIntoViewIfNeeded();
  await page.locator('.limitation-callout').waitFor();
});
await shot('phase7-research.png', { width: 1440, height: 1000 }, '/#evidence', async (page) => {
  await page.locator('#evidence').scrollIntoViewIfNeeded();
});
await shot('phase7-mobile.png', { width: 390, height: 844 }, '/?fixture=depth-matters&depth=4#experiment-lab', async (page) => {
  await page.locator('#experiment-lab').scrollIntoViewIfNeeded();
});

await browser.close();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Captured five Phase 7 screenshots from ${baseURL} with no console errors or horizontal overflow.`);
