import { test, expect, request } from '@playwright/test';
import { HomePage } from '../../pages/home.page'
import { DashboardPage } from '../../pages/dashboard.page';
import loginData from '../../test-data/loginData.json';

test('login into the application', async ({ page }) => {

    // Initialize page objects
    const homePage = new HomePage(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to home page and login
    await homePage.gotoHomePage();
    await homePage.login(loginData.validUser.userName, loginData.validUser.password);
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');

    //navigate to orders page
    await dashboardPage.gotoOrders();

    //mock request api
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        async route => route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6642c56da86f8f74dce27cbd',
        })
    );

    //order details
    await page.locator("button:has-text('View')").first().click();

    //wait for the API response to come and the page to load
    await page.waitForLoadState('networkidle');

    //validate the order details
    await expect(page.locator("p").last()).toHaveText('You are not authorize to view this order');

});