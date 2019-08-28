const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, './../build'),
    filename: '[name].bundle.js',
    publicPath: './build'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(scss|sass|.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('autoprefixer')()
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      filename: './../index.html',
      template: './../src/index.pug'
    }),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin()
  ]
};

module.exports = prodConfig;
