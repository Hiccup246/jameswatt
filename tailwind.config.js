/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-roboto)"],
      serif: ["var(--font-open-sans)"]
    },
    colors: {
      brown: "#FFF1E4",
      darkbrown: "#F2DFCE",
      white: "#FFFFFF",
      black: "#000000",
      grey: "#808080",
      lightgrey: "rgb(228 228 231)",
      blue: "rgb(0, 95, 204)"
    },
    extend: {
      backgroundImage: {
        'tech-icon-gradient': "linear-gradient(var(--gradient-angle),#F2DFCE,#fff,silver,#F2DFCE)",
      },
      screens: {
        "small": "550px",
        "smaller": "400px"
      },
      transitionTimingFunction: {
        "slider": "transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s, width 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translate(0)" },
          "to": { transform: "translate(calc(var(--slider-item-width)*-1*var(--slider-items)))" },
        },
        "gradient-rotate": {
         "0%": {
            "--gradient-angle":"360deg"
          },
          "to": {
            "--gradient-angle":"0deg"
          }
        }
      },
      animation: {
        scroll: "scroll 30s linear 3s infinite",
        "scroll-reverse": "scroll 30s linear 3s infinite reverse",
        rotate: "gradient-rotate 5s linear 0s infinite reverse"
      }
    } 
  },
  plugins: [],
}
