import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "rgb(0, 0, 0)",
        graphite: {
          950: "hsl(0, 0%, 3%)",
          900: "hsl(0, 0%, 7%)",
          800: "hsl(0, 0%, 12%)",
          700: "hsl(0, 0%, 18%)",
          600: "hsl(0, 0%, 28%)",
          500: "hsl(0, 0%, 40%)",
          400: "hsl(0, 0%, 55%)",
          300: "hsl(0, 0%, 70%)",
          200: "hsl(0, 0%, 85%)",
          100: "hsl(0, 0%, 95%)",
        },
      },
      fontWeight: {
        light: "300",
      },
    },
  },
};

export default config;
