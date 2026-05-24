export interface PricingPlan {
    price: number | string | null;
    seats: number | null;
}

export interface PricingGroup {
    [plan: string]: PricingPlan;
}

export interface PricingMap {
    cursor: PricingGroup;
    copilot: PricingGroup;
    claude: PricingGroup;
    chatgpt: PricingGroup;
    anthropic: PricingGroup;
    openai: PricingGroup;
    gemini: PricingGroup;
    windsurf: PricingGroup;
}