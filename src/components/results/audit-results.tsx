"use client";

import { useState, useEffect } from "react";
import { Copy, Download, Share2, TrendingDown, AlertCircle, CheckCircle2, Mail } from "lucide-react";
import type { AuditResult, PerToolAudit } from "@/types/audit";
import { formatCurrency, classifySavingsLevel } from "@/lib/audit-engine";

interface AuditResultsProps {
  audit: AuditResult;
  summary?: string;
  auditId: string;
}

export function AuditResults({ audit, summary, auditId }: AuditResultsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);

  useEffect(() => {
    // Create shareable URL
    const url = `${window.location.origin}/results/${auditId}`;
    setShareUrl(url);
  }, [auditId]);

  const savingsLevel = classifySavingsLevel(audit.totalAnnualSavings);
  const shareableLink = `${typeof window !== "undefined" ? window.location.origin : ""}/results/${auditId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadLoading(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          companyName,
          role,
          auditId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setLeadSubmitted(true);
      }
    } catch (error) {
      console.error("Failed to capture lead:", error);
    } finally {
      setLeadLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* Hero Section - Total Savings */}
      <div className="rounded-[2rem] border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-blue-950/40 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.3)] md:p-12 lg:p-14">
        <div className="mb-8 flex flex-col items-center gap-3 text-center md:flex-row md:justify-center md:text-left">
          <TrendingDown className="h-8 w-8 text-cyan-400" />
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Audit Results</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-zinc-950/30 px-4 py-5">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Monthly Savings</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-cyan-400">
              {formatCurrency(audit.totalMonthlySavings)}
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-950/30 px-4 py-5">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Annual Savings</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-green-400">
              {formatCurrency(audit.totalAnnualSavings)}
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-950/30 px-4 py-5">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Current Spend</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {formatCurrency(audit.totalCurrentSpend)}
              <span className="text-xs text-zinc-400">/mo</span>
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-950/30 px-4 py-5">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Optimization Potential</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-blue-400">
              {audit.savingsPercentage.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Savings Level Message */}
        {savingsLevel === "high" && (
          <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-4 py-3">
            <p className="text-sm text-emerald-300">
              🚀 <strong>High savings opportunity detected!</strong> Consider using Credex to
              capture more of these savings through automated optimization and credit management.
            </p>
          </div>
        )}

        {savingsLevel === "low" && (
          <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-950/30 px-4 py-3">
            <p className="text-sm text-blue-300">
              ✓ Your spending appears well-optimized. We'll notify you when new optimization
              opportunities become available for your stack.
            </p>
          </div>
        )}
      </div>

      {/* Per-Tool Breakdown */}
      <div className="space-y-5">
        <h3 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Per-Tool Breakdown
        </h3>

        {audit.tools.map((tool) => (
          <ToolAuditCard key={tool.tool} tool={tool} />
        ))}
      </div>

      {/* AI Summary */}
      {summary && (
        <div className="rounded-[1.75rem] border border-purple-500/30 bg-gradient-to-br from-purple-950/30 to-pink-950/20 p-6 sm:p-8">
          <h3 className="mb-4 flex items-center justify-center gap-2 text-center text-xl font-semibold text-white sm:text-2xl">
            📋 Personalized Summary
          </h3>
          <p className="mx-auto max-w-3xl text-center text-base leading-8 text-zinc-200 sm:text-lg">
            {summary}
          </p>
        </div>
      )}

      {/* Lead Capture - Email Gate */}
      {!leadSubmitted ? (
        <div className="rounded-[1.75rem] border border-purple-500/30 bg-gradient-to-br from-purple-950/30 to-pink-950/20 p-6 sm:p-8">
          <h3 className="mb-4 flex items-center justify-center gap-2 text-center text-xl font-semibold text-white sm:text-2xl">
            <Mail size={20} />
            Get Full Report via Email
          </h3>
          <p className="mb-5 text-center text-sm text-zinc-300 sm:text-base">
            Receive a detailed report with all findings and recommendations.
            We'll also notify you when new optimization opportunities arise.
          </p>
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company name (optional)"
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your role (optional)"
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={leadLoading || !email}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white transition-all hover:shadow-lg disabled:opacity-50"
              >
                {leadLoading ? "Sending..." : "Get Report"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-green-500/30 bg-gradient-to-br from-green-950/30 to-emerald-950/20 p-6 text-center sm:p-8">
          <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Report Sent!</h3>
          <p className="mt-2 text-sm text-zinc-300">
            Check your inbox at {email} for the full audit report.
          </p>
        </div>
      )}

      {/* Shareable Link Section */}
      {savingsLevel === "high" && (
        <div className="rounded-[1.75rem] border border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-cyan-950/20 p-6 sm:p-8">
          <h3 className="mb-4 flex items-center justify-center gap-2 text-center text-xl font-semibold text-white sm:text-2xl">
            <Share2 size={20} />
            Share Your Audit Results
          </h3>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={shareableLink}
              readOnly
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 sm:text-base"
            />
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3.5 font-medium text-white transition-all hover:bg-cyan-700"
            >
              <Copy size={18} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-zinc-400 sm:text-base">
            This link shows your audit results (sensitive data removed). Share it with your team
            or use it for reference.
          </p>
        </div>
      )}

      {/* Credex CTA for High Savings */}
      {savingsLevel === "high" && (
        <div className="rounded-[1.75rem] border border-green-500/30 bg-gradient-to-br from-green-950/30 to-emerald-950/20 p-6 text-center sm:p-8">
          <h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl">
            Ready to Capture These Savings?
          </h3>
          <p className="mx-auto mb-5 max-w-2xl text-sm text-zinc-300 sm:text-base">
            Use Credex to automate plan optimization and manage credits across your entire AI tool
            stack.
          </p>
          <a
            href="https://credex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-green-600 px-7 py-3.5 font-medium text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30"
          >
            Learn About Credex →
          </a>
        </div>
      )}
    </div>
  );
}

interface ToolAuditCardProps {
  tool: PerToolAudit;
}

function ToolAuditCard({ tool }: ToolAuditCardProps) {
  const hasSavings = tool.monthlySavings > 0;

  return (
    <div
      className={`rounded-[1.75rem] border p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] sm:p-8 ${
        hasSavings
          ? "border-orange-500/30 bg-gradient-to-br from-orange-950/30 to-red-950/20"
          : "border-green-500/30 bg-gradient-to-br from-green-950/30 to-emerald-950/20"
      }`}
    >
      <div className="mb-5 flex flex-col gap-4 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <h4 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{tool.tool}</h4>
            <span className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300">
              {tool.currentPlan}
            </span>
          </div>
          <p className="mt-2 text-sm text-zinc-400 sm:text-base">Current spend: {formatCurrency(tool.currentSpend)}/mo</p>
        </div>

        {hasSavings ? (
          <div className="rounded-xl bg-orange-950/50 px-4 py-3">
            <p className="text-xs text-orange-300">Potential Savings</p>
            <p className="text-xl font-bold tracking-tight text-orange-400 sm:text-2xl">
              {formatCurrency(tool.monthlySavings)}
              <span className="text-xs text-orange-300">/mo</span>
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl bg-green-950/50 px-4 py-3">
            <CheckCircle2 size={16} className="text-green-400" />
            <div>
              <p className="text-xs text-green-300">Optimized</p>
            </div>
          </div>
        )}
      </div>

      {/* Current vs Optimized */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-zinc-900/60 px-4 py-4 text-center">
          <p className="text-xs text-zinc-400">Current Plan</p>
          <p className="text-base font-semibold text-white">{tool.currentPlan}</p>
          <p className="text-2xl font-bold tracking-tight text-cyan-400 sm:text-3xl">
            {formatCurrency(tool.currentSpend)}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-900/60 px-4 py-4 text-center">
          <p className="text-xs text-zinc-400">Recommended Plan</p>
          <p className="text-base font-semibold text-white">{tool.optimizedPlan}</p>
          <p className="text-2xl font-bold tracking-tight text-blue-400 sm:text-3xl">
            {formatCurrency(tool.optimizedSpend)}
          </p>
        </div>
      </div>

      {/* Reasoning */}
      <div className="rounded-xl bg-zinc-800/30 px-4 py-4 sm:px-5">
        <p className="text-sm leading-8 text-zinc-300 sm:text-base">{tool.reasoning}</p>
      </div>

      {/* Alternatives */}
      {tool.alternatives && tool.alternatives.length > 0 && (
        <div className="mt-4">
          <p className="mb-3 text-sm font-medium text-zinc-300 sm:text-base">💡 Also Consider:</p>
          <div className="space-y-2">
            {tool.alternatives.map((alt) => (
              <div key={alt.tool} className="rounded-xl bg-zinc-800/30 px-4 py-3 text-sm">
                <p className="font-medium text-zinc-200 sm:text-base">
                  {alt.tool} ({alt.plan}) - {formatCurrency(alt.monthlySpend)}/mo
                </p>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">{alt.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}