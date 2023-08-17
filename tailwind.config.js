/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                gray: '#717171',
                lightGray: '#BBBFBF',
                purple: '#590BD8',
                darkPurple: '#403769',
                lightPurple: '#DDD5EA',
            },
            backgroundImage: {
                worldMap: "url('/world-map.png')",
            },
        },
    },
    plugins: [],
};
