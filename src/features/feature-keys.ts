export const FEATURE_KEYS = ["auth", "billing", "notifications"] as const;

export type FeatureKey = (typeof FEATURE_KEYS)[number];
