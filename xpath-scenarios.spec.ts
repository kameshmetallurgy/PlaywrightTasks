import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Scenario 1: locate username using placeholder attribute', async ({ page }) => {
  const username = page.locator("xpath=//input[@placeholder='Enter username']").first();
  await expect(username).toBeVisible();
  await username.fill('Kamesh');
  await expect(username).toHaveValue('Kamesh');
});

test('Scenario 2: click Transfer beside the exact Savings option', async ({ page }) => {
  const savingsButton = page.locator("xpath=//span[normalize-space()='Transfer to Savings']/following-sibling::button");
  await savingsButton.click();
  await expect(page.locator('#transfer-feedback')).toHaveText('Transfer to Savings selected.');
});


test('Scenario 3: locate a button using partial text and parent-child relationship', async ({ page }) => {
  const continueButton = page.locator(
    "xpath=//div[contains(@class,'transfer-item')][.//span[contains(normalize-space(.), 'Transfer to Savings Account – Priority')]]//button"
  );

  await expect(continueButton).toBeVisible();
  await continueButton.click();
  await expect(page.locator('#dynamic-feedback'))
    .toHaveText('Dynamic payment option selected.');
});



test('Scenario 4: click Edit belonging to Kamesh', async ({ page }) => {
  const editKamesh = page.locator("xpath=//span[normalize-space()='Kamesh']/following-sibling::button");
  await editKamesh.click();
  await expect(page.locator('#profile-feedback')).toHaveText('Editing profile: Kamesh');
});

test("Scenario 5: find John's Savings balance in the table", async ({ page }) => {
  const balance = page.locator("xpath=//table[@id='accounts-table']//tr[td[normalize-space()='John'] and td[normalize-space()='Savings']]/td[3]");
  await expect(balance).toHaveText('25,000');
});

test('Scenario 6: locate registration username using dynamic ID prefix', async ({ page }) => {
  const username = page.locator("xpath=//input[starts-with(@id, 'user_')]");
  await expect(username).toBeVisible();
  await username.fill('Kamesh');
  await expect(username).toHaveValue('Kamesh');
});

test('Scenario 7: locate legacy Remarks input through table row', async ({ page }) => {
  const remarks = page.locator("xpath=//td[normalize-space()='Remarks:']/following-sibling::td//input");
  await remarks.fill('Monthly rent payment');
  await page.locator('#legacy-transfer').click();
  await expect(page.locator('#legacy-feedback')).toHaveText('Transfer submitted. Remarks: Monthly rent payment');
});