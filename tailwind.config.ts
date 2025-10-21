import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(214 14% 85%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 47.4% 11.2%)",
        muted: "hsl(210 40% 96.1%)",
        card: "hsl(0 0% 100%)",
        popover: "hsl(0 0% 100%)",
      }
    },
  },
  plugins: [],
}

export default config

