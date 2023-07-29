// @ts-check
const baseConfig = require('./webpack.config')
const build = require('build.react/build/option.watch')
const { options, port } = require('./config')

module.exports = build(options, baseConfig, () => {
  return {
    devServer: {
      host: '127.0.0.1',
      port,
      open: false,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:10138',
          pathRewrite: {}
        },
      }
    }
  }
})
