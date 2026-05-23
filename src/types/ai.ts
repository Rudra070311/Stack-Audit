export interface AISummaryRequest {
  tool: string;
  monthlySpend: string;
  teamSize: string;
  useCase: string;
  monthlySavings: number;
  annualSavings: number;
  recommendation: string;
}

export interface AISummaryResponse {
  success: boolean;
  summary?: string;
  error?: string;
}

export interface AIProviderResponse {
  id?: string;
  choices?: {
    message?: {
      content?: string;
    };
  }[];
}