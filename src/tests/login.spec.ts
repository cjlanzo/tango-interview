import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { email, password } from '../../creds';
import { HomePage } from '../pages/home.page';

test('user should be able to login with valid credentials', async ({
  page,
  baseURL,
}) => {
  const loginPage = new LoginPage(page, baseURL!);
  await loginPage.goto();
  await loginPage.login(email, password);

  const homePage = new HomePage(page);

  // Ensure that we hit the home page when we use the correct credentials
  // I would validate the name of the workspace but didn't want to use something specific to my workspace when different people
  // may be running the test
  await expect(homePage.newFolderBtn).toBeVisible();
});

test('user should not be able to login with invalid credentials', async ({
  page,
  baseURL,
}) => {
  const loginPage = new LoginPage(page, baseURL!);
  await loginPage.goto();
  await loginPage.login(email, 'badpassword');

  // Ensure that when using an invalid password, you get this error
  await expect(loginPage.base).toContainText(
    "We couldn't find that account. Please try again or use one of the links below to reset your password or create an account."
  );
});
