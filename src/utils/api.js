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
  fBound.prototype = Object.create(this.prototype)
  return fBound
}
// instanceof
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto == null) return false
    if (proto == right.prototype) return true
    proto = Object.getPrototypeof(proto)
  }
}
// 防抖
const debounce = (fn, delay) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
// 节流
const throttle = (fn, delay = 500) => {
  let flag = true
  return (...args) => {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay)
  }
}



