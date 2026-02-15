import type { FeatureKey } from "./feature-keys";

export type FeatureDictionary = Readonly<Record<string, unknown>>;

export interface FeatureModule<
  TKey extends FeatureKey = FeatureKey,
  TComponents extends FeatureDictionary = FeatureDictionary,
  THooks extends FeatureDictionary = FeatureDictionary
> {
  readonly key: TKey;
  readonly title: string;
  readonly description: string;
  readonly components: TComponents;
  readonly hooks: THooks;
}
