/**
 * 深度合并对象
 */
function isObj(obj) {
  if (obj !== null && obj !== undefined) {
    return typeof obj === 'object'
  }
}
function deepAssignKey(to, from, key) {
  var val = from[key]
  if (isObj(val)) {
    to[key] = deepObject({}, val)
  } else {
    to[key] = val
  }
}
function deepObject(to, from) {
  var from = Object(from)
  for (var key in from) {
    deepAssignKey(to, from, key)
  }
  return to
}
function deepAssign(target, ...arguments) {
  // console.log(arguments)
  var target = Object(target)
  for (var i = 0; i < arguments.length; i++) {
    deepObject(target, arguments[i])
  }
  return target
}
export default deepAssign
