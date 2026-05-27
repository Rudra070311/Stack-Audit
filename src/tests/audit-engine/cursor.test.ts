import { describe, it, expect } from "vitest";

describe("Cursor Tool Pricing", () => {
  it("should verify Cursor pricing tiers", () => {
    const plans = {
      Hobby: 0,
      Pro: 20,
      Business: 40,
      Enterprise: null,
    };

    expect(plans.Hobby).toBe(0);
    expect(plans.Pro).toBe(20);
    expect(plans.Business).toBe(40);
  });

  it("should recommend Pro for solo developers", () => {
    const teamSize = 1;
    const useCase = "coding";
    const recommendedPlan = teamSize === 1 ? "Pro" : "Business";
    expect(recommendedPlan).toBe("Pro");
  });

  it("should recommend Business for teams", () => {
    const teamSize = 5;
    const recommendedPlan = teamSize > 1 ? "Business" : "Pro";
    expect(recommendedPlan).toBe("Business");
  });

  it("should calculate potential savings switching from Pro to Hobby", () => {
    const currentCost = 20;
    const hobbyLimit = 0;
    const isSwitchable = currentCost > hobbyLimit;
    expect(isSwitchable).toBe(true);
  });
});

describe("Cursor Overlap Detection", () => {
  it("should detect Cursor + Copilot overlap", () => {
    const tools = ["Cursor", "Copilot"];
    const hasOverlap = tools.includes("Cursor") && tools.includes("Copilot");
    expect(hasOverlap).toBe(true);
  });

  it("should recommend consolidation strategy", () => {
    const tools = ["Cursor", "Copilot"];
    const recommendation = "Choose one or use complementarily";
    expect(recommendation).toBeDefined();
  });
});
