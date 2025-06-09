



import { test, expect } from '@playwright/test';

test('homepage loads with the main heading', async ({ page }) => {
  await page.goto('https://nextplayinternshipclient.onrender.com/'); // Make sure your app is running here
  const heading = await page.locator('h1');
  await expect(heading).toHaveText(/next play nation/i); // Adjust the text to match exactly
});