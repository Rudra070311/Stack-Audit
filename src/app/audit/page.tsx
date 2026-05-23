"use client";

import { useState } from "react";
import { SubmitButton } from "../../components/audit/submit-button";
import { SpendInput } from "../../components/audit/spend-input";
import { TeamSize } from "../../components/audit/team-size";
import { ToolSelector } from "../../components/audit/tool-selector";
import { UseCaseSelector } from "../../components/audit/usecase-selector";
import { ValidationErrors } from "../../components/audit/validation-errors";

import type {
  AuditResult,
  ToolName,
  UseCase,
} from "../../types/audit";

export default function AuditPage() {
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

  const [audit, setAudit] =
    useState<AuditResult | null>(
      null
    );

  const [summary, setSummary] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    setAudit(null);

    setSummary("");

    if (monthlySpend <= 0) {
      setError(
        "Please enter a valid monthly spend."
      );

      return;
    }

    setLoading(true);

    try {
      const auditResponse =
        await fetch("/api/audit", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            tool,
            monthlySpend,
            teamSize,
            useCase,
          }),
        });

      const auditData =
        await auditResponse.json();

      if (!auditData.success) {
        throw new Error(
          auditData.error
        );
      }

      setAudit(auditData.audit);

      const summaryResponse =
        await fetch(
          "/api/ai-summary",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              tool,

              monthlySpend,

              teamSize,

              useCase,

              monthlySavings:
                auditData.audit
                  .monthlySavings,

              annualSavings:
                auditData.audit
                  .annualSavings,

              recommendation:
                auditData.audit
                  .recommendation,
            }),
          }
        );

      const summaryData =
        await summaryResponse.json();

      if (summaryData.success) {
        setSummary(
          summaryData.summary
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        "Failed to generate audit."
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="
            rounded-3xl border border-zinc-800
            bg-zinc-900/50 p-8
            backdrop-blur
          "
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold">
              StackAudit
            </h1>

            <p className="mt-3 text-zinc-400">
              Audit your AI stack and
              identify unnecessary spend
              across coding, writing,
              research, and API tooling.
            </p>
          </div>

          <div className="space-y-6">
            <ToolSelector
              value={tool}
              onChange={setTool}
            />

            <SpendInput
              value={monthlySpend}
              onChange={
                setMonthlySpend
              }
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

        {audit && (
          <div
            className="
              mt-10 rounded-3xl
              border border-zinc-800
              bg-zinc-900/50 p-8
            "
          >
            <div className="mb-8">
              <p className="text-sm uppercase tracking-wide text-zinc-500">
                Estimated Savings
              </p>

              <h2 className="mt-2 text-5xl font-bold">
                $
                {
                  audit.monthlySavings
                }
                /mo
              </h2>

              <p className="mt-2 text-zinc-400">
                Around $
                {
                  audit.annualSavings
                }{" "}
                annually
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-zinc-500">
                  Recommendation
                </p>

                <p className="mt-1 text-lg">
                  {
                    audit.recommendation
                  }
                </p>
              </div>

              <div>
                <p className="text-zinc-500">
                  Reasoning
                </p>

                <p className="mt-1 whitespace-pre-line text-zinc-300">
                  {audit.reasoning}
                </p>
              </div>

              {summary && (
                <div>
                  <p className="text-zinc-500">
                    AI Summary
                  </p>

                  <p className="mt-1 text-zinc-300">
                    {summary}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}