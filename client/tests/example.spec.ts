



import { test, expect } from '@playwright/test';

test('Homepage shows the logo image', async ({ page }) => {
  await page.goto('https://nextplayinternshipclient.onrender.com');
  const logo = page.locator('img[alt="Next Play Nation Logo"]');
  await expect(logo).toBeVisible(); // Verifies the logo image is visible
});





