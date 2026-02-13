import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/bg.png')",
        "dashboard-pattern": "url('/img1.png')",
      },
      colors: {
        /* Primary */
        "persebaya-primary": "#005A2C",
        "persebaya-primary-hover": "#00A24C",

        /* Accent */
        "persebaya-accent": "#FFD700",

        /* Semantic */
        "persebaya-error": "#FF2A2A",
        "persebaya-link": "#0000FF",

        /* Neutral */
        "persebaya-secondary": "#E5E5E5",
        "persebaya-text": "#1A1A1A",
        "persebaya-bg": "#F2F4F7",
      },
    },
  },
  plugins: [],
};

export default config;
