
import prefixStyle from '@/utils/prefixStyle'
// import { getStyle } from '@/utils'
class PcScroll {
  constructor({ el, direction = 'x', downNumber = 20 } = {}) {
    this.$el = el
    this.downNumber = downNumber // 调控速度的系数,越大速度越快,惯性距离越长
    this.direction = direction
    this.$el && this.init()
  }
  init() {
    this.parent = this.$el.parentNode
    this.start = 0
    this.startTime = 0
    this.endTIme = 0
    this.move = 0
    this.isMove = false // 是否执行移动回调函数的判断条件
    this.initPostion = 0 // 记录每次开始滑动的时候起始点坐标,算释放鼠标点击时候的速度有用
    this.timer = null // 是否执行惯性动画
    this.isforceMove = false // 没有出发mousemove事件不能触发惯性滚动(一次瞬时点击会触发惯性滚动)
    this.dis = 0
    // this.setTransition()
    this.setTransfrom(0)
    this.bindEvent()
  }
  setTransition(time = 200) {
    let preTransition = prefixStyle('transition')
    this.$el.style[preTransition] = `all ${time}ms`
  }
  setTransfrom(dis = 0) { // 设置transform值
    let { direction } = this
    let translateStr = direction === 'x' ? `translate3d(${dis}px, 0, 0)` : `translate3d(0, ${direction}px, 0)`
    this.$el.style[prefixStyle('transform')] = translateStr
  }
  bindEvent() {
    let { $el, mousedownHandle, mouseupHandle, parent, direction } = this
    let parentSize = direction === 'x' ? parent.clientWidth : parent.clientHeight
    let scrollSize = direction === 'x' ? $el.scrollWidth : $el.scrollHeight
    if (scrollSize <= parentSize) return null // 滚动容器尺寸不超过父容器时候不能移动

    $el.style[direction === 'x' ? 'width' : 'height'] = scrollSize + 'px' // 设置滚动容器宽度为内容宽度
    $el.addEventListener('mousedown', mousedownHandle.bind(this), false)
    window.addEventListener('mouseup', mouseupHandle.bind(this), false)
  }
  mousedownHandle(event) { // 鼠标向下点击时回调
    let { $el, mousemoveHandle } = this
    event = event || window.event
    this.isMove = true
    this.timer = false // 一点击就禁止掉惯性动画
    this.startTime = new Date().getTime()
    this.initPostion = this.start = this.direction === 'x' ? event.clientX : event.clientY // 记录起始点位置
    $el.addEventListener('mousemove', mousemoveHandle.bind(this), false)
  }
  mousemoveHandle(event) { // 鼠标移动时回调
    if (!this.isMove) return
    // let { $el } = this
    event = event || window.event
    this.isforceMove = true
    this.move = this.direction === 'x' ? event.clientX : event.clientY
    this.dis += this.move - this.start // 每次移动的距离
    this.start = this.move
    this.setTransfrom(this.dis)
  }
  mouseupHandle() { // 鼠标释放时候回调
    this.isMove = false
    this.endTIme = new Date().getTime()
    if (!this.isforceMove) return
    this.isforceMove = false
    if (this.endTIme - this.startTime > 300) return null
    let { initPostion, move, startTime, endTIme, downNumber } = this
    let speed = ((move - initPostion) / (endTIme - startTime)) * downNumber // 释放鼠标时候的瞬时速度,模拟算法
    this.timer = true
    let moveEase = () => {
      let f = Math.min(Math.abs(speed) / 16, 1.6) // 摩擦力有极限,也就是加速度是有极限的,因此速度删减也是有极限的,这里指定极限是0.9
      // console.log(speed)
      this.timer && requestAnimationFrame(moveEase)
      if (speed < -0.3) {
        speed += f
      } else if (speed > 0.4) {
        speed -= f
      } else {
        speed = 0
        this.timer = false
      }
      this.dis += speed
      this.setTransfrom(this.dis)
    }
    moveEase()
    // console.log(speed)
    this.removeEvent()
  }
  removeEvent() { // 解除监听事件
    let { $el, mousedownHandle, mouseupHandle, mousemoveHandle } = this
    $el.removeEventListener('mousedown', mousedownHandle)
    $el.removeEventListener('mousemove', mousemoveHandle)
    window.removeEventListener('mouseup', mouseupHandle)
  }
}
export default PcScroll
