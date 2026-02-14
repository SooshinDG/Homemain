import {
  buildShoppingMallPrompt,
  type ShoppingMallPromptTemplate,
} from "./promptTemplates";
import type { BusinessInfo, ShoppingMallContentSchema } from "./types";

export interface ContentGenerationInput {
  businessInfo: BusinessInfo;
  prompt: ShoppingMallPromptTemplate;
  generatedAt: Date;
}

export interface ContentGenerationProvider {
  generate(input: ContentGenerationInput): Promise<ShoppingMallContentSchema>;
}

export interface GenerateContentOptions {
  provider?: ContentGenerationProvider;
  now?: Date;
}

const ensureNonEmpty = (value: string, fieldName: keyof BusinessInfo): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`BusinessInfo.${fieldName} must be a non-empty string.`);
  }
  return trimmed;
};

const normalizeBusinessInfo = (input: BusinessInfo): BusinessInfo => {
  const keywords = input.keywords
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0);

  if (keywords.length === 0) {
    throw new Error("BusinessInfo.keywords must include at least one keyword.");
  }

  return {
    name: ensureNonEmpty(input.name, "name"),
    category: ensureNonEmpty(input.category, "category"),
    tone: ensureNonEmpty(input.tone, "tone"),
    target: ensureNonEmpty(input.target, "target"),
    keywords,
  };
};

class MockContentGenerationProvider implements ContentGenerationProvider {
  public async generate(
    input: ContentGenerationInput,
  ): Promise<ShoppingMallContentSchema> {
    const { businessInfo, prompt, generatedAt } = input;
    const [primaryKeyword, secondaryKeyword] = businessInfo.keywords;

    return {
      mallProfile: {
        businessName: businessInfo.name,
        category: businessInfo.category,
        brandTone: businessInfo.tone,
        targetAudience: businessInfo.target,
        keywords: businessInfo.keywords,
        valueProposition: `${businessInfo.name} delivers curated ${businessInfo.category.toLowerCase()} experiences for ${businessInfo.target}.`,
      },
      pageContent: {
        heroBanner: {
          title: `Discover ${businessInfo.name}`,
          subtitle: `A ${businessInfo.tone.toLowerCase()} destination for ${businessInfo.target} looking for ${primaryKeyword}.`,
          primaryCtaLabel: "Shop Featured Picks",
          primaryCtaLink: "/collections/featured",
          secondaryCtaLabel: "Explore Promotions",
          secondaryCtaLink: "/promotions",
        },
        brandStory: {
          title: `Why ${businessInfo.name}?`,
          summary: `${businessInfo.name} combines trusted brands, seamless browsing, and inspired collections in one place.`,
          details: [
            `Built around ${businessInfo.target} with a ${businessInfo.tone.toLowerCase()} voice.`,
            `Optimized product discovery around key themes like ${primaryKeyword}.`,
            `Regular campaign cycles to keep offerings fresh and relevant.`,
          ],
        },
        featuredCollections: [
          {
            name: `${primaryKeyword} Essentials`,
            description:
              "Handpicked best-sellers designed to improve confidence and convenience.",
            tags: [primaryKeyword, "best-seller", "editor-pick"],
            ctaLabel: "View Collection",
            ctaLink: "/collections/essentials",
          },
          {
            name: `${secondaryKeyword ?? primaryKeyword} New Arrivals`,
            description:
              "Fresh seasonal picks selected to align with current customer trends.",
            tags: [secondaryKeyword ?? primaryKeyword, "new", "trending"],
            ctaLabel: "See New Arrivals",
            ctaLink: "/collections/new-arrivals",
          },
        ],
        promotions: [
          {
            badge: "Limited Time",
            headline: "Weekend Savings Event",
            description:
              "Unlock exclusive bundle discounts and free shipping on selected collections.",
            validUntil: "2026-12-31",
            ctaLabel: "Claim Offer",
            ctaLink: "/promotions/weekend-savings",
          },
        ],
        trustSignals: [
          "Secure checkout with trusted payment providers",
          "Fast shipping and transparent delivery tracking",
          "Responsive customer support for every order",
        ],
        faq: [
          {
            question: "How quickly are orders processed?",
            answer:
              "Most orders are processed within 24 hours and include tracking details once shipped.",
          },
          {
            question: "Do you offer return support?",
            answer:
              "Yes. Eligible products can be returned within the stated return window in your order details.",
          },
        ],
        footerCallToAction: {
          title: "Start Shopping Smarter",
          description:
            "Browse curated collections and unlock deals tailored to your preferences.",
          ctaLabel: "Enter the Mall",
          ctaLink: "/shop",
        },
      },
      marketingContent: {
        seo: {
          title: `${businessInfo.name} | ${businessInfo.category} Shopping Mall`,
          description: `${businessInfo.name} is your go-to destination for ${businessInfo.keywords.join(", ")} crafted for ${businessInfo.target}.`,
          keywords: businessInfo.keywords,
        },
        socialPosts: [
          {
            platform: "instagram",
            text: `Fresh finds are live at ${businessInfo.name}. Explore the latest in ${primaryKeyword} today.`,
            hashtags: [
              "#shoponline",
              `#${primaryKeyword.replace(/\s+/g, "")}`,
              `#${businessInfo.category.replace(/\s+/g, "")}`,
            ],
          },
          {
            platform: "facebook",
            text: `Looking for trusted ${businessInfo.category.toLowerCase()} picks? ${businessInfo.name} has curated offers waiting for you.`,
            hashtags: ["#deals", "#newarrivals", "#shoppingmall"],
          },
        ],
        emailCampaign: {
          subject: `New at ${businessInfo.name}: curated picks for you`,
          preheader: `Explore top ${businessInfo.category.toLowerCase()} collections this week.`,
          body: [
            `Hi there,`,
            ``,
            `We just refreshed our featured collections with a focus on ${primaryKeyword} and value-packed bundles.`,
            `Visit ${businessInfo.name} now to discover limited-time offers selected for ${businessInfo.target}.`,
            ``,
            `See you inside,`,
            `${businessInfo.name} Team`,
          ].join("\n"),
          callToActionLabel: "Shop Now",
          callToActionLink: "/collections/featured",
        },
      },
      metadata: {
        source: "mock",
        model: "mock-content-generator-v1",
        promptVersion: prompt.promptVersion,
        generatedAt: generatedAt.toISOString(),
        schema: "shopping-mall-content.v1",
      },
    };
  }
}

const defaultProvider = new MockContentGenerationProvider();

export const generateContent = async (
  businessInfo: BusinessInfo,
  options: GenerateContentOptions = {},
): Promise<ShoppingMallContentSchema> => {
  const normalizedBusinessInfo = normalizeBusinessInfo(businessInfo);
  const prompt = buildShoppingMallPrompt(normalizedBusinessInfo);

  const provider = options.provider ?? defaultProvider;
  const generatedAt = options.now ?? new Date();

  return provider.generate({
    businessInfo: normalizedBusinessInfo,
    prompt,
    generatedAt,
  });
};
