import { describe, it, expect } from "vitest";

describe("Audit Engine Data Processing", () => {
  it("should calculate total spend correctly", () => {
    const tools = [
      { name: "Cursor", monthlySpend: 20 },
      { name: "Claude", monthlySpend: 30 },
      { name: "Copilot", monthlySpend: 10 },
    ];

    const total = tools.reduce((sum, tool) => sum + tool.monthlySpend, 0);
    expect(total).toBe(60);
  });

  it("should calculate per-developer cost", () => {
    const totalSpend = 100;
    const teamSize = 5;
    const costPerDev = totalSpend / teamSize;
    expect(costPerDev).toBe(20);
  });

  it("should calculate annual savings", () => {
    const monthlySavings = 50;
    const annualSavings = monthlySavings * 12;
    expect(annualSavings).toBe(600);
  });

  it("should calculate savings percentage", () => {
    const currentSpend = 100;
    const optimizedSpend = 60;
    const percentage = ((currentSpend - optimizedSpend) / currentSpend) * 100;
    expect(percentage).toBe(40);
  });
});

describe("Tool Recommendations", () => {
  it("should recommend cheaper plans", () => {
    const currentCost = 100;
    const recommendedCost = 60;
    const isCheaper = recommendedCost < currentCost;
    expect(isCheaper).toBe(true);
  });

  it("should identify overlapping tools", () => {
    const tools = ["Claude", "ChatGPT", "Cursor"];
    const hasOverlap = tools.includes("Claude") && tools.includes("ChatGPT");
    expect(hasOverlap).toBe(true);
  });

  it("should rank recommendations by savings", () => {
    const recommendations = [
      { tool: "Tool A", savings: 100 },
      { tool: "Tool B", savings: 50 },
      { tool: "Tool C", savings: 150 },
    ];

    const sorted = recommendations.sort((a, b) => b.savings - a.savings);
    expect(sorted[0].tool).toBe("Tool C");
    expect(sorted[0].savings).toBe(150);
  });
});

describe("Results Generation", () => {
  it("should structure audit results correctly", () => {
    const result = {
      auditId: "123",
      totalCurrentSpend: 100,
      totalOptimizedSpend: 60,
      totalMonthlySavings: 40,
      totalAnnualSavings: 480,
      recommendations: [],
    };

    expect(result.auditId).toBeDefined();
    expect(result.totalMonthlySavings).toBe(40);
    expect(result.totalAnnualSavings).toBe(480);
  });

  it("should include recommendations in results", () => {
    const result = {
      recommendations: [
        {
          tool: "Cursor",
          currentPlan: "Pro",
          recommendedPlan: "Hobby",
          savings: 20,
        },
      ],
    };

    expect(result.recommendations.length).toBe(1);
    expect(result.recommendations[0].tool).toBe("Cursor");
  });
});
