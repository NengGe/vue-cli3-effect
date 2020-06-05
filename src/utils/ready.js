let readyList = []
let isReady = false
export function $ready(fn) {
  function readyFn() {
    const type = event.type
    if (document.addEventListener || type === 'load' || document.readyState === "complete") {
      detach()
      isReady = true
      fireReady()
    }
  }
  function fireReady() {
    for (let i = 0, fn; fn = readyList[i++];) {
      fn.call(this)
    }
    readyList = null;
    fireReady = function() { }//惰性函数，防止IE9二次调用
  }

  // 接触绑定事件
  function detach() {
    if (document.addEventListener) {

      document.removeEventListener("DOMContentLoaded", readyFn, false)
      window.removeEventListener("load", readyFn, false)

    } else {
      document.detachEvent("onreadystatechange", readyFn)
      window.detachEvent("onload", readyFn)
    }
  }
  if (typeof fn === 'function') {
    readyList.push(fn)
  }
  if (readyList.length > 1) return
  // 如果是webkit引擎则轮询document的readyState属性，当值为loaded或者complete时则触发DOMContentLoaded事件，对webkit525之后版本直接可以注册DOMContentLoaded事件
  if (document.readyState === 'complete') {
    setTimeout(readyFn)
  } else if (document.addEventListener) {//符合W3C 则监听 DOMContentLoaded和load事件
    // console.log('addEventListener')
    document.addEventListener('DOMContentLoaded', readyFn, false)
    window.addEventListener('load', readyFn, false)
  } else {//针对IE
    // console.log('attachEvent')
    document.attachEvent('onreadystatechange', readyFn)

    window.attachEvent('onload', readyFn)
  }

  //针对IE并且非frame
  let top = false
  try {
    top = window.frameElement === null && document.documentElement
  } catch (e) { }

  if (top && top.doScroll) {
    (function doScrollCheck() {
      if (!isReady) {
        try {//每隔50秒轮询 检测是否支持doScroll()方法,直到能支持doScroll方法，表明DOM已经加载完毕，ie触发DOMContentLoaded
          top.doScroll("left")
        } catch (e) {
          return setTimeout(doScrollCheck, 50)
        }
      }
    })
  }

}
