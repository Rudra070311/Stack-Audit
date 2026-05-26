interface RecommendationCardProps {
  title: string;

  reason: string;

  savings: number;
}

export function RecommendationCard({
  title,

  reason,

  savings,
}: RecommendationCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border border-zinc-800
        bg-zinc-900
        p-6
      "
    >
      <div
        className="
          flex items-center
          justify-between
        "
      >
        <h3
          className="
            text-lg font-semibold
            text-white
          "
        >
          {title}
        </h3>

        <span
          className="
            text-green-400
            font-medium
          "
        >
          Save ${savings}
        </span>
      </div>

      <p
        className="
          mt-3 text-zinc-400
        "
      >
        {reason}
      </p>
    </div>
  );
}