/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-roboto)"],
      serif: ["var(--font-open-sans)"],
    },
    colors: {
      brown: "#FFF1E4",
      darkbrown: "#F2DFCE",
      white: "#FFFFFF",
      black: "#000000",
      grey: "#808080",
      lightgrey: "#CCCCCC",
      blue: "rgb(0, 95, 204)",
    },
    extend: {
      boxShadow: {
        "project-showcase": "0 1em 1em rgb(0 0 0 / 10%)",
      },
      backgroundImage: {
        "tech-icon-gradient":
          "linear-gradient(var(--gradient-angle),#F2DFCE,#fff,silver,#F2DFCE)",
      },
      screens: {
        small: "550px",
        smaller: "400px",
      },
      transitionTimingFunction: {
        slider:
          "transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s, width 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s",
      },
      keyframes: {
        "gradient-rotate": {
          "0%": {
            "--gradient-angle": "360deg",
          },
          to: {
            "--gradient-angle": "0deg",
          },
        },
        scroll: {
          "0%": { transform: "translate(0)" },
          to: { transform: "translate(-50%)" },
        },
      },
      animation: {
        rotate: "gradient-rotate 5s linear 0s infinite reverse",
        scroll: "scroll 30s linear 3s infinite",
        "scroll-reverse": "scroll 30s linear 3s infinite reverse",
      },
    },
  },
  plugins: [],
};
