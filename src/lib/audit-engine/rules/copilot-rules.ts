export function evaluateCopilotRules(
  monthlySpend: number,
  teamSize: number
) {
  if (
    teamSize <= 2 &&
    monthlySpend > 40
  ) {
    return {
      reductionPercent: 0.15,

      recommendation:
        "GitHub Copilot Business may not be necessary for smaller teams.",

      reasoning:
        "Individual plans could reduce spend while maintaining workflow quality.",
    };
  }

  return {
    reductionPercent: 0,

    recommendation:
      "Copilot configuration looks healthy.",

    reasoning:
      "Current spend aligns with expected usage.",
  };
}