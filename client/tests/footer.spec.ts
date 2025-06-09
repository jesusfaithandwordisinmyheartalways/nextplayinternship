




// client/tests/footer.spec.ts
import { test, expect } from '@playwright/test';

test('Footer is visible and has expected content', async ({ page }) => {
  await page.goto('https://nextplayinternshipclient.onrender.com');

  const footer = page.locator('footer');
  await expect(footer).toBeVisible();

  // Example: Check if footer contains text
  await expect(footer).toContainText('©'); // or specific footer text like '© 2025 Next Play Nation'
});