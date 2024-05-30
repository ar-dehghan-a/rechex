const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const projectRoot = process.cwd();

const findExistingFile = (
  basePath,
  files = ['index.ts', 'index.tsx', 'index.js', 'index.jsx']
) => {
  const foundFiles = [];
  for (const file of files) {
    const filePath = path.resolve(projectRoot, path.join(basePath, file));
    if (glob.sync(filePath).length > 0) foundFiles.push(filePath);
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

const injectionScripts = () => {
  const scriptsDir = path.resolve(projectRoot, './src/scripts/');
  const files = glob.sync(scriptsDir + '/*.{ts,mts,js,mjs}');

  const entries = files.reduce((acc, filePath) => {
    const fileName = path.basename(filePath, path.extname(filePath));
    acc[`scripts/${fileName}`] = path.resolve(projectRoot, filePath);
    return acc;
  }, {});

  return entries;
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
      template: path.resolve(projectRoot, './index.html'),
      filename: `${entryName}/index.html`,
      chunks: [`${entryName}/${entryName}`],
      scriptLoading: 'blocking',
      showErrors: true,
    });
  });
};

module.exports = {
  entry: {
    ...getPageFiles('popup'),
    ...getPageFiles('options'),
    ...injectionScripts(),
    background: path.resolve(projectRoot, './src/background.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(projectRoot, './build'),
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
