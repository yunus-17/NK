/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'nk-olive': {
                    DEFAULT: '#535434',
                    light: '#6B6C4B',
                    dark: '#3B3C25',
                },
                'nk-sand': {
                    DEFAULT: '#C9CAA5',
                    light: '#D8D9BD',
                    dark: '#AEAF88',
                },
                'nk-base': '#FDFDF9', // Warm off-white
                'nk-charcoal': '#1A1D1A',
            },
            fontFamily: {
                heading: ['"Playfair Display"', 'serif'],
                body: ['Manrope', 'sans-serif'],
                ui: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            letterSpacing: {
                'premium': '0.05em',
            },
            animation: {
                'fade-up': 'fadeUp 0.8s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            }
        },
    },
    plugins: [],
}
