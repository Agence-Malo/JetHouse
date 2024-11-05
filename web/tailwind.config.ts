import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        management: "url('/graphics/images/services/management.webp')",
        charter: "url('/graphics/images/services/charter.webp')",
        consulting: "url('/graphics/images/services/consulting.webp')",
        "about-hero": "url('/graphics/images/about/hero.webp')",
        malta: "url('/graphics/images/about/malta.webp')",
        "falcon-temp": "url('/graphics/images/services/management.webp')",
        pattern: "url('/graphics/images/pattern.svg')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
