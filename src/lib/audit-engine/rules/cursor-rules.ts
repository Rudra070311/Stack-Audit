export function evaluateCursorRules(
  monthlySpend: number,
  teamSize: number
) {
  if (
    teamSize <= 2 &&
    monthlySpend >= 60
  ) {
    return {
      reductionPercent: 0.3,

      recommendation:
        "Cursor Business may be oversized for your current team.",

      reasoning:
        "Smaller teams often achieve similar productivity on lower-tier plans.",
    };
  }

  return {
    reductionPercent: 0,

    recommendation:
      "Current Cursor setup appears efficient.",

    reasoning:
      "No major optimization opportunity detected.",
  };
}