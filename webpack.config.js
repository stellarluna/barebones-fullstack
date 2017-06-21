/*
    ./webpack.config.js
*/
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loaders: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}
