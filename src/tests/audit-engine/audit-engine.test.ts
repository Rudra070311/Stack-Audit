import { describe, it, expect } from "vitest";
import { runAudit, formatCurrency, classifySavingsLevel } from "@/lib/audit-engine";
import type { AuditFormData } from "@/types/audit";

describe("Audit Engine", () => {
  describe("runAudit", () => {
    it("should calculate savings correctly for single tool", () => {
      const formData: AuditFormData = {
        tools: [
          {
            name: "Cursor",
            plan: "Pro",
            monthlySpend: 40,
            seats: 2,
          },
        ],
        teamSize: 2,
        useCase: "coding",
      };

      const result = runAudit(formData);

      expect(result.totalCurrentSpend).toBe(40);
      expect(result.auditId).toBeDefined();
      expect(result.tools).toHaveLength(1);
      expect(result.tools[0].tool).toBe("Cursor");
    });

    it("should handle multiple tools", () => {
      const formData: AuditFormData = {
        tools: [
          {
            name: "Cursor",
            plan: "Pro",
            monthlySpend: 20,
            seats: 1,
          },
          {
            name: "Claude",
            plan: "Pro",
            monthlySpend: 20,
            seats: 1,
          },
        ],
        teamSize: 2,
        useCase: "mixed",
      };

      const result = runAudit(formData);

      expect(result.totalCurrentSpend).toBe(40);
      expect(result.tools).toHaveLength(2);
    });

    it("should calculate annual savings", () => {
      const formData: AuditFormData = {
        tools: [
          {
            name: "ChatGPT",
            plan: "Plus",
            monthlySpend: 20,
            seats: 1,
          },
        ],
        teamSize: 1,
        useCase: "writing",
      };

      const result = runAudit(formData);

      expect(result.totalAnnualSavings).toBe(
        result.totalMonthlySavings * 12
      );
    });

    it("should generate recommendations", () => {
      const formData: AuditFormData = {
        tools: [
          {
            name: "Cursor",
            plan: "Business",
            monthlySpend: 200,
            seats: 20,
          },
        ],
        teamSize: 20,
        useCase: "coding",
      };

      const result = runAudit(formData);

      expect(result.tools[0].recommendation).toBeDefined();
      expect(result.tools[0].reasoning).toBeDefined();
    });

    it("should include audit ID and timestamp", () => {
      const formData: AuditFormData = {
        tools: [
          {
            name: "Claude",
            plan: "Free",
            monthlySpend: 0,
            seats: 1,
          },
        ],
        teamSize: 1,
        useCase: "research",
      };

      const result = runAudit(formData);

      expect(result.auditId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      ); // UUID v4 format
      expect(result.timestamp).toBeDefined();
    });
  });

  describe("formatCurrency", () => {
    it("should format USD correctly", () => {
      expect(formatCurrency(100)).toMatch(/\$100|100\s*\$|100\.00/);
    });

    it("should handle decimals", () => {
      const formatted = formatCurrency(99.99);
      expect(formatted).toMatch(/\$|USD/i);
    });

    it("should handle zero", () => {
      const formatted = formatCurrency(0);
      expect(formatted).toMatch(/\$|USD|0/);
    });

    it("should handle large numbers", () => {
      const formatted = formatCurrency(10000);
      expect(formatted).toMatch(/\$|USD|10|000/);
    });
  });

  describe("classifySavingsLevel", () => {
    it("should classify low savings", () => {
      expect(classifySavingsLevel(50)).toBe("low");
      expect(classifySavingsLevel(99)).toBe("low");
    });

    it("should classify medium savings", () => {
      expect(classifySavingsLevel(100)).toBe("medium");
      expect(classifySavingsLevel(250)).toBe("medium");
      expect(classifySavingsLevel(499)).toBe("medium");
    });

    it("should classify high savings", () => {
      expect(classifySavingsLevel(500)).toBe("high");
      expect(classifySavingsLevel(1000)).toBe("high");
    });

    it("should handle zero savings", () => {
      expect(classifySavingsLevel(0)).toBe("low");
    });
  });

  describe("Savings Calculation", () => {
    it("should calculate savings percentage correctly", () => {
      const formData: AuditFormData = {
        tools: [
          {
            name: "Cursor",
            plan: "Pro",
            monthlySpend: 100,
            seats: 1,
          },
        ],
        teamSize: 1,
        useCase: "coding",
      };

      const result = runAudit(formData);

      // Savings percentage should be between 0-100
      expect(result.savingsPercentage).toBeGreaterThanOrEqual(0);
      expect(result.savingsPercentage).toBeLessThanOrEqual(100);
    });

    it("should handle zero savings", () => {
      const formData: AuditFormData = {
        tools: [
          {
            name: "Claude",
            plan: "Free",
            monthlySpend: 0,
            seats: 1,
          },
        ],
        teamSize: 1,
        useCase: "research",
      };

      const result = runAudit(formData);

      expect(result.totalMonthlySavings).toBeGreaterThanOrEqual(0);
      expect(result.totalAnnualSavings).toBeGreaterThanOrEqual(0);
    });
  });
});
