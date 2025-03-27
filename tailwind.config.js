// tailwind.config.js
module.exports = {
    darkMode: 'class', // enables dark mode via a "dark" class on the root element
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // your customizations
        },
    },
    plugins: [],
};
