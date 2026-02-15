import { createOpenAIClient } from "@/lib/openai/client";
import { buildShoppingMallPrompt } from "@/features/ai/promptTemplates";
import type { BusinessInfo, ShoppingMallContentSchema } from "@/features/ai/types";

export const generateShoppingMallContentWithOpenAI = async (
  businessInfo: BusinessInfo,
): Promise<ShoppingMallContentSchema> => {
  const client = createOpenAIClient();
  const prompt = buildShoppingMallPrompt(businessInfo);

  const completion = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: prompt.systemPrompt }],
      },
      {
        role: "user",
        content: [{ type: "input_text", text: prompt.userPrompt }],
      },
    ],
    text: {
      format: {
        type: "json_object",
      },
    },
  });

  const outputText = completion.output_text?.trim();

  if (!outputText) {
    throw new Error("OpenAI returned an empty response.");
  }

  const parsedContent = JSON.parse(outputText) as ShoppingMallContentSchema;
  return parsedContent;
};
