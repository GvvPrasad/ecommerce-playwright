import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page'
import  loginData from '../../test-data/loginData.json';


test('login into the application', async ({ page }) => {

    // Initialize page objects
    const homePage = new HomePage(page);

    // Navigate to home page and login
    await homePage.gotoHomePage(); 
    await homePage.login(loginData.validUser.userName,loginData.validUser.password);
    await expect(page).toHaveURL('#/dashboard/dash');

    //Save authentication state
    await page.context().storageState({ path: 'auth.json' });

});