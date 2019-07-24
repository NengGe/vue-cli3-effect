export let isArray = function() {
  return Object.prototype.toString.call(arr) === '[object Array]'
}
/**
 *
 * @param {*} type 数据类型 首字母需要大写
 * @param {*} target 需要判定数据类型的对象
 */
export let isType = (type, target) => {
  return `[object ${type}]` === Object.prototype.toString.call(target)
}

// 缓存函数
export let cache = function(fn) {
  let cache = {}
  return function(str) {
    let hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 *  先快后慢的缓动函数
 * @param {*} start 缓动起始位置
 * @param {*} end 缓动目标位置
 * @param {*} rate 速度衰减比例
 * @param {*} callback 每次缓动后执行的回调件函数
 * 用缓动函数做的移动端轮播效果例子 /html-examples/mobile/touch-slider.html
 */
export let easeOut = function({ start = 0, end = 0, rate = 2, callback } = {}) {
  let isAnimating = true
  if (!window.removeEventListener) {
    requestAnimationFrame = function(fn) {
      setTimeout(fn, 17)
    }
  }
  if (start === end) {
    return
  }
  let step = function() {
    start += (end - start) / rate
    if (Math.abs(end - start) < 1) {
      isAnimating = false
      typeof callback === 'function' && callback(end, isAnimating)
      return
    }
    typeof callback === 'function' && callback(start, isAnimating)
    requestAnimationFrame(step)
  }
  step()
}
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
