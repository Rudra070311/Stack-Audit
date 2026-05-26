interface SavingsHeroProps {
    monthlySavings: number;
    annualSavings: number;
}

export function SavingsHero({
    monthlySavings,
    annualSavings,
}: SavingsHeroProps) {
  return (
    <div
      className="
        rounded-3xl
        border border-zinc-800
        bg-zinc-900
        p-8
      "
    >
      <p
        className="
          text-sm text-zinc-400
        "
      >
        Estimated Savings
      </p>

      <h1
        className="
          mt-4 text-5xl
          font-bold text-white
        "
      >
        ${monthlySavings}/mo
      </h1>

      <p
        className="
          mt-3 text-zinc-300
        "
      >
        Around $
        {annualSavings}
        annually
      </p>
    </div>
  );
}