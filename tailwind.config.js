/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    darkMode: 'selector',
    extend: {},
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
