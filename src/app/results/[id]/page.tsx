import { notFound } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { getPublicAudit } from "@/lib/supabase";
import { AuditResults } from "@/components/results/audit-results";
import type { AuditResult } from "@/types/audit";
import type { StoredAudit } from "@/lib/supabase";

interface ResultsPageProps {
  params: {
    id: string;
  };
  searchParams?: {
    payload?: string;
  };
}

function decodeAuditPayload(payload?: string): AuditResult | null {
  if (!payload) {
    return null;
  }

  try {
    const decoded = Buffer.from(payload, "base64url").toString("utf8");
    return JSON.parse(decoded) as AuditResult;
  } catch (payloadError) {
    console.error("Failed to decode shared audit payload:", payloadError);
    return null;
  }
}

function buildExampleAuditResult(): AuditResult {
  return {
    auditId: "example",
    timestamp: new Date().toISOString(),
    tools: [
      {
        tool: "Cursor",
        plan: "Business",
        currentSpend: 200,
        currentPlan: "Business",
        optimizedPlan: "Pro",
        optimizedSpend: 40,
        monthlySavings: 160,
        annualSavings: 1920,
        recommendation: "Downgrade seats that do not need enterprise controls.",
        reasoning: "The team is paying for more than it appears to use.",
        alternatives: [],
      },
      {
        tool: "Claude",
        plan: "Pro",
        currentSpend: 20,
        currentPlan: "Pro",
        optimizedPlan: "Team",
        optimizedSpend: 15,
        monthlySavings: 5,
        annualSavings: 60,
        recommendation: "Move to Team when collaboration becomes routine.",
        reasoning: "Single-user Pro is fine for now, but shared usage can justify a team plan.",
        alternatives: [
          {
            tool: "ChatGPT",
            plan: "Plus",
            monthlySpend: 20,
            reason: "Comparable cost for individual use.",
          },
        ],
      },
    ],
    teamSize: 8,
    useCase: "coding",
    totalCurrentSpend: 220,
    totalOptimizedSpend: 55,
    totalMonthlySavings: 165,
    totalAnnualSavings: 1980,
    savingsPercentage: 75,
  };
}

function renderShell(content: ReactNode) {
  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-zinc-800/20 bg-zinc-950/60 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <BrandLogo href="/" showLabel={false} />
            <div className="hidden gap-8 sm:flex">
              <Link href="/" className="text-zinc-400 transition-colors hover:text-cyan-300">
                Home
              </Link>
              <Link href="/audit" className="text-zinc-400 transition-colors hover:text-cyan-300">
                Run Audit
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">{content}</div>
      </main>
    </>
  );
}

export async function generateMetadata({ params }: ResultsPageProps) {
  if (params.id === "example") {
    return {
      title: "Example Audit Report - StackAudit",
      description: "See a sample audit report with savings recommendations and share flow.",
    };
  }

  try {
    const audit = await getPublicAudit(params.id);

    if (!audit) {
      return {
        title: "Audit Not Found - StackAudit",
      };
    }

    const savings = audit.total_annual_savings;
    const title = `Saved $${Math.round(savings)}/year with StackAudit`;
    const description = `See how optimizing an AI tool stack saved $${Math.round(savings)} annually. Potential savings: $${Math.round(audit.total_monthly_savings)}/month.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
    };
  } catch {
    return {
      title: "StackAudit Results",
    };
  }
}

export default async function ResultsPage({ params, searchParams }: ResultsPageProps) {
  let audit: Omit<StoredAudit, "lead_id"> | null = null;
  try {
    audit = await getPublicAudit(params.id);
  } catch (fetchError) {
    console.error("Error fetching audit:", fetchError);
  }

  if (params.id === "example") {
    const auditResult = buildExampleAuditResult();

    return renderShell(
      <>
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Example Audit Report</h1>
          <p className="text-zinc-400">A sample result so the demo report button has a working destination.</p>
        </div>

        <AuditResults audit={auditResult} auditId={params.id} shareUrl={`/results/${params.id}`} />
      </>
    );
  }

  if (!audit) {
    const payloadAudit = decodeAuditPayload(searchParams?.payload);

    if (!payloadAudit) {
      notFound();
    }

    const auditResult: AuditResult = {
      auditId: params.id,
      timestamp: payloadAudit.timestamp || new Date().toISOString(),
      tools: payloadAudit.tools,
      teamSize: payloadAudit.teamSize,
      useCase: payloadAudit.useCase,
      totalCurrentSpend: payloadAudit.totalCurrentSpend,
      totalOptimizedSpend: payloadAudit.totalOptimizedSpend,
      totalMonthlySavings: payloadAudit.totalMonthlySavings,
      totalAnnualSavings: payloadAudit.totalAnnualSavings,
      savingsPercentage: payloadAudit.savingsPercentage,
    };

    return renderShell(
      <>
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Shared Audit Results</h1>
          <p className="text-zinc-400">
            View the optimization recommendations from this StackAudit analysis.
          </p>
        </div>

        <AuditResults
          audit={auditResult}
          auditId={params.id}
          shareUrl={`/results/${params.id}?payload=${searchParams?.payload || ""}`}
        />

        <div className="mt-12 rounded-[1.75rem] border border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-cyan-950/20 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Want to Implement These Savings?</h2>
          <p className="mb-6 text-zinc-300">
            Get personalized recommendations for your team and automatic implementation support.
          </p>
          <Link
            href="/audit"
            className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
          >
            Run Your Own Audit →
          </Link>
        </div>
      </>
    );
  }

  const auditResult: AuditResult = {
    auditId: params.id,
    timestamp: audit.created_at,
    tools: audit.tools_data as unknown as AuditResult["tools"],
    teamSize: audit.team_size,
    useCase: audit.use_case as AuditResult["useCase"],
    totalCurrentSpend: audit.total_current_spend,
    totalOptimizedSpend: audit.total_optimized_spend,
    totalMonthlySavings: audit.total_monthly_savings,
    totalAnnualSavings: audit.total_annual_savings,
    savingsPercentage: audit.savings_percentage,
  };

  return renderShell(
    <>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold gradient-text">Shared Audit Results</h1>
        <p className="text-zinc-400">
          View the optimization recommendations from this StackAudit analysis.
        </p>
      </div>

      <AuditResults audit={auditResult} auditId={params.id} shareUrl={`/results/${params.id}`} />

      <div className="mt-12 rounded-[1.75rem] border border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-cyan-950/20 p-8">
        <h2 className="mb-4 text-2xl font-bold text-white">Want to Implement These Savings?</h2>
        <p className="mb-6 text-zinc-300">
          Get personalized recommendations for your team and automatic implementation support.
        </p>
        <Link
          href="/audit"
          className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
        >
          Run Your Own Audit →
        </Link>
      </div>
    </>
  );
}