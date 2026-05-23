export function getDowngradeRecommendation(
    teamSize: number,
    monthlySpend: number
) {
    if (
        teamSize <= 2 &&
        monthlySpend > 100
    ) {
        return {
        optimizedSpend:
            monthlySpend * 0.7,

        recommendation:
            "Downgrading to a smaller plan could reduce unnecessary spend.",

        reasoning:
            "Current spend appears high relative to reported team size.",
        };
    }

    return {
        optimizedSpend:
        monthlySpend,

        recommendation:
        "Current setup appears efficient.",

        reasoning:
        "No significant overspending signals detected.",
    };
}