import { describe, it, expect } from "vitest";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/dates";

describe("Currency Utils", () => {
  it("should format currency correctly", () => {
    expect(formatCurrency(1000)).toBe("$1,000.00");
    expect(formatCurrency(1000.5)).toBe("$1,000.50");
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("should handle large numbers", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000.00");
  });

  it("should handle negative numbers", () => {
    expect(formatCurrency(-500)).toBe("-$500.00");
  });
});

describe("Date Utils", () => {
  it("should format dates correctly", () => {
    const date = new Date("2026-05-27");
    const formatted = formatDate(date);
    expect(formatted).toMatch(/May/);
  });

  it("should handle date strings", () => {
    const formatted = formatDate("2026-05-27");
    expect(formatted).toBeDefined();
  });
});
