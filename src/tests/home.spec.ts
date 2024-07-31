import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { email, password } from '../../creds';

// I would move this to a fixture given more time
test.beforeEach(async ({ page, baseURL }) => {
  const loginPage = new LoginPage(page, baseURL!);
  await loginPage.goto();
  await loginPage.login(email, password);
});

test.only('should be able to create a new folder and see it displayed', async ({
  page,
}) => {
  const homePage = new HomePage(page);

  // Use this to ensure we don't try to create a duplicate folder
  // Would use a library like `faker` given more time
  const folderNumber = Math.random();

  await homePage.createFolder('Test ' + folderNumber);
  await page.pause();
});
