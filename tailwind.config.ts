import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "#ffffff", foreground: "#1e2a78" },
        secondary: { DEFAULT: "#38bdf8", foreground: "#1e2a78" },
        accent: { DEFAULT: "#F8F9FB", foreground: "#160F27" },
        muted: { DEFAULT: "rgba(255,255,255,0.1)", foreground: "#f1f5f9" },
        card: { DEFAULT: "rgba(255,255,255,0.72)", foreground: "#111827" },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(30,136,229,0.24), transparent 38%), radial-gradient(circle at right, rgba(75,46,131,0.30), transparent 30%)",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(75, 46, 131, 0.18)",
        glass: "0 10px 30px rgba(15, 23, 42, 0.10)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
