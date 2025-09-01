/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Typography Scale - matching CSS custom properties
      fontSize: {
        'xs': '12px',      // --font-size-xs: Extra small text
        'sm': '14px',      // --font-size-sm: Small text, dates, captions
        'base': '16px',    // --font-size-base: Base body text
        'md': '18px',      // --font-size-md: Medium text, content
        'lg': '20px',      // --font-size-lg: Large text
        'xl': '24px',      // --font-size-xl: Extra large text, h3
        '2xl': '28px',     // --font-size-2xl: 2x large text, h2
        '3xl': '32px',     // --font-size-3xl: 3x large text, h1, post titles
        '4xl': '36px',     // --font-size-4xl: 4x large text
        '5xl': '40px',     // --font-size-5xl: 5x large text, post detail titles
        '6xl': '48px',     // --font-size-6xl: 6x large text, blog title
      },
      
      // Color Palette - Light Theme (default)
      colors: {
        // Background colors
        'background': {
          DEFAULT: '#f5f0e8',  // Linen - Main Background
          'dark': '#2c2520',   // Charcoal Brown - Dark theme background
        },
        
        // Text colors
        'text': {
          DEFAULT: '#5d3920',  // Rich Espresso - Body Text, Headings
          'dark': '#ebddcb',   // Parchment - Dark theme body text
        },
        
        // Primary colors (Links, Buttons, CTAs)
        'primary': {
          DEFAULT: '#9a3e2a',  // Burnt Sienna - Light theme
          'dark': '#d86a55',   // Vibrant Russet - Dark theme
        },
        
        // Secondary colors (Subtitles, Secondary Text)
        'secondary': {
          DEFAULT: '#8b6f47',  // Darker Sandstone - Light theme
          'dark': '#d4c4a8',   // Lighter Aged Brass - Dark theme
        },
        
        // Border colors
        'border': {
          DEFAULT: '#c5a684',  // Sandstone - Light theme
          'dark': '#c9ad8f',   // Aged Brass - Dark theme
        },
        
        // Status colors - Success
        'success': {
          DEFAULT: '#5a7d48',  // Muted Sage - Light theme
          'dark': '#8db07e',   // Sage Green - Dark theme
        },
        
        // Status colors - Warning
        'warning': {
          DEFAULT: '#c78d4e',  // Warm Amber - Light theme
          'dark': '#f2b872',   // Golden Amber - Dark theme
        },
        
        // Status colors - Error
        'error': {
          DEFAULT: '#b04a46',  // Terracotta Red - Light theme
          'dark': '#e27b76',   // Fired Clay - Dark theme
        },
      },
      
      // Font Family
      fontFamily: {
        'sans': ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      
      // Line Height
      lineHeight: {
        'normal': '1.5',
        'tight': '1.1',  // For headings like h1
      },
      
      // Font Weight
      fontWeight: {
        'normal': '400',
        'medium': '500',
      },
      
      // Border Radius
      borderRadius: {
        'DEFAULT': '8px',
      },
      
      // Spacing for button padding
      spacing: {
        'btn-x': '1.2em',
        'btn-y': '0.6em',
      },
      
      // Transition Duration
      transitionDuration: {
        'DEFAULT': '250ms',
      },
      
      // Min Width/Height
      minWidth: {
        'mobile': '320px',
      },
      minHeight: {
        'screen': '100vh',
      },
    },
  },
  plugins: [],
}