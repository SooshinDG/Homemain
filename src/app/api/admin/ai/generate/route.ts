import { NextResponse } from "next/server";
import { generateContent } from "@/features/ai/generateContent";
import { generateContentWithOpenAI } from "@/features/ai/openai";
import type { BusinessInfo, ContentSource } from "@/features/ai/types";

type GenerateRequestBody = {
  businessInfo?: Partial<BusinessInfo>;
  source?: ContentSource;
};

const parseBusinessInfo = (body: GenerateRequestBody): BusinessInfo => {
  const keywords = Array.isArray(body.businessInfo?.keywords)
    ? body.businessInfo?.keywords.filter((keyword): keyword is string => typeof keyword === "string")
    : [];

  return {
    name: body.businessInfo?.name ?? "",
    category: body.businessInfo?.category ?? "",
    tone: body.businessInfo?.tone ?? "",
    target: body.businessInfo?.target ?? "",
    keywords,
  };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequestBody;
    const businessInfo = parseBusinessInfo(body);
    const source: ContentSource = body.source === "openai" ? "openai" : "mock";

    const content =
      source === "openai"
        ? await generateContentWithOpenAI(businessInfo)
        : await generateContent(businessInfo);

    return NextResponse.json(content, {
      status: 200,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to generate AI content.",
      },
      { status: 400 },
    );
  }
}
