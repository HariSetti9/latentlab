import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? 'playwright');
const baseURL = process.env.APP_URL ?? 'http://127.0.0.1:4173/';
const configured = process.env.BROWSER_EXECUTABLES?.split(';').filter(Boolean).map((item) => {
  const separator = item.indexOf('=');
  return { name: item.slice(0, separator), executablePath: item.slice(separator + 1) };
}) ?? [{ name: 'Playwright Chromium', executablePath: undefined }];
const widths = [360, 390, 768, 1024, 1440];
const report = { schemaVersion: 1, baseURL, browsers: [], accessibility: {}, residual: [] };

for (const config of configured) {
  const browser = await chromium.launch({ headless: true, ...(config.executablePath ? { executablePath: config.executablePath } : {}) });
  const browserResult = { name: config.name, widths: [], interactions: 'PASS', consoleErrors: [] };
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: width <= 390 ? 844 : 900 } });
    page.on('console', (message) => { if (message.type() === 'error') browserResult.consoleErrors.push(message.text()); });
    page.on('pageerror', (error) => browserResult.consoleErrors.push(error.message));
    await page.goto(new URL('/?fixture=depth-matters&depth=4', baseURL).href, { waitUntil: 'networkidle' });
    const load = await page.evaluate(() => ({
      text: globalThis.document.body.innerText.trim().length,
      overlay: Boolean(globalThis.document.querySelector('.vite-error-overlay, #webpack-dev-server-client-overlay')),
      scrollWidth: globalThis.document.documentElement.scrollWidth,
      clientWidth: globalThis.document.documentElement.clientWidth,
      overflowers: [...globalThis.document.querySelectorAll('body *')].filter((node) => {
        const rect = node.getBoundingClientRect(); return rect.right > globalThis.document.documentElement.clientWidth + 1 || rect.left < -1;
      }).slice(0, 8).map((node) => ({ tag: node.tagName, className: node.className, right: Math.round(node.getBoundingClientRect().right), left: Math.round(node.getBoundingClientRect().left) })),
    }));
    if (!load.text || load.overlay || load.scrollWidth > load.clientWidth) throw new Error(`${config.name} ${width}px failed load/overflow check: ${JSON.stringify(load)}`);
    await page.getByRole('button', { name: '6', exact: true }).first().click();
    await page.getByText('Estimate agrees with the reference').waitFor();
    await page.locator('#experiment-lab select').selectOption('limitation-island');
    await page.getByText('Additional computation can saturate.').waitFor();
    await page.locator('#evidence').scrollIntoViewIfNeeded();
    await page.getByText('Conceptual bridge, not a replica.').waitFor();
    browserResult.widths.push({ width, status: 'PASS', horizontalOverflow: false });

    if (width === 1440 && config === configured[0]) {
      await page.goto(new URL('/', baseURL).href, { waitUntil: 'networkidle' });
      await page.keyboard.press('Tab');
      report.accessibility.skipLinkFirst = await page.locator(':focus').getAttribute('class') === 'skip-link';
      report.accessibility.structure = await page.evaluate(() => {
        const controls = [...globalThis.document.querySelectorAll('button, input, select, textarea')];
        const unnamed = controls.filter((element) => !element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby') && !element.labels?.length && !element.textContent?.trim());
        const ids = [...globalThis.document.querySelectorAll('[id]')].map((element) => element.id);
        const tooSmallButtons = [...globalThis.document.querySelectorAll('button')].filter((element) => {
          const rect = element.getBoundingClientRect(); return rect.width < 44 || rect.height < 44;
        }).length;
        return {
          h1Count: globalThis.document.querySelectorAll('h1').length,
          mainCount: globalThis.document.querySelectorAll('main').length,
          navCount: globalThis.document.querySelectorAll('nav').length,
          unnamedControls: unnamed.length,
          duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
          unnamedGraphics: [...globalThis.document.querySelectorAll('[role="img"]')].filter((node) => !node.getAttribute('aria-label')).length,
          tooSmallButtons,
        };
      });
      await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active' });
      report.accessibility.reducedMotion = await page.evaluate(() => globalThis.getComputedStyle(globalThis.document.documentElement).scrollBehavior === 'auto');
      await page.emulateMedia({ reducedMotion: 'no-preference', forcedColors: 'none' });
      await page.evaluate(() => { globalThis.document.documentElement.style.fontSize = '200%'; });
      report.accessibility.textResizeOverflow = await page.evaluate(() => globalThis.document.documentElement.scrollWidth > globalThis.document.documentElement.clientWidth);
    }
    await page.close();
  }
  if (browserResult.consoleErrors.length) throw new Error(`${config.name} console errors: ${browserResult.consoleErrors.join(' | ')}`);
  report.browsers.push(browserResult);
  await browser.close();
}

const a11y = report.accessibility;
if (!a11y.skipLinkFirst || a11y.structure?.h1Count !== 1 || a11y.structure?.mainCount !== 1 || a11y.structure?.navCount < 1 || a11y.structure?.unnamedControls || a11y.structure?.duplicateIds.length || a11y.structure?.unnamedGraphics || a11y.structure?.tooSmallButtons || !a11y.reducedMotion || a11y.textResizeOverflow) {
  throw new Error(`Accessibility gate failed: ${JSON.stringify(a11y)}`);
}
report.residual.push('Firefox and Safari require external environments; no compatible local executable was available.');
await mkdir(new URL('../artifacts/', import.meta.url), { recursive: true });
await writeFile(new URL('../artifacts/browser-audit.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Browser audit PASS: ${configured.length} engines x ${widths.length} widths; interaction, console, overflow, and semantic gates passed.`);
