import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page'
import { RegisterPage } from '../../pages/register.page';
import {poManager} from '../../pages/pomanager'

const email:string = "john.doegvv87@example.com"
const password:string = "Password123"


test('User Registration', async ({ page }) => {
    
    // Initialize page objects
    const pomanager = new poManager(page);

    //Navigate to home page and click on sign up
    await pomanager.home.gotoHomePage();
    await pomanager.home.clickSignUp();


    // Fill in registration details
    await pomanager.register.loginDetails("Johngvv14", "Doegvv14", email, "9876143210");
    await pomanager.register.selectOccupation("Engineer");
    await pomanager.register.selectGender("Male");
    await pomanager.register.setPassword(password, password);
    await pomanager.register.acceptTerms();
    await page.screenshot({ path: 'screenshots/user-registration.png' });

    // Click on register button
    await pomanager.register.register.click();

    // Verify registration success (this is a placeholder, replace with actual verification)
    await expect(pomanager.register.successMessage).toHaveText('Account Created Successfully');
    await pomanager.register.successMessage.screenshot({ path: 'screenshots/registration-success.png' });

});
