interface BenchmarkCardProps {
  currentSpend: number;

  benchmark: number;
}

export function BenchmarkCard({
  currentSpend,

  benchmark,
}: BenchmarkCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border border-zinc-800
        bg-zinc-900
        p-6
      "
    >
      <h3
        className="
          text-lg font-semibold
          text-white
        "
      >
        Spend Benchmark
      </h3>

      <p
        className="
          mt-3 text-zinc-400
        "
      >
        Your team spends $
        {currentSpend}
        /dev monthly on AI
        tooling.
      </p>

      <p
        className="
          mt-2 text-zinc-500
        "
      >
        Similar teams average
        around ${benchmark}.
      </p>
    </div>
  );
}