import type { ThemeConfig } from "./types";

const defaultTheme: ThemeConfig = {
  name: "default",
  primaryColor: "#2563EB",
  secondaryColor: "#14B8A6",
  borderRadius: "md",
  layoutDensity: "comfortable",
  classes: {
    appShell: "bg-slate-50 text-slate-900",
    surface: "bg-white shadow-sm",
    mutedSurface: "bg-slate-100",
    border: "border border-slate-200",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    buttonPrimary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300",
    buttonSecondary:
      "bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 disabled:bg-teal-300",
    input:
      "bg-white border border-slate-300 placeholder:text-slate-400 focus:border-blue-500",
    focusRing: "focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2",
  },
};

export default defaultTheme;
