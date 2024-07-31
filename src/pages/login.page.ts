import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly base: Locator;

  readonly email: Locator;
  readonly password: Locator;
  readonly continueBtn: Locator;

  constructor(readonly page: Page, readonly baseUrl: string) {
    this.base = this.page.getByTestId('auth.layout');

    // Locators for elements on the page
    this.email = this.base.locator('input#email');
    this.password = this.base.locator('input#password');
    this.continueBtn = this.base.getByTestId('auth.signIn.submitButton');
  }

  // Navigate to the login page
  async goto() {
    await this.page.goto(this.baseUrl);
  }

  // Login using the given email and password
  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.continueBtn.click();
  }
}
