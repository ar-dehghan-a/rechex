const {merge} = require('webpack-merge')
const WebpackShellPlugin = require('webpack-shell-plugin-next')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: ['node zipping.js'],
        blocking: false,
        parallel: true,
      },
    }),
  ],
})
