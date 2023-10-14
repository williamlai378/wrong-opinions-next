/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'tabletVertical': '800px',
      'tabletHorizontal': '1200px',
      'laptop': '1280px'
    },
    extend: {
      aspectRatio: {
        '9/12': '9/12',
        '9/11': '9/11',
        '10/14': '10/14',
        '4/3': '4/3',
        '2/3': '2/3',
        '3/7': '3/7',
        '1/2': '1/2'
      },
      
      backgroundColor: {
        
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      flex: {
        '4': '1 0 0',
      },
      flexGrow: {
        1: '1',
        2: '2',
        3: '3',
        4: '4'
      },
      gridTemplateColumns: {
        'animeHeader': '15% 1fr',
        'profileHeader' : '25% 1fr',
        'listCard': 'minmax(0,1fr) 15%',
        'editToggle': '1fr auto'
      },
      spacing: {
        200: '200%',
        '80%': '80%'
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [],
}
