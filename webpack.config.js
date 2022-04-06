const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode: mode,
  devtool: 'source-map',
  entry: {
    app: './js/app.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    clean: true
  },

  plugins: [
    new miniCss({
      filename: '[name].[contenthash].css'
    }),
    new htmlWebpackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin()
  ],

  module: {
    rules: [{
      test: /\.(s*)css$/,
      use: [
        miniCss.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  }

};