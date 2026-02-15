import type { ThemeConfig } from "./types";

const premiumTheme: ThemeConfig = {
  name: "premium",
  primaryColor: "#7C3AED",
  secondaryColor: "#F59E0B",
  borderRadius: "xl",
  layoutDensity: "spacious",
  classes: {
    appShell: "bg-violet-950 text-violet-50",
    surface: "bg-violet-900/60 shadow-lg shadow-violet-950/30",
    mutedSurface: "bg-violet-900/30",
    border: "border border-violet-700/70",
    textPrimary: "text-violet-50",
    textSecondary: "text-violet-200",
    buttonPrimary:
      "bg-violet-500 text-violet-50 hover:bg-violet-400 active:bg-violet-600 disabled:bg-violet-700",
    buttonSecondary:
      "bg-amber-500 text-slate-900 hover:bg-amber-400 active:bg-amber-600 disabled:bg-amber-700",
    input:
      "bg-violet-950/40 border border-violet-500/40 placeholder:text-violet-300 focus:border-amber-400",
    focusRing: "focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-violet-950",
  },
};

export default premiumTheme;
