# AI Prompts Documentation

## Summary Generation Prompt

Used by `/api/ai-summary` endpoint to generate personalized audit summaries using Claude API.

### Prompt Template

```
You are a financial advisor analyzing AI tool spending. Generate a precise 120-word personalized summary of audit results.

Company: {companyName}
Team Size: {teamSize} developers ({costPerDev}/dev/month)
Primary Use: {useCase}
Current Spend: ${currentMonthlySpend}/month (${annualSpend}/year)
Recommended: ${optimizedSpend}/month
Monthly Savings: ${monthlySavings} | Annual: ${annualSavings}

Tools:
{toolsList}

Format summary with: (1) Current cost analysis with per-developer breakdown, (2) Biggest savings opportunity with specific plan changes, (3) Implementation impact and annual ROI. Use numbers throughout. Be direct, actionable, encouraging. Avoid generic platitudes.
```

### Parameters

- `{companyName}`: Optional company name from lead form (defaults to "Unknown")
- `{teamSize}`: Number of developers on the team
- `{useCase}`: Primary use case (coding, writing, data, research, or mixed)
- `{currentMonthlySpend}`: Total current monthly AI tool spend in USD
- `{optimizedSpend}`: Recommended total monthly spend after optimization
- `{monthlySavings}`: Potential monthly savings (currentSpend - optimizedSpend)
- `{annualSavings}`: Potential annual savings (monthlySavings * 12)
- `{toolsList}`: Formatted list of current tools with costs

### Example Output

```
Your team of 8 developers is spending $240/month on AI tools, averaging $30 per developer. By consolidating to per-seat team plans where economical, you could reduce spend to $160/month—a $960 annual savings. Your biggest opportunity is Claude, where switching from individual Pro ($20) to Team plans ($25/seat for 2+ users) is actually slightly more expensive at 8 people, but you could save by using Claude's free tier for code review tasks and Pro only for complex reasoning. Consider this workflow adjustment alongside your team's actual usage patterns.
```

### Prompt Philosophy

- **Specific**: Include actual dollar amounts from the audit
- **Actionable**: Provide specific tools or plans to switch to
- **Contextual**: Reference the team size and use case
- **Honest**: Don't oversell savings or make false claims
- **Encouraging**: Help the user see the value in optimization

### Model Used

- **Primary**: Claude 3.5 Sonnet (`claude-3-5-sonnet-20241022`)
- **Fallback**: Templated summary (hardcoded) if Anthropic API unavailable

### Error Handling

If the Anthropic API call fails or returns an error:
1. The endpoint catches the error
2. Falls back to a hardcoded summary template
3. Returns `isTemplate: true` in response
4. The frontend treats templated summaries the same as AI-generated ones

### Template Fallback Logic

When API is unavailable, the fallback generates a summary that includes:
- Total team size and cost per developer
- Potential annual savings percentage (if savings exist)
- Identification of the largest optimization opportunity by tool
- Guidance to review the detailed per-tool breakdown

See `/src/app/api/ai-summary/route.ts` for implementation.

## Future Prompts

As the application expands, additional AI prompts may be added for:
- PDF report generation
- Executive summary creation
- Custom recommendation letters
- Benchmark comparisons
