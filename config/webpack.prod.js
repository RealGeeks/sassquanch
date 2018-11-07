const path = require('path');

const nodeExternals = require('webpack-node-externals'); // eslint-disable-line

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '..', 'index.js'),
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bin.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
      },
    ],
  },
  externals: [
    nodeExternals(),
  ],
};
