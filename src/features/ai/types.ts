export type BusinessInfo = {
  name: string;
  category: string;
  tone: string;
  target: string;
  keywords: string[];
};

export type ContentSource = "mock" | "openai";

export interface HeroBannerContent {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
}

export interface BrandStoryContent {
  title: string;
  summary: string;
  details: string[];
}

export interface FeaturedCollectionContent {
  name: string;
  description: string;
  tags: string[];
  ctaLabel: string;
  ctaLink: string;
}

export interface PromotionContent {
  badge: string;
  headline: string;
  description: string;
  validUntil: string;
  ctaLabel: string;
  ctaLink: string;
}

export interface FaqContent {
  question: string;
  answer: string;
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string[];
}

export interface SocialPostContent {
  platform: "instagram" | "facebook" | "x" | "tiktok";
  text: string;
  hashtags: string[];
}

export interface EmailCampaignContent {
  subject: string;
  preheader: string;
  body: string;
  callToActionLabel: string;
  callToActionLink: string;
}

export interface ShoppingMallContentSchema {
  mallProfile: {
    businessName: string;
    category: string;
    brandTone: string;
    targetAudience: string;
    keywords: string[];
    valueProposition: string;
  };
  pageContent: {
    heroBanner: HeroBannerContent;
    brandStory: BrandStoryContent;
    featuredCollections: FeaturedCollectionContent[];
    promotions: PromotionContent[];
    trustSignals: string[];
    faq: FaqContent[];
    footerCallToAction: {
      title: string;
      description: string;
      ctaLabel: string;
      ctaLink: string;
    };
  };
  marketingContent: {
    seo: SeoContent;
    socialPosts: SocialPostContent[];
    emailCampaign: EmailCampaignContent;
  };
  metadata: {
    source: ContentSource;
    model: string;
    promptVersion: string;
    generatedAt: string;
    schema: "shopping-mall-content.v1";
  };
}
