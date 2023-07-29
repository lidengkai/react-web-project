// @ts-check
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { apiList } = require('./config')
const utils = require('build.react/build/utils')

/** @type {import('build.react/build/interface').Callback} */
module.exports = (envConfig) => {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'ejs/index.ejs',
        favicon: 'favicon.ico',
        scriptLoading: 'blocking',
        title: envConfig.name,
        inject: true,
        minify: {
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      }),
      new webpack.DefinePlugin({
        APP_API: JSON.stringify(apiList[envConfig.env]),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: utils.rootPath('static'),
            to: 'static',
            globOptions: {
              ignore: [
                '.*',
              ]
            }
          },
        ]
      }),
      new webpack.container.ModuleFederationPlugin({
        name: 'react_web_project',
        filename: 'remoteEntry.js',
        exposes: {
          './route': utils.rootPath('src/export/route.tsx')
        },
        shared: {
          react: {
            requiredVersion: envConfig.dependencies.react,
            eager: true
          },
          'react-router-dom': {
            requiredVersion: envConfig.dependencies['react-router-dom'],
            eager: true
          }
        }
      })
    ]
  }
}
