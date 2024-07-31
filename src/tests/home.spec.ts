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

test('should be able to create a new folder and see it displayed as a list', async ({
  page,
}) => {
  const homePage = new HomePage(page);

  // Use this to ensure we don't try to create a duplicate folder
  // Would use a library like `faker` given more time
  const folderNumber = Math.random();
  const folderName = 'Test ' + folderNumber;

  await homePage.createFolder(folderName);
  await homePage.changeDisplayToList();
  await expect(homePage.folders.getFolder(folderName)).toBeVisible();
});
