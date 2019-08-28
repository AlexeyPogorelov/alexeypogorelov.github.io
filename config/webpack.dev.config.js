const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, './src'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },

  devServer: {
    open: true,
    port: 3000,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    publicPath: '/',
    historyApiFallback: true
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'favicon.ico',
      template: './index.pug',
      filename: 'index.html'
    })
  ]
};

module.exports = devConfig;
