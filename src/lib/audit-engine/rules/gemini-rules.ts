export function evaluateGeminiRules(
  monthlySpend: number
) {
  if (monthlySpend > 120) {
    return {
      reductionPercent: 0.18,

      recommendation:
        "Gemini spend could potentially be optimized.",

      reasoning:
        "Some workloads may not require premium-tier access continuously.",
    };
  }

  return {
    reductionPercent: 0,

    recommendation:
      "Gemini usage appears efficient.",

    reasoning:
      "No major inefficiencies detected.",
  };
}