export function evaluateCursorRules(
  monthlySpend: number,
  teamSize: number
) {
  const spendPerDev = monthlySpend / Math.max(teamSize, 1);

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

  if (
    monthlySpend >= 180 &&
    teamSize >= 3
  ) {
    return {
      reductionPercent: 0.2,

      recommendation:
        "Cursor spend looks high for the current team size.",

      reasoning:
        "A mix of seat consolidation, license cleanup, and lower-tier plans could reduce waste without hurting productivity.",
    };
  }

  if (
    spendPerDev >= 40 &&
    teamSize >= 3
  ) {
    return {
      reductionPercent: 0.12,

      recommendation:
        "Cursor spend is slightly elevated for the current usage pattern.",

      reasoning:
        "A modest plan review may uncover inactive seats or over-allocated licenses.",
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