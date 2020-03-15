module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          '100': '#E2E5ED'
        },
        blue: {
          '100': '#EBF3FF',
          '200': '#0168FA',
          '300': '#071D5D'
        },
        green: {
          '100': '#95E68B'
        },
        orange: {
          '100': '#EFBB74'
        },
        red: {
          '100': '#EF7474'
        }
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '32': '32px',
        '64': '64px'
      },
      fontFamily: {
        'app': [
          'IBM Plex Sans',
          'system-ui',
          'sans-serif'
        ]
      },
      fontSize: {
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '34': '34px'
      },
      transitionProperty: {
        'all': 'all'
      },
      transitionDuration: {
        '200': '200ms',
        '900': '900ms'
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  variants: {
    transitionProperty: ['responsive'],
    transitionDuration: ['responsive'],
    transitionTimingFunction: ['responsive']
  },
  plugins: [
    require('tailwindcss-transitions')()
  ],
}
