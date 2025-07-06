/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // fontFamily: {
    //   sans: ["var(--font-roboto)"],
    //   serif: ["var(--font-open-sans)"],
    // },
    colors: {
      brown: "#FFF1E4",
      darkbrown: "#F2DFCE",
      white: "#FFFFFF",
      black: "#000000",
      grey: "#808080",
      lightgrey: "#CCCCCC",
      softwhite: "#d7dce2",
      darkgrey: "#2C3639",
      darkteal: "#3F4E4F",
    },
    extend: {
      backgroundImage: {
        "tech-icon-gradient":
          "linear-gradient(var(--gradient-angle),#F2DFCE,#fff,silver,#F2DFCE)",
        "dark-tech-icon-gradient":
          "linear-gradient(var(--gradient-angle),#2C3639,#fff,silver,#2C3639)",
      },
      screens: {
        small: "550px",
        smaller: "400px",
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
