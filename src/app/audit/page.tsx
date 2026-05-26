"use client";

import { useState } from "react";
import { MultiToolForm } from "@/components/audit/multi-tool-form";
import { AuditResults } from "@/components/results/audit-results";
import type { AuditFormData, AuditResult } from "@/types/audit";

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

      // Generate AI summary
      try {
        const summaryResponse = await fetch("/api/ai-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalCurrentSpend: auditData.audit.totalCurrentSpend,
            totalOptimizedSpend: auditData.audit.totalOptimizedSpend,
            totalAnnualSavings: auditData.audit.totalAnnualSavings,
            teamSize: auditData.audit.teamSize,
            useCase: auditData.audit.useCase,
            tools: auditData.audit.tools,
          }),
        });

        const summaryData = await summaryResponse.json();
        if (summaryData.success) {
          setSummary(summaryData.summary);
        }
      } catch (summaryError) {
        console.error("Failed to generate summary:", summaryError);
        // Continue even if summary fails
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-zinc-800/20 bg-zinc-950/60 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-400" />
              <span className="text-lg font-bold gradient-text">StackAudit</span>
            </div>
            <div className="hidden gap-8 sm:flex">
              <a href="/" className="text-zinc-400 hover:text-cyan-300 transition-colors">
                Home
              </a>
              <a href="/audit" className="text-cyan-300 font-medium">
                Audit
              </a>
              <a href="/features" className="text-zinc-400 hover:text-cyan-300 transition-colors">
                Features
              </a>
              <a href="/pricing" className="text-zinc-400 hover:text-cyan-300 transition-colors">
                Pricing
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="bg-zinc-950 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl font-bold gradient-text">AI Tool Spend Audit</h1>
            <p className="text-lg text-zinc-400">
              Enter your current AI tool stack to discover optimization opportunities and save
              money.
            </p>
          </div>

          {/* Form or Results */}
          {!audit ? (
            <div className="rounded-3xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 p-8">
              <MultiToolForm onSubmit={handleSubmit} isLoading={loading} />

              {error && (
                <div className="mt-6 rounded-lg border border-red-500/30 bg-red-950/30 px-4 py-3 text-red-300">
                  <p className="text-sm">Error: {error}</p>
                </div>
              )}
            </div>
          ) : (
            <AuditResults audit={audit} summary={summary} auditId={auditId} />
          )}

          {/* Show form edit button when results are displayed */}
          {audit && (
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setAudit(null);
                  setSummary("");
                }}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3 font-medium text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
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