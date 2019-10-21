function merge(left, right) { // 排序部分
  var result = []
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())

    } }
  return result.concat(left).concat(right)
}
/**
 * 合并排序
 * @param {*} items
 */
export function mergeSort(items) { // 拆分数组
  if (items.length === 1) {
    return items
  }
  var middle = Math.floor(items.length / 2),
    left = items.slice(0, middle),
    right = items.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}
