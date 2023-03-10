/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      500: "325px",
    },
    extend: {
      colors: {
        sparksenseprimary: "#002A3A",
        sparksensesecondary: "#006186",
        sparksensethird: "#0099D3",
        sparksensefourth: "#194353",
        sparksensefifth: "#0099Q3",
        notFound: "#F2949C",
      },
      maxWidth: {
        "8xl": "96rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
