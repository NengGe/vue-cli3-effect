const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const nodeDel = require('./node-del')
nodeDel(path.resolve(__dirname, '../build'))
module.exports = {
  entry: {
      // 需要提取的库文件
      vendor: ['vue', 'vue-router', 'vuex', 'axios']
  },
  output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name]_dll.[hash:8].js',
      library: '[name]_library'
  },
  plugins: [
      new webpack.DllPlugin({
          path: path.join(__dirname, '../build', '[name]-manifest.json'),
          name: '[name]_library',
          context: path.resolve(__dirname, '../')
      })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ]
  }
}
