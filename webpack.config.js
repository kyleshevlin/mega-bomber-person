const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => ({
  context: path.join(__dirname, 'src'),
  entry: './js/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: env.prod ? 'source-map' : 'eval',
  mode: env.prod ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    }),
    new HtmlWebpackPlugin({
      template: './templates/index.ejs',
      title: 'Mega Bomber Person'
    })
  ]
})
