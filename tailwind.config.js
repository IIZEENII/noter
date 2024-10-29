/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      dark: "#222222",
      constrast: "#F5F6F8",
      white: "#FFFFFF",
      gray: "#313137",
      transparent: "transparent",
    },
    extend: {
      screens: {
        small: "100px",
        phone: "320px",
        tablet: "640px",
        desktop: "1020px",
      }
    }
  },
  plugins: []
};