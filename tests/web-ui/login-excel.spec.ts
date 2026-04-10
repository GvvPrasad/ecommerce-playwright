import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page'
import { readExcel } from '../../utils/excelreader';

const testdata = readExcel('test-data/logins.xlsx', 'Sheet1');


test.describe('Login tests', () => {
    for (const data of testdata as any[]) {
        if (data.Run !== 'Yes') continue;

        test(`Login with ${data.Email}`, async ({ page }) => {

            // Initialize page objects
            const homePage = new HomePage(page);

            // Navigate to home page and login
            await homePage.gotoHomePage();
            await homePage.login(data.Email, data.Password);

            if (data.Valid === 'Yes') {
                await expect(page).toHaveURL('#/dashboard/dash');
            } else {
                await expect(homePage.loginErrorMessage).toBeVisible();

            }

        });
    }
})

