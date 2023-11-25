/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    fontFamily: {
      'roboto': ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
