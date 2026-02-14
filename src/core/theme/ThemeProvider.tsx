import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_THEME_NAME,
  getThemeByName,
  themes,
  type BorderRadiusToken,
  type LayoutDensity,
  type ThemeClassVariants,
  type ThemeConfig,
  type ThemeName,
} from "../../config/themes";

interface DensityClasses {
  appShell: string;
  surface: string;
  button: string;
  input: string;
}

const densityClassMap: Record<LayoutDensity, DensityClasses> = {
  compact: {
    appShell: "text-sm",
    surface: "p-3",
    button: "px-3 py-1.5 text-sm",
    input: "px-3 py-1.5 text-sm",
  },
  comfortable: {
    appShell: "text-base",
    surface: "p-4",
    button: "px-4 py-2 text-sm",
    input: "px-4 py-2 text-sm",
  },
  spacious: {
    appShell: "text-base lg:text-lg",
    surface: "p-6",
    button: "px-5 py-2.5 text-base",
    input: "px-5 py-2.5 text-base",
  },
};

const radiusClassMap: Record<BorderRadiusToken, string> = {
  none: "rounded-none",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const radiusCssValueMap: Record<BorderRadiusToken, string> = {
  none: "0px",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
};

const joinClasses = (
  ...classes: Array<string | null | undefined | false>
): string => classes.filter(Boolean).join(" ");

export type ThemeClassSlot = keyof ThemeClassVariants;

export interface ResolvedThemeClasses extends ThemeClassVariants {
  density: string;
  radius: string;
}

export interface ThemeContextValue {
  theme: ThemeConfig;
  themeName: ThemeName;
  availableThemes: ThemeName[];
  classes: ResolvedThemeClasses;
  setTheme: (themeName: ThemeName) => void;
  getThemeClass: (
    slot: ThemeClassSlot,
    ...extraClasses: Array<string | null | undefined | false>
  ) => string;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  selectedTheme?: ThemeName;
  defaultTheme?: ThemeName;
  onThemeChange?: (themeName: ThemeName) => void;
  className?: string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const availableThemes = themes.map((theme) => theme.name);

const resolveThemeClasses = (theme: ThemeConfig): ResolvedThemeClasses => {
  const densityClasses = densityClassMap[theme.layoutDensity];
  const radiusClass = radiusClassMap[theme.borderRadius];

  return {
    appShell: joinClasses(theme.classes.appShell, densityClasses.appShell),
    surface: joinClasses(theme.classes.surface, theme.classes.border, densityClasses.surface, radiusClass),
    mutedSurface: joinClasses(theme.classes.mutedSurface, radiusClass),
    border: theme.classes.border,
    textPrimary: theme.classes.textPrimary,
    textSecondary: theme.classes.textSecondary,
    buttonPrimary: joinClasses(
      theme.classes.buttonPrimary,
      densityClasses.button,
      radiusClass,
      theme.classes.focusRing,
      "transition-colors duration-150",
    ),
    buttonSecondary: joinClasses(
      theme.classes.buttonSecondary,
      densityClasses.button,
      radiusClass,
      theme.classes.focusRing,
      "transition-colors duration-150",
    ),
    input: joinClasses(
      theme.classes.input,
      densityClasses.input,
      radiusClass,
      theme.classes.focusRing,
      "transition-colors duration-150",
    ),
    focusRing: theme.classes.focusRing,
    density: densityClasses.appShell,
    radius: radiusClass,
  };
};

export function ThemeProvider({
  children,
  selectedTheme,
  defaultTheme = DEFAULT_THEME_NAME,
  onThemeChange,
  className,
}: ThemeProviderProps): React.JSX.Element {
  const [internalThemeName, setInternalThemeName] = useState<ThemeName>(
    defaultTheme,
  );

  const activeThemeName = selectedTheme ?? internalThemeName;
  const activeTheme = getThemeByName(activeThemeName);
  const classes = useMemo(
    () => resolveThemeClasses(activeTheme),
    [activeTheme],
  );

  const setTheme = useCallback(
    (themeName: ThemeName) => {
      if (!selectedTheme) {
        setInternalThemeName(themeName);
      }
      onThemeChange?.(themeName);
    },
    [onThemeChange, selectedTheme],
  );

  const getThemeClass = useCallback(
    (
      slot: ThemeClassSlot,
      ...extraClasses: Array<string | null | undefined | false>
    ): string => joinClasses(classes[slot], ...extraClasses),
    [classes],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: activeTheme,
      themeName: activeThemeName,
      availableThemes,
      classes,
      setTheme,
      getThemeClass,
    }),
    [activeTheme, activeThemeName, classes, getThemeClass, setTheme],
  );

  const rootStyle = useMemo(
    () =>
      ({
        "--theme-primary": activeTheme.primaryColor,
        "--theme-secondary": activeTheme.secondaryColor,
        "--theme-radius": radiusCssValueMap[activeTheme.borderRadius],
      }) as React.CSSProperties,
    [activeTheme.borderRadius, activeTheme.primaryColor, activeTheme.secondaryColor],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-theme={activeTheme.name}
        className={joinClasses(
          "min-h-screen transition-colors duration-200",
          classes.appShell,
          className,
        )}
        style={rootStyle}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const useThemeClasses = (): ResolvedThemeClasses => useTheme().classes;
