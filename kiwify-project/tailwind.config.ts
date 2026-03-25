import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kiwi: {
          50:  "#f0fdf0",
          100: "#dcfcdc",
          200: "#bbf7bb",
          300: "#86ef86",
          400: "#4ade4a",
          500: "#22c522",
          600: "#16a316",
          700: "#158015",
          800: "#166516",
          900: "#145314",
          950: "#052e05",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
