import type { FeatureModule } from "../contracts";
import type { BillingComponents } from "./components";
import type { BillingHooks } from "./hooks";
import { billingComponents } from "./components";
import { billingHooks } from "./hooks";

export { billingComponents } from "./components";
export { billingHooks } from "./hooks";
export type { BillingFeatureConfig, BillingFeatureState } from "./types";

export const billingFeature: FeatureModule<
  "billing",
  BillingComponents,
  BillingHooks
> = {
  key: "billing",
  title: "Billing",
  description: "Billing feature module scaffold.",
  components: billingComponents,
  hooks: billingHooks
};
