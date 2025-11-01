/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			// Aura Mode Colors
  			'aura-bg-1': '#0e001b',
  			'aura-bg-2': '#1a0040',
  			'aura-bg-3': '#29005e',
  			'aura-surface': 'rgba(255,255,255,0.04)',
  			'aura-border': 'rgba(255,255,255,0.12)',
  			'aura-primary': '#7b3fe4',
  			'aura-accent': '#4effa1',
  			'aura-heading': '#c3b6ff',
  			'aura-muted': '#b8aeea',
  			// Polygon Colors
  			'poly-primary': '#9D5CFF',
  			'poly-secondary': '#00C8FF',
  			'poly-accent': '#C084FC',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			'aura-glow': '0 6px 30px rgba(123,63,228,0.18)',
  			'aura-neon': '0 6px 30px rgba(78,255,161,0.12)',
  			'poly-glow': '0 0 20px rgba(157, 92, 255, 0.5)',
  		},
  		backgroundImage: {
  			'aura-gradient': 'linear-gradient(180deg,#0e001b 0%, #1a0040 50%, #29005e 100%)',
  			'aura-btn': 'linear-gradient(90deg,#7b3fe4 0%, #4c6ef5 100%)',
  			'poly-gradient': 'linear-gradient(135deg, #9D5CFF 0%, #00C8FF 100%)',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'aura-gradient-move': {
  				'0%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  				'100%': { backgroundPosition: '0% 50%' }
  			},
  			'poly-glow': {
  				'0%, 100%': { boxShadow: '0 0 20px rgba(157, 92, 255, 0.3)' },
  				'50%': { boxShadow: '0 0 30px rgba(157, 92, 255, 0.6)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'aura-gradient': 'aura-gradient-move 18s ease infinite',
  			'poly-glow': 'poly-glow 3s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};