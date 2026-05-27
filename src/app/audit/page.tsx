"use client";

import { useState } from "react";
import { MultiToolForm } from "@/components/audit/multi-tool-form";
import { AuditResults } from "@/components/results/audit-results";
import type { AuditFormData, AuditResult } from "@/types/audit";
import "../../../styles/audit-page.css";

export default function AuditPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [summary, setSummary] = useState("");
  const [auditId, setAuditId] = useState("");

  async function handleSubmit(
    tools: AuditFormData["tools"],
    teamSize: number,
    useCase: AuditFormData["useCase"]
  ) {
    setError("");
    setAudit(null);
    setSummary("");
    setLoading(true);

    try {
      // Run the audit
      const auditResponse = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tools,
          teamSize,
          useCase,
        }),
      });

      const auditData = await auditResponse.json();

      if (!auditData.success) {
        throw new Error(auditData.error || "Failed to run audit");
      }

      setAudit(auditData.audit);
      setAuditId(auditData.auditId);

      // Store audit for sharing
      try {
        await fetch("/api/share", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audit: auditData.audit,
          }),
        });
      } catch (shareError) {
        console.error("Failed to store audit for sharing:", shareError);
      }

      // Generate AI summary
      try {
        const summaryResponse = await fetch("/api/ai-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tools: auditData.audit.tools,
            totalCurrentSpend: auditData.audit.totalCurrentSpend,
            totalOptimizedSpend: auditData.audit.totalOptimizedSpend,
            totalMonthlySavings: auditData.audit.totalMonthlySavings,
            totalAnnualSavings: auditData.audit.totalAnnualSavings,
            teamSize: auditData.audit.teamSize,
            useCase: auditData.audit.useCase,
            savingsPercentage: auditData.audit.savingsPercentage,
          }),
        });

        const summaryData = await summaryResponse.json();
        if (summaryData.success) {
          setSummary(summaryData.summary);
        }
      } catch (summaryError) {
        console.error("Failed to generate summary:", summaryError);
        // Continue even if summary fails - use fallback
        setSummary(`Your team of ${auditData.audit.teamSize} is spending $${auditData.audit.totalCurrentSpend.toFixed(0)}/month on AI tools. We found potential savings of $${auditData.audit.totalMonthlySavings.toFixed(0)}/month ($${auditData.audit.totalAnnualSavings.toFixed(0)}/year). ${auditData.audit.savingsPercentage > 30 ? "Consider using Credex for automated optimization." : "Your stack appears well-optimized."}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-zinc-800/20 bg-zinc-950/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-400 shadow-[0_0_24px_rgba(34,211,238,0.25)]" />
              <span className="text-xl font-bold tracking-tight gradient-text">StackAudit</span>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-zinc-800/60 bg-zinc-900/50 px-2 py-2 text-[0.9rem] backdrop-blur-xl sm:flex">
              <a
                href="/"
                className="rounded-full px-4 py-2 text-zinc-400 transition-colors hover:bg-zinc-800/70 hover:text-cyan-300"
              >
                Home
              </a>
              <a href="/audit" className="rounded-full bg-cyan-500/10 px-4 py-2 font-medium text-cyan-300">
                Audit
              </a>
              <a
                href="/features"
                className="rounded-full px-4 py-2 text-zinc-400 transition-colors hover:bg-zinc-800/70 hover:text-cyan-300"
              >
                Features
              </a>
              <a
                href="/pricing"
                className="rounded-full px-4 py-2 text-zinc-400 transition-colors hover:bg-zinc-800/70 hover:text-cyan-300"
              >
                Pricing
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Header */}
          <div className="mx-auto mb-14 max-w-3xl space-y-5 text-center">
            <h1 className="text-5xl font-bold tracking-tight gradient-text sm:text-6xl">
              AI Tool Spend Audit
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
              Enter your current AI tool stack to discover optimization opportunities and save
              money.
            </p>
          </div>

          {/* Form or Results */}
          {!audit ? (
            <div className="rounded-[2rem] border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
              <MultiToolForm onSubmit={handleSubmit} isLoading={loading} />

              {error && (
                <div className="mt-6 rounded-xl border border-red-500/30 bg-red-950/30 px-5 py-4 text-red-300">
                  <p className="text-sm sm:text-base">Error: {error}</p>
                </div>
              )}
            </div>
          ) : (
            <AuditResults audit={audit} summary={summary} auditId={auditId} />
          )}

          {/* Show form edit button when results are displayed */}
          {audit && (
            <div className="mt-10 text-center">
              <button
                onClick={() => {
                  setAudit(null);
                  setSummary("");
                }}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-7 py-3.5 text-sm font-medium text-zinc-300 transition-all hover:border-cyan-500/50 hover:text-cyan-300 sm:text-base"
              >
                ← Back to Edit
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}