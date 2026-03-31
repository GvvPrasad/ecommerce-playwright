import { test, expect, request } from '@playwright/test';

//variables
const baseURL: string = "https://rahulshettyacademy.com/api/ecom/auth/login";
const loginPayload: object = { userEmail: "varaprasad1819@gmail.com", userPassword: "Prasu$1819" };


test('Login API test', async ({ request }) => {

    // Send POST request of login API
    const loginResponse = await request.post(baseURL, { data: loginPayload });
    
    //session storage is saved in json file
    await request.storageState({ path: 'storageStatefromapi.json' });

    //token is extracted from login response and printed in console
    const loginResponseInJson = await loginResponse.json();
    const token = loginResponseInJson.token;
    console.log(token);

    // Assertions
    expect(loginResponse.status()).toBe(200);
    expect(token).not.toBeNull();
    

});
