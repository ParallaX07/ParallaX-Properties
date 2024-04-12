/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#FFA920",
                accent: "#FFD799"
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
