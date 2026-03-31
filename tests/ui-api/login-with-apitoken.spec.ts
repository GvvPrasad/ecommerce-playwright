import { test, expect, request } from '@playwright/test';

//variables
const baseURL: string = "https://rahulshettyacademy.com/api/ecom/auth/login";
const loginPayload: object = { userEmail: "varaprasad1819@gmail.com", userPassword: "Prasu$1819" };
let token: string;

test('Login API test', async ({ request }) => {

    const loginResponse = await request.post(baseURL, { data: loginPayload });
    const loginResponseInJson = await loginResponse.json();
    token = loginResponseInJson.token;

});

test('move to dashboard with token', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client/dashboard');
    await expect(page.getByRole('button', { name: ' Sign Out ' })).toBeVisible();
});