/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: 0.6,
                        transform: 'scale(0.9)',
                    },
                    '50%': {
                        opacity: 1,
                        transform: 'scale(1.2)',
                    },
                    '100%': {
                        transform: 'scale(1)',
                    },
                },
            },
            animation: {
                fadeIn: 'fade-in 1s ease-in-out 0.25s 1',
            },
        },
    },
    plugins: [],
}
