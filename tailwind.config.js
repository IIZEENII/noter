/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      base: "#1B1B1F",
      constrast: "#252529",
      white: "#DCDCE5",
      gray: "#313137",
      transparent: "transparent",
      primary: "#D7D7F1",
      warning: "#FFF7E9",
      danger: "#FFEAE1",
      success: "#E9FFFF",
    },
    extend: {
      screens: {
        tablet: "640px"
      }
    }
  },
  plugins: []
};