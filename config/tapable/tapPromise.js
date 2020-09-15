const { AsyncSeriesHook } = require('tapable');

// 创建实列
const asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

// 注册事件
asyncSeriesHook.tapPromise("1", (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("1", name, age, new Date());
      resolve();
    }, 1000);
  })
});

asyncSeriesHook.tapPromise("2", (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("2", name, age, new Date());
      resolve();
    }, 2000);
  });
});

asyncSeriesHook.tapPromise("3", (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("3", name, age, new Date());
      resolve();
    }, 3000);
  });
});

// 触发事件，让监听函数执行
asyncSeriesHook.promise("kongzhiEvent-1", 18);
