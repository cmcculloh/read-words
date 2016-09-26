const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['webpack/hot/dev-server', './public/js/main.jsx'],
  output: {
    path: __dirname,
    filename: "public/js/bundle.js"
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        include: [path.join(__dirname, 'public/js')],
        query: {
          presets: ['es2015', 'react']
        }
      },
      { 
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file' 
      },
      { 
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
      }
    ]
  }
};