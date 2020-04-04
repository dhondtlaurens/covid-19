const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    autoprefixer({
      add: true,
      grid: false
    }),
    process.env.NODE_ENV === 'production' ? purgecss({
      content: [
        './src/**/*.html',
        './src/**/*.vue'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }) : ''
  ]
}
