interface ResultPageProps {
	params: {
		id: string;
	};
}

export default function ResultPage({
	params
}: ResultPageProps) {
	const mockAudit = {
		id: params.id,
		tool: "Claude",
		currentSpend: 300,
		optimizedSpend: 180,
		monthlySavings: 120,
		annualSavings: 1440,
		recommendation: "Your current setup appears overprovisioned for your team size.",
		reasoning: "Smaller teams can often reduce spend significantly through plan consolidation and lower-tier usage.",
		summary: "Your current AI tooling stack appears slightly oversized relative to your reported usage patterns. Consolidating subscriptions and moving selective workloads to lower-cost plans could reduce ongoing spend while preserving workflow quality.",
	}

	return(
		<main className = "min-h-screen bg-black px-6 py-16 text-white">
			<div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-10">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-wide text-zinc-500">
              AI Spend Audit
            </p>
            <h1 className="mt-2 text-5xl font-bold">
              Save $
              {mockAudit.monthlySavings}
              /mo
            </h1>
            <p className="mt-3 text-zinc-400">
              Estimated annual savings of $
              {mockAudit.annualSavings}
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-zinc-500">
                Tool
              </p>
              <p className="mt-1 text-xl">
                {mockAudit.tool}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">
                Recommendation
              </p>
              <p className="mt-1 text-xl">
                {mockAudit.recommendation}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">
                Reasoning
              </p>
              <p className="mt-1 text-zinc-300">
                {mockAudit.reasoning}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">
                AI Summary
              </p>
              <p className="mt-1 text-zinc-300">
                {mockAudit.summary}
              </p>
            </div>
            <div
              className=" rounded-2xl border border-zinc-800 bg-black/40 p-6">
              <p className="text-zinc-500">
                Current Spend
              </p>
              <p className="mt-2 text-3xl font-bold">
                $
                {mockAudit.currentSpend }
              </p>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[60%] rounded-full bg-white"/>
              </div>
              <div className="mt-6 flex justify-between text-sm text-zinc-500">
                <span>
                  Optimized: $
                  {mockAudit.optimizedSpend}
                </span>
                <span>
                  Savings: $
                  {mockAudit.monthlySavings}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}