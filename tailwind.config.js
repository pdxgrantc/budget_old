/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      xsmall: ['1.25rem'],
      small: ['1.5rem'],
      normal: ['1.75rem'],
      DEFAULT: ['1.75rem'],
      large: ['2rem'],
      sheader: ['2.25rem'],
      header: ['2.75rem'],
      lheader: ['3.25rem'],
      xlheader: ['4.25rem'],
    },
    screens: {
      on_desktop: { 'min': '951px' },
      on_mobile: { 'max': '950px' },
      min_laptop_height: { 'min': '1000px' },
      min_desktop_height: { 'max': '1000px' },
    },
    extend: {
      textColor: {
        DEFAULT: '#d6d6d6',
        dark_grey: '#cfcfcf',
        black: "#000",
        white: "#fff",
        text_alt: '#717171',
      },
      colors: {
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        gray: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
          1000: "#0d131e",
        },
        base: '#062f4f',
        bg: '#0e0b16',
        secondary: '#b82601',
        accent: '#813772',
        dark_grey: '#141414',
        main_bg_color: '#181823',
        button_grey: '#a9a9a9',
        button_grey_hover: '#4e4e4e',
        outline_dark: "#808080",
        menu_bg: '#272727',
        menu_button: '#2e2e2e',
        menu_button_hover: '#718096',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        button: '0.25rem',
        'md': '0.375rem',
        DEFAULT: '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      transitionDuration: {
        'none': '0ms',
        DEFAULT: '150ms',
        'fast': '300ms',
        'slow': '500ms',
      },
      spacing: {
        '0': '0',
        xsmall: '0.25rem',
        small : '0.5rem',
        DEFAULT: "1rem",
        large: "2rem",
        xlarge: "3rem",
      },
    },
  },
  plugins: [],
}

