const { SyncHook, AsyncParallelHook } = require('tapable');

class Compiler {
  constructor(options) {
    this.hooks = {
      kzSyncHook: new SyncHook(['name', 'age']),
      kzAsyncHook: new AsyncParallelHook(['name', 'age'])
    };
    let plugins = options.plugins
    if (plugins && plugins.length > 0) {
      plugins.forEach(plugin => plugin.apply(this))
    }
  }
  run() {
    console.log('开始执行了---------')
    this.kzSyncHook('我是空智', 31)
    this.kzAsyncHook('我是空智', 31)
  }
  kzSyncHook(name, age) {
    // console.log(this.hooks.kzSyncHook)
    this.hooks.kzSyncHook.call(name, age)
  }
  kzAsyncHook(name, age) {
    // console.log(this.hooks.kzAsyncHook)
    this.hooks.kzAsyncHook.callAsync(name, age)
  }
}

module.exports = Compiler;
