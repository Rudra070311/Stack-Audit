export function evaluateClaudeRules(
  monthlySpend: number,
  useCase: string
) {
  if (
    useCase === "writing" &&
    monthlySpend > 80
  ) {
    return {
      reductionPercent: 0.2,

      recommendation:
        "Claude spend may be higher than necessary for current writing workflows.",

      reasoning:
        "Lighter plans may provide sufficient capability for non-technical usage.",
    };
  }

  return {
    reductionPercent: 0,

    recommendation:
      "Claude usage appears reasonable.",

    reasoning:
      "Current spend aligns with reported usage.",
  };
}