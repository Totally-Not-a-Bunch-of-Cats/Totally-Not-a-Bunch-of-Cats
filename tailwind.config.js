/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{tsx,jsx,astro}"],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}