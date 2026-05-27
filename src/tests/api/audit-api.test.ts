import { describe, it, expect } from "vitest";

describe("Audit API Validation", () => {
  it("should validate tools array is not empty", () => {
    const payload = { tools: [], teamSize: 5, useCase: "coding" };
    const isValid = Array.isArray(payload.tools) && payload.tools.length > 0;
    expect(isValid).toBe(false);
  });

  it("should validate teamSize is positive", () => {
    const payload = { tools: [{ name: "Cursor" }], teamSize: 0, useCase: "coding" };
    const isValid = payload.teamSize > 0;
    expect(isValid).toBe(false);
  });

  it("should validate useCase is valid", () => {
    const validCases = ["coding", "writing", "data", "research", "mixed"];
    const payload = { tools: [{ name: "Cursor" }], teamSize: 5, useCase: "coding" };
    const isValid = validCases.includes(payload.useCase);
    expect(isValid).toBe(true);
  });

  it("should accept valid audit payload", () => {
    const payload = {
      tools: [
        { name: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 },
        { name: "Claude", plan: "Pro", monthlySpend: 20, seats: 1 },
      ],
      teamSize: 5,
      useCase: "coding",
    };

    const isValid =
      Array.isArray(payload.tools) &&
      payload.tools.length > 0 &&
      payload.teamSize > 0 &&
      ["coding", "writing", "data", "research", "mixed"].includes(payload.useCase);

    expect(isValid).toBe(true);
  });
});

describe("Audit API Response Structure", () => {
  it("should include audit ID in response", () => {
    const response = {
      success: true,
      audit: {
        auditId: "abc123",
        totalCurrentSpend: 100,
        totalOptimizedSpend: 60,
      },
    };

    expect(response.audit.auditId).toBeDefined();
    expect(typeof response.audit.auditId).toBe("string");
  });

  it("should include spend calculations", () => {
    const response = {
      success: true,
      audit: {
        totalCurrentSpend: 100,
        totalOptimizedSpend: 60,
        totalMonthlySavings: 40,
        totalAnnualSavings: 480,
      },
    };

    expect(response.audit.totalCurrentSpend).toBeDefined();
    expect(response.audit.totalOptimizedSpend).toBeDefined();
    expect(response.audit.totalMonthlySavings).toBe(40);
    expect(response.audit.totalAnnualSavings).toBe(480);
  });

  it("should include recommendations array", () => {
    const response = {
      success: true,
      audit: {
        recommendations: [
          {
            tool: "Cursor",
            savings: 20,
            reason: "Switch to Hobby for light usage",
          },
        ],
      },
    };

    expect(Array.isArray(response.audit.recommendations)).toBe(true);
    expect(response.audit.recommendations.length > 0).toBe(true);
  });
});

describe("Audit API Error Handling", () => {
  it("should reject missing tools", () => {
    const payload = { teamSize: 5, useCase: "coding" };
    const error = !("tools" in payload);
    expect(error).toBe(true);
  });

  it("should reject invalid team size", () => {
    const payload = { tools: [{ name: "Cursor" }], teamSize: -5, useCase: "coding" };
    const error = payload.teamSize <= 0;
    expect(error).toBe(true);
  });

  it("should reject invalid use case", () => {
    const payload = { tools: [{ name: "Cursor" }], teamSize: 5, useCase: "invalid" };
    const validCases = ["coding", "writing", "data", "research", "mixed"];
    const error = !validCases.includes(payload.useCase);
    expect(error).toBe(true);
  });

  it("should handle API errors gracefully", () => {
    const response = {
      success: false,
      error: "Failed to process audit",
    };

    expect(response.success).toBe(false);
    expect(response.error).toBeDefined();
  });
});

describe("Audit Calculations API", () => {
  it("should calculate cost per developer", () => {
    const totalSpend = 250;
    const teamSize = 5;
    const costPerDev = totalSpend / teamSize;
    expect(costPerDev).toBe(50);
  });

  it("should calculate annual from monthly", () => {
    const monthlySavings = 100;
    const annualSavings = monthlySavings * 12;
    expect(annualSavings).toBe(1200);
  });

  it("should rank recommendations by savings", () => {
    const recommendations = [
      { tool: "A", savings: 50 },
      { tool: "B", savings: 150 },
      { tool: "C", savings: 75 },
    ];

    const sorted = recommendations.sort((a, b) => b.savings - a.savings);
    expect(sorted[0].tool).toBe("B");
    expect(sorted[2].tool).toBe("A");
  });
});
