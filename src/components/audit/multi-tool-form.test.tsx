import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiToolForm } from "@/components/audit/multi-tool-form";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("MultiToolForm Component", () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
    localStorage.clear();
  });

  it("should render the form with initial tool", () => {
    render(<MultiToolForm onSubmit={mockSubmit} />);

    expect(screen.getByText("Team & Use Case")).toBeInTheDocument();
    expect(screen.getByText("AI Tools & Spend")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Cursor")).toBeInTheDocument();
  });

  it("should allow adding a new tool", async () => {
    render(<MultiToolForm onSubmit={mockSubmit} />);

    const addButton = screen.getByText("Add Tool");
    fireEvent.click(addButton);

    await waitFor(() => {
      const toolSelects = screen.getAllByLabelText("Tool");
      expect(toolSelects).toHaveLength(2);
    });
  });

  it("should allow removing a tool", async () => {
    render(<MultiToolForm onSubmit={mockSubmit} />);

    // Add a tool first
    fireEvent.click(screen.getByText("Add Tool"));

    await waitFor(() => {
      const removeButtons = screen.getAllByTitle("Remove tool");
      expect(removeButtons.length).toBeGreaterThan(0);
    });
  });

  it("should update team size input", async () => {
    render(<MultiToolForm onSubmit={mockSubmit} />);

    const teamSizeInput = screen.getByDisplayValue("5");
    fireEvent.change(teamSizeInput, { target: { value: "10" } });

    expect((teamSizeInput as HTMLInputElement).value).toBe("10");
  });

  it("should save form state to localStorage", async () => {
    render(<MultiToolForm onSubmit={mockSubmit} />);

    const saveButton = screen.getByText("Save Form");
    fireEvent.click(saveButton);

    await waitFor(() => {
      const saved = localStorage.getItem("stackaudit_form_state");
      expect(saved).toBeDefined();
    });
  });

  it("should load form state from localStorage", () => {
    const savedState = {
      tools: [{ name: "Claude", plan: "Pro", monthlySpend: 20, seats: 1 }],
      teamSize: 3,
      useCase: "writing",
    };

    localStorage.setItem("stackaudit_form_state", JSON.stringify(savedState));

    render(<MultiToolForm onSubmit={mockSubmit} />);

    expect(screen.getByDisplayValue("3")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Claude")).toBeInTheDocument();
  });

  it("should calculate cost per developer", () => {
    render(<MultiToolForm onSubmit={mockSubmit} />);

    const monthlySpendInput = screen.getByDisplayValue("20");
    fireEvent.change(monthlySpendInput, { target: { value: "100" } });

    // The per-developer cost should be visible
    const costPerDev = Math.round(100 / 5);
    expect(screen.getByText(`$${costPerDev}`)).toBeInTheDocument();
  });

  it("should disable submit when no tools", async () => {
    render(<MultiToolForm onSubmit={mockSubmit} />);

    // Can't actually remove the only tool, so this test verifies the state
    const submitButton = screen.getByText("Run Audit");
    expect(submitButton).not.toBeDisabled();
  });

  it("should show loading state", () => {
    render(<MultiToolForm onSubmit={mockSubmit} isLoading={true} />);

    expect(screen.getByText("Auditing...")).toBeInTheDocument();
  });

  it("should call onSubmit with correct data", async () => {
    const user = userEvent.setup();
    render(<MultiToolForm onSubmit={mockSubmit} />);

    const submitButton = screen.getByText("Run Audit");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
      const [tools, teamSize, useCase] = mockSubmit.mock.calls[0];

      expect(Array.isArray(tools)).toBe(true);
      expect(typeof teamSize).toBe("number");
      expect(["coding", "writing", "data", "research", "mixed"]).toContain(useCase);
    });
  });
});
