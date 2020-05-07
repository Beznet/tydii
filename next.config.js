// Load appropriate env file if possible
try {
  let envPath = '.env'

  if (process.env.CI_COMMIT_REF_NAME) {
    envPath = `.${process.env.CI_COMMIT_REF_NAME}.env`
  }

  require('dotenv').config({ path: envPath })
} catch (error) {}

// next.config.js
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  /* config options here */
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          publicPath: 'assets',
        },
      },
    ],
  },
})

