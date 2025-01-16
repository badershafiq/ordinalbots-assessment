import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "gradient-x": "gradient-x 7s ease infinite",
      },
      backgroundImage: {
        my_bg_image: "url('../public/background.jpg')",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
