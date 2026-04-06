import { Page } from '@playwright/test';
import { HomePage } from './home.page';
import { RegisterPage } from './register.page';
import { DashboardPage } from './dashboard.page';


export class poManager {

    readonly page: Page;
    readonly home: HomePage;
    readonly register: RegisterPage;
    readonly dashboard: DashboardPage;

    constructor(page: Page) {
        this.page = page;
        this.home = new HomePage(this.page);
        this.register = new RegisterPage(this.page);
        this.dashboard = new DashboardPage(this.page);
    }
}