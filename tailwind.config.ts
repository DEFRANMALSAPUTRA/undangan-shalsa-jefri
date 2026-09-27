import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // === MINANGKABAU COLOR PALETTE ===
        // Tiga Lareh: Hitam (bumi/keteguhan), Merah (keberanian), Kuning (kemuliaan), Hijau (kemakmuran)
        minang: {
          50:  '#FDF8F0',
          100: '#F8EDDA',
          200: '#F0D9A8',
          300: '#E5C06E',
          400: '#D4A835',
          500: '#C9A227',  // Emas Minang utama
          600: '#A8821A',
          700: '#7A5D0F',
          800: '#503C08',
          900: '#2C2104',
        },
        minangMerah: {
          50:  '#FDF2F2',
          100: '#FBE2E2',
          200: '#F5C0C0',
          300: '#EC9090',
          400: '#DE5555',
          500: '#C0392B',  // Merah Minang utama
          600: '#8B1A1A',  // Merah Minang gelap
          700: '#6B1010',
          800: '#4A0A0A',
          900: '#2D0505',
        },
        minangHijau: {
          50:  '#F0F7F3',
          100: '#DCF0E6',
          200: '#AFDDC5',
          300: '#75C49F',
          400: '#3EA877',
          500: '#2D7A4A',  // Hijau Minang utama
          600: '#1A4A2E',  // Hijau Minang gelap
          700: '#123320',
          800: '#0A2015',
          900: '#05110A',
        },
        minangGelap: {
          50:  '#F5F0E8',
          100: '#E8DFCC',
          200: '#C9B898',
          300: '#A49065',
          400: '#7A6540',
          500: '#4A3D22',
          600: '#2E2410',
          700: '#1A1208',  // Hitam Minang utama
          800: '#100C04',
          900: '#080602',
        },
        minangPutih: {
          50:  '#FFFDF8',
          100: '#FAF6EE',  // Putih gading utama
          200: '#F5EDDA',
          300: '#EDE0C4',
          400: '#E0CF9C',
          500: '#CCBA78',
        },
        // Keep champagne for legacy utilities not yet migrated
        champagne: {
          50:  '#FDF8F0',
          100: '#F8EDDA',
          200: '#F0D9A8',
          300: '#E5C06E',
          400: '#D4A835',
          500: '#C9A227',
          600: '#A8821A',
          700: '#7A5D0F',
          800: '#503C08',
          900: '#2C2104',
        },
        rose: {
          50: '#FDF8F7',
          100: '#FAF0EE',
          200: '#F4DDDA',
          300: '#EAC2BC',
          400: '#DC9F96',
          500: '#CA7D72',
          600: '#B35E52',
          700: '#93493F',
          800: '#753A32',
          900: '#552A24',
        },
      },
      fontFamily: {
        serif:   ['var(--font-cormorant)', 'var(--font-playfair)', 'Georgia', 'serif'],
        script:  ['var(--font-cormorant)', 'cursive'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:    ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow':     'spin 12s linear infinite',
        'bounce-slow':   'bounce 3s infinite',
        'pulse-glow':    'pulseGlow 2.5s ease-in-out infinite',
        'float':         'float 4s ease-in-out infinite',
        'float-reverse': 'floatReverse 5s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'fade-in':       'fadeIn 0.6s ease-out forwards',
        'gonjong-glow':  'gonjongGlow 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        gonjongGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 162, 39, 0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(201, 162, 39, 0.5)' },
        },
      },
      boxShadow: {
        'gold':      '0 10px 30px -10px rgba(201, 162, 39, 0.4)',
        'gold-lg':   '0 20px 40px -15px rgba(201, 162, 39, 0.5)',
        'merah':     '0 10px 30px -10px rgba(192, 57, 43, 0.3)',
        'merah-lg':  '0 20px 40px -15px rgba(139, 26, 26, 0.4)',
        'soft':      '0 10px 30px -5px rgba(0, 0, 0, 0.06)',
        'card':      '0 15px 35px -5px rgba(26, 18, 8, 0.12)',
        'card-gold': '0 8px 24px -4px rgba(201, 162, 39, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;

