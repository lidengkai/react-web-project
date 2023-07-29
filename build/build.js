// @ts-check
const baseConfig = require('./webpack.config')
const build = require('build.react/build/option.build')
const { options } = require('./config')

module.exports = build(options, baseConfig)
