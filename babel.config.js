module.exports = {
  // presets: ['@vue/app', ['es2015', { modules: false }]],
  presets: ['@vue/app'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
