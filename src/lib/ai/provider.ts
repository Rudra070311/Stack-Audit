const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const GITHUB_MODELS_URL =
  "https://models.inference.ai.azure.com/chat/completions";

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL ||
  "deepseek/deepseek-chat-v3-0324:free";

const GITHUB_MODEL = process.env.GITHUB_MODEL ||
  "deepseek-ai/DeepSeek-V3";

const SYSTEM_PROMPT = `
You generate concise SaaS-style AI spend audit summaries.

Rules:
- Maximum 80 words
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
        model: OPENROUTER_MODEL,

        temperature: 0.2,

        max_completion_tokens: 256,

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

  const content =
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.text ||
    data?.output?.[0]?.content?.text ||
    data?.output?.[0]?.content ||
    data?.result?.[0]?.content ||
    null;

  if (!content) {
    throw new Error(
      `OpenRouter response missing content: ${JSON.stringify(
        data
      )}`
    );
  }

  return content;
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
        model: GITHUB_MODEL,

        temperature: 0.2,

        max_completion_tokens: 256,

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

  const content =
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.text ||
    data?.output?.[0]?.content?.text ||
    data?.output?.[0]?.content ||
    data?.result?.[0]?.content ||
    null;

  if (!content) {
    throw new Error(
      `GitHub Models response missing content: ${JSON.stringify(
        data
      )}`
    );
  }

  return content;
}