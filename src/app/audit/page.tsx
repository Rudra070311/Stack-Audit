"use client";

import { useState } from "react";
import { SubmitButton } from "../../components/audit/submit-button";
import { SpendInput } from "../../components/audit/spend-input";
import { TeamSize } from "../../components/audit/team-size";
import { ToolSelector } from "../../components/audit/tool-selector";
import { UseCaseSelector } from "../../components/audit/usecase-selector";
import { ValidationErrors } from "../../components/audit/validation-errors";
import type { ToolName, UseCase } from "../../types/audit";

export default function AuditForm() {
  const [tool, setTool] =
    useState<ToolName>("Cursor");

  const [monthlySpend, setMonthlySpend] =
    useState(50);

  const [teamSize, setTeamSize] =
    useState(5);

  const [useCase, setUseCase] =
    useState<UseCase>("coding");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (monthlySpend <= 0) {
      setError(
        "Please enter a valid monthly spend."
      );

      return;
    }

    setLoading(true);

    const formData = {
      tool,
      monthlySpend,
      teamSize,
      useCase,
    };

    console.log(formData);

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-3xl border border-zinc-800
        bg-zinc-900/50 p-8
        backdrop-blur
      "
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white">
          Audit your AI stack
        </h2>

        <p className="mt-2 text-zinc-400">
          Analyze your tooling costs and
          identify wasted spend in under
          60 seconds.
        </p>
      </div>

      <div className="space-y-6">
        <ToolSelector
          value={tool}
          onChange={setTool}
        />

        <SpendInput
          value={monthlySpend}
          onChange={setMonthlySpend}
        />

        <TeamSize
          value={teamSize}
          onChange={setTeamSize}
        />

        <UseCaseSelector
          value={useCase}
          onChange={setUseCase}
        />

        <ValidationErrors
          message={error}
        />

        <SubmitButton
          loading={loading}
        />
      </div>
    </form>
  );
}