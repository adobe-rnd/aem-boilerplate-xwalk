import { test as base, expect } from '@playwright/test';
import fsPromises from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { URL, fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const formBlockFilesPath = '/blocks/form/';
const UEFilesPath = '/scripts/form-editor-support.js';
const test = base.extend({
  saveCoverageInfo: [async ({ page }, use) => {
    await page.coverage.startJSCoverage({ resetOnNavigation: false });
    await use();
    const coverage = await page.coverage.stopJSCoverage();
    const basePath = path.normalize(`${dirname}/../..`);
    const srcCoverage = coverage
      .filter(({ url }) => url.includes(formBlockFilesPath) || url.includes(UEFilesPath))
      .map(({ source, ...entry }) => {
        let pathName = new URL(entry.url).pathname;
        if (!pathName.startsWith(formBlockFilesPath) && !pathName.startsWith(UEFilesPath)) {
          if (pathName.includes(formBlockFilesPath)) {
            pathName = pathName.substring(pathName.indexOf(formBlockFilesPath), pathName.length);
          } else if (pathName.includes(UEFilesPath)) {
            pathName = pathName.substring(pathName.indexOf(UEFilesPath), pathName.length);
          }
        }
        const fileName = pathName;
        return { ...entry, url: `file://${basePath}${fileName}` };
      });
    await fsPromises.mkdir('coverage/tmp', { recursive: true });
    await fsPromises.writeFile(
      `coverage/tmp/coverage-${crypto.randomUUID()}.json`,
      JSON.stringify({ result: srcCoverage }),
    );
  }, { auto: true }],
});

export { test, expect };
