import { test, expect, request } from '@playwright/test';
import { HomePage } from '../../pages/home.page'
import { DashboardPage } from '../../pages/dashboard.page';
import loginData from '../../test-data/loginData.json';

//variable
const fackrespoonsebody: object = { data: [], message: "No Orders" };
//convert the javascript object to json object for the API response
const body = JSON.stringify(fackrespoonsebody);

test('login into the application', async ({ page }) => {

    // Initialize page objects
    const homePage = new HomePage(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to home page and login
    await homePage.gotoHomePage();
    await homePage.login(loginData.validUser.userName, loginData.validUser.password);
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');

    // Mocking the order list API response
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6642c56da86f8f74dce27cbd', async route => {
        //fetch the original response
        const response = await page.request.fetch(route.request());
        //fulfill the route with the original response and patching the body with the fack response
        await route.fulfill({
            response,
            body,
        });
    });

    //navigate to orders page
    await dashboardPage.gotoOrders();

    //wait for the API response to come and the page to load
    await page.waitForLoadState('networkidle');

    //print the text which is coming from the API response
    console.log(await page.getByText('You have No Orders to show at').textContent());

});