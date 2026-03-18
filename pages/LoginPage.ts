import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginTitle: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Locators for login page elements
    this.usernameInput = page.locator('input[id=":r0:"]'); // Username input using ID
    this.passwordInput = page.locator('input[id=":r1:"]'); // Password input using ID
    this.loginButton = page.locator('button:has-text("Login")');
    this.forgotPasswordLink = page.locator('a:has-text("Forgot Password")');
    this.loginTitle = page.locator('text=Log In');

    // Error message that appears on failed login
    this.errorMessage = page.locator('text=/Invalid credentials|login failed|incorrect/i');
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto('https://mouser-sit.emagia.com/ee/login', {
      waitUntil: 'domcontentloaded',
    });
  }

  /**
   * Check if login page is loaded
   */
  async isPageLoaded(): Promise<boolean> {
    try {
      await this.loginTitle.waitFor({ state: 'visible', timeout: 5000 });
      await this.usernameInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.loginButton.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Enter username
   */
  async enterUsername(username: string) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Perform complete login action
   */
  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  /**
   * Get username input value
   */
  async getUsernameValue(): Promise<string | null> {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get password input value
   */
  async getPasswordValue(): Promise<string | null> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Clear username field
   */
  async clearUsername() {
    await this.usernameInput.clear();
  }

  /**
   * Clear password field
   */
  async clearPassword() {
    await this.passwordInput.clear();
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get error message text
   */
  async getErrorMessageText(): Promise<string | null> {
    try {
      return await this.errorMessage.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Wait for navigation after login
   */
  async waitForNavigation() {
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Check if username input is visible
   */
  async isUsernameInputVisible(): Promise<boolean> {
    return await this.usernameInput.isVisible();
  }

  /**
   * Check if password input is visible
   */
  async isPasswordInputVisible(): Promise<boolean> {
    return await this.passwordInput.isVisible();
  }

  /**
   * Check if login button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }

  /**
   * Take screenshot of login page
   */
  async takeScreenshot(filename: string) {
    await this.page.screenshot({ path: `test-results/${filename}` });
  }
}
