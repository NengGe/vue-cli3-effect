const Compiler = require('./compiler')

class MyPlugin {
  constructor() {

  }
  apply(compiler) {
    compiler.hooks.kzSyncHook.tap("eventName1", (name, age) => {
      console.log(`同步事件eventName1： ${name} this year ${age} 周岁了, 可是还是单身`);
    });
    compiler.hooks.kzAsyncHook.tapAsync('eventName2', (name, age) => {
      setTimeout(() => {
        console.log(`异步事件eventName2： ${name} this year ${age}周岁了，可是还是单身呀`);
      }, 1000)
    });
  }
}

const myPlugin = new MyPlugin()

const options = {
  plugins: [myPlugin]
}

const compiler = new Compiler(options)
compiler.run()
