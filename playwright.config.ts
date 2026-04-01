// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({

  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './tests',

  // Run all tests in parallel.
  fullyParallel: false,

  //re-execute failed tests once 
  retries: 1,

  // Reporter to use
  reporter: [
    ['html'],
    ['line'],
    ['allure-playwright']
  ],

  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',

  //maximum time one test can run for
  timeout: 30 * 1000,

  // Maximum time expect() should wait for the condition to be met.
  expect: {
    timeout: 15 * 1000,
  },

  use: {

    //executive the test in slow motion
    launchOptions: {
      slowMo: 900
    },

    // Name of the browser that runs tests. For example `chromium`, `firefox`, `webkit`.
    browserName: 'chromium',

    // Run browser in headless mode.
    headless: false,

    // Toggles bypassing Content-Security-Policy.
    bypassCSP: true, 

    //bypass the https errors
    ignoreHTTPSErrors: true,

    //allow to use geolocation in the browser context
    permissions: ['geolocation'],

    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',

    //Record a trace only when retrying a test for the first time
    trace: 'retain-on-failure',
  },

});

