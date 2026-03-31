import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator;
    readonly forgotPasswordLink: Locator;
    readonly signUpLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByPlaceholder("email@example.com");
        this.password = page.getByPlaceholder("enter your passsword");
        this.loginButton = page.getByText("Login");
        this.loginErrorMessage = page.locator("#login-error-message");
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.signUpLink = page.locator('.text-reset');
    }

    async gotoHomePage() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async login(user: string, pass: string) {
        await this.email.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async getLoginErrorMessage() {
        return await this.loginErrorMessage.textContent();
    }

    async clickForgotPassword() {
        await this.forgotPasswordLink.click();
    }

    async clickSignUp() {
        await this.signUpLink.click();
    }
}