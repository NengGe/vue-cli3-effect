export const bubbleSort = function(arr = []) {
  for (let outer = arr.length; outer > 1; outer--) {
    for (let i = 0; i < outer - 1; i++) {
      let left = arr[i]
      let right = arr[i + 1]
      // console.log(8 > undefined)
      if (left > right) {
        arr[i] = right
        arr[i + 1] = left
      }
    }
  }
  return arr
}
export const selectSort = function(arr = []) {
  for (let outer = 0; outer < arr.length - 1; outer++) {
    let min = outer
    for (let i = outer + 1; i < arr.length; i++) {
      if (arr[min] > arr[i]) {
        min = i
      }
    }
    let temp = arr[outer]
    arr[outer] = arr[min]
    arr[min] = temp
    // console.log(min)
  }
  return arr
}
// 插入排序
export const insertSort = function(arr) {
  for (let outer = 1; outer < arr.length; outer++) {
    const temp = arr[outer]
    let inner = outer
    while (inner >= 0 && arr[inner - 1] > temp) {
      arr[inner] = arr[inner - 1]
      inner--
    }
    arr[inner] = temp
  }
  return arr
}

export const shellSort = function(arr) {
  // 取数组中间元素,
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let outer = gap; outer < arr.length; outer++) {
      const temp = arr[outer]
      let inner = outer
      while (inner >= 0 && arr[inner - gap] > temp) {
        arr[inner] = arr[inner - gap]
        inner = inner - gap
      }
      arr[inner] = temp
    }
  }
  return arr
}
// 快速排序
export const quickSort = function(arr, begin, end) {
  // 递归出口
  if (begin >= end) return
  var l = begin // 左指针
  var r = end // 右指针
  var temp = arr[begin] // 基准数，这里取数组第一个数
  // 左右指针相遇的时候退出扫描循环
  while (l < r) {
    // 右指针从右向左扫描，碰到第一个小于基准数的时候停住
    while (l < r && arr[r] >= temp) {
      r--
    }
    // 左指针从左向右扫描，碰到第一个大于基准数的时候停住
    while (l < r && arr[l] <= temp) {
      l++
    }
    // 交换左右指针所停位置的数
    [arr[l], arr[r]] = [arr[r], arr[l]]
  }
  // 最后交换基准数与指针相遇位置的数
  [arr[begin], arr[l]] = [arr[l], arr[begin]]
  // 递归处理左右数组
  quickSort(arr, begin, l - 1)
  quickSort(arr, l + 1, end)
  // console.log('hehehehe')
}
