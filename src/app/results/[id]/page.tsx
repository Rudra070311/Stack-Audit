import { notFound } from "next/navigation";
import { getPublicAudit } from "@/lib/supabase";
import { AuditResults } from "@/components/results/audit-results";

interface ResultsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ResultsPageProps) {
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
  } catch (error) {
    return {
      title: "StackAudit Results",
    };
  }
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  let audit;
  try {
    audit = await getPublicAudit(params.id);
  } catch (error) {
    console.error("Error fetching audit:", error);
  }

  if (!audit) {
    notFound();
  }

  // Reconstruct AuditResult from stored data
  const auditResult = {
    auditId: params.id,
    timestamp: audit.created_at,
    tools: audit.tools_data as any,
    teamSize: audit.team_size,
    useCase: audit.use_case as any,
    totalCurrentSpend: audit.total_current_spend,
    totalOptimizedSpend: audit.total_optimized_spend,
    totalMonthlySavings: audit.total_monthly_savings,
    totalAnnualSavings: audit.total_annual_savings,
    savingsPercentage: audit.savings_percentage,
  };

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
              <a href="/audit" className="text-zinc-400 hover:text-cyan-300 transition-colors">
                Run Audit
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="bg-zinc-950 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Shared Audit Results</h1>
            <p className="text-zinc-400">
              View the optimization recommendations from this StackAudit analysis.
            </p>
          </div>

          <AuditResults audit={auditResult} auditId={params.id} />

          {/* Lead Capture CTA */}
          <div className="mt-12 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-cyan-950/20 p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Want to Implement These Savings?
            </h2>
            <p className="mb-6 text-zinc-300">
              Get personalized recommendations for your team and automatic implementation support.
            </p>
            <a
              href="/audit"
              className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all"
            >
              Run Your Own Audit →
            </a>
          </div>
        </div>
      </main>
    </>
  );
}