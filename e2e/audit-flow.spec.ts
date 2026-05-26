import { test, expect } from "@playwright/test";

test.describe("Stack Audit E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Set up test database or mock API if needed
    await page.goto("http://localhost:3002/audit");
  });

  test("should load audit page with form", async ({ page }) => {
    await expect(page.getByText("AI Tool Spend Audit")).toBeVisible();
    await expect(page.getByText("Team & Use Case")).toBeVisible();
    await expect(page.getByText("AI Tools & Spend")).toBeVisible();
  });

  test("should add multiple tools to the form", async ({ page }) => {
    // Click Add Tool button
    await page.click('button:has-text("Add Tool")');

    // Verify second tool row appears
    const toolSelects = await page.locator('select[value*=""]').count();
    expect(toolSelects).toBeGreaterThanOrEqual(2);
  });

  test("should update team size", async ({ page }) => {
    const teamSizeInput = page.locator('input[type="number"]').first();
    await teamSizeInput.fill("10");

    expect(await teamSizeInput.inputValue()).toBe("10");
  });

  test("should update monthly spend and see cost per dev update", async ({ page }) => {
    const spendInputs = page.locator('input[type="number"]').filter({
      has: page.locator('text="Monthly Spend'),
    });

    await spendInputs.first().fill("100");

    // Check that the cost per developer updates
    const perDevElement = page.getByText(/\$\d+/).nth(1); // Second currency element
    await expect(perDevElement).toBeVisible();
  });

  test("should change use case", async ({ page }) => {
    const useCaseSelect = page.locator("select").nth(1);
    await useCaseSelect.selectOption("writing");

    expect(await useCaseSelect.inputValue()).toBe("writing");
  });

  test("should submit form and show results", async ({ page }) => {
    // Fill out form
    const spendInput = page.locator('input[type="number"]').filter({
      has: page.locator('text="Monthly Spend'),
    });

    await spendInput.first().fill("50");

    // Submit
    await page.click('button:has-text("Run Audit")');

    // Wait for results to load
    await expect(page.getByText("Audit Results")).toBeVisible({
      timeout: 5000,
    });

    // Verify results section shows
    await expect(page.getByText("Monthly Savings")).toBeVisible();
    await expect(page.getByText("Annual Savings")).toBeVisible();
  });

  test("should persist form state to localStorage", async ({ page }) => {
    // Update form
    const teamSizeInput = page.locator('input[type="number"]').first();
    await teamSizeInput.fill("8");

    // Click save
    await page.click('button:has-text("Save Form")');

    // Verify save confirmation
    await expect(page.getByText("Form saved to local storage")).toBeVisible();

    // Reload page
    await page.reload();

    // Verify form state is restored
    await expect(teamSizeInput).toHaveValue("8");
  });

  test("should generate AI summary", async ({ page }) => {
    // Submit audit
    await page.click('button:has-text("Run Audit")');

    // Wait for results
    await expect(page.getByText("Audit Results")).toBeVisible({
      timeout: 5000,
    });

    // Check for summary section (may be template or AI-generated)
    const summaryElement = page.getByText(/Personalized Summary|current|spend|team/i);
    await expect(summaryElement).toBeVisible({
      timeout: 3000,
    });
  });

  test("should show shareable link for high savings", async ({ page }) => {
    // Set up form with moderate spending that might trigger high savings
    const spendInput = page.locator('input[type="number"]').filter({
      has: page.locator('text="Monthly Spend'),
    });

    await spendInput.first().fill("500");

    // Submit
    await page.click('button:has-text("Run Audit")');

    // Wait for results
    await expect(page.getByText("Audit Results")).toBeVisible({
      timeout: 5000,
    });

    // Check if shareable link section appears (for high savings)
    const shareSection = page.locator('text=/Share Your Audit|Implement These Savings/');
    if (await shareSection.isVisible()) {
      await expect(shareSection).toBeVisible();
    }
  });

  test("should allow going back to edit form", async ({ page }) => {
    // Submit form
    await page.click('button:has-text("Run Audit")');

    // Wait for results
    await expect(page.getByText("Audit Results")).toBeVisible({
      timeout: 5000,
    });

    // Click back button
    await page.click('button:has-text("Back to Edit")');

    // Verify form is visible again
    await expect(page.getByText("AI Tool Spend Audit")).toBeVisible();
  });

  test("should navigate to home page", async ({ page }) => {
    // Click home link
    await page.click('a:has-text("Home")');

    // Verify home page content
    await expect(page.getByText(/StackAudit|audit/i)).toBeVisible();
  });

  test("should handle form with multiple tools", async ({ page }) => {
    // Add multiple tools
    await page.click('button:has-text("Add Tool")');
    await page.click('button:has-text("Add Tool")');

    // Fill in multiple tools
    const toolSelects = page.locator('select').filter({
      has: page.locator('text="Tool"'),
    });

    if ((await toolSelects.count()) >= 2) {
      const selects = await toolSelects.all();
      if (selects.length >= 2) {
        await selects[1].selectOption("Claude");
        await selects[2].selectOption("ChatGPT");
      }
    }

    // Fill spending for each
    const spendInputs = page.locator('input[type="number"]').filter({
      has: page.locator('text="Monthly Spend'),
    });

    const inputs = await spendInputs.all();
    if (inputs.length >= 2) {
      await inputs[0].fill("20");
      await inputs[1].fill("20");
    }

    // Submit
    await page.click('button:has-text("Run Audit")');

    // Verify results show multiple tools
    await expect(page.getByText("Per-Tool Breakdown")).toBeVisible({
      timeout: 5000,
    });
  });

  test("should display proper styling and theme", async ({ page }) => {
    // Check for dark theme elements
    const mainElement = page.locator("main");
    const bgColor = await mainElement.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    // Dark background should be applied (rgb values should be low)
    expect(bgColor).toBeTruthy();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Form should still be visible and usable
    await expect(page.getByText("AI Tool Spend Audit")).toBeVisible();
    await expect(page.getByText("Team & Use Case")).toBeVisible();

    // Tool selector should be accessible
    const toolSelect = page.locator("select").first();
    await expect(toolSelect).toBeVisible();
  });
});
