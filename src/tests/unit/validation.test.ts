import { describe, it, expect } from "vitest";

describe("Form Validation", () => {
  it("should validate email format", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test("test@example.com")).toBe(true);
    expect(emailRegex.test("invalid-email")).toBe(false);
    expect(emailRegex.test("")).toBe(false);
  });

  it("should validate team size range", () => {
    const isValidTeamSize = (size: number) => size >= 1 && size <= 10000;
    expect(isValidTeamSize(5)).toBe(true);
    expect(isValidTeamSize(0)).toBe(false);
    expect(isValidTeamSize(10001)).toBe(false);
  });

  it("should validate spend amounts", () => {
    const isValidSpend = (spend: number) => spend >= 0;
    expect(isValidSpend(100)).toBe(true);
    expect(isValidSpend(0)).toBe(true);
    expect(isValidSpend(-50)).toBe(false);
  });

  it("should validate tool names", () => {
    const validTools = ["Cursor", "Claude", "ChatGPT", "Copilot", "Gemini"];
    expect(validTools.includes("Cursor")).toBe(true);
    expect(validTools.includes("InvalidTool")).toBe(false);
  });
});

describe("Use Case Validation", () => {
  it("should validate use case values", () => {
    const validUseCases = ["coding", "writing", "data", "research", "mixed"];
    expect(validUseCases.includes("coding")).toBe(true);
    expect(validUseCases.includes("invalid")).toBe(false);
  });
});
