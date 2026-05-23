export function normalizeMonthlySpend(
    spend: number
) {
    if (Number.isNaN(spend)) {
        return 0;
    }

    return Math.max(spend, 0);
}

export function estimateOptimizedSpend(
    spend: number,
    reductionPercent: number
) {
    return spend * (1 - reductionPercent);
}