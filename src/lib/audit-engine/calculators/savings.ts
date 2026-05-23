export function calculateMonthlySavings(
    currentSpend: number,
    optimizedSpend: number
) {
    return Math.max(
        currentSpend - optimizedSpend,
        0
    );
}

export function calculateAnnualSavings(
    monthlySavings: number
) {
    return monthlySavings * 12;
}