const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      '@poool/react-native-access$': path.resolve('../../'),
    },
  },
  devServer: {
    hot: true,
    open: true,
  },
  module: {
    rules: [{
      test: /\.js/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
    }),
  ],
};
