import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page'
import  loginData from '../../test-data/loginData.json';


test('save storage state in json file', async ({ browser }) => {

    const webcontext = await browser.newContext();
    const webpage = await webcontext.newPage();

    // Initialize page objects
    const homePage = new HomePage(webpage);

    // Navigate to home page and login
    await homePage.gotoHomePage(); 
    await homePage.login(loginData.validUser.userName,loginData.validUser.password);
    await expect(webpage).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await webpage.waitForLoadState('networkidle');

    // Save storage state to a JSON file
    await webcontext.storageState({ path: 'storageState.json' });

});
