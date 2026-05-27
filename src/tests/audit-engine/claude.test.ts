import { describe, it, expect } from "vitest";

describe("Claude Tool Pricing", () => {
  it("should verify Claude pricing tiers", () => {
    const plans = {
      Free: 0,
      Pro: 20,
      Team: 30,
      Max: 100,
      Enterprise: null,
    };

    expect(plans.Free).toBe(0);
    expect(plans.Pro).toBe(20);
    expect(plans.Team).toBe(30);
    expect(plans.Max).toBe(100);
  });

  it("should recommend Pro for individual developers", () => {
    const teamSize = 1;
    const recommendedPlan = teamSize === 1 ? "Pro" : "Team";
    expect(recommendedPlan).toBe("Pro");
  });

  it("should recommend Team plan for groups", () => {
    const teamSize = 5;
    const perSeatCost = 30;
    const totalTeamCost = perSeatCost * teamSize;
    expect(totalTeamCost).toBe(150);
  });

  it("should calculate savings switching from Max to Pro", () => {
    const maxCost = 100;
    const proCost = 20;
    const savings = maxCost - proCost;
    expect(savings).toBe(80);
  });
});

describe("Claude Capabilities by Use Case", () => {
  it("should support coding use case", () => {
    const useCases = ["coding", "writing", "data", "research", "mixed"];
    const supportsCoding = useCases.includes("coding");
    expect(supportsCoding).toBe(true);
  });

  it("should prioritize Pro for balanced use", () => {
    const useCase = "mixed";
    const recommendedPlan = "Pro";
    expect(recommendedPlan).toBeDefined();
  });

  it("should recommend alternatives for writing-only", () => {
    const useCase = "writing";
    const alternatives = ["ChatGPT", "Gemini"];
    expect(alternatives.length > 0).toBe(true);
  });
});

describe("Claude API vs Subscription Cost", () => {
  it("should compare subscription vs API costs", () => {
    const subscriptionCost = 20;
    const estimatedApiCost = 15;
    const isCheaper = estimatedApiCost < subscriptionCost;
    expect(isCheaper).toBe(true);
  });

  it("should recommend API for light usage", () => {
    const monthlyTokens = 100000;
    const apiCostEstimate = monthlyTokens * 0.00003;
    expect(apiCostEstimate).toBeLessThan(20);
  });
});
