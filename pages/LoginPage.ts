
import {type Locator, type Page } from '@playwright/test'

export class LoginPage
{
    readonly page :Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password visibility' });
        this.loginButton = page.getByTestId('login-button');
    }

    async navigate() {
        await this.page.goto('/lite');
        await this.page.getByRole('link', { name: 'Log in' }).click();
    }

    async login(email: string, pass: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}
