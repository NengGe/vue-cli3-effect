// 原生call的方法
Function.prototype.myCall = function(context = window, ...args) {
  let func = this
  let fn = Symbol('fn')
  context[fn] = func
  let res = context[fn](...args)
  delete context[fn]
  return res
}
// 原生Object.create方法
function create(proto) {
  function F() { }
  F.prototype = proto
  F.prototype.constructor = F
  return new F()
}
// 原生bind方法
Function.prototype.bind = function(context = window, ...args) {
  let self = this
  let fBound = function() {
    return self.apply(this instanceof fBound ? this : context, [...args, ...Array.prototype.slice.call(arguments)])
  }
  return fBound
}

