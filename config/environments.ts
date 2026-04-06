// config/environments.ts
export const environments = {
    local: {
        baseUrl: 'https://rahulshettyacademy.com/client/',
        apiUrl: 'http://localhost:8000'
    },
    staging: {
        baseUrl: 'https://sauce-demo.myshopify.com/',
        apiUrl: 'https://api.staging.example.com'
    },
    production: {
        baseUrl: 'https://www.figma.com/community',
        apiUrl: 'https://api.example.com'
    }
};
const env = (process.env.ENV || 'local') as keyof typeof environments;
export const config = environments[env];