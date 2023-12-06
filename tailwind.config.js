/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0071b3",
        secondary: "#8AC5D0",
        tertiary: "#E8594F",
        dark: "#2A2C41",
        customYellow: "#F4D23E",
        toolbarcustom: "#0071B3",
      },
      backgroundImage: {
        "stroke-bg": "url('/src/assets/images/stroke.png')",
      },
      fontFamily: {
        custom: ["Poppins", "sans"],
      },
    },
  },
  plugins: [],
};
