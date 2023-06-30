/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./public.index.html"
  ],
  theme: {
    extend: {
      backgroundColor: {
        "main-100": "#40384E",
        "main-200": "#2A213A",
        "main-300": "#170F23",
        "main-400": "#130C1C",
        "main-500": "#9B4DE0",
        "main-600": "#120822",
        "overlay-30": "rgba(0,0,0,0.3)",
      },
      color: {
        "main-100": "#40384E",
        "main-200": "#2A213A",
        "main-300": "#170F23",
        "main-400": "#130C1C",
      },

    },
    screens: {
      '1600': '1600px',
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
    },
    keyframes: {
      'slide-right': {
        '0%': {
          '-webkit-transform': ' translateX(-500px);',
          transform: 'translateX(-500px);'
        },
        '100%': {
          '-webkit-transform': 'translateX(0);',
          transform: 'translateX(0);'
        }
      },
      'slide-left': {
        '0%': {
          '-webkit-transform': ' translateX(500px);',
          transform: 'translateX(500px);'
        },
        '100%': {
          '-webkit-transform': 'translateX(0);',
          transform: 'translateX(0);'
        }
      },
      'slide-left2': {
        '0%': {
          '-webkit-transform': ' translateX(500px);',
          transform: 'translateX(500px);'
        },
        '100%': {
          '-webkit-transform': 'translateX(0);',
          transform: 'translateX(0);'
        }
      },
      'rotate-center': {
        '0%': {
          '-webkit-transform': ' rotate(0);',
          transform: 'rotate(0);'
        },
        '100%': {
          '-webkit-transform': 'rotate(360deg);',
          transform: 'rotate(360deg);'
        }
      },
      'scale-up-center': {
        '0%': {
          '-webkit-transform': 'scale(0);',
          transform: 'scale(0);'
        },
        '100%': {
          '-webkit-transform': 'scale(1);',
          transform: 'scale(1);'
        }
      },
      'scale-up-img': {
        '0%': {
          '-webkit-transform': 'scale(1);',
          transform: 'scale(1);'
        },
        '100%': {
          '-webkit-transform': 'scale(1.2);',
          transform: 'scale(1.2);'
        }
      },
      'scale-down-img': {
        '0%': {
          '-webkit-transform': 'scale(1.2);',
          transform: 'scale(1.2);'
        },
        '100%': {
          '-webkit-transform': 'scale(1);',
          transform: 'scale(1);'
        }
      },

    },
    animation: {
      'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      'rotate-center': 'rotate-center 1s linear infinite;',
      'scale-up-center': 'scale-up-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      'scale-up-img': 'scale-up-img 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      'scale-down-img': 'scale-down-img 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
    },
    // flex: {
    //   '4': '4 4 0%',
    //   '6': '6 6 0%',
    // },
  },
  plugins: [],
}

