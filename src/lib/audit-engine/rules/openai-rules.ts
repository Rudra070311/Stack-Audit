export function evaluateOpenAIRules(
  monthlySpend: number,
  teamSize: number
) {
  if (
    monthlySpend > 300 &&
    teamSize <= 3
  ) {
    return {
      reductionPercent: 0.25,

      recommendation:
        "OpenAI spend appears high relative to team size.",

      reasoning:
        "Usage consolidation or lower-cost models may reduce costs significantly.",
    };
  }

  return {
    reductionPercent: 0,

    recommendation:
      "OpenAI usage appears balanced.",

    reasoning:
      "No abnormal API usage patterns inferred.",
  };
}