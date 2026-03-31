import { Page, Locator } from "@playwright/test";

export class DashboardPage {

    readonly page: Page;
    readonly orders: Locator;
    readonly signout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orders = page.getByRole('button', { name: ' Orders ' });
        this.signout = page.getByRole('button', { name: ' Sign Out ' });
    }

    async logout() {
        await this.signout.click();
    }

    async gotoOrders() {
        await this.orders.click();
    }
}