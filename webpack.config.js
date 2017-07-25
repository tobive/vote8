'use strict';

module.exports = {
  entry: __dirname + '/app/index.js',

  output: {
    path: __dirname + '/app',
    filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};
