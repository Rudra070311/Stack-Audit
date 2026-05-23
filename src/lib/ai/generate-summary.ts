import generateFallbackSummary from "./fallback-summary";
import { generateWithGithubModels, generateWithOpenRouter} from "./provider";
import buildAuditPrompt from "./prompts";
interface GenerateSummaryParams {
  tool: string;
  monthlySpend: string;
  teamSize: string;
  useCase: string;
  monthlySavings?: number;
  annualSavings?: number;
  recommendation?: string;
}
export async function generateSummary({
  tool,
  monthlySpend,
  teamSize,
  useCase,
  monthlySavings,
  annualSavings,
  recommendation,
}: GenerateSummaryParams): Promise<string> {
  const prompt: string = buildAuditPrompt({
    tool,
    monthlySpend,
    teamSize,
    useCase,
    monthlySavings,
    annualSavings,
    recommendation,
  });
  if (process.env.OPENROUTER_API_KEY) {
    try {
      return await generateWithOpenRouter(prompt);
    } catch (error) {
      console.error("OpenRouter failed:", error);
    }
  } else {
    console.warn("OPENROUTER_API_KEY not set, skipping OpenRouter provider");
  }

  if (process.env.GITHUB_MODELS_TOKEN) {
    try {
      return await generateWithGithubModels(prompt);
    } catch (error) {
      console.error("GitHub Models failed:", error);
    }
  } else {
    console.warn("GITHUB_MODELS_TOKEN not set, skipping GitHub models provider");
  }
  return generateFallbackSummary({
    tool,
    monthlySavings,
    annualSavings,
  });
}
