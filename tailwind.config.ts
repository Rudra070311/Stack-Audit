import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				zinc: {
					50: "#fafafa",
					100: "#f4f4f5",
					150: "#f0f0f0",
					200: "#e4e4e7",
					300: "#d4d4d8",
					400: "#a1a1a6",
					500: "#71717a",
					600: "#52525b",
					700: "#3f3f46",
					800: "#27272a",
					850: "#1f1f23",
					900: "#18181b",
					950: "#09090b",
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			animation: {
				"float": "float 3s ease-in-out infinite",
				"float-delayed": "float 3s ease-in-out 0.5s infinite",
				"glow-pulse": "glow-pulse 2s ease-in-out infinite",
				"fade-in": "fade-in 0.5s ease-out",
				"slide-up": "slide-up 0.5s ease-out",
				"gradient-shift": "gradient-shift 6s ease-in-out infinite",
			},
			keyframes: {
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-12px)" },
				},
				"glow-pulse": {
					"0%, 100%": { opacity: "0.5" },
					"50%": { opacity: "1" },
				},
				"fade-in": {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				"slide-up": {
					from: { opacity: "0", transform: "translateY(12px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"gradient-shift": {
					"0%, 100%": {
						backgroundPosition: "0% 50%",
					},
					"50%": {
						backgroundPosition: "100% 50%",
					},
				},
			},
			transitionDuration: {
				"2000": "2000ms",
			},
			backdropBlur: {
				xs: "2px",
			},
			boxShadow: {
				glow: "0 0 20px rgba(79, 172, 254, 0.2)",
				"glow-lg": "0 0 40px rgba(79, 172, 254, 0.3)",
				"glow-xl": "0 0 60px rgba(79, 172, 254, 0.4)",
			},
		},
	},
	plugins: [],
} satisfies Config;
