const {merge} = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: ['node zipping.js'],
      },
    }),
  ],
});
