import type { ThemeConfig } from "./types";

const minimalTheme: ThemeConfig = {
  name: "minimal",
  primaryColor: "#111827",
  secondaryColor: "#6B7280",
  borderRadius: "sm",
  layoutDensity: "compact",
  classes: {
    appShell: "bg-white text-slate-900",
    surface: "bg-white shadow-none",
    mutedSurface: "bg-slate-50",
    border: "border border-slate-200",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    buttonPrimary:
      "bg-slate-900 text-white hover:bg-slate-800 active:bg-black disabled:bg-slate-400",
    buttonSecondary:
      "bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400 disabled:bg-slate-100",
    input:
      "bg-white border border-slate-300 placeholder:text-slate-400 focus:border-slate-700",
    focusRing: "focus-visible:ring-2 focus-visible:ring-slate-500/40 focus-visible:ring-offset-2",
  },
};

export default minimalTheme;
