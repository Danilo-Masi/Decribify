/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Colori per la light mode
        custom: {
          accent: '#1A56DB', // Colore principale per entrambe le modalità
          background: '#F8F8F8', // Sfondo chiaro
          textPrimary: '#111827', // Testi h1, h2, etc. per la light mode
          textSecondary: '#6B7280', // Testi p, label, etc. per la light mode
          elevation: '#E5E7EB', // Sfondo per card, input, etc. per la light mode
          border: '#D1D5DB', // Bordo normale per la light mode
          borderFocus: '#1A56DB',
          disabled: '#9CA3AF', // Bordo al focus per la light mode (usa l'accent color)
          softBlur: '0 0 15px 5px rgba(0, 0, 0, 0.05)'
        },
        // Colori per la dark mode
        dark: {
          accent: '#0642C7', // Variante del colore principale per la dark mode
          background: '#1F2937', // Sfondo scuro
          textPrimary: '#F9FAFB', // Testi h1, h2, etc. per la dark mode
          textSecondary: '#D1D5DB', // Testi p, label, etc. per la dark mode
          elevation: '#374151', // Sfondo per card, input, etc. per la dark mode
          border: '#4B5563', // Bordo normale per la dark mode
          borderFocus: '#0642C7',
          disabled: '#6B7280', // Bordo al focus per la dark mode (usa l'accent color)
        }
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 3',
      },
      keyframes: {
        pulse: {
          '0% 100%': { opacity: 1 },
          '50%': { opacity: 0.2 },
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
}