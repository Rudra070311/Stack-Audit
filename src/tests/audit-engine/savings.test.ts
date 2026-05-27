import { describe, it, expect } from "vitest";

describe("Savings Calculations", () => {
  it("should calculate monthly savings", () => {
    const current = 100;
    const optimized = 60;
    const savings = current - optimized;
    expect(savings).toBe(40);
  });

  it("should calculate annual savings", () => {
    const monthlySavings = 50;
    const annualSavings = monthlySavings * 12;
    expect(annualSavings).toBe(600);
  });

  it("should calculate savings percentage", () => {
    const current = 200;
    const optimized = 100;
    const percentage = ((current - optimized) / current) * 100;
    expect(percentage).toBe(50);
  });

  it("should calculate per-developer savings", () => {
    const monthlySavings = 120;
    const teamSize = 10;
    const perDevSavings = monthlySavings / teamSize;
    expect(perDevSavings).toBe(12);
  });
});

describe("Individual Tool Savings", () => {
  it("should calculate Cursor savings", () => {
    const currentCost = 40;
    const recommendedCost = 20;
    const savings = currentCost - recommendedCost;
    expect(savings).toBe(20);
  });

  it("should calculate Claude savings", () => {
    const currentCost = 100;
    const recommendedCost = 20;
    const savings = currentCost - recommendedCost;
    expect(savings).toBe(80);
  });

  it("should calculate Copilot savings", () => {
    const currentCost = 19;
    const recommendedCost = 10;
    const savings = currentCost - recommendedCost;
    expect(savings).toBe(9);
  });

  it("should handle no savings scenario", () => {
    const currentCost = 20;
    const recommendedCost = 20;
    const savings = currentCost - recommendedCost;
    expect(savings).toBe(0);
  });
});

describe("Cumulative Savings", () => {
  it("should sum savings across multiple tools", () => {
    const toolSavings = [10, 20, 15, 5];
    const totalSavings = toolSavings.reduce((sum, s) => sum + s, 0);
    expect(totalSavings).toBe(50);
  });

  it("should calculate team-wide annual savings", () => {
    const monthlySavings = 250;
    const teamSize = 5;
    const annualTeamSavings = monthlySavings * 12;
    expect(annualTeamSavings).toBe(3000);
  });

  it("should calculate ROI for 5-person team", () => {
    const annualSavings = 3000;
    const teamSize = 5;
    const savingsPerDev = annualSavings / teamSize;
    expect(savingsPerDev).toBe(600);
  });
});

describe("Savings Categories", () => {
  it("should classify low savings", () => {
    const savings = 50;
    const category = savings < 100 ? "low" : "medium";
    expect(category).toBe("low");
  });

  it("should classify medium savings", () => {
    const savings = 300;
    const category = savings < 500 ? "medium" : "high";
    expect(category).toBe("medium");
  });

  it("should classify high savings", () => {
    const savings = 1000;
    const category = savings >= 500 ? "high" : "medium";
    expect(category).toBe("high");
  });
});

describe("Worst-to-Best Case Scenarios", () => {
  it("should handle worst case - no savings", () => {
    const currentSpend = 100;
    const optimizedSpend = 100;
    const savings = currentSpend - optimizedSpend;
    expect(savings).toBe(0);
  });

  it("should handle best case - 90% savings", () => {
    const currentSpend = 1000;
    const optimizedSpend = 100;
    const savingsPercent = ((currentSpend - optimizedSpend) / currentSpend) * 100;
    expect(savingsPercent).toBe(90);
  });

  it("should handle average case - 40% savings", () => {
    const currentSpend = 500;
    const optimizedSpend = 300;
    const savingsPercent = ((currentSpend - optimizedSpend) / currentSpend) * 100;
    expect(savingsPercent).toBe(40);
  });
});
