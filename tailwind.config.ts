import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        
      },
      colors: {
        backgroundBlue: '#121927',
        purple: '#935FF0',
        greenYellow: '#C0EF00',
        mainGray: '#3C414D',
        darkBlue: '#263045'
      }
    },
  },
  plugins: [],
}
export default config
