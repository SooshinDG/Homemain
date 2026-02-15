import type { FeatureModule } from "../contracts";
import type { NotificationsComponents } from "./components";
import type { NotificationsHooks } from "./hooks";
import { notificationsComponents } from "./components";
import { notificationsHooks } from "./hooks";

export { notificationsComponents } from "./components";
export { notificationsHooks } from "./hooks";
export type {
  NotificationsFeatureConfig,
  NotificationsFeatureState
} from "./types";

export const notificationsFeature: FeatureModule<
  "notifications",
  NotificationsComponents,
  NotificationsHooks
> = {
  key: "notifications",
  title: "Notifications",
  description: "Notifications feature module scaffold.",
  components: notificationsComponents,
  hooks: notificationsHooks
};
