/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romance: {
          cream: '#fdfbf7',
          parchment: '#faf2e6',
          blush: '#fbe4e8',
          roseSoft: '#f2a6b4',
          rose: '#e07a8b',
          dustyRose: '#bf5e72',
          wine: '#5a1928',
          burgundy: '#330913',
          night: '#0a0d18',
          nightDeep: '#05070e',
          nightSurface: '#121626',
          candleGold: '#fbbf24',
          candleAmber: '#f59e0b',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        script: ['Caveat', 'cursive'],
        scriptFancy: ['Sacramento', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'sway-gentle': 'sway 6s ease-in-out infinite',
        'sway-wind': 'windSway 2s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'glow-candle': 'glow 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-0.8deg) translateY(0px)' },
          '50%': { transform: 'rotate(0.8deg) translateY(-4px)' },
        },
        windSway: {
          '0%, 100%': { transform: 'rotate(-3deg) translateX(-4px)' },
          '50%': { transform: 'rotate(4deg) translateX(5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 16px rgba(251, 191, 36, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
