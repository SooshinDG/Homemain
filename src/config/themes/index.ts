import defaultTheme from "./default";
import minimalTheme from "./minimal";
import premiumTheme from "./premium";
import type { ThemeConfig, ThemeName } from "./types";

export const themes: ThemeConfig[] = [defaultTheme, minimalTheme, premiumTheme];

export const themeMap: Record<ThemeName, ThemeConfig> = {
  default: defaultTheme,
  minimal: minimalTheme,
  premium: premiumTheme,
};

export const getThemeByName = (name: ThemeName): ThemeConfig => themeMap[name];

export const DEFAULT_THEME_NAME: ThemeName = "default";

export * from "./types";
