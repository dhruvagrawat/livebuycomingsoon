import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'pulse-custom': 'pulseCustom 1.5s infinite',

      },
      keyframes: {
        pulseCustom: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: '#FFB400' },
        },
      },
      fontFamily: {

        poppins: ['Poppins', 'sans-serif'], // Define Poppins properly

      },
    },
  },
  plugins: [],
} satisfies Config;
