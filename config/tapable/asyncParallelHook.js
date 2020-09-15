const { AsyncSeriesHook } = require('tapable');

// 创建实列
const asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

// 注册事件
asyncSeriesHook.tapAsync("1", (name, age, done) => {
  setTimeout(() => {
    console.log("1", name, age, new Date());
    done();
  }, 1000);
});

asyncSeriesHook.tapAsync("2", (name, age, done) => {
  setTimeout(() => {
    console.log("2", name, age, new Date());
    done();
  }, 2000);
});

asyncSeriesHook.tapAsync("3", (name, age, done) => {
  setTimeout(() => {
    console.log("3", name, age, new Date());
    done();
  }, 3000);
});

// 触发事件，让监听函数执行
asyncSeriesHook.callAsync("kongzhiEvent-1", 18, () => {
  console.log('执行完成');
});
