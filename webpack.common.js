const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    popup: './src/app/pages/popup/index.tsx',
    options: './src/app/pages/options/index.tsx',
    ...getEntry(['background', 'contentScripts'], 'ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', 'jsx'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{from: './public'}],
    }),
    ...getHtmlPlugins(['popup', 'options']),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
}

function getEntry(chunks, ext) {
  const entries = {}
  for (const entry of chunks) {
    Object.assign(entries, {[`${entry}`]: `./src/${entry}.${ext}`})
  }
  return entries
}

function getHtmlPlugins(chunks) {
  return chunks.map(
    chunk =>
      new HtmlWebpackPlugin({
        title: '<Extension Name>',
        filename: `${chunk}.html`,
        template: './index.html',
        chunks: [chunk],
      }),
  )
}
