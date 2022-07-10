/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        excel: "#5C973E",
        image: "#679FB7",
        pdf: "#C4434C",
        word: "#2C8AC4",
        text: "#4D5599",
      },
      boxShadow: {
        excel: "0 4px 8px 0px rgba(18, 128, 69, 0.5)",
        image: "0 4px 8px 0px rgba(103, 159, 183, 0.5)",
        pdf: "0 4px 8px 0px rgba(196, 67, 76, 0.5)",
        word: "0 4px 8px 0px rgba(44, 138, 196, 0.5)",
        text: "0 4px 8px 0px rgba(77, 85, 153, 0.5)",
      },
    },
  },
  plugins: [],
};
