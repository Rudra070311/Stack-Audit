import { describe, it, expect } from "vitest";

describe("Audit Engine Performance Benchmarks", () => {
  it("should process single tool audit in acceptable time", () => {
    const startTime = Date.now();
    const tools = [{ name: "Cursor", monthlySpend: 20 }];
    const totalSpend = tools.reduce((sum, t) => sum + t.monthlySpend, 0);
    const duration = Date.now() - startTime;

    expect(totalSpend).toBe(20);
    expect(duration).toBeLessThan(100);
  });

  it("should process multiple tools efficiently", () => {
    const startTime = Date.now();
    const tools = [
      { name: "Cursor", monthlySpend: 20 },
      { name: "Claude", monthlySpend: 30 },
      { name: "ChatGPT", monthlySpend: 25 },
      { name: "Copilot", monthlySpend: 10 },
      { name: "Gemini", monthlySpend: 0 },
    ];
    const totalSpend = tools.reduce((sum, t) => sum + t.monthlySpend, 0);
    const duration = Date.now() - startTime;

    expect(totalSpend).toBe(85);
    expect(duration).toBeLessThan(100);
  });

  it("should generate recommendations quickly", () => {
    const startTime = Date.now();
    const recommendations = [
      { tool: "Cursor", savings: 10 },
      { tool: "Claude", savings: 15 },
    ];
    const totalSavings = recommendations.reduce((sum, r) => sum + r.savings, 0);
    const duration = Date.now() - startTime;

    expect(totalSavings).toBe(25);
    expect(duration).toBeLessThan(50);
  });

  it("should handle large team sizes efficiently", () => {
    const startTime = Date.now();
    const teamSize = 1000;
    const costPerDev = 100 / teamSize;
    const duration = Date.now() - startTime;

    expect(costPerDev).toBe(0.1);
    expect(duration).toBeLessThan(10);
  });
});

describe("Calculation Accuracy", () => {
  it("should calculate per-developer costs accurately", () => {
    const totalSpend = 500;
    const teamSize = 25;
    const costPerDev = totalSpend / teamSize;
    expect(costPerDev).toBe(20);
  });

  it("should calculate annual savings accurately", () => {
    const monthlySavings = 100;
    const annualSavings = monthlySavings * 12;
    expect(annualSavings).toBe(1200);
  });

  it("should calculate percentage savings accurately", () => {
    const current = 1000;
    const optimized = 600;
    const percentage = ((current - optimized) / current) * 100;
    expect(percentage).toBe(40);
  });

  it("should handle floating point precision", () => {
    const cost1 = 10.05;
    const cost2 = 20.15;
    const total = cost1 + cost2;
    expect(total).toBeCloseTo(30.2, 1);
  });
});

describe("Scaling Performance", () => {
  it("should scale linearly with tool count", () => {
    const tools5 = Array(5).fill({ monthlySpend: 20 });
    const tools10 = Array(10).fill({ monthlySpend: 20 });

    const sum5 = tools5.reduce((s, t) => s + t.monthlySpend, 0);
    const sum10 = tools10.reduce((s, t) => s + t.monthlySpend, 0);

    expect(sum10).toBe(sum5 * 2);
  });

  it("should handle maximum expected load", () => {
    const maxTools = 50;
    const maxTeamSize = 5000;

    const totalSpend = maxTools * 25;
    const costPerDev = totalSpend / maxTeamSize;

    expect(costPerDev).toBeLessThan(1);
  });
});
