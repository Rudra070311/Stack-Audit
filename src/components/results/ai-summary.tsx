interface AISummaryProps {
  summary: string;
}

export function AISummary({
  summary,
}: AISummaryProps) {
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
        AI Summary
      </h3>

      <p
        className="
          mt-4 leading-7
          text-zinc-300
        "
      >
        {summary}
      </p>
    </div>
  );
}