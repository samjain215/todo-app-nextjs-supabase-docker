import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "app-purple": "#4154AA",
      "light-purple": "rgba(111, 99, 218, 0.2)",
      white: "#FFFFFF",
      "light-gray": "rgba(0, 0, 0, 0.50);",
      "label-gray": "#939090",
      "red-400": "#EF5350",
      "red-opacity": "#EF5350",
      "card-purple": "#7263E2",
      "card-green": "#75CB4C",
      "card-yellow": "#E8CA5E",
      "card-red": "#E85E5E",
      "back-gray": "#F4F4F4",
      error: "#FFE6E6",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
