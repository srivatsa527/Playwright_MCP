# Quick Start Guide - Login Tests

## What was created?

1. **Page Object Model** (`pages/LoginPage.ts`)
   - Encapsulates all login page elements and actions
   - Reusable methods for all login interactions
   - Clean API for writing test cases

2. **Test Suite** (`tests/login.spec.ts`)
   - 21 comprehensive test cases
   - Organized into logical test groups
   - Covers positive, negative, and edge cases

3. **Documentation** (this file + LOGIN_TEST_README.md)
   - Complete guide on how to use the tests
   - Instructions for running, extending, and debugging

## Run Tests in 30 Seconds

```bash
# Install dependencies (if not already done)
npm install

# Run all login tests
npx playwright test tests/login.spec.ts

# View the HTML report
npx playwright show-report
```

## Test Coverage

| Scenario | Tests | Status |
|----------|-------|--------|
| Page Load | 3 | ✓ Passing |
| Valid Login | 3 | ✓ Passing |
| Invalid Credentials | 3 | ✓ Passing |
| Empty Fields | 3 | ✓ Passing |
| Field Interactions | 3 | ✓ Passing |
| Reset & Retry | 1 | ✓ Passing |
| UI Interactions | 3 | ✓ Passing |
| Button Verification | 2 | ✓ Passing |
| **TOTAL** | **21** | **✓ All Passing** |

## Test Login Credentials

- **URL**: https://mouser-sit.emagia.com/ee/login
- **Username**: srivatsa.kuchibhotla
- **Password**: emagia**

## Common Commands

```bash
# Run all tests
npx playwright test tests/login.spec.ts

# Run a single test case
npx playwright test tests/login.spec.ts -g "TC_LOGIN_001"

# Run with browser visible
npx playwright test tests/login.spec.ts --headed

# Debug mode (step through)
npx playwright test tests/login.spec.ts --debug

# Show test report
npx playwright show-report

# Run on specific browser
npx playwright test tests/login.spec.ts --project=chromium
npx playwright test tests/login.spec.ts --project=firefox
npx playwright test tests/login.spec.ts --project=webkit
```

## File Locations

```
tests/
  ├── login.spec.ts              # Main test file (21 tests)
  ├── explore-login.spec.ts      # Page exploration utility

pages/
  └── LoginPage.ts               # Page Object Model

test-results/
  ├── *.png                       # Screenshots from test runs
  └── ...

docs/
  ├── LOGIN_TEST_README.md        # Detailed documentation
  └── QUICK_START.md             # This file
```

## Page Object Model Usage

Instead of writing tests like this:
```typescript
// ❌ Bad - Hard to maintain
await page.locator('input[id=":r0:"]').fill('username');
await page.locator('input[id=":r1:"]').fill('password');
await page.locator('button:has-text("Login")').click();
```

We use the POM:
```typescript
// ✓ Good - Easy to maintain
const loginPage = new LoginPage(page);
await loginPage.login('username', 'password');
```

## Next Steps

1. **Run the tests** to ensure everything works
2. **Review `LoginPage.ts`** to understand the POM structure
3. **Look at `tests/login.spec.ts`** to see how tests are written
4. **Extend with more tests** as needed using the same pattern
5. **Integrate with CI/CD** pipeline for automated testing

## Support

- Check logs and screenshots in `test-results/` folder
- Run with `--debug` flag for interactive debugging
- Review `LOGIN_TEST_README.md` for detailed information
- All tests have descriptive console output

## Summary

✓ Page Object Model created and ready to use
✓ 21 comprehensive test cases written
✓ All tests passing
✓ Full documentation provided
✓ Ready for integration and extension
