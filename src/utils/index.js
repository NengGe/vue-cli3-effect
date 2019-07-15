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

// 缓动函数，可做动画，先快后慢
/**
 * 排序函数
 * @param {*} param word表示数组元素是对象时需要排序的key desc--->降序 asc--->升序
 */
export let insertSort = function({ targetArr = [], word = '', order = 'desc' } = {}) {
  let newArr = []
  if (!targetArr.length) {
    return targetArr
  }
  (order && order !== 'desc' && order !== 'asc') && (order = 'desc')
  while(targetArr.length) {
    let element = targetArr.shift()
    let isObject = typeof element === 'object'
    let ele = Number(isObject ? element[word] : element)
    let minIndex = newArr.findIndex((item, index) => {
      let itemValue = isObject ? Number(item[word]) : Number(item)
      return order === 'desc' ? itemValue < ele : itemValue > ele
    })
    minIndex === -1 ? newArr.push(element) : newArr.splice(minIndex, 0, element)
  }
  targetArr = null
  return newArr
}
