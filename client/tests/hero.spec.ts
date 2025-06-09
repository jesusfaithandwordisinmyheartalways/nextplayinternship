


// client/tests/hero.spec.ts
import { test, expect } from '@playwright/test';

test('Hero section displays the hero image', async ({ page }) => {
  await page.goto('https://nextplayinternshipclient.onrender.com');

  // Locate the hero image by its alt text
  const heroImage = page.locator('img[alt="Next Play Nation Logo"]');
  await expect(heroImage).toBeVisible(); // Verifies the hero image is shown
});