import type { ToolName } from "@/types/audit";

export interface PlanPrice {
  name: string;
  monthlyPrice: number;
  currency: string;
  pricePerSeat?: number;
  minSeats?: number;
  description?: string;
}

export interface ToolPricing {
  tool: ToolName;
  plans: Record<string, PlanPrice>;
  defaultPlan: string;
  costPerDevMetrics: {
    [key: string]: number; // plan -> cost per developer
  };
}

export const PRICING_CONFIG: Record<ToolName, ToolPricing> = {
  Cursor: {
    tool: "Cursor",
    plans: {
      Hobby: {
        name: "Hobby",
        monthlyPrice: 0,
        currency: "USD",
        description: "Free tier with basic features",
      },
      Pro: {
        name: "Pro",
        monthlyPrice: 20,
        currency: "USD",
        description: "500 uses/month, all models",
      },
      Business: {
        name: "Business",
        monthlyPrice: 40,
        currency: "USD",
        pricePerSeat: 10,
        minSeats: 4,
        description: "Team collaboration",
      },
      Enterprise: {
        name: "Enterprise",
        monthlyPrice: 0, // Custom pricing
        currency: "USD",
        description: "Custom infrastructure",
      },
    },
    defaultPlan: "Pro",
    costPerDevMetrics: {
      Hobby: 0,
      Pro: 20,
      Business: 10,
      Enterprise: 15, // Estimated average
    },
  },

  Copilot: {
    tool: "Copilot",
    plans: {
      Individual: {
        name: "Individual",
        monthlyPrice: 10,
        currency: "USD",
        description: "Single user, standard features",
      },
      Business: {
        name: "Business",
        monthlyPrice: 19,
        currency: "USD",
        pricePerSeat: 19,
        minSeats: 1,
        description: "Team management, enterprise security",
      },
      Enterprise: {
        name: "Enterprise",
        monthlyPrice: 0, // Custom pricing
        currency: "USD",
        pricePerSeat: 25, // Estimated
        description: "Dedicated support",
      },
    },
    defaultPlan: "Individual",
    costPerDevMetrics: {
      Individual: 10,
      Business: 19,
      Enterprise: 25,
    },
  },

  Claude: {
    tool: "Claude",
    plans: {
      Free: {
        name: "Free",
        monthlyPrice: 0,
        currency: "USD",
        description: "Limited usage (3 req/min)",
      },
      Pro: {
        name: "Pro",
        monthlyPrice: 20,
        currency: "USD",
        description: "Unlimited usage",
      },
      Max: {
        name: "Max",
        monthlyPrice: 200,
        currency: "USD",
        description: "Highest rate limits",
      },
      Team: {
        name: "Team",
        monthlyPrice: 25,
        currency: "USD",
        pricePerSeat: 25,
        minSeats: 2,
        description: "Team collaboration",
      },
      Enterprise: {
        name: "Enterprise",
        monthlyPrice: 0, // Custom
        currency: "USD",
        description: "Dedicated support",
      },
      API: {
        name: "API Direct",
        monthlyPrice: 0, // Usage-based
        currency: "USD",
        description: "Pay-as-you-go API",
      },
    },
    defaultPlan: "Pro",
    costPerDevMetrics: {
      Free: 0,
      Pro: 20,
      Max: 200,
      Team: 25,
      Enterprise: 50, // Estimated
      API: 15, // Estimated average for typical usage
    },
  },

  ChatGPT: {
    tool: "ChatGPT",
    plans: {
      Free: {
        name: "Free",
        monthlyPrice: 0,
        currency: "USD",
        description: "GPT-3.5 only, limited",
      },
      Plus: {
        name: "Plus",
        monthlyPrice: 20,
        currency: "USD",
        description: "GPT-4 access, unlimited",
      },
      Team: {
        name: "Team",
        monthlyPrice: 60,
        currency: "USD",
        pricePerSeat: 60,
        minSeats: 2,
        description: "Team workspace",
      },
      Enterprise: {
        name: "Enterprise",
        monthlyPrice: 0, // Custom
        currency: "USD",
        description: "Dedicated infrastructure",
      },
      API: {
        name: "API Direct",
        monthlyPrice: 0, // Usage-based
        currency: "USD",
        description: "Pay-as-you-go API",
      },
    },
    defaultPlan: "Plus",
    costPerDevMetrics: {
      Free: 0,
      Plus: 20,
      Team: 60,
      Enterprise: 100, // Estimated
      API: 20, // Estimated average
    },
  },

  Anthropic: {
    tool: "Anthropic",
    plans: {
      Free: {
        name: "Free",
        monthlyPrice: 0,
        currency: "USD",
        description: "API only, limited quota",
      },
      Pro: {
        name: "Pro",
        monthlyPrice: 20,
        currency: "USD",
        description: "Claude.ai Pro subscription",
      },
      Team: {
        name: "Team",
        monthlyPrice: 25,
        currency: "USD",
        pricePerSeat: 25,
        minSeats: 2,
        description: "Team collaboration",
      },
      Enterprise: {
        name: "Enterprise",
        monthlyPrice: 0, // Custom
        currency: "USD",
        description: "Dedicated support",
      },
      API: {
        name: "API Direct",
        monthlyPrice: 0, // Usage-based
        currency: "USD",
        description: "Pay-as-you-go API",
      },
    },
    defaultPlan: "API",
    costPerDevMetrics: {
      Free: 0,
      Pro: 20,
      Team: 25,
      Enterprise: 50,
      API: 12, // Estimated average
    },
  },

  OpenAI: {
    tool: "OpenAI",
    plans: {
      Free: {
        name: "Free",
        monthlyPrice: 0,
        currency: "USD",
        description: "API tier, limited",
      },
      "Pay-as-you-go": {
        name: "Pay-as-you-go",
        monthlyPrice: 0, // Usage-based
        currency: "USD",
        description: "API usage pricing",
      },
      Plus: {
        name: "Plus (ChatGPT)",
        monthlyPrice: 20,
        currency: "USD",
        description: "ChatGPT Plus web access",
      },
      Team: {
        name: "Team",
        monthlyPrice: 60,
        currency: "USD",
        pricePerSeat: 60,
        minSeats: 2,
        description: "Team workspace",
      },
      Enterprise: {
        name: "Enterprise",
        monthlyPrice: 0, // Custom
        currency: "USD",
        description: "Dedicated infrastructure",
      },
    },
    defaultPlan: "Pay-as-you-go",
    costPerDevMetrics: {
      Free: 0,
      "Pay-as-you-go": 25, // Estimated average
      Plus: 20,
      Team: 60,
      Enterprise: 100,
    },
  },

  Gemini: {
    tool: "Gemini",
    plans: {
      Free: {
        name: "Free",
        monthlyPrice: 0,
        currency: "USD",
        description: "50 requests/day limit",
      },
      Pro: {
        name: "Pro",
        monthlyPrice: 20,
        currency: "USD",
        description: "No rate limits",
      },
      Ultra: {
        name: "Ultra",
        monthlyPrice: 30,
        currency: "USD",
        description: "Highest capability model",
      },
      API: {
        name: "API",
        monthlyPrice: 0, // Usage-based
        currency: "USD",
        description: "Pay-as-you-go API",
      },
    },
    defaultPlan: "Pro",
    costPerDevMetrics: {
      Free: 0,
      Pro: 20,
      Ultra: 30,
      API: 10, // Estimated average
    },
  },

  Windsurf: {
    tool: "Windsurf",
    plans: {
      Free: {
        name: "Free",
        monthlyPrice: 0,
        currency: "USD",
        description: "Basic features",
      },
      Pro: {
        name: "Pro",
        monthlyPrice: 20,
        currency: "USD",
        description: "Advanced features",
      },
      Team: {
        name: "Team",
        monthlyPrice: 30,
        currency: "USD",
        pricePerSeat: 15,
        minSeats: 2,
        description: "Team collaboration",
      },
      Enterprise: {
        name: "Enterprise",
        monthlyPrice: 0, // Custom
        currency: "USD",
        description: "Dedicated infrastructure",
      },
    },
    defaultPlan: "Pro",
    costPerDevMetrics: {
      Free: 0,
      Pro: 20,
      Team: 15,
      Enterprise: 20,
    },
  },
};

