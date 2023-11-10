const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const injectionScripts = glob
  .sync('./src/scripts/*.{ts,js,mts,mjs}')
  .reduce((entries, entry) => {
    const fileName = entry.match(/([^\\/]+)\.\w+$/)[1];
    entries['scripts/' + fileName] = './' + entry.replace(/\\/g, '/');
    return entries;
  }, {});

module.exports = {
  entry: {
    popup: './src/app/pages/popup/index.tsx',
    options: './src/app/pages/options/index.tsx',
    background: './src/background.ts',
    ...injectionScripts,
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|mts|tsx|js|mjs|jsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{from: 'public', to: './'}],
    }),
  ],
};
