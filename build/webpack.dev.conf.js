'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// 添加mock数据
const express = require('express')
const app = express()
var apiRoutes = express.Router()
var news = require('../mock/news')
var topicList = require('../mock/topicList')
var topic = require('../mock/topic')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended: false})
app.use(jsonParser);
app.use(urlencodedParser);
app.use('/api', apiRoutes)
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    //添加mock数据
    before(app) {
      app.all('/api/news', jsonParser, (req, res) => {
        let body = Object.keys(req.body).length ? req.body : req.query
        if (!body || !Object.keys(body).length) {
          res.json({
            code: "FAILED",
            message: "无此类型数据",
            data: null
          })
        }
        process.env.NODE_ENV === 'development' && console.log("/api/news", body, req.query)
        if (body.hasOwnProperty('type') && news.hasOwnProperty(body.type)) {
          res.json({
            code: "SUCCESS",
            message: null,
            data: news[body.type]
          })
        } else {
          res.json({
            code: "FAILED",
            message: "无此类型数据",
            data: null
          })
        }
      })
      app.all('/api/article', jsonParser, (req, res) => {
        let body = Object.keys(req.body).length ? req.body : req.query
        if (!body || !Object.keys(body).length) {
          res.json({
            code: "FAILED",
            message: "无此类型数据",
            data: null
          })
        }
        process.env.NODE_ENV === 'development' && console.log("/api/article", body, req.query)
        if (body.hasOwnProperty('newsId') && body.hasOwnProperty('type') && body.newsId && news.articles.hasOwnProperty(body.newsId) &&
          news.articles[body.newsId].hasOwnProperty('type') && news.articles[body.newsId].type === body.type) {
          res.json({
            code: "SUCCESS",
            message: null,
            data: news.articles[body.newsId]
          })
        } else {
          res.json({
            code: "FAILED",
            message: "Not found",
            data: null
          })
        }
      })
      app.get('/api/topiclist', (req, res) => {
        res.json({
          code: "SUCCESS",
          message: null,
          data: topicList
        })
      })
      app.all('/api/topic', jsonParser, (req, res) => {
        let body = Object.keys(req.body).length ? req.body : req.query
        if (!body || !Object.keys(body).length) {
          res.json({
            code: "FAILED",
            message: "无此类型数据",
            data: null
          })
        }
        process.env.NODE_ENV === 'development' && console.log("/api/topic", body, req.query)
        if (body.hasOwnProperty('topicId') && body.topicId && topic.hasOwnProperty(body.topicId)) {
          res.json({
            code: "SUCCESS",
            message: null,
            data: topic[body.topicId]
          })
        } else {
          res.json({
            code: "FAILED",
            message: "Not found",
            data: null
          })
        }
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
      'apiRootPath': "'//lab.mzz.pub/api/'"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
