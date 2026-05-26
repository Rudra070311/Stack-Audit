"use client";

import { useState, useEffect } from "react";
import { Copy, Download, Share2, TrendingDown, AlertCircle, CheckCircle2 } from "lucide-react";
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

  return (
    <div className="space-y-8">
      {/* Hero Section - Total Savings */}
      <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-blue-950/40 p-8 md:p-12">
        <div className="mb-6 flex items-center gap-3">
          <TrendingDown className="h-8 w-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Audit Results</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-zinc-400">Monthly Savings</p>
            <p className="text-3xl font-bold text-cyan-400">
              {formatCurrency(audit.totalMonthlySavings)}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Annual Savings</p>
            <p className="text-3xl font-bold text-green-400">
              {formatCurrency(audit.totalAnnualSavings)}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Current Spend</p>
            <p className="text-2xl font-semibold text-white">
              {formatCurrency(audit.totalCurrentSpend)}
              <span className="text-xs text-zinc-400">/mo</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Optimization Potential</p>
            <p className="text-2xl font-semibold text-blue-400">
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
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">Per-Tool Breakdown</h3>

        {audit.tools.map((tool) => (
          <ToolAuditCard key={tool.tool} tool={tool} />
        ))}
      </div>

      {/* AI Summary */}
      {summary && (
        <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/30 to-pink-950/20 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            📋 Personalized Summary
          </h3>
          <p className="text-zinc-200 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Shareable Link Section */}
      {savingsLevel === "high" && (
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-cyan-950/20 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Share2 size={20} />
            Share Your Audit Results
          </h3>

          <div className="flex gap-3">
            <input
              type="text"
              value={shareableLink}
              readOnly
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-200 text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-3 font-medium text-white hover:bg-cyan-700 transition-all"
            >
              <Copy size={18} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <p className="mt-3 text-sm text-zinc-400">
            This link shows your audit results (sensitive data removed). Share it with your team
            or use it for reference.
          </p>
        </div>
      )}

      {/* CTA for High Savings */}
      {savingsLevel === "high" && (
        <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-950/30 to-emerald-950/20 p-6">
          <h3 className="mb-3 text-lg font-semibold text-white">
            Ready to Capture These Savings?
          </h3>
          <p className="mb-4 text-sm text-zinc-300">
            Use Credex to automate plan optimization and manage credits across your entire AI tool
            stack.
          </p>
          <a
            href="https://credex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30 transition-all"
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
      className={`rounded-2xl border p-6 ${
        hasSavings
          ? "border-orange-500/30 bg-gradient-to-br from-orange-950/30 to-red-950/20"
          : "border-green-500/30 bg-gradient-to-br from-green-950/30 to-emerald-950/20"
      }`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-semibold text-white">{tool.tool}</h4>
            <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300">
              {tool.currentPlan}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-400">Current spend: {formatCurrency(tool.currentSpend)}/mo</p>
        </div>

        {hasSavings ? (
          <div className="rounded-lg bg-orange-950/50 px-3 py-2">
            <p className="text-xs text-orange-300">Potential Savings</p>
            <p className="text-lg font-bold text-orange-400">
              {formatCurrency(tool.monthlySavings)}
              <span className="text-xs text-orange-300">/mo</span>
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-green-950/50 px-3 py-2 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-400" />
            <div>
              <p className="text-xs text-green-300">Optimized</p>
            </div>
          </div>
        )}
      </div>

      {/* Current vs Optimized */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-zinc-900/60 px-3 py-3">
          <p className="text-xs text-zinc-400">Current Plan</p>
          <p className="text-sm font-semibold text-white">{tool.currentPlan}</p>
          <p className="text-lg font-bold text-cyan-400">{formatCurrency(tool.currentSpend)}</p>
        </div>
        <div className="rounded-lg bg-zinc-900/60 px-3 py-3">
          <p className="text-xs text-zinc-400">Recommended Plan</p>
          <p className="text-sm font-semibold text-white">{tool.optimizedPlan}</p>
          <p className="text-lg font-bold text-blue-400">{formatCurrency(tool.optimizedSpend)}</p>
        </div>
      </div>

      {/* Reasoning */}
      <div className="rounded-lg bg-zinc-800/30 px-4 py-3">
        <p className="text-sm leading-relaxed text-zinc-300">{tool.reasoning}</p>
      </div>

      {/* Alternatives */}
      {tool.alternatives && tool.alternatives.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-zinc-300">💡 Also Consider:</p>
          <div className="space-y-2">
            {tool.alternatives.map((alt) => (
              <div key={alt.tool} className="rounded-lg bg-zinc-800/30 px-3 py-2 text-sm">
                <p className="font-medium text-zinc-200">
                  {alt.tool} ({alt.plan}) - {formatCurrency(alt.monthlySpend)}/mo
                </p>
                <p className="text-xs text-zinc-400">{alt.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
