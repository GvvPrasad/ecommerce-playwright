import { Page, Locator } from "@playwright/test";

export class RegisterPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly phoneNumber: Locator;
    readonly Occupation: Locator;
    readonly male: Locator;
    readonly female: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly olderThan18Checkbox: Locator;
    readonly register: Locator;
    readonly successMessage: Locator;
    readonly loginbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByPlaceholder("First Name");
        this.lastName = page.getByPlaceholder("Last Name");
        this.email = page.getByPlaceholder("email@example.com");
        this.phoneNumber = page.getByPlaceholder("enter your number");
        this.Occupation = page.locator('.form-group select');
        this.male = page.locator('input[type="radio"][value="Male"]');
        this.female = page.locator('input[type="radio"][value="Female"]');
        this.password = page.locator('input[type="password"][placeholder="Passsword"]');
        this.confirmPassword = page.locator('input[type="password"][placeholder="Confirm Passsword"]');
        this.olderThan18Checkbox = page.locator('input[type="checkbox"]');
        this.register = page.locator('input[type="submit"][value="Register"]');
        this.successMessage = page.locator('.headcolor');
        this.loginbutton = page.getByRole('button', { name: 'Login' });
    }

    async loginDetails(fName: string, lName: string, userEmail: string, pNumber: string) {
        await this.firstName.fill(fName);
        await this.lastName.fill(lName);
        await this.email.fill(userEmail);
        await this.phoneNumber.fill(pNumber);
    }

    async selectOccupation(occupation: string) {
        await this.Occupation.selectOption(occupation);
    }

    async selectGender(gender: string) {
        if (gender.toLowerCase() === 'male') {
            await this.male.check();
        } else if (gender.toLowerCase() === 'female') {
            await this.female.check();
        } else {
            throw new Error("Invalid gender option. Please choose 'male' or 'female'.");
        }
    }

    async setPassword(password: string, confirmPassword: string) {
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
    }

    async acceptTerms() {
        await this.olderThan18Checkbox.check();
    }

    async clickRegister() {
        await this.register.click();
    }

    async clickLoginButton() {
        await this.loginbutton.click();
    }

}