import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page'
import { RegisterPage } from '../../pages/register.page';

test('User Registration', async ({ page }) => {
    
    // Initialize page objects
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    // Navigate to home page and click on sign up
    await homePage.gotoHomePage();
    await homePage.clickSignUp();

    // Fill in registration details
    await registerPage.loginDetails("Johngvv", "Doegvv", "john.doegvv3@example.com", "9876543210");
    await registerPage.selectOccupation("Engineer");
    await registerPage.selectGender("Male");
    await registerPage.setPassword("Password123", "Password123");
    await registerPage.acceptTerms();
    await page.screenshot({ path: 'screenshots/user-registration.png' });

    // Click on register button
    await registerPage.register.click();

    // Verify registration success (this is a placeholder, replace with actual verification)
    await expect(page.locator('.headcolor')).toHaveText('Account Created Successfully');
    await page.locator('.headcolor').screenshot({ path: 'screenshots/registration-success.png' });
});
