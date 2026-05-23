import { BENCHMARK_SPEND_PER_DEV } from "../constants";

export function evaluateSpendBenchmark(
    spendPerDev: number
) {
    if (
        spendPerDev >
        BENCHMARK_SPEND_PER_DEV
    ) {
        return {
        status: "high",

        message:
            "Your AI spend per developer is above benchmark averages.",
        };
    }

    return {
        status: "healthy",

        message:
        "Your AI spend per developer appears healthy.",
    };
}