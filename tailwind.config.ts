import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          500: "#98908B",
          100: "#F8F4F0",
        },
        grey: {
          900: "#201F24",
          500: "#696868",
          300: "#B3B3B3",
          100: "#F2F2F2",
        },
        secondary: {
          green: "#277C78",
          yellow: "#F2CDAC",
          cyan: "#82C9D7",
          navy: "#626070",
          red: "#C94736",
          purple: "#826CB0",
        },
        purple: "#AF81BA",
        turquoise: "#597C7C",
        brown: "#93674F",
        magenta: "#934F6F",
        blue: "#3F82B2",
        navyGrey: "#97A0AC",
        armyGreen: "#7F9161",
        gold: "#CAB361",
        orange: "#BE6C49",
      },
      spacing: {
        "2xs": "0.25rem", // 4px
        xs: "0.5rem", // 8px
        sm: "0.75rem", // 12px
        md: "1rem", // 16px
        lg: "1.25rem", // 20px
        xl: "1.5rem", // 24px
        "2xl": "2rem", // 32px
        "3xl": "2.5rem", // 40px
      },
    },
  },
  plugins: [],
} satisfies Config;
