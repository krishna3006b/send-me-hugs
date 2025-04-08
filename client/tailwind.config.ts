import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: "Lato , sans-serif",
        inter: "Inter , sans-serif",
        popins: "Poppins , sans-serif",
        manrope: "Manrope , sans-serif",
        ibm: "IBM Plex Sans , sans-serif",
      },
      screens: {
        xss: {
          max: "374px",
        },
        xlg: {
          min: '844px',
        },
        xxl: {
          min: "1512px"
        }
      },
      backgroundColor: {
        "dark-cyan": "#062832",
      },
      colors: {
        "primary": {
          "500": "rgba(29, 210, 180, 1)"
        }
      }
    },
    screens: {
      "xs": { min: "375px" },
      "sm": { min: "480px" },
      "md": { min: "640px" },
      "lg": { min: "768px" },
      "xl": { min: "1024px" },
      "2xl": { min: "1280px" }
    },
  },
  plugins: [],
};
export default config;
