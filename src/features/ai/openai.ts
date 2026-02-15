import "server-only";

import OpenAI from "openai";
import { generateContent } from "./generateContent";
import { buildShoppingMallPrompt } from "./promptTemplates";
import type { BusinessInfo, ShoppingMallContentSchema } from "./types";

const OPENAI_DEFAULT_MODEL = "gpt-4.1-mini";

const safeParseJson = (payload: string): Record<string, unknown> | null => {
  try {
    const parsed = JSON.parse(payload) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const generateContentWithOpenAI = async (
  businessInfo: BusinessInfo,
): Promise<ShoppingMallContentSchema> => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return generateContent(businessInfo);
  }

  const model = process.env.OPENAI_MODEL ?? OPENAI_DEFAULT_MODEL;
  const prompt = buildShoppingMallPrompt(businessInfo);

  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model,
    temperature: 0.6,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: prompt.systemPrompt,
      },
      {
        role: "user",
        content: [
          prompt.userPrompt,
          "Return strictly valid JSON that matches the shopping-mall-content.v1 schema.",
          "Do not include markdown or commentary.",
        ].join("\n\n"),
      },
    ],
  });

  const rawContent = completion.choices[0]?.message?.content;
  if (!rawContent) {
    throw new Error("OpenAI did not return content.");
  }

  const parsed = safeParseJson(rawContent);
  if (!parsed) {
    throw new Error("OpenAI returned malformed JSON content.");
  }

  const generatedAt = new Date().toISOString();

  return {
    ...(parsed as ShoppingMallContentSchema),
    metadata: {
      source: "openai",
      model,
      promptVersion: prompt.promptVersion,
      generatedAt,
      schema: "shopping-mall-content.v1",
    },
  };
};
