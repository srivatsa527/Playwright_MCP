import { test as base, chromium } from '@playwright/test';

const test = base.extend({
  page: async ({ }, use) => {
    const browser = await chromium.launch({
      headless: false, // Run in headed mode for better debugging
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-features=IsolateOrigins,site-per-process',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });

    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
    });

    const page = await context.newPage();

    // Stealth mode
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      });
      (window as any).chrome = {
        runtime: {},
      };
    });

    await use(page);
    await browser.close();
  },
});

test('Navigate to Myntra and search for T-Shirts', async ({ page }) => {
  test.setTimeout(120000);

  try {
    console.log('Starting test: Navigate to Myntra and search for T-Shirts');
    console.log('Attempting to navigate to Myntra...');

    // Try multiple approaches
    let success = false;

    // Approach 1: Direct navigation
    try {
      await page.goto('https://www.myntra.com/', {
        waitUntil: 'load',
        timeout: 30000,
      });
      success = true;
      console.log('✓ Direct navigation successful');
    } catch (e) {
      console.log('✗ Direct navigation failed:', (e as Error).message);
    }

    // Wait for page to be ready
    await page.waitForTimeout(2000);

    const currentUrl = page.url();
    console.log('Current URL:', currentUrl);

    if (!currentUrl.includes('myntra')) {
      console.log('Navigation appears to have failed, taking debug screenshot');
      await page.screenshot({ path: 'test-results/myntra-debug-headed.png' });

      // Try to get page content
      const content = await page.content();
      console.log('Page content length:', content.length);
      console.log('First 500 chars:', content.substring(0, 500));

      throw new Error('Failed to navigate to Myntra - URL is: ' + currentUrl);
    }

    console.log('✓ Successfully navigated to Myntra');

    // Try to find search input with multiple strategies
    const searchSelectors = [
      'input[placeholder*="Search"]',
      'input[placeholder*="search"]',
      'input[type="text"]',
      '[data-testid="searchInputBox"]',
      '.searchInputBox',
      'input[name="searchInputBox"]',
    ];

    let searchInput = null;
    for (const selector of searchSelectors) {
      try {
        const input = page.locator(selector).first();
        const isVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          searchInput = input;
          console.log('✓ Found search input with selector:', selector);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    if (!searchInput) {
      console.log('Could not find search input');
      await page.screenshot({ path: 'test-results/myntra-search-not-found.png' });
      throw new Error('Search input not found on page');
    }

    // Perform search
    console.log('Clicking search input');
    await searchInput.click({ timeout: 5000 });

    console.log('Typing T-Shirts');
    await searchInput.fill('T-Shirts');

    console.log('Pressing Enter');
    await searchInput.press('Enter');

    // Wait for results to load
    await page.waitForTimeout(4000);

    // Take screenshot of results
    await page.screenshot({ path: 'test-results/myntra-search-results.png' });

    console.log('✓ Test completed successfully');
    console.log('Screenshot saved to: test-results/myntra-search-results.png');

  } catch (error) {
    console.error('✗ Test failed:', (error as Error).message);
    try {
      await page.screenshot({ path: 'test-results/myntra-error-final.png' });
    } catch (e) {
      console.error('Could not take error screenshot');
    }
    throw error;
  }
});
