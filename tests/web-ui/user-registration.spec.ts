import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page'
import { RegisterPage } from '../../pages/register.page';

const email:string = "john.doegvv85@example.com"
const password:string = "Password123"


test('User Registration', async ({ page }) => {
    
    // Initialize page objects
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    // Navigate to home page and click on sign up
    await homePage.gotoHomePage();
    await homePage.clickSignUp();

    // Fill in registration details
    await registerPage.loginDetails("Johngvv11", "Doegvv11", email, "9876543210");
    await registerPage.selectOccupation("Engineer");
    await registerPage.selectGender("Male");
    await registerPage.setPassword(password, password);
    await registerPage.acceptTerms();
    await page.screenshot({ path: 'screenshots/user-registration.png' });

    // Click on register button
    await registerPage.register.click();

    // Verify registration success (this is a placeholder, replace with actual verification)
    await expect(registerPage.successMessage).toHaveText('Account Created Successfully');
    await registerPage.successMessage.screenshot({ path: 'screenshots/registration-success.png' });

    //click on login button
    await registerPage.clickLoginButton();

    //check it navigates to login page
    await expect(page).toHaveURL(homePage.url);

    //login with new credentials in home page
    await homePage.login(email, password);

    // Verify login success (this is a placeholder, replace with actual verification)
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');



});
