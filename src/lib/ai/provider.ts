const OPENROUTER_URL =
  "https://openrouter.ai/api/v1/chat/completions";

const GITHUB_MODELS_URL =
  "https://models.inference.ai.azure.com/chat/completions";

const SYSTEM_PROMPT = `
You generate concise SaaS-style AI spend audit summaries.

Rules:
- Maximum 100 words
- One paragraph only
- No markdown
- No hype
- No emojis
- Professional tone
- Realistic financial language
`;

export async function generateWithOpenRouter(
  prompt: string
) {
  const response = await fetch(
    OPENROUTER_URL,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

        "Content-Type":
          "application/json",

        "HTTP-Referer":
          "https://stackaudit.vercel.app",

        "X-Title":
          "StackAudit",
      },

      body: JSON.stringify({
        model:
          "deepseek/deepseek-chat-v3-0324:free",

        temperature: 0.4,

        max_tokens: 140,

        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },

          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error =
      await response.text();

    throw new Error(
      `OpenRouter failed: ${error}`
    );
  }

  const data = await response.json();

  return data.choices?.[0]?.message
    ?.content;
}

export async function generateWithGithubModels(
  prompt: string
) {
  const response = await fetch(
    GITHUB_MODELS_URL,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.GITHUB_MODELS_TOKEN}`,

        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        model:
          "deepseek-ai/DeepSeek-V3",

        temperature: 0.4,

        max_tokens: 140,

        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },

          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error =
      await response.text();

    throw new Error(
      `GitHub Models failed: ${error}`
    );
  }

  const data = await response.json();

  return data.choices?.[0]?.message
    ?.content;
}