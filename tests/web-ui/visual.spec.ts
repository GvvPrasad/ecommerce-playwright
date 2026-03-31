import { test, expect } from '@playwright/test';

test('Visual Regression Test', async ({ page }) => {
    // Navigate to the page you want to test
    await page.goto('https://www.moneycontrol.com/stocks/marketinfo/marketcap/nse/index.html'); 
    await page.waitForLoadState('networkidle'); // Ensure the page has fully loaded
    expect(await page.screenshot()).toMatchSnapshot('example-homepage.png');
});