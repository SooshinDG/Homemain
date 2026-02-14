import type { FeatureKey } from "./feature-keys";

export type FeatureFlags = Readonly<Record<FeatureKey, boolean>>;

export const FEATURE_FLAGS: FeatureFlags = {
  auth: true,
  billing: false,
  notifications: true
} as const;
