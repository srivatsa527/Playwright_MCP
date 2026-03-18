import { test } from '@playwright/test';

test('Explore login page structure', async ({ page }) => {
  test.setTimeout(60000);

  try {
    console.log('Navigating to login page...');

    await page.goto('https://mouser-sit.emagia.com/ee/login', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    console.log('Current URL:', page.url());

    // Get all input elements
    const inputs = await page.locator('input').all();
    console.log('Total input fields found:', inputs.length);

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const type = await input.getAttribute('type');
      const name = await input.getAttribute('name');
      const id = await input.getAttribute('id');
      const placeholder = await input.getAttribute('placeholder');
      console.log(`Input ${i + 1}:`, { type, name, id, placeholder });
    }

    // Get all buttons
    const buttons = await page.locator('button').all();
    console.log('Total buttons found:', buttons.length);

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const text = await button.textContent();
      const type = await button.getAttribute('type');
      console.log(`Button ${i + 1}:`, { text: text?.trim(), type });
    }

    // Take screenshot
    await page.screenshot({ path: 'test-results/login-page-structure.png' });
    console.log('✓ Screenshot saved to test-results/login-page-structure.png');

  } catch (error) {
    console.error('✗ Error:', (error as Error).message);
    throw error;
  }
});
