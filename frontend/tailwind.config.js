/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths based on your project structure
    "./index.html", // Include this if you use HTML files directly
  ],
  theme: {},
  plugins: [daisyui],
};
