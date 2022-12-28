const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? undefined : 'source-map',
  entry: {
    background: './src/background.ts',
    popup: './src/popup/index.tsx',
    options: './src/options/index.tsx',
    contentScripts: './src/contentScripts.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx']
        },
        use: 'ts-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public/manifest.json' },
        { from: './public/icons', to: 'icons' }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Popup Extension',
      filename: 'popup.html',
      template: './public/popup.html',
      chunks: ['popup'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: 'Options Extension',
      filename: 'options.html',
      template: './public/options.html',
      chunks: ['options'],
      inject: 'body'
    })
  ]
};
