// next.config.js
const withCSS = require('@zeit/next-css');

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
});