/**
 * Get the cost per developer for a tool/plan combination
 * Considers team size to recommend appropriate plan types
 */
export function getCostPerDeveloper(
  tool: ToolName,
  plan: string,
  teamSize: number
): number {
  const toolConfig = PRICING_CONFIG[tool];
  if (!toolConfig) return 0;

  const planPrice = toolConfig.plans[plan];
  if (!planPrice) return 0;

  // For team plans with per-seat pricing
  if (planPrice.pricePerSeat) {
    return planPrice.pricePerSeat;
  }

  // For fixed monthly price with single users
  if (teamSize <= 1) {
    return planPrice.monthlyPrice;
  }

  // For fixed monthly price spread across team
  return planPrice.monthlyPrice / teamSize;
}

/**
 * Get recommended plan based on usage patterns
 */
export function getRecommendedPlan(
  tool: ToolName,
  teamSize: number,
  useCase: string
): string {
  const toolConfig = PRICING_CONFIG[tool];
  if (!toolConfig) return "Standard";

  // Heuristic: larger teams should use team plans if available
  if (teamSize > 3) {
    const teamPlan = Object.keys(toolConfig.plans).find(
      (p) => p.toLowerCase().includes("team") || p.toLowerCase().includes("business")
    );
    if (teamPlan) return teamPlan;
  }

  return toolConfig.defaultPlan;
}

/**
 * Check if a team size is appropriate for a given plan
 */
export function isAppropriateForTeamSize(
  plan: string,
  teamSize: number,
  pricingConfig: ToolPricing
): { isAppropriate: boolean; reason: string } {
  const planPrice = pricingConfig.plans[plan];
  if (!planPrice) {
    return { isAppropriate: false, reason: "Unknown plan" };
  }

  // Team plans with per-seat pricing are better for larger teams
  if (planPrice.pricePerSeat && teamSize > 1) {
    return {
      isAppropriate: true,
      reason: `Team plan scales well for ${teamSize} developers`,
    };
  }

  // Individual plans are better for solo developers
  if (!planPrice.pricePerSeat && teamSize === 1) {
    return {
      isAppropriate: true,
      reason: "Individual plan optimal for single developer",
    };
  }

  return { isAppropriate: false, reason: "Consider alternative plan for team size" };
}
