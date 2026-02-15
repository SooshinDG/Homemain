import { BusinessInfo } from "./types";

export const SHOPPING_MALL_SCHEMA_NAME = "shopping-mall-content.v1" as const;
export const SHOPPING_MALL_PROMPT_VERSION = "shopping-mall-prompt.v1" as const;

export interface ShoppingMallPromptTemplate {
  schema: typeof SHOPPING_MALL_SCHEMA_NAME;
  promptVersion: typeof SHOPPING_MALL_PROMPT_VERSION;
  systemPrompt: string;
  userPrompt: string;
}

const formatKeywords = (keywords: string[]): string =>
  keywords.length > 0 ? keywords.join(", ") : "none provided";

export const buildShoppingMallPrompt = (
  businessInfo: BusinessInfo,
): ShoppingMallPromptTemplate => {
  const keywordList = formatKeywords(businessInfo.keywords);

  return {
    schema: SHOPPING_MALL_SCHEMA_NAME,
    promptVersion: SHOPPING_MALL_PROMPT_VERSION,
    systemPrompt: [
      "You are a senior ecommerce content strategist.",
      "Generate high-converting content for a shopping mall style website.",
      "Return JSON only and ensure every required field in the schema is present.",
    ].join(" "),
    userPrompt: [
      `Business Name: ${businessInfo.name}`,
      `Category: ${businessInfo.category}`,
      `Tone: ${businessInfo.tone}`,
      `Target Audience: ${businessInfo.target}`,
      `Keywords: ${keywordList}`,
      "Output schema: shopping-mall-content.v1",
    ].join("\n"),
  };
};
