const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const findExistingFile = (
  basePath,
  files = ['index.tsx', 'index.js', 'index.jsx']
) => {
  const foundFiles = [];
  for (const file of files) {
    const filePath = path.resolve(__dirname, path.join(basePath, file));
    if (glob.sync(filePath).length > 0) {
      foundFiles.push(filePath);
    }
  }

  if (foundFiles.length > 1)
    throw new Error(
      'You should not have more than one index file in the popup or options folder'
    );

  return foundFiles[0];
};

const getPageFiles = page => {
  const pagePath = `./src/pages/${page}`;
  const filePath = findExistingFile(pagePath);

  return filePath ? {[`${page}/${page}`]: filePath} : {};
};

const generateHtmlPlugins = () => {
  const entries = [
    findExistingFile('./src/pages/popup'),
    findExistingFile('./src/pages/options'),
  ];

  return entries.map(entry => {
    if (entry === undefined) return;
    const entryName = path.basename(path.dirname(entry));
    return new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: `${entryName}/index.html`,
      chunks: [`${entryName}/${entryName}`],
      scriptLoading: 'blocking',
      showErrors: true,
    });
  });
};

const injectionScripts = glob
  .sync('./src/scripts/*.{ts,js,mts,mjs}')
  .reduce((entries, entry) => {
    const fileName = path.basename(entry, path.extname(entry));
    entries[`scripts/${fileName}`] = path.resolve(__dirname, entry);
    return entries;
  }, {});

module.exports = {
  entry: {
    ...getPageFiles('popup'),
    ...getPageFiles('options'),
    ...injectionScripts,
    background: './src/background.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
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
    ...generateHtmlPlugins(),
  ],
};
