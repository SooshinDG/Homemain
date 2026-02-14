import { authFeature } from "./auth";
import { billingFeature } from "./billing";
import { notificationsFeature } from "./notifications";
import type { FeatureModule } from "./contracts";
import { FEATURE_FLAGS } from "./feature-flags";
import { FEATURE_KEYS, type FeatureKey } from "./feature-keys";

const FEATURE_REGISTRY: Readonly<Record<FeatureKey, FeatureModule>> = {
  auth: authFeature,
  billing: billingFeature,
  notifications: notificationsFeature
} as const;

export const getFeatureModule = (key: FeatureKey): FeatureModule | null => {
  if (!FEATURE_FLAGS[key]) {
    return null;
  }

  return FEATURE_REGISTRY[key];
};

export const getEnabledFeatureModules = (): readonly FeatureModule[] =>
  FEATURE_KEYS.flatMap((key) => {
    const feature = getFeatureModule(key);
    return feature ? [feature] : [];
  });

export const getDisabledFeatureKeys = (): readonly FeatureKey[] =>
  FEATURE_KEYS.filter((key) => !FEATURE_FLAGS[key]);
