export function calculateSpendPerDeveloper(
    monthlySpend: number,
    teamSize: number
) {
    if (teamSize <= 0) return 0;

    return monthlySpend / teamSize;
}