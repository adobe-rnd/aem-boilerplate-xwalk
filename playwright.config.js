import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';

// Check if LoginAuth.json exists
const loginAuthExists = fs.existsSync('./LoginAuth.json');

export default defineConfig({
  // Only use global setup in CI environment
  globalSetup: process.env.CI ? './test/e2e/global-setup.js' : null,
  testDir: './test/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 3 : 3,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  reporter: [['html', { outputFolder: './test/e2e/reports/' }]],
  use: {
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Only use storageState if the file exists
    storageState: loginAuthExists ? './LoginAuth.json' : undefined,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* Test against a mobile viewport. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      grep: /^(?!.*@chromium-only)/,
    },
  ],
});
