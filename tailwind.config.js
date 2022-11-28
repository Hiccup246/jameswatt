/** @type {import("tailwindcss").Config} */
module.exports = {
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
      blue: "rgb(0, 95, 204)"
    },
    screens: {
      "small": "550px"
    },
    extend: {
      transitionTimingFunction: {
        'slider': 'transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s, width 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s',
      }
    } 
  },
  plugins: [],
}
