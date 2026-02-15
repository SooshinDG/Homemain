import type { FeatureModule } from "../contracts";
import type { AuthComponents } from "./components";
import type { AuthHooks } from "./hooks";
import { authComponents } from "./components";
import { authHooks } from "./hooks";

export { authComponents } from "./components";
export { authHooks } from "./hooks";
export type { AuthFeatureConfig, AuthFeatureState } from "./types";

export const authFeature: FeatureModule<"auth", AuthComponents, AuthHooks> = {
  key: "auth",
  title: "Authentication",
  description: "Authentication feature module scaffold.",
  components: authComponents,
  hooks: authHooks
};
