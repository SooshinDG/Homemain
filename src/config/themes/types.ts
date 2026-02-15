export type ThemeName = "default" | "minimal" | "premium";

export type BorderRadiusToken = "none" | "sm" | "md" | "lg" | "xl";

export type LayoutDensity = "compact" | "comfortable" | "spacious";

export interface ThemeClassVariants {
  appShell: string;
  surface: string;
  mutedSurface: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  buttonPrimary: string;
  buttonSecondary: string;
  input: string;
  focusRing: string;
}

export interface ThemeConfig {
  name: ThemeName;
  primaryColor: string;
  secondaryColor: string;
  borderRadius: BorderRadiusToken;
  layoutDensity: LayoutDensity;
  classes: ThemeClassVariants;
}
