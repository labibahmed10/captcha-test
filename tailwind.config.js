/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        15: "15px",
        30: "30px",
      },
      colors: {
        "custom-gray": "#f3f2f3",
      },
    },
  },
  plugins: [],
};
