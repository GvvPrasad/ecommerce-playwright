import { test, expect } from '@playwright/test';

test('login with storage state ', async ({ browser }) => {

    //passing the storage state file to the browser context
    const webcontext = await browser.newContext({ storageState: 'storageState.json' });
    const webpage = await webcontext.newPage();

    //move to dashboard page
    await webpage.goto('https://rahulshettyacademy.com/client/dashboard');
    await expect(webpage.getByRole('button', { name: ' Sign Out ' })).toBeVisible();

    });