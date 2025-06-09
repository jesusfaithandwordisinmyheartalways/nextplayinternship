




// client/tests/footer.spec.ts
import { test, expect } from '@playwright/test';

test('Footer is visible and has expected content', async ({ page }) => {
  await page.goto('https://nextplayinternshipclient.onrender.com');

  const footer = page.locator('.custom-footer-container');
  await expect(footer).toBeVisible();

 // ✅ These texts actually exist in your Footer component
  await expect(footer).toContainText('Download our App');
await expect(footer).toContainText('Admin Login');   
});