


// navbar.spec.ts
import { test, expect } from '@playwright/test';

test('Navbar shows site logo', async ({ page }) => {
  await page.goto('https://nextplayinternshipclient.onrender.com');
  const logo = page.locator('img[alt="Next Play Nation Logo"]');
  await expect(logo).toBeVisible();
});