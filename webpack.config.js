const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
// let mode = 'production'

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
    new CopyPlugin({
      patterns: [
        {from: '/img', to: './img/'},
        {from: './node_modules/three/examples/jsm/loaders/DRACOLoader.js', to: './'}
      ]
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|jpg|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          miniCss.loader,
          'css-loader',
          'sass-loader'
        ]
      }

    ]
  }

};
