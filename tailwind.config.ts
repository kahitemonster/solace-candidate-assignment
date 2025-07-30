import type { Config } from "tailwindcss";

const config: Config = {
  // Enable manual toggle of dark mode via a 'dark' class on <html>
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "pulse-slow": { "0%, 100%": { opacity: "0.1" }, "50%": { opacity: "0.5" } },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out",
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
      },
      colors: { "solace-bg": "#F0F5FF" },
    },
  },
  plugins: [],
};

export default config;
