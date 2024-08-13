import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});


test.describe('Actions List', () => {

  test('Page Title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Home/);
  });

  test('New Action Button', async ({ page }) => {
    // Expects page to have a button with text "New Action".
    await expect(page.getByRole('button', { name: 'New Action' })).toBeVisible();

    // Expects that button to be disabled
    await expect(page.getByRole('button', { name: 'New Action' })).toBeDisabled();
  });

});
