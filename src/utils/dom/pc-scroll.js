
import prefixStyle from '@/utils/prefixStyle'
class PcScroll {
  constructor({ el, direction = 'x' } = {}) {
    this.$el = el
    this.direction = direction
    this.$el && this.init()
  }
  init() {
    this.parent = this.$el.parentNode
    this.start = 0
    this.move = 0
    this.isMove = false
    // this.setTransition()
    this.bindEvent()
  }
  setTransition(time = 200) {
    let preTransition = prefixStyle('transition')
    this.$el.style[preTransition] = `all ${time}ms`
  }
  setTransfrom(dis) {
    let { direction } = this
    let translateStr = direction === 'x' ? `translate3d(${dis}px, 0, 0)` : `translate3d(0, ${direction}px, 0)`
    this.$el.style[prefixStyle('transform')] = translateStr
  }
  bindEvent() {
    let { $el, mousedownHandle, mouseupHandle, parent, direction } = this
    let parentSize = direction === 'x' ? parent.clientWidth : parent.clientHeight
    let scrollSize = direction === 'x' ? $el.scrollWidth : $el.scrollHeight
    if (scrollSize <= parentSize) return null // 子容器尺寸不超过父容器时候不能移动
    $el.addEventListener('mousedown', mousedownHandle.bind(this), false)
    $el.addEventListener('mouseup', mouseupHandle.bind(this), false)
  }
  mousedownHandle(event) {
    let { $el, mousemoveHandle } = this
    this.isMove = true
    event = event || window.event
    this.start = this.direction === 'x' ? event.clientX : event.clientY
    $el.addEventListener('mousemove', mousemoveHandle.bind(this), false)
  }
  mousemoveHandle(event) {
    if (this.isMove) {
      event = event || window.event
      this.move = this.direction === 'x' ? event.clientX : event.clientY
      let dis = this.move - this.start
      this.setTransfrom(dis)
    }
  }
  mouseupHandle() {
    this.isMove = false
    this.removeEvent()
  }
  removeEvent() { // 接触监听事件
    let { $el, mousedownHandle, mouseupHandle, mousemoveHandle } = this
    $el.removeEventListener('mousedown', mousedownHandle)
    $el.removeEventListener('mousemove', mousemoveHandle)
    $el.removeEventListener('mouseup', mouseupHandle)
  }
}
export default PcScroll
