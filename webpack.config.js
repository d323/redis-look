const { join } = require('path');

module.exports = {
  entry: {
    app: './src/ui/index.js'
  },
  output: {
    path: join(__dirname, 'ui'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'react']
        }
      }
    ]
  }
};