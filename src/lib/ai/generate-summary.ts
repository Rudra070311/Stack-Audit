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
  
  try {
    return await generateWithGithubModels(
      prompt
    );
  } catch (error) {
    console.error(
      "GitHub Models failed:",
      error
    );
  }

  try {
    return await generateWithOpenRouter(
      prompt
    );
  } catch (error) {
    console.error(
      "OpenRouter failed:",
      error
    );
  }
  return generateFallbackSummary({
    tool,
    monthlySavings,
    annualSavings,
  });
}
