import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:4321',
    headless: true,
  },
  webServer: {
    command: 'pnpm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: false,
    timeout: 30000,
  },
});
