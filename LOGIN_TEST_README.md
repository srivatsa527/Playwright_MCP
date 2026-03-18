# Emagia Login Test Suite

## Overview
This is a comprehensive test suite for the Emagia login page using Playwright with TypeScript and the Page Object Model (POM) design pattern.

## Project Structure
```
playwright_mcp/
├── pages/
│   └── LoginPage.ts          # Page Object Model for login page
├── tests/
│   ├── login.spec.ts         # Test cases for login scenarios
│   └── explore-login.spec.ts # Utility script used for page exploration
└── test-results/             # Screenshots and test results
```

## Page Object Model (LoginPage.ts)

The `LoginPage` class encapsulates all locators and interactions with the login page:

### Locators
- `usernameInput` - Username input field
- `passwordInput` - Password input field
- `loginButton` - Login button
- `loginTitle` - "Log In" title text
- `errorMessage` - Error message locator (for failed login scenarios)

### Methods
- `goto()` - Navigate to the login page
- `isPageLoaded()` - Check if login page is fully loaded
- `login(username, password)` - Complete login action
- `enterUsername(username)` - Enter username in the field
- `enterPassword(password)` - Enter password in the field
- `clickLogin()` - Click the login button
- `clearUsername()` - Clear the username field
- `clearPassword()` - Clear the password field
- `getUsernameValue()` - Get current username field value
- `getPasswordValue()` - Get current password field value
- `isLoginButtonEnabled()` - Check if login button is enabled
- `takeScreenshot(filename)` - Capture a screenshot for debugging

## Test Cases

### 1. Login Page Load (3 tests)
- **TC_LOGIN_001**: Verify login page loads successfully
- **TC_LOGIN_002**: Verify all login elements are visible
- **TC_LOGIN_003**: Verify login page URL is correct

### 2. Successful Login (3 tests)
- **TC_LOGIN_004**: Login with valid credentials
- **TC_LOGIN_005**: Verify username displays correctly in input
- **TC_LOGIN_006**: Verify password field masks input

### 3. Invalid Credentials (3 tests)
- **TC_LOGIN_007**: Error handling for invalid username
- **TC_LOGIN_008**: Error handling for invalid password
- **TC_LOGIN_009**: Error handling for both invalid credentials

### 4. Empty Fields (3 tests)
- **TC_LOGIN_010**: Prevent login with fully empty form
- **TC_LOGIN_011**: Prevent login with empty password
- **TC_LOGIN_012**: Prevent login with empty username

### 5. Field Interactions (3 tests)
- **TC_LOGIN_013**: Clear username field
- **TC_LOGIN_014**: Clear password field
- **TC_LOGIN_015**: Re-enter credentials after clearing

### 6. Reset and Retry (1 test)
- **TC_LOGIN_016**: Reset form after failed login attempt

### 7. UI Interactions (3 tests)
- **TC_LOGIN_017**: Username field focus on click
- **TC_LOGIN_018**: Tab navigation between fields
- **TC_LOGIN_019**: Enter key triggers login

### 8. Login Page Buttons (2 tests)
- **TC_LOGIN_020**: Verify login button text
- **TC_LOGIN_021**: Verify login button is clickable

## Running the Tests

### Run all login tests
```bash
npx playwright test tests/login.spec.ts
```

### Run tests for a specific browser
```bash
npx playwright test tests/login.spec.ts --project=chromium
npx playwright test tests/login.spec.ts --project=firefox
npx playwright test tests/login.spec.ts --project=webkit
```

### Run a specific test case
```bash
npx playwright test tests/login.spec.ts -g "TC_LOGIN_001"
```

### Run tests with headed browser (see browser window)
```bash
npx playwright test tests/login.spec.ts --headed
```

### Run tests in debug mode
```bash
npx playwright test tests/login.spec.ts --debug
```

### Generate HTML report
```bash
npx playwright test tests/login.spec.ts
npx playwright show-report
```

## Test Results

**Total Tests**: 21
**Status**: All tests passing ✓

### Test Summary
```
Login Page Load Tests:           3/3 ✓
Successful Login Tests:          3/3 ✓
Invalid Credentials Tests:       3/3 ✓
Empty Fields Tests:              3/3 ✓
Field Interactions Tests:        3/3 ✓
Reset and Retry Tests:           1/1 ✓
UI Interaction Tests:            3/3 ✓
Login Page Button Tests:         2/2 ✓
```

## Login Credentials

To test the login functionality, use:
- **Username**: `srivatsa.kuchibhotla`
- **Password**: `emagia**`

## Key Features

1. **Page Object Model Pattern**: Clean separation of test logic and page interactions
2. **Comprehensive Test Coverage**: Covers positive, negative, and edge cases
3. **Error Handling**: Robust waiting and timeout handling
4. **Screenshots**: Automatic screenshot capture for failed tests and specific scenarios
5. **TypeScript**: Fully typed for better code quality and IDE support
6. **Descriptive Test Names**: Clear naming convention with test IDs (TC_LOGIN_XXX)

## Configuration

Tests are configured in `playwright.config.ts`:
- **Base URL**: Not set (tests use full URLs)
- **Timeout**: 30 seconds per test (configurable)
- **Retries**: 0 by default (2 on CI)
- **Workers**: Auto (parallel execution enabled)
- **Reporter**: HTML report generation

## Debugging Failed Tests

1. Check the test-results folder for screenshots
2. Run with `--debug` flag for step-by-step execution
3. Use `page.screenshot()` to capture specific states
4. Check console logs for detailed test flow information

## Extending the Tests

To add new tests:

1. Add new test cases to `tests/login.spec.ts`
2. Use the `loginPage` object for all page interactions
3. Follow the naming convention: `TC_LOGIN_XXX`
4. Add descriptive console logs for debugging
5. Take screenshots at critical points

Example:
```typescript
test('TC_LOGIN_022: New test scenario', async () => {
  await loginPage.goto();
  // Test logic here
  console.log('✓ Test description');
});
```

## Troubleshooting

### Tests timeout
- Increase `test.setTimeout()` value
- Check network connectivity to the server
- Verify credentials are correct

### Elements not found
- Run the explore script to verify selectors
- Check if element is dynamically loaded
- Update locators in `LoginPage.ts`

### Login fails with valid credentials
- Verify the password is correct (it may be masked in the request)
- Check if the server is accessible
- Review browser console for errors

## Next Steps

Consider adding:
- Visual regression testing
- Performance metrics tracking
- Integration tests for post-login workflows
- API testing for backend validation
- Cross-browser testing in CI/CD pipeline
