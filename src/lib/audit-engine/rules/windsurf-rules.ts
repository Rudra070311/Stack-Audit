export function evaluateWindsurfRules(
  monthlySpend: number,
  teamSize: number
) {
  if (
    monthlySpend > 70 &&
    teamSize <= 2
  ) {
    return {
      reductionPercent: 0.2,

      recommendation:
        "Windsurf spend appears slightly overprovisioned.",

      reasoning:
        "Current team size may not require higher-tier plans.",
    };
  }

  return {
    reductionPercent: 0,

    recommendation:
      "Windsurf setup appears healthy.",

    reasoning:
      "Current usage seems appropriately sized.",
  };
}