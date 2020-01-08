const isString = value => typeof value === 'string';
const isSymbol = value => typeof value === 'symbol'
const isUndefined = value => typeof value === 'undefined'
const isDate = obj => Object.prototype.toString.call(obj) === '[object Date]'
const isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]';
const isComplexDataType = value => (typeof value === 'object' || typeof value === 'function') && value !== null;
const isValidBasicDataType = value => value !== undefined && !isSymbol(value); // 合法的基础类型
const isValidObj = obj => Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Object]';// 合法的复杂类型(对象)
const isInfinity = value => value === Infinity || value === -Infinity


// 在数组中存在 Symbol/Undefined/Function 类型会变成 null
// Infinity/NaN 也会变成 null
const processSpecialValueInArray = value =>
  isSymbol(value) || isFunction(value) || isUndefined(value) || isInfinity(value) || isNaN(value) ? null : value;

// 根据 JSON 规范处理属性值
const processValue = value => {
  if (isInfinity(value) || isNaN(value)) {
    return null
  }
  if (isString(value)) {
    return `"${value}"`
  }
  return value
}
let jsonStringify = (function() {
  let wp = new WeakMap()
  return function jsonStringify(obj) {
    if (wp.get(obj)) throw new TypeError('Converting circular structure to JSON')
    let res = ''
    if (isComplexDataType(obj)) {
      if (obj.toJSON) return obj.toJSON; // 含有 toJSON 方法则直接调用
      if (!isValidObj(obj)) {
        return
      }
      wp.set(obj, obj)
      if (Array.isArray(obj)) {
        let temp = []
        res += '['
        obj.forEach((ele, index) => {
          temp.push(isComplexDataType(ele) && !isFunction(ele) ? jsonStringify(ele) : `${processSpecialValueInArray(ele)}`)
        })
        res += `${temp.join(',')}]`
      } else {
        let temp = []
        res += '{'
        Object.keys(obj).forEach((key, index) => {
          if (isComplexDataType(obj[key])) {
            if (isValidObj(obj[key])) {
              temp.push(`"${key}": ${jsonStringify(obj[key])}`)
            } else if (isDate(obj[key])) {
              temp.push(`"${key}": "${obj[key].toISOString()}"`)
            } else if (!isFunction(obj)) {
              temp.push(`"${key}": {}`)
            }
          } else {
            temp.push(`"${key}": ${processValue(obj[key])}`)
          }
        })
        res += `${temp.join(',')}}`
      }
    } else if (isSymbol(obj)) {
      return
    } else {
      return obj
    }
    return res
  }
})()
