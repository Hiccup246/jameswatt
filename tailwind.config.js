/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-roboto)']
    },
    colors: {
      brown: "#FFF1E4",
      darkbrown: "#F2DFCE",
      white: "#FFFFFF",
      black: "#000000",
      grey: "#808080",
    }
  },
  plugins: [],
}
