const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')
const MyFirstWebpackPlugin = require('./config/plugin/myFirstWebpackPlugin')
const NODE_ENV = process.env.NODE_ENV
module.exports = {
  lintOnSave: 'warning',
  productionSourceMap: NODE_ENV === 'develpment' ? true : false,
  chainWebpack(config) {
    const dllOptions = {
      context: path.resolve(__dirname, './'),
      manifest: require('./build/vendor-manifest')
    }
    config.plugin('dllReference').use(webpack.DllReferencePlugin, [dllOptions])
    const addsetOptions = {
      filepath: require.resolve('./build/vendor_dll.e34071c7')
    }
    config.plugin('addAssetHtml').use(AddAssetHtmlPlugin, [addsetOptions])
  },
  configureWebpack(config) {
    // console.log(config.plugins)
    config.plugins.push(
      new MyFirstWebpackPlugin()
    )
    // console.log(config.optimization)
    // config.optimization.splitChunks.cacheGroups.async = {
    //   name: 'chunk-async',
    //   minChunks: 2,
    //   priority: -10,
    //   chunks: 'async',
    //   reuseExistingChunk: true
    // }
    // config.optimization.splitChunks.cacheGroups.betterScroll = {
    //   name: 'better-scroll',
    //   test: /[\\\/]node_modules[\\\/]better-scroll[\\\/]/,
    //   priority: 5,
    //   chunks: 'async'
    // }
  }
}
