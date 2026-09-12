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
        'coop-green': '#2D7A4A',
        'forest-green': '#1B5E3F',
        'sage-green': '#A8C8B8',
        'soft-teal': '#4A9B7F',
        'card-purple': '#6B46C1',
        'card-blue': '#1E40AF',
        'success': '#10B981',
        'warning': '#F97316',
        'neutral-dark': '#1F2937',
        'gray-text': '#4B5563',
        'light-gray': '#F9FAFB',
        'border-gray': '#E5E7EB',
      },
      fontFamily: {
        heading: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
        body: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'coop': '0 4px 20px -2px rgba(45, 122, 74, 0.12)',
        'coop-lg': '0 10px 30px -4px rgba(45, 122, 74, 0.18)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
};
export default config;
