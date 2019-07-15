export let isArray = function() {
  return Object.prototype.toString.call(arr) === '[object Array]'
}
// 缓存函数
export let cache = function(fn) {
  let cache = {}
  return function(str) {
    let hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}
