export function getAlternativeSuggestion(
    tool: string
) {
    switch (tool.toLowerCase()) {
        case "cursor":
        return "Consider evaluating GitHub Copilot for lighter coding workflows.";

        case "chatgpt":
        return "Claude or Gemini may offer better pricing depending on usage patterns.";

        default:
        return "Current tooling appears reasonable for your use case.";
    }
}