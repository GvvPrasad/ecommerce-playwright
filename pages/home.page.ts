import { Page, Locator } from "@playwright/test";

export class HomePage {

    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly forgotPasswordLink: Locator;
    readonly signUpLink: Locator;
    readonly loginErrorMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        this.email = page.getByPlaceholder("email@example.com");
        this.password = page.getByPlaceholder("enter your passsword");
        this.loginButton = page.getByText("Login");
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.signUpLink = page.locator('.text-reset');
        this.loginErrorMessage = page.locator("#login-error-message");
    }

    async gotoHomePage() {
        await this.page.goto('#/auth/login');
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