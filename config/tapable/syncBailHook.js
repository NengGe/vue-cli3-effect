const { SyncBailHook } = require('tapable');

// 创建实列

const syncBailHook = new SyncBailHook(["name", "age"]);

// 注册事件
syncBailHook.tap("1", (name, age) => {
  console.log("1", name, age);
});

syncBailHook.tap("2", (name, age) => {
  console.log("2", name, age);
  return '2';
});

syncBailHook.tap("3", (name, age) => {
  console.log("3", name, age);
});

// 触发事件，让监听函数执行
syncBailHook.call("kongzhiEvent-1", 18);

// var _fn0 = _x[0];
// var _result0 = _fn0(name, age);
// if (_result0 !== undefined) {
//   return _result0;
//   ;
// } else {
//   var _fn1 = _x[1];
//   var _result1 = _fn1(name, age);
//   if (_result1 !== undefined) {
//     return _result1;
//     ;
//   } else {
//     var _fn2 = _x[2];
//     var _result2 = _fn2(name, age);
//     if (_result2 !== undefined) {
//       return _result2;
//       ;
//     } else {
//     }
//   }
// }
