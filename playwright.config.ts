import { defineConfig, devices } from '@playwright/test';
import { config } from './config/environments';

//Read envinornment variables from file
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({path:path.resolve(__dirname,'environments.env')});


export default defineConfig({

  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  // Run all tests in parallel.
  fullyParallel: false,

  // Fail the build on CI/CD if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI/CD & local.
  retries: process.env.CI ? 2 : 1,

  // Opt out of parallel tests on CI/CD.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html'],
    ['json'],
    ["line"],
    ["allure-playwright"]
  ],


  use: {

    //for max window size
    viewport: {width:1920,height:1080},

    headless: false,

    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: config.baseUrl,

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',

    //take screenshot when test fail
    screenshot: 'only-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    /*    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } }, */
  ],
});
