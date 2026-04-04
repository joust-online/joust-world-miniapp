interface SettlementInput {
  title: string;
  description: string | null;
  options: { joustType: number; label: string }[];
  strategy: string;
}

interface SettlementResult {
  winningJoustType: number;
  reasoning: string;
}

export async function determineOutcome(input: SettlementInput): Promise<SettlementResult> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Fallback: pick the first option (for demo/testing without an API key)
    return {
      winningJoustType: input.options[0].joustType,
      reasoning: "No AI API key configured — defaulted to first option for demo purposes.",
    };
  }

  const optionsList = input.options
    .map((o) => `  joustType ${o.joustType}: "${o.label}"`)
    .join("\n");

  const systemPrompt = `You are an AI arbiter for a prediction market. Your job is to determine the outcome of a pool based on real-world information.

Your settlement strategy: ${input.strategy}

You MUST respond with valid JSON only, no markdown, no explanation outside the JSON:
{"winningJoustType": <number>, "reasoning": "<brief explanation>"}`;

  const userPrompt = `Determine the outcome for this prediction market:

Title: ${input.title}
${input.description ? `Description: ${input.description}` : ""}

Options:
${optionsList}

Based on your knowledge and the settlement strategy, which option won? Respond with JSON only.`;

  if (process.env.OPENAI_API_KEY) {
    return callOpenAI(systemPrompt, userPrompt, apiKey, input.options);
  } else {
    return callAnthropic(systemPrompt, userPrompt, apiKey, input.options);
  }
}

async function callOpenAI(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
  options: { joustType: number; label: string }[],
): Promise<SettlementResult> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.1,
      max_tokens: 200,
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI API error: ${res.status}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  return parseAIResponse(content, options);
}

async function callAnthropic(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string,
  options: { joustType: number; label: string }[],
): Promise<SettlementResult> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Anthropic API error: ${res.status}`);
  }

  const data = await res.json();
  const content = data.content?.[0]?.text?.trim();
  return parseAIResponse(content, options);
}

function parseAIResponse(
  content: string | undefined,
  options: { joustType: number; label: string }[],
): SettlementResult {
  if (!content) {
    throw new Error("Empty AI response");
  }

  try {
    // Try to extract JSON from the response (handle markdown code blocks)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");

    const parsed = JSON.parse(jsonMatch[0]);
    const winningJoustType = Number(parsed.winningJoustType);
    const reasoning = String(parsed.reasoning || "AI determination");

    // Validate the winning type is a valid option
    const validTypes = options.map((o) => o.joustType);
    if (!validTypes.includes(winningJoustType)) {
      throw new Error(`Invalid winningJoustType: ${winningJoustType}`);
    }

    return { winningJoustType, reasoning };
  } catch (err) {
    throw new Error(`Failed to parse AI response: ${content}`);
  }
}
