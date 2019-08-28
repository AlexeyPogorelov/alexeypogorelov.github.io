const path = require('path');
const merge = require('webpack-merge');
const devConfig = require('./config/webpack.dev.config');
const prodConfig = require('./config/webpack.prod.config');

const SRC_FOLDER = path.resolve(__dirname, 'src');

const commonConfig = {
  target: 'web',

  entry: {
    app: path.resolve(SRC_FOLDER, 'index.js'),
  },

  output: {
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        use: {
          loader: 'base64-inline-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },

      {
        test: /\.ico$/,
        use: 'file-loader'
      },

      {
        test: /\.(pug|jade)$/,
        loaders: [
          'html-loader',
          'pug-html-loader'
        ],
        include: path.join(__dirname, 'src')
      },

      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts'
          }
        }]
      }
    ]
  },

  context: SRC_FOLDER,

  resolve: {
    modules: ['node_modules', SRC_FOLDER],
    extensions: ['*', '.js'],
  },

  performance: {
    hints: false,
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return merge(commonConfig, devConfig);
  }

   if (argv.mode === 'production') {
    return merge(commonConfig, prodConfig);
  }
}
