module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue'
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      return args
    })
  }
}

