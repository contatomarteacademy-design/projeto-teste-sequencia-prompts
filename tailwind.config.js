/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores do design system do Figma
        neutral: {
          0: '#ffffff',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#d1d5db',
          500: '#9ca3af',
          1100: '#080b12',
        },
        brand: {
          500: '#dffe35', // verde-limão
        },
        red: {
          400: '#f07884',
          500: '#eb4b5b',
        },
        green: {
          600: '#15be78',
        },
      },
      spacing: {
        // Espaçamentos do design system do Figma
        '0': '0px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '64': '64px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Tipografia baseada nos tokens do Figma
        'label-xs': ['12px', { lineHeight: '16px', letterSpacing: '0.3px', fontWeight: '600' }],
        'label-sm': ['14px', { lineHeight: '16px', letterSpacing: '0.3px', fontWeight: '600' }],
        'label-md': ['16px', { lineHeight: '20px', letterSpacing: '0.3px', fontWeight: '600' }],
        'label-lg': ['18px', { lineHeight: '24px', letterSpacing: '0.3px', fontWeight: '600' }],
        'paragraph-xs': ['12px', { lineHeight: '20px', letterSpacing: '0.3px', fontWeight: '400' }],
        'paragraph-sm': ['14px', { lineHeight: '20px', letterSpacing: '0.3px', fontWeight: '400' }],
        'paragraph-md': ['16px', { lineHeight: '24px', letterSpacing: '0.3px', fontWeight: '400' }],
        'paragraph-lg': ['18px', { lineHeight: '28px', letterSpacing: '0.3px', fontWeight: '400' }],
        'heading-xs': ['20px', { lineHeight: '28px', letterSpacing: '0px', fontWeight: '700' }],
        'heading-sm': ['24px', { lineHeight: '32px', letterSpacing: '0px', fontWeight: '700' }],
        'heading-md': ['28px', { lineHeight: '36px', letterSpacing: '0px', fontWeight: '700' }],
      },
      borderRadius: {
        '100': '100px', // shape/100 do Figma
      },
    },
  },
  plugins: [],
}

