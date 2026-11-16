import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 50: "#f1f4f9", 100: "#dde4f0", 600: "#1f3a6b", 800: "#10224a", 900: "#0a1730" },
        emerald: { 50: "#ecfdf5", 600: "#059669", 700: "#047857" },
        gold: { 400: "#d4af37", 500: "#b8941f" },
        paper: "#f7f8fa",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;